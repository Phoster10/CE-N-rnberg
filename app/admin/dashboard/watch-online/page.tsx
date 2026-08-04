import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "is_live", label: "Currently Live", type: "boolean" },
  {
    key: "youtube_embed_url",
    label: "YouTube Embed URL",
    type: "text",
    helpText: "e.g. https://www.youtube.com/embed/VIDEO_ID",
  },
  { key: "zoom_link", label: "Zoom Link", type: "text" },
];

export default function WatchOnlineAdminPage() {
  return (
    <AdminSingleRowForm
      table="watch_online_settings"
      title="Watch Online Settings"
      fields={fields}
      defaults={{ is_live: false, youtube_embed_url: null, zoom_link: null }}
    />
  );
}
