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
import { isEmpty } from "lodash";

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
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState(null);

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
    let isValid = true;

    if (!newPassword) {
      setNewPasswordError("New Password is required");
      isValid = false;
    } else if (newPassword.length < 6) {
      setNewPasswordError("New Password must be at least 6 characters");
      isValid = false;
    } else {
      setNewPasswordError(null);
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required");
      isValid = false;
    } else if (confirmPassword.length < 6) {
      setConfirmPasswordError("Confirm Password must be at least 6 characters");
      isValid = false;
    } else {
      setConfirmPasswordError(null);
    }

    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("New Password and Confirm Password must match");
      isValid = false;
    }
    if (isValid) {
      setChangePassword(true);
      await supabase.auth
        .updateUser({ password: newPassword })
        .then((res) => {
          console.log(res);
          if (res.data?.user) {
            toast.success("Password change successfully.");
            setChangePassword(false);
          } else {
            toast.error(res.error?.message || "Something went wrong!");
          }
        })
        .catch((err) => {
          toast.error("Something went wrong!");
        })
        .finally(() => {
          setChangePassword(false);
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword">New&nbsp;Password</Label>
                <Input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  className="col-span-3"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                {newPasswordError && (
                  <>
                    <div className="col-span-1"></div>
                    <div className="col-span-3 text-red-500">
                      {newPasswordError}
                    </div>
                  </>
                )}
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword">Confirm&nbsp;Password</Label>
                <Input
                  name="confirmPassword"
                  type="password"
                  required
                  id="confirmPassword"
                  className="col-span-3"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {confirmPasswordError && (
                  <>
                    <div className="col-span-1"></div>
                    <div className="col-span-3 text-red-500">
                      {confirmPasswordError}
                    </div>
                  </>
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
