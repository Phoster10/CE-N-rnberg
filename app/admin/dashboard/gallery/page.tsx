import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const albumFields: FieldConfig[] = [
  { key: "title", label: "Album Title", type: "text", required: true },
  {
    key: "category",
    label: "Category",
    type: "select",
    required: true,
    options: [
      { label: "Services", value: "services" },
      { label: "Events", value: "events" },
      { label: "Outreach", value: "outreach" },
      { label: "Baptisms", value: "baptisms" },
      { label: "Conferences", value: "conferences" },
      { label: "Kids", value: "kids" },
      { label: "General", value: "general" },
    ],
  },
];

const itemFields: FieldConfig[] = [
  {
    key: "media_type",
    label: "Media Type",
    type: "select",
    required: true,
    options: [
      { label: "Image", value: "image" },
      { label: "Video", value: "video" },
    ],
  },
  { key: "url", label: "Image / Video File", type: "image", helpText: "Upload a JPG, PNG, WEBP, GIF, or MP4 (max 10MB)." },
  { key: "caption", label: "Caption", type: "text" },
  { key: "album_id", label: "Album ID (optional)", type: "text", helpText: "Paste an album's ID from the table above to group it." },
];

export default function GalleryAdminPage() {
  return (
    <div className="space-y-12">
      <AdminCrudPanel
        table="gallery_albums"
        title="Gallery Albums"
        fields={albumFields}
        columnsToShow={["title", "category"]}
      />
      <AdminCrudPanel
        table="gallery_items"
        title="Gallery Photos & Videos"
        fields={itemFields}
        columnsToShow={["media_type", "caption"]}
      />
    </div>
  );
}
