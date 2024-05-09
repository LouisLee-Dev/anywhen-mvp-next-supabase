import React from "react";
import { useAuth } from "@/core/auth/AuthProvider";
import Link from "next/link"; // Import Link from Next.js
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROLE_OPTIONS } from "@/features/profiles/types";

export default function HeaderDropDownMenu() {
  const router = useRouter();
  const [{ authenticated, user, profile }] = useAuth();
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
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuGroup>
              <DropdownMenuItem>Setting</DropdownMenuItem>
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
  );
}
