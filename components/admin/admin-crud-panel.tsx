"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Plus, Pencil, Trash2, X, Loader2, ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export type FieldType = "text" | "textarea" | "datetime" | "date" | "boolean" | "number" | "select" | "image";

export type FieldConfig = {
  key: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  bucket?: string;
  helpText?: string;
};

type Row = Record<string, unknown>;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "video/mp4"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB, matches the storage bucket limit

export default function AdminCrudPanel({
  table,
  title,
  fields,
  orderBy = "created_at",
  orderAscending = false,
  columnsToShow,
}: {
  table: string;
  title: string;
  fields: FieldConfig[];
  orderBy?: string;
  orderAscending?: boolean;
  columnsToShow?: string[];
}) {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  // Tracks image fields the admin explicitly cleared in the current form,
  // so "Save" removes the photo instead of leaving the old URL in place.
  const [removedImageKeys, setRemovedImageKeys] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order(orderBy, { ascending: orderAscending });
    if (error) setError(error.message);
    else setRows(data ?? []);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, orderBy, orderAscending]);

  useEffect(() => {
    load();
  }, [load]);

  const displayCols = columnsToShow ?? fields.slice(0, 3).map((f) => f.key);

  const openCreate = () => {
    setEditing(null);
    setRemovedImageKeys(new Set());
    setFormOpen(true);
  };

  const openEdit = (row: Row) => {
    setEditing(row);
    setRemovedImageKeys(new Set());
    setFormOpen(true);
  };

  const handleDelete = async (row: Row) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const { error } = await supabase.from(table).delete().eq("id", row.id as string);
    if (error) setError(error.message);
    else load();
  };

  const handleUpload = async (file: File, field: FieldConfig): Promise<string | null> => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Only JPG, PNG, WEBP, GIF, or MP4 files are allowed.");
      return null;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File is too large — max size is 10MB.");
      return null;
    }
    setUploadingKey(field.key);
    const bucket = field.bucket ?? "public-media";
    const path = `${table}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
    const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);
    setUploadingKey(null);
    if (uploadError) {
      setError(uploadError.message);
      return null;
    }
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const formEl = e.currentTarget;
    const payload: Row = {};

    for (const field of fields) {
      if (field.type === "image") continue; // handled separately below
      const el = formEl.elements.namedItem(field.key) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) continue;
      if (field.type === "boolean") {
        payload[field.key] = (el as HTMLInputElement).checked;
      } else if (field.type === "number") {
        payload[field.key] = el.value === "" ? null : Number(el.value);
      } else {
        payload[field.key] = el.value === "" ? null : el.value;
      }
    }

    // Handle image fields: a newly chosen file wins; otherwise an explicit
    // "Remove photo" click clears the field; otherwise keep the existing URL.
    for (const field of fields.filter((f) => f.type === "image")) {
      const fileInput = formEl.elements.namedItem(field.key) as HTMLInputElement | null;
      const file = fileInput?.files?.[0];
      if (file) {
        const url = await handleUpload(file, field);
        if (url) payload[field.key] = url;
      } else if (removedImageKeys.has(field.key)) {
        payload[field.key] = null;
      } else if (editing) {
        payload[field.key] = editing[field.key] ?? null;
      }
    }

    const result = editing
      ? await supabase.from(table).update(payload).eq("id", editing.id as string)
      : await supabase.from(table).insert(payload);

    setSaving(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    setFormOpen(false);
    setEditing(null);
    setRemovedImageKeys(new Set());
    load();
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-navy-900">{title}</h1>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900 shadow-glow"
        >
          <Plus className="h-4 w-4" /> Add New
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
          <button className="ml-3 underline" onClick={() => setError(null)}>
            Dismiss
          </button>
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {loading ? (
          <div className="flex items-center justify-center gap-2 p-10 text-navy-400">
            <Loader2 className="h-5 w-5 animate-spin" /> Loading...
          </div>
        ) : rows.length === 0 ? (
          <p className="p-10 text-center text-sm text-navy-400">
            Nothing here yet. Click &ldquo;Add New&rdquo; to create the first entry.
          </p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
              <tr>
                {displayCols.map((c) => (
                  <th key={c} className="px-5 py-3 font-semibold">
                    {fields.find((f) => f.key === c)?.label ?? c}
                  </th>
                ))}
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {rows.map((row) => (
                <tr key={row.id as string}>
                  {displayCols.map((c) => (
                    <td key={c} className="max-w-xs truncate px-5 py-3 text-navy-700">
                      {formatCell(row[c])}
                    </td>
                  ))}
                  <td className="px-5 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-lg p-2 text-navy-500 hover:bg-navy-50 hover:text-navy-900"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(row)}
                        className="rounded-lg p-2 text-navy-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {formOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-navy-950/60 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-soft">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold text-navy-900">
                {editing ? "Edit Entry" : "Add New Entry"}
              </h2>
              <button onClick={() => setFormOpen(false)} aria-label="Close">
                <X className="h-5 w-5 text-navy-400" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => {
                const currentImageUrl = editing?.[field.key] as string | undefined;
                const isRemoved = removedImageKeys.has(field.key);

                return (
                  <div key={field.key}>
                    {field.type !== "boolean" && (
                      <label htmlFor={field.key} className="mb-1.5 block text-sm font-medium text-navy-700">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </label>
                    )}

                    {field.type === "textarea" && (
                      <textarea
                        id={field.key}
                        name={field.key}
                        required={field.required}
                        rows={4}
                        defaultValue={(editing?.[field.key] as string) ?? ""}
                        className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    )}

                    {(field.type === "text" || field.type === "number") && (
                      <input
                        id={field.key}
                        name={field.key}
                        type={field.type === "number" ? "number" : "text"}
                        required={field.required}
                        defaultValue={(editing?.[field.key] as string | number) ?? ""}
                        className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    )}

                    {field.type === "datetime" && (
                      <input
                        id={field.key}
                        name={field.key}
                        type="datetime-local"
                        required={field.required}
                        defaultValue={toLocalInputValue(editing?.[field.key] as string)}
                        className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    )}

                    {field.type === "date" && (
                      <input
                        id={field.key}
                        name={field.key}
                        type="date"
                        required={field.required}
                        defaultValue={(editing?.[field.key] as string)?.slice(0, 10) ?? ""}
                        className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                      />
                    )}

                    {field.type === "select" && (
                      <select
                        id={field.key}
                        name={field.key}
                        required={field.required}
                        defaultValue={(editing?.[field.key] as string) ?? field.options?.[0]?.value}
                        className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                      >
                        {field.options?.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === "boolean" && (
                      <label className="flex items-center gap-2 text-sm font-medium text-navy-700">
                        <input
                          id={field.key}
                          name={field.key}
                          type="checkbox"
                          defaultChecked={Boolean(editing?.[field.key])}
                          className="h-4 w-4 accent-gold-500"
                        />
                        {field.label}
                      </label>
                    )}

                    {field.type === "image" && (
                      <>
                        <input
                          id={field.key}
                          name={field.key}
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4"
                          onChange={() => {
                            // Choosing a new file cancels a pending "remove"
                            setRemovedImageKeys((prev) => {
                              const next = new Set(prev);
                              next.delete(field.key);
                              return next;
                            });
                          }}
                          className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold"
                        />
                        {uploadingKey === field.key && (
                          <p className="mt-1 text-xs text-navy-400">Uploading...</p>
                        )}
                        {currentImageUrl && !isRemoved ? (
                          <div className="mt-2 flex items-center gap-3">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={currentImageUrl} alt="" className="h-20 w-20 rounded-lg object-cover" />
                            <button
                              type="button"
                              onClick={() =>
                                setRemovedImageKeys((prev) => new Set(prev).add(field.key))
                              }
                              className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                            >
                              <ImageOff className="h-3.5 w-3.5" /> Remove photo
                            </button>
                          </div>
                        ) : isRemoved ? (
                          <p className="mt-2 text-xs font-medium text-red-600">
                            Photo will be removed when you save.
                          </p>
                        ) : null}
                      </>
                    )}

                    {field.helpText && <p className="mt-1 text-xs text-navy-400">{field.helpText}</p>}
                  </div>
                );
              })}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className={cn(
                    "flex-1 rounded-full bg-gold-gradient px-4 py-2.5 text-sm font-semibold text-navy-900",
                    saving && "opacity-60"
                  )}
                >
                  {saving ? "Saving..." : editing ? "Save Changes" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="rounded-full border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function formatCell(value: unknown): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
    const d = new Date(value);
    if (!isNaN(d.getTime())) return d.toLocaleString();
  }
  return String(value);
}

function toLocalInputValue(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
