import { format } from "date-fns";
import { getPrayerRequests } from "@/lib/data";
import { StatusSelect, DeleteRowButton } from "@/components/admin/status-controls";

export default async function PrayerRequestsAdminPage() {
  const requests = await getPrayerRequests();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-navy-900">Prayer Requests</h1>
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {requests.length === 0 ? (
          <p className="p-10 text-center text-sm text-navy-400">No prayer requests submitted yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Submitted</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Request</th>
                <th className="px-5 py-3 font-semibold">Visibility</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {requests.map((r) => (
                <tr key={r.id} className="align-top">
                  <td className="whitespace-nowrap px-5 py-3 text-navy-500">
                    {format(new Date(r.created_at), "d MMM yyyy, h:mm a")}
                  </td>
                  <td className="px-5 py-3 text-navy-700">{r.name || "Anonymous"}</td>
                  <td className="max-w-sm px-5 py-3 text-navy-700">{r.request}</td>
                  <td className="px-5 py-3 capitalize text-navy-500">{r.visibility}</td>
                  <td className="px-5 py-3">
                    <StatusSelect
                      table="prayer_requests"
                      id={r.id}
                      status={r.status}
                      options={["new", "in_progress", "prayed"]}
                    />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <DeleteRowButton table="prayer_requests" id={r.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
