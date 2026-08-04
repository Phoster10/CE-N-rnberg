import { format } from "date-fns";
import { getContactMessages } from "@/lib/data";
import { StatusSelect, DeleteRowButton } from "@/components/admin/status-controls";

export default async function ContactMessagesAdminPage() {
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-semibold text-navy-900">Contact Messages</h1>
      <div className="overflow-hidden rounded-2xl border border-navy-100 bg-white shadow-card">
        {messages.length === 0 ? (
          <p className="p-10 text-center text-sm text-navy-400">No messages submitted yet.</p>
        ) : (
          <table className="w-full text-left text-sm">
            <thead className="bg-navy-50 text-xs uppercase tracking-wide text-navy-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Submitted</th>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Message</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-50">
              {messages.map((m) => (
                <tr key={m.id} className="align-top">
                  <td className="whitespace-nowrap px-5 py-3 text-navy-500">
                    {format(new Date(m.created_at), "d MMM yyyy, h:mm a")}
                  </td>
                  <td className="px-5 py-3 text-navy-700">{m.name}</td>
                  <td className="px-5 py-3 text-navy-700">
                    <a href={`mailto:${m.email}`} className="hover:underline">
                      {m.email}
                    </a>
                  </td>
                  <td className="max-w-sm px-5 py-3 text-navy-700">{m.message}</td>
                  <td className="px-5 py-3">
                    <StatusSelect table="contact_messages" id={m.id} status={m.status} options={["new", "read", "archived"]} />
                  </td>
                  <td className="px-5 py-3 text-right">
                    <DeleteRowButton table="contact_messages" id={m.id} />
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
