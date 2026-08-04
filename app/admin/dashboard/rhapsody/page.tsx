import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "entry_date", label: "Date", type: "date", required: true },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "scripture_reference", label: "Scripture Reference", type: "text" },
  { key: "body", label: "Body", type: "textarea", required: true },
  { key: "cover_image_url", label: "Cover Image", type: "image" },
];

export default function RhapsodyAdminPage() {
  return (
    <AdminCrudPanel
      table="rhapsody_entries"
      title="Rhapsody of Realities"
      fields={fields}
      orderBy="entry_date"
      orderAscending={false}
      columnsToShow={["entry_date", "title"]}
    />
  );
}
