import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "is_live", label: "Currently Live", type: "boolean" },
  {
    key: "youtube_embed_url",
    label: "Facebook Live Embed URL",
    type: "text",
    helpText:
      "On the live Facebook post, click ⋯ → Embed, and copy the URL from inside the src=\"...\" part of the embed code (looks like https://www.facebook.com/plugins/video.php?href=...). Paste just that URL here.",
  },
  {
    key: "zoom_link",
    label: "Zoom Link",
    type: "text",
    helpText: "Opens Zoom in a new tab/app when clicked — it cannot be embedded to play inside the page like the Facebook stream can.",
  },
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
