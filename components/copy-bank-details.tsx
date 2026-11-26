"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CopyBankDetails({
  accountName,
  iban,
  bic,
  bank,
}: {
  accountName: string;
  iban: string;
  bic: string;
  bank: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const text = `Account Name: ${accountName}\nIBAN: ${iban}\nBIC: ${bic}\nBank: ${bank}`;
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
      className={cn(
        "mt-6 flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3.5 text-sm font-semibold transition-all",
        copied
          ? "border-green-200 bg-green-50 text-green-700"
          : "border-navy-200 text-navy-800 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied to clipboard!" : "Copy Bank Details"}
    </button>
  );
}
