import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "body", label: "Body", type: "textarea", required: true },
  { key: "is_active", label: "Active", type: "boolean" },
];

export default function AnnouncementsAdminPage() {
  return (
    <AdminCrudPanel
      table="announcements"
      title="Announcements"
      fields={fields}
      columnsToShow={["title", "is_active"]}
    />
  );
}
