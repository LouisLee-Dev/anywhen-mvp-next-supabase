"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrencies } from "@/features/currency/hooks";
import { useCategories } from "@/features/categories/hooks";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<any>({
    // resolver: zodResolver(signInSchema),
    defaultValues: {
      location: undefined,
      guest_num: "",
      adult_num: "",
      children_num: "",
      start_date: "",
      end_date: "",
      bedRoom_num: "",
      bed_num: "",
      bath_num: "",
      price_max: "",
      price_min: "",
      currency_id: undefined,
      category_id: undefined,
    },
  });

  // async function onSignIn(formData: SignInInput) {
  //   const {
  //     data: { user },
  //     error,
  //   } = await supabase.auth.signInWithPassword({
  //     email: formData.email,
  //     password: formData.password,
  //   });

  //   if (error) {
  //     toast.error("User Sign in failed");
  //   } else {
  //     toast.success("You have been signed in.");
  //     if (searchParams?.get("redirectTo")) {
  //       router.push(searchParams?.get("redirectTo"));
  //     } else {
  //       router.push("/");
  //     }
  //   }
  // }

  async function onFormSubmit(values: any) {
    console.log(values, "this is your request");
    toast.success("You request has been sent successfully!");
    form.reset();
  }

  return (
    <div className="auth-content-wrapper flex h-full flex-col items-center justify-center">
      <div className="mx-auto w-[540px] p-6">
        <h1 className="mb-6 w-full text-center">
          Choose your favorite location!
        </h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={"category_id"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="guest_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Guests</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="adult_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Adults</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="children_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Children</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="bedRoom_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Bedrooms</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="bed_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Beds</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="bath_num"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Number of Baths</FormLabel>
                      <FormControl>
                        <Input placeholder="" type="input" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Start Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left flex justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a start date</span>
                              )}
                              <CalendarDays />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
              <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>End Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left flex justify-between",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a end date</span>
                              )}
                              <CalendarDays />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-2">
                <FormField
                  control={form.control}
                  name="price_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimun Price</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-2">
                <FormField
                  control={form.control}
                  name="price_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum Price</FormLabel>
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={"currency_id"}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency.id} value={currency.id}>
                              {currency.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Send your request
            </Button>
          </form>
        </Form>
        {/* <Separator className="my-4" /> */}
      </div>
    </div>
  );
}
