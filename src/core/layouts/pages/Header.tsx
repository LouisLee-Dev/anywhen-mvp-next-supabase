"use client";
import { useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import HeaderDropDownMenu from "@/core/layouts/pages/HeaderDropMenu";
import { useAuth } from "@/core/auth/AuthProvider";
import NextLink from "@/components/common/NextLink"; // Import NextLink from Next.js
import clsx from "clsx";
import { BellDotIcon } from "lucide-react";

export default function Header() {
  const [{ authenticated, user, profile, notifications }] = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="shadow-md">
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NextLink href="/">
            <span className="sr-only">Home</span>
            <img
              className="h-10 w-auto"
              src="/assets/images/header-logo.png"
              alt="header-logo"
            />
          </NextLink>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-24">
          {authenticated ? (
            profile?.role === "owner" ? (
              <>
                <NextLink
                  href="/pm/properties"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  My Properties
                </NextLink>
                <NextLink
                  href="/renter-request"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Offers
                </NextLink>
                <NextLink
                  href="/renter/pricing"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Pricing
                </NextLink>
              </>
            ) : profile?.role === "renter" ? (
              <>
                <NextLink
                  href="/renter/dashboard"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Renter Dashboard
                </NextLink>
                <NextLink
                  href="/renter/request"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  New Request
                </NextLink>
              </>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </Popover.Group>
        <div className="hidden space-x-8 lg:flex lg:flex-1 lg:items-center lg:justify-end">
          <div className="relative cursor-pointer text-gray-600 hover:text-gray-900">
            <BellDotIcon className="h-8 w-8 " />
            {notifications?.length > 0 && (
              <div className="absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                {notifications?.length}
              </div>
            )}
          </div>
          <HeaderDropDownMenu></HeaderDropDownMenu>
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <NextLink href="/">
              <span className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-12 w-auto"
                  src="/assets/images/header-logo.png"
                  alt="header-logo"
                />
              </span>
            </NextLink>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {/* <NextLink href="/">
                  <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50">
                    Renters
                  </span>
                </NextLink>
                <NextLink href="/company">
                  <span className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-600 hover:bg-gray-50">
                    Property Managers
                  </span>
                </NextLink> */}
              </div>
              <div className="py-6">
                <HeaderDropDownMenu></HeaderDropDownMenu>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
