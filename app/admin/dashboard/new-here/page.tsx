import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "heading", label: "Heading", type: "text" },
  { key: "image_url", label: "Photo", type: "image", helpText: "Shown in the \"Plan Your Visit\" card on the New Here page." },
];

export default function NewHereAdminPage() {
  return (
    <AdminSingleRowForm
      table="new_here_content"
      title="New Here Page"
      fields={fields}
      defaults={{ heading: "What should I wear?", image_url: null }}
    />
  );
}
