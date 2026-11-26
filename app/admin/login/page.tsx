import LoginForm from "./login-form";
import Logo from "@/components/logo";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-navy-50/50 px-4 py-16">
      <div className="w-full max-w-md rounded-2xl border border-navy-100 bg-white p-8 shadow-soft">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy-gradient">
            <Logo className="h-9 w-9" />
          </span>
          <h1 className="mt-4 font-display text-xl font-semibold text-navy-900">Admin Login</h1>
          <p className="mt-1 text-sm text-navy-500">Sign in to manage Christ Embassy Nürnberg&apos;s website.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
