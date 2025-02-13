"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
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
import { useRouter } from "next/navigation";

export default function Page() {
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();

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
    Request.Post("/api/auth/signup", {
      ...formData,
      role: isOwner ? "owner" : "renter",
    })
      .then((data) => {
        toast.success(data.message);
        router.push("/auth/signin");
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
      <div className="mx-auto w-full rounded-md border p-6 shadow-md lg:w-[480px]">
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
        <Separator className="my-4" />
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:space-x-4">
          <Button type="submit" variant="outline" className="w-full flex-1">
            Continue with{" "}
            <svg
              className="block h-5 w-5"
              viewBox="0 0 32 32"
              aria-hidden="true"
              role="presentation"
              focusable="false"
            >
              <path
                className="fill-current text-blue-500"
                d="M24.12 25c2.82-2.63 4.07-7 3.32-11.19H16.25v4.63h6.37A5.26 5.26 0 0 1 20.25 22z"
              ></path>
              <path
                className="fill-current text-green-500"
                d="M5.62 21.31A12 12 0 0 0 24.12 25l-3.87-3a7.16 7.16 0 0 1-10.69-3.75z"
              ></path>
              <path
                className="fill-current text-yellow-500"
                d="M9.56 18.25c-.5-1.56-.5-3 0-4.56l-3.94-3.07a12.08 12.08 0 0 0 0 10.7z"
              ></path>
              <path
                className="fill-current text-red-500"
                d="M9.56 13.69c1.38-4.32 7.25-6.82 11.19-3.13l3.44-3.37a11.8 11.8 0 0 0-18.57 3.43l3.94 3.07z"
              ></path>
            </svg>{" "}
            oogle
          </Button>
          <Button type="submit" variant="outline" className="w-full flex-1">
            Continue with
            <svg
              className="block h-5 w-5 text-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              role="presentation"
              aria-hidden="true"
              focusable="false"
            >
              <path d="m13.3 2.1a5.1 5.1 0 0 1 3.8-2.1 5.1 5.1 0 0 1 -1.2 3.8 4.1 4.1 0 0 1 -3.6 1.7 4.5 4.5 0 0 1 1-3.4zm-5 3.7c-2.8 0-5.8 2.5-5.8 7.3 0 4.9 3.5 10.9 6.3 10.9 1 0 2.5-1 4-1s2.6.9 4 .9c3.1 0 5.3-6.4 5.3-6.4a5.3 5.3 0 0 1 -3.2-4.9 5.2 5.2 0 0 1 2.6-4.5 5.4 5.4 0 0 0 -4.7-2.4c-2 0-3.5 1.1-4.3 1.1-.9 0-2.4-1-4.2-1z"></path>
            </svg>{" "}
            pple
          </Button>
        </div>
      </div>
    </div>
  );
}
