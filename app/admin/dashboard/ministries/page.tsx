import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "name", label: "Name", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "image_url", label: "Image", type: "image" },
  { key: "sort_order", label: "Sort Order", type: "number" },
];

export default function MinistriesAdminPage() {
  return (
    <AdminCrudPanel
      table="ministries"
      title="Ministries"
      fields={fields}
      orderBy="sort_order"
      orderAscending
      columnsToShow={["name", "sort_order"]}
    />
  );
}
