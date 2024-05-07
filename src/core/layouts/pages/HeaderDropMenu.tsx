import React from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation";

export default function HeaderDropDownMenu() {
  const router = useRouter();
  const [{ authenticated, user }] = useAuth();
  const [, { actionSignOut }] = useAuth();

  return (
    <div className="user-navigation space-x-2">
      {!authenticated && (
        <Link href="/auth/signin" className="rounded-md border px-5 py-3">
          Sign In
        </Link>
      )}
      {!authenticated && (
        <Link
          href="/auth/signup"
          className="rounded-md bg-primary px-5 py-3 font-semibold text-white"
        >
          Sign Up
        </Link>
      )}
      {authenticated && <div className="">{user.email}</div>}
    </div>
  );
}
