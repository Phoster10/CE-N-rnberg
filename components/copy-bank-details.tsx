"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function CopyBankDetails() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Account Name: ${siteConfig.bank.accountName}\nIBAN: ${siteConfig.bank.iban}\nBIC: ${siteConfig.bank.bic}\nBank: ${siteConfig.bank.bank}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable — details are still visible on screen.
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-navy-200 px-4 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
    >
      {copied ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied!" : "Copy Bank Details"}
    </button>
  );
}
