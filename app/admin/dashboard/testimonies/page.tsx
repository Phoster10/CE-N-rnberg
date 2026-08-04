import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "author_name", label: "Author Name", type: "text", required: true },
  { key: "content", label: "Testimony", type: "textarea", required: true },
  { key: "is_published", label: "Published", type: "boolean" },
];

export default function TestimoniesAdminPage() {
  return (
    <AdminCrudPanel
      table="testimonies"
      title="Testimonies"
      fields={fields}
      columnsToShow={["author_name", "is_published"]}
    />
  );
}
