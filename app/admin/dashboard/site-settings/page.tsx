import AdminSingleRowForm from "@/components/admin/admin-single-row-form";
import type { FieldConfig } from "@/components/admin/admin-crud-panel";

const fields: FieldConfig[] = [
  { key: "phone", label: "Phone Number", type: "text" },
  { key: "email", label: "Email Address", type: "text" },
  { key: "address_line1", label: "Address Line 1", type: "text" },
  { key: "address_line2", label: "Address Line 2", type: "text" },
  { key: "map_embed_src", label: "Google Maps Embed URL", type: "text", helpText: "The 'output=embed' link used for the map on Visit Us / Contact." },
  { key: "map_directions_url", label: "Google Maps Directions URL", type: "text" },
  { key: "footer_tagline", label: "Footer Tagline", type: "text" },
  { key: "social_youtube", label: "YouTube URL", type: "text" },
  { key: "social_instagram", label: "Instagram URL", type: "text" },
  { key: "social_facebook", label: "Facebook URL", type: "text" },
  { key: "bank_account_name", label: "Bank Account Name", type: "text" },
  { key: "bank_iban", label: "IBAN", type: "text" },
  { key: "bank_bic", label: "BIC", type: "text" },
  { key: "bank_name", label: "Bank Name", type: "text" },
  { key: "give_url", label: "\"Give Now\" Link", type: "text", helpText: "Your payment processor checkout link (Stripe, PayPal, etc.)." },
];

export default function SiteSettingsAdminPage() {
  return (
    <AdminSingleRowForm
      table="site_settings"
      title="Site Settings"
      fields={fields}
      defaults={{
        phone: "+49 162 1234567",
        email: "info@christembassy-nuernberg.de",
        address_line1: "Lehrerstraße 6",
        address_line2: "90453 Nürnberg, Germany",
        footer_tagline: "A place of love, faith and God's presence.",
        bank_account_name: "Christ Embassy Nürnberg",
        bank_iban: "",
        bank_bic: "",
        bank_name: "",
      }}
    />
  );
}
