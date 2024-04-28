"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import SignUpForm from "@/features/auth/components/SignUpDialog";
import SignInForm from "@/features/auth/components/SignInDialog";
import { useAuth } from "@/core/auth/AuthProvider";

export default function RenterSignInSection() {
  // const [{ user }] = useAuth();
  // const [, { actionSignOut }] = useAuth();
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

  return (
    <div className="w-full">
      <div className="flex flex-col lg:px-[22rem] py-24 gap-7">
        <span className="flex items-center text-2xl font-bold text-gray-600">
          What Renters win!
        </span>
        <span className="text-xl font-bold text-gray-500">No Fees</span>
        <span className="text-xl font-bold text-gray-500">
          Intuitive Booking Process
        </span>
        <span className="text-xl font-bold text-gray-500">
          User Verified Listing Details
        </span>
        <span className="text-xl font-bold text-gray-500">
          Real Time Pricing
        </span>
        <span className="text-xl font-bold text-gray-500">Useful Reviews</span>
        <span className="text-xl font-bold text-gray-500">No Search</span>
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <Button className="w-[100%] text-xl" onClick={handleSignIn}>
            Sign In As Renter
          </Button>
          <span
            className="text-gray-500 hover:cursor-pointer"
            onClick={handleSignUp}
          >
            If you don't have account, click here to{" "}
            <span className="font-bold text-gray-600">Sign Up.</span>
          </span>
        </div>
      </div>
      <SignUpForm open={openSignUpDialog} onClose={handleCloseSignUpDialog} />
      <SignInForm open={openSignInDialog} onClose={handleCloseSignInDialog} />
    </div>
  );
}
