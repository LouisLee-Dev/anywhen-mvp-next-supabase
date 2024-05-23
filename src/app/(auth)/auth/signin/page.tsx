"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { type SignInInput, signInSchema } from "@/features/auth/schema";
import { z } from "zod";
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
import { useRouter, useSearchParams } from "next/navigation";
import { getCurrentProfile } from "@/core/auth/server";

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSignIn(formData: SignInInput) {
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      toast.error("User Sign in failed");
    } else {
      toast.success("You have been signed in.");
      const profile = await getCurrentProfile();
      if (searchParams?.get("redirectTo")) {
        router.push(searchParams?.get("redirectTo"));
      } else {
        if (profile?.role === "renter") {
          router.push("/renter/dashboard");
          return;
        } else if (profile?.role === "owner") {
          router.push("/pm/properties");
        } else router.push("/");
      }
    }
  }

  async function onFormSubmit(values: SignInInput) {
    await onSignIn(values);
  }

  return (
    <div className="auth-content-wrapper flex h-full flex-col items-center justify-center">
      <div className="mx-auto lg:w-[480px] w-full rounded-md border p-6 shadow-md">
        <h1 className="mb-6 w-full text-center"> Welcome back! </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-3"
          >
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </Form>
        <Separator className="my-4" />
        <div className="flex items-center lg:space-x-4 flex-col lg:flex-row gap-2">
          <Button type="submit" variant="outline" className="flex-1 w-full">
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
          <Button type="submit" variant="outline" className="flex-1 w-full">
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
