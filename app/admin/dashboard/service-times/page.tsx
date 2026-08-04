import AdminCrudPanel from "@/components/admin/admin-crud-panel";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "label", label: "Label", type: "text", required: true },
  {
    key: "day_of_week",
    label: "Day of Week",
    type: "select",
    required: true,
    options: [
      { label: "Sunday", value: "0" },
      { label: "Monday", value: "1" },
      { label: "Tuesday", value: "2" },
      { label: "Wednesday", value: "3" },
      { label: "Thursday", value: "4" },
      { label: "Friday", value: "5" },
      { label: "Saturday", value: "6" },
    ],
  },
  { key: "time", label: "Time (24h, e.g. 10:00)", type: "text", required: true },
  { key: "is_next_feature", label: "Feature as next service", type: "boolean" },
];

export default function ServiceTimesAdminPage() {
  return (
    <AdminCrudPanel
      table="service_times"
      title="Service Times"
      fields={fields}
      orderBy="day_of_week"
      orderAscending
      columnsToShow={["label", "day_of_week", "time"]}
    />
  );
}
