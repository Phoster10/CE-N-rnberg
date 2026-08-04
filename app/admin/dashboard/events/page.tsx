import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea" },
  { key: "start_at", label: "Start Date & Time", type: "datetime", required: true },
  { key: "end_at", label: "End Date & Time", type: "datetime" },
  { key: "location", label: "Location", type: "text" },
  { key: "poster_url", label: "Poster Image", type: "image" },
  { key: "registration_url", label: "Registration URL", type: "text" },
  { key: "is_published", label: "Published", type: "boolean" },
];

export default function EventsAdminPage() {
  return (
    <AdminCrudPanel
      table="events"
      title="Events"
      fields={fields}
      orderBy="start_at"
      orderAscending={false}
      columnsToShow={["title", "start_at", "is_published"]}
    />
  );
}
