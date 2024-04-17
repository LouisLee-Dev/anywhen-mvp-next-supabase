import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignUpForm from "./SignUpDialog";
import SignInForm from "./SignInDialog";
import { AlignJustify } from "lucide-react";

export default function HeaderDropDownMenu() {
  const [openSignUpDialog, setOpenSignUpDialog] = useState(false);
  const handleSignUpClick = () => {
    setOpenSignUpDialog(true);
  };
  const handleCloseSignUpDialog = () => {
    setOpenSignUpDialog(false);
  };
  const [openSignInDialog, setOpenSignInDialog] = useState(false);
  const handleSignInClick = () => {
    setOpenSignInDialog(true);
  };
  const handleCloseSignInDialog = () => {
    setOpenSignInDialog(false);
  };
  return (
    <div className="flex items-center border border-solid border-gray-400 rounded-full hover:border-gray-600 py-0.5 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center">
            <div className="px-1">
              <AlignJustify />
            </div>
            <div className="relative w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <svg
                className="absolute w-11 h-11 text-gray-400 -left-1"
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
          <DropdownMenuItem onClick={handleSignUpClick}>
            Sign Up
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignInClick}>
            Sign In
          </DropdownMenuItem>
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
