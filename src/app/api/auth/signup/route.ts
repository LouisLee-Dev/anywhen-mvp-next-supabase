"use server";

import createServerSupabaseInstance from "@/core/supabase/supabase-server";
import { prisma } from "@/db";
import { NextResponse } from "next/server";
import { HTTP } from "@/core/http";

export const POST = async (request: Request) => {
  const supabase = createServerSupabaseInstance();
  const formData = await request.json();

  console.log(formData);

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    console.log(error.message);

    switch (error.message) {
      case "Email rate limit exceeded":
        return HTTP.BAD_REQUEST({
          message: "Please try again after some time",
        });
    }

    return HTTP.BAD_REQUEST({ message: "User registration failed" });
  }

  const profile = await prisma.profiles.findFirst({ where: { id: user.id } });
  if (!profile) {
    await prisma.profiles.create({
      data: {
        id: user.id,
        full_name: formData.full_name,
        email: formData.email,
        role: formData.role,
      },
    });
  }

  return HTTP.SUCCESS({ message: "User registered successfully" });
};
