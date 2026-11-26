import Image from "next/image";
import logo from "@/app/images/logo.png";
import { cn } from "@/lib/utils";

/** The church logo. Decorative by default: the church name is always written beside it. */
export default function Logo({ className }: { className?: string }) {
  return <Image src={logo} alt="" sizes="96px" className={cn("object-contain", className)} />;
}
