import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "hero_heading", label: "Hero Heading", type: "text" },
  { key: "hero_subheading", label: "Hero Subheading", type: "text" },
  {
    key: "hero_image_url",
    label: "Hero Background Image",
    type: "image",
    helpText: "Shows behind the hero text. Leave empty to keep the navy gradient background.",
  },
  { key: "welcome_message", label: "Welcome Message", type: "textarea" },
  {
    key: "welcome_image_url",
    label: "Welcome Section Photo",
    type: "image",
    helpText: "Shown next to the memory verse card in the welcome section.",
  },
  { key: "memory_verse_text", label: "Memory Verse Text", type: "textarea" },
  { key: "memory_verse_reference", label: "Memory Verse Reference", type: "text" },
];

export default function HomepageAdminPage() {
  return (
    <AdminSingleRowForm
      table="homepage_content"
      title="Homepage Content"
      fields={fields}
      defaults={{
        hero_heading: "Welcome to Christ Embassy Nürnberg",
        hero_subheading: "A Place of Love, Faith & God's Presence",
        welcome_message: "",
        memory_verse_text: "",
        memory_verse_reference: "",
        hero_image_url: null,
        welcome_image_url: null,
      }}
    />
  );
}
