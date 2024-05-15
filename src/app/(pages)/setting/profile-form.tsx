"use client";

import { useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/core/auth/AuthProvider";
import { updateProfileAction } from "@/features/profiles/actions";
import supabase from "@/core/supabase/supabase-client";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { error } from "console";

const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function ProfileForm() {
  const [{ profile }, { setProfile }] = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [isChangePassword, setChangePassword] = useState(false);
  const [isMatch, setMatch] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const defaultValues: Partial<ProfileFormValues> = {
    full_name: profile?.full_name,
    email: profile?.email,
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    setLoading(true);
    await updateProfileAction(data)
      .then((res) => {
        setLoading(false);
        setProfile(data);
        toast.success("Data submitted successfully!");
      })
      .catch((err) => {
        toast.error("Something went wrong!");
        setLoading(false);
      });
  }

  async function onChangePassword() {
    if (newPassword !== confirmPassword) {
      setMatch(true);
    } else {
      setMatch(false);
      setChangePassword(true);
      await supabase.auth
        .updateUser({ password: newPassword })
        .then((res) => {
          toast.success("Password change successfully.");
          setChangePassword(false);
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fullname</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
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
              <Input placeholder="Email" {...field} />
              <FormDescription>
                You can manage verified email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="font-sm font-medium">Password</div>
        <div className="flex justify-between">
          <div className="font-bold">
            &#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;&#x2022;
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Change Password</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[560px]">
              <DialogHeader>
                <DialogTitle>Change Password</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {/* <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="oldPassword">Old&nbsp;Password</Label>
                  <Input
                    id="oldPassword"
                    name="oldPassword"
                    type="password"
                    className="col-span-3"
                  />
                </div> */}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="newPassword">New&nbsp;Password</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    className="col-span-3"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="confirmPassword">Confirm&nbsp;Password</Label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    className="col-span-3"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                {isMatch && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <p className="col-span-1"></p>
                    <p className="col-span-3 text-destructive">
                      Password doesn&apos;t match
                    </p>
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button onClick={onChangePassword} loading={isChangePassword}>
                  Save
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Button
          type="submit"
          loading={isLoading}
          className="w-[130px] p-3 text-center"
        >
          Update profile
        </Button>
      </form>
    </Form>
  );
}
