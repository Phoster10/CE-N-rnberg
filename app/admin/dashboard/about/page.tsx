import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "who_we_are_text", label: "\"Who We Are\" Paragraph", type: "textarea" },
  { key: "portrait_image_url", label: "Pastor / Portrait Photo", type: "image", helpText: "Shown next to the \"Who We Are\" text." },
  { key: "vision_text", label: "Our Vision", type: "textarea" },
  { key: "mission_text", label: "Our Mission", type: "textarea" },
  { key: "values_text", label: "Our Core Values", type: "textarea" },
  { key: "believe_text", label: "\"What We Believe\" Paragraph", type: "textarea" },
  { key: "congregation_image_url", label: "Congregation Photo", type: "image", helpText: "Shown next to the \"What We Believe\" text." },
];

export default function AboutAdminPage() {
  return (
    <AdminSingleRowForm
      table="about_content"
      title="About Us Page"
      fields={fields}
      defaults={{
        who_we_are_text: "",
        vision_text: "",
        mission_text: "",
        values_text: "",
        believe_text: "",
        portrait_image_url: null,
        congregation_image_url: null,
      }}
    />
  );
}
