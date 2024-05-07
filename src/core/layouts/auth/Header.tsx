"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const isSignIn = pathname === "/auth/signin";

  return (
    <header className="shadow-md">
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <span className="sr-only">Home</span>
            <img
              className="h-10 w-auto"
              src="/assets/images/header-logo.png"
              alt="header-logo"
            />
          </Link>
        </div>
        <div className="flex"></div>
        {isSignIn && (
          <div className="flex space-x-2">
            <div className=""> Don&39;t have an account? </div>
            <div className="">
              <Link
                href="/auth/signup"
                className="rounded-md border bg-primary px-5 py-3 font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>
          </div>
        )}
        {!isSignIn && (
          <div className="flex space-x-2">
            <div className=""> Already have an account? </div>
            <div className="">
              <Link
                href="/auth/signin"
                className="rounded-md border bg-primary px-5 py-3 font-semibold text-white"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
