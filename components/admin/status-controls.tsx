"use client";

import { useState, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Trash2 } from "lucide-react";

export function StatusSelect({
  table,
  id,
  status,
  options,
}: {
  table: string;
  id: string;
  status: string;
  options: string[];
}) {
  const supabase = createClient();
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        setValue(next);
        startTransition(async () => {
          await supabase.from(table).update({ status: next }).eq("id", id);
        });
      }}
      className="rounded-lg border border-navy-200 px-2.5 py-1.5 text-xs font-medium capitalize"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}

export function DeleteRowButton({ table, id, onDeleted }: { table: string; id: string; onDeleted?: () => void }) {
  const supabase = createClient();
  const [pending, startTransition] = useTransition();

  return (
    <button
      disabled={pending}
      onClick={() => {
        if (!confirm("Delete this entry?")) return;
        startTransition(async () => {
          await supabase.from(table).delete().eq("id", id);
          onDeleted?.();
          window.location.reload();
        });
      }}
      className="rounded-lg p-2 text-navy-400 hover:bg-red-50 hover:text-red-600"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  );
}
