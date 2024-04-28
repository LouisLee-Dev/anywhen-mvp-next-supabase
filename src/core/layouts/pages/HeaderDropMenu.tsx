import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignUpForm from "@/features/auth/components/SignUpDialog";
import SignInForm from "@/features/auth/components/SignInDialog";
import { AlignJustify } from "lucide-react";
import { useAuth } from "@/core/auth/AuthProvider";
import Link from "next/link"; // Import Link from Next.js

export default function HeaderDropDownMenu() {
  const [{ user }] = useAuth();
  const [, { actionSignOut }] = useAuth();
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const handleSignUp = () => {
    setOpenSignUpDialog(true);
  };
  const handleCloseSignUpDialog = () => {
    setOpenSignUpDialog(false);
  };
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const handleSignIn = () => {
    setOpenSignInDialog(true);
  };
  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };
  async function handleSignOut() {
    await actionSignOut();
  }

  return (
    <div className="flex items-center border border-solid border-gray-400 rounded-full hover:border-gray-600 py-0.5 px-2 max-w-[78px]">
      <DropdownMenu>
        <DropdownMenuTrigger className="">
          <div className="flex items-center">
            <div className="px-1">
              <AlignJustify className="w-5 h-5"/>
            </div>
            <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-10 h-10 text-gray-400 -left-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {user?.id && (
            <React.Fragment>
              <DropdownMenuItem>
                <Link href="/profile">
                  <div className="flex flex-col">
                    <span>Profile</span>
                    <span className="text-xs">{user.email}</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                Sign Out
              </DropdownMenuItem>
            </React.Fragment>
          )}
          {!user?.id && (
            <React.Fragment>
              <DropdownMenuItem onClick={handleSignUp}>
                Sign Up
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignIn}>
                Sign In
              </DropdownMenuItem>
            </React.Fragment>
          )}
          <DropdownMenuSeparator />
          <DropdownMenuItem>Gift Cards</DropdownMenuItem>
          <DropdownMenuItem>Help Center</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignUpForm open={openSignUpDialog} onClose={handleCloseSignUpDialog} />
      <SignInForm open={openSignInDialog} onClose={handleCloseSignInDialog} />
    </div>
  );
}
