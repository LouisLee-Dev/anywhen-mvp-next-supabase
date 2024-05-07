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

export default function Page() {
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
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (!error) {
      toast.success("User registered successfully");
    } else {
      toast.error("User registration failed");
    }
  }

  async function onFormSubmit(values: ProfileInput) {
    await onSignUp(values);
  }

  return (
    <div className="auth-content-wrapper flex h-full flex-col items-center justify-center">
      <div className="mx-auto w-[480px] rounded-md border p-6 shadow-md">
        <h1 className="mb-6 w-full text-center"> Welcome to anywhen! </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-3"
          >
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
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
