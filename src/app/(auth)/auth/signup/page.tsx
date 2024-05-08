"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ProfileInput, profileInputSchema } from "@/features/auth/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import supabase from "@/core/supabase/supabase-client";
import { toast } from "sonner";
import Toggle from "@/components/ui/toggle";
import { useState } from "react";
import Request from "@/lib/request";
import { redirect } from "next/navigation";

export default function Page() {
  const [isOwner, setIsOwner] = useState(false);

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileInputSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      phone_number: "",
    },
  });

  async function onSignUp(formData: ProfileInput) {
    console.log(formData);
    Request.Post("/api/auth/signup", {
      ...formData,
      role: isOwner ? "owner" : "renter",
    })
      .then((data) => {
        toast.success(data.message);
        redirect("/auth/login");
      })
      .catch((err) => {
        if (err?.response) {
          toast.error(err.response.data.message);
        }
      });
  }

  async function onFormSubmit(values: ProfileInput) {
    await onSignUp(values);
  }

  return (
    <div className="auth-content-wrapper flex h-full flex-col items-center justify-center">
      <div className="mx-auto w-[480px] rounded-md border p-6 shadow-md">
        <h1 className="mb-2 w-full text-center"> Welcome to anywhen! </h1>
        <div className="flex justify-center py-4">
          <Toggle
            checked={isOwner}
            onChange={setIsOwner}
            label="Property Manager"
            leftLabel="Join as a Renter"
          ></Toggle>
        </div>
        {/* <h2 className="mb-6 w-full text-center"> Sign up as renter </h2> */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)}>
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Full Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Email Address"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="mt-8 w-full">
              {isOwner ? "Sign up as Property Manager" : "Sign up as Renter"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
