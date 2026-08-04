"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, ImageOff } from "lucide-react";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";
import { cn } from "@/lib/utils";

type Row = Record<string, unknown>;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MAX_FILE_SIZE = 10 * 1024 * 1024;

/**
 * For tables that only ever hold a single row (homepage_content,
 * about_content, new_here_content, site_settings, watch_online_settings):
 * loads that row (creating a default one if none exists yet) and renders a
 * plain edit form instead of a list+modal.
 */
export default function AdminSingleRowForm({
  table,
  title,
  fields,
  defaults,
}: {
  table: string;
  title: string;
  fields: FieldConfig[];
  defaults: Row;
}) {
  const supabase = createClient();
  const [row, setRow] = useState<Row | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  // Tracks image fields the admin explicitly cleared in the current form,
  // so "Save" removes the photo instead of leaving the old URL in place.
  const [removedImageKeys, setRemovedImageKeys] = useState<Set<string>>(new Set());

  const load = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").limit(1).maybeSingle();
    if (error) {
      setError(error.message);
    } else if (!data) {
      const { data: created, error: insertError } = await supabase
        .from(table)
        .insert(defaults)
        .select()
        .single();
      if (insertError) setError(insertError.message);
      else setRow(created);
    } else {
      setRow(data);
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  useEffect(() => {
    load();
  }, [load]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!row) return;
    setSaving(true);
    setError(null);

    const formEl = e.currentTarget;
    const payload: Row = {};

    for (const field of fields) {
      if (field.type === "image") continue;
      const el = formEl.elements.namedItem(field.key) as HTMLInputElement | HTMLTextAreaElement | null;
      if (!el) continue;
      if (field.type === "boolean") payload[field.key] = (el as HTMLInputElement).checked;
      else payload[field.key] = el.value === "" ? null : el.value;
    }

    for (const field of fields.filter((f) => f.type === "image")) {
      const fileInput = formEl.elements.namedItem(field.key) as HTMLInputElement | null;
      const file = fileInput?.files?.[0];
      if (file) {
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          setError("Only JPG, PNG, WEBP, or GIF images are allowed.");
          setSaving(false);
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setError("File is too large — max size is 10MB.");
          setSaving(false);
          return;
        }
        setUploadingKey(field.key);
        const bucket = field.bucket ?? "public-media";
        const path = `${table}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const { error: uploadError } = await supabase.storage.from(bucket).upload(path, file);
        setUploadingKey(null);
        if (uploadError) {
          setError(uploadError.message);
          setSaving(false);
          return;
        }
        const { data } = supabase.storage.from(bucket).getPublicUrl(path);
        payload[field.key] = data.publicUrl;
      } else if (removedImageKeys.has(field.key)) {
        payload[field.key] = null;
      }
    }

    const { error } = await supabase.from(table).update(payload).eq("id", row.id as string);
    setSaving(false);
    if (error) {
      setError(error.message);
      return;
    }
    setSavedAt(Date.now());
    setRemovedImageKeys(new Set());
    load();
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-10 text-navy-400">
        <Loader2 className="h-5 w-5 animate-spin" /> Loading...
      </div>
    );
  }

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-navy-900">{title}</h1>

      {error && <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      {savedAt && <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">Saved.</div>}

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-5 rounded-2xl border border-navy-100 bg-white p-6 shadow-card"
      >
        {fields.map((field) => {
          const currentImageUrl = row?.[field.key] as string | undefined;
          const isRemoved = removedImageKeys.has(field.key);

          return (
            <div key={field.key}>
              {field.type !== "boolean" && (
                <label htmlFor={field.key} className="mb-1.5 block text-sm font-medium text-navy-700">
                  {field.label}
                </label>
              )}
              {field.type === "image" ? (
                <>
                  <input
                    id={field.key}
                    name={field.key}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    onChange={() =>
                      setRemovedImageKeys((prev) => {
                        const next = new Set(prev);
                        next.delete(field.key);
                        return next;
                      })
                    }
                    className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-navy-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold"
                  />
                  {uploadingKey === field.key && <p className="mt-1 text-xs text-navy-400">Uploading...</p>}
                  {currentImageUrl && !isRemoved ? (
                    <div className="mt-2 flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={currentImageUrl} alt="" className="h-24 w-40 rounded-lg object-cover" />
                      <button
                        type="button"
                        onClick={() => setRemovedImageKeys((prev) => new Set(prev).add(field.key))}
                        className="flex items-center gap-1.5 rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <ImageOff className="h-3.5 w-3.5" /> Remove photo
                      </button>
                    </div>
                  ) : isRemoved ? (
                    <p className="mt-2 text-xs font-medium text-red-600">Photo will be removed when you save.</p>
                  ) : (
                    <p className="mt-2 text-xs text-navy-400">No image set yet — a styled placeholder shows on the site.</p>
                  )}
                </>
              ) : field.type === "textarea" ? (
                <textarea
                  id={field.key}
                  name={field.key}
                  rows={4}
                  defaultValue={(row?.[field.key] as string) ?? ""}
                  className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              ) : field.type === "boolean" ? (
                <label className="flex items-center gap-2 text-sm font-medium text-navy-700">
                  <input
                    id={field.key}
                    name={field.key}
                    type="checkbox"
                    defaultChecked={Boolean(row?.[field.key])}
                    className="h-4 w-4 accent-gold-500"
                  />
                  {field.label}
                </label>
              ) : (
                <input
                  id={field.key}
                  name={field.key}
                  type="text"
                  defaultValue={(row?.[field.key] as string) ?? ""}
                  className="w-full rounded-xl border border-navy-200 px-4 py-2.5 text-sm focus:border-gold-500 focus:outline-none"
                />
              )}
              {field.helpText && <p className="mt-1 text-xs text-navy-400">{field.helpText}</p>}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={saving}
          className={cn(
            "flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-semibold text-navy-900",
            saving && "opacity-60"
          )}
        >
          <Save className="h-4 w-4" />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
