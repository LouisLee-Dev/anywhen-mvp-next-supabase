"use client";
import { useMemo, useState } from "react";
import { Dialog, Popover } from "@headlessui/react";
import HeaderDropDownMenu from "@/core/layouts/pages/HeaderDropMenu";
import { useAuth } from "@/core/auth/AuthProvider";
import NextLink from "@/components/common/NextLink"; // Import NextLink from Next.js
import { BellDotIcon, X, AlignJustify } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { ROLE_OPTIONS } from "@/features/profiles/types";

export default function Header() {
  const router = useRouter();
  const [{ authenticated, user, profile, notifications }] = useAuth();
  const [, { actionSignOut }] = useAuth();
  const unreadNotifications = useMemo(
    () => notifications?.filter((notification) => !notification.viewed),
    [notifications],
  );
  const unreadNotificationCount = unreadNotifications?.length;

  return (
    <header className="shadow-md">
      <nav
        className="mx-auto flex items-center justify-between p-4 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <NextLink href="/">
            <span className="sr-only">Home</span>
            <div className="text-2xl font-bold text-gray-600">anywhen</div>
          </NextLink>
        </div>
        {/* mobie header menu */}
        <div className="flex gap-2 lg:hidden items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {authenticated && (
                <div className="relative cursor-pointer text-gray-600 hover:text-gray-900">
                  <BellDotIcon className="h-8 w-8 " />
                  {unreadNotificationCount > 0 && (
                    <div className="absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                      {unreadNotificationCount}
                    </div>
                  )}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px]" align="end" forceMount>
              {unreadNotificationCount > 0 ? (
                unreadNotifications?.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => {
                      router.push("/setting/notifications");
                    }}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">{notification.title}</div>
                      <div className="pl-2">{notification.message}</div>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="text-center">No new notifications</div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/setting/notifications");
                }}
              >
                See all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {authenticated ? (
            profile?.role === "owner" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <AlignJustify />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="" align="end" forceMount>
                    <DropdownMenuItem>
                      <NextLink
                        href="/pm/properties"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        My Properties
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/pm/offers"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Offers
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/pm/trips"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Trips
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/pm/pricing"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Pricing
                      </NextLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : profile?.role === "renter" ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <AlignJustify />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="" align="end" forceMount>
                    <DropdownMenuItem>
                      <NextLink
                        href="/renter/dashboard"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Renter Dashboard
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/renter/request"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        New Request
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/renter/offers"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Offers
                      </NextLink>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <NextLink
                        href="/renter/trips"
                        className="text-lg font-semibold text-gray-600 hover:text-primary"
                      >
                        Trips
                      </NextLink>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              ""
            )
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <AlignJustify />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="" align="end" forceMount>
                <DropdownMenuItem>
                  <NextLink href="/auth/signin">Sign In</NextLink>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <NextLink href="/auth/signup">Sign up</NextLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {authenticated && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-12 w-12 cursor-pointer rounded-full">
                  <AvatarImage src="/assets/avatars/01.png" alt="@shadcn" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-2">
                    <p className="text-lg font-medium leading-none">
                      {profile?.full_name}
                    </p>
                    <p className="text-base font-medium leading-none">
                      {ROLE_OPTIONS[profile?.role]}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <NextLink href="/setting">
                    <DropdownMenuItem>Setting</DropdownMenuItem>
                  </NextLink>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    actionSignOut();
                  }}
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
                  href="/pm/offers"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Offers
                </NextLink>
                <NextLink
                  href="/pm/trips"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Trips
                </NextLink>
                <NextLink
                  href="/pm/pricing"
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
                <NextLink
                  href="/renter/offers"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Offers
                </NextLink>
                <NextLink
                  href="/renter/trips"
                  className="text-lg font-semibold text-gray-600 hover:text-primary"
                >
                  Trips
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {authenticated && (
                <div className="relative cursor-pointer text-gray-600 hover:text-gray-900">
                  <BellDotIcon className="h-8 w-8 " />
                  {unreadNotificationCount > 0 && (
                    <div className="absolute right-[-8px] top-[-8px] flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm text-white">
                      {unreadNotificationCount}
                    </div>
                  )}
                </div>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[320px]" align="end" forceMount>
              {unreadNotificationCount > 0 ? (
                unreadNotifications?.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => {
                      router.push("/setting/notifications");
                    }}
                  >
                    <div className="space-y-1">
                      <div className="font-semibold">{notification.title}</div>
                      <div className="pl-2">{notification.message}</div>
                    </div>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="text-center">No new notifications</div>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  router.push("/setting/notifications");
                }}
              >
                See all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <HeaderDropDownMenu />
        </div>
      </nav>
    </header>
  );
}
