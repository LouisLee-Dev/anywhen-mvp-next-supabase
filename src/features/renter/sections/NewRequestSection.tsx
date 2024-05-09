"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useCurrencies } from "@/features/currency/hooks";
import { useCategories } from "@/features/categories/hooks";
import { RentalRequest, rentalRequestSchema } from "../schema";
import { FormDatePickerAsText } from "@/components/form/FormDatePickerAsText";
import { createRequestAction } from "../actions";
import Toggle from "@/components/ui/toggle";
import { QuillEditor } from "@/components/editor";

export default function NewRequestSection() {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();

  const form = useForm<RentalRequest>({
    resolver: zodResolver(rentalRequestSchema),
    defaultValues: {
      location: "",
      category_id: undefined,
      flexible_by_region: false,
      amenities: {},
      message: "",
    },
  });

  async function onFormSubmit(values: any) {
    setLoading(true);
    createRequestAction(values)
      .then((request) => {
        console.log(request);
        toast.success("You request has been sent successfully!");
        form.reset();
        router.push("/renter/dashboard");
      })
      .catch(() => {
        toast.error("An error occurred while sending your request.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const flexible_by_region = form.watch("flexible_by_region");

  const {
    formState: { errors },
  } = form;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  return (
    <div className="page-content-wrapper">
      <h1 className="w-full text-center">Your New Request</h1>
      <div className="mx-auto w-[640px] p-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name={"category_id"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
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
            <FormField
              control={form.control}
              name="flexible_by_region"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      checked={field.value}
                      onChange={(e) => {
                        if (e) form.setValue("location", "");
                        field.onChange(e);
                      }}
                      label="Any Region"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              disabled={flexible_by_region}
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
            {/* <div className="flex gap-2">
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
            </div> */}
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormDatePickerAsText
                        onSelect={field.onChange}
                        value={field.value}
                      />
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
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormDatePickerAsText
                        onSelect={field.onChange}
                        value={field.value}
                      />
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
                        <Input
                          placeholder=""
                          {...field}
                          type="number"
                          onChange={(v) =>
                            field.onChange(parseFloat(v.target.value))
                          }
                        />
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
                        <Input
                          placeholder=""
                          {...field}
                          type="number"
                          onChange={(v) =>
                            field.onChange(parseFloat(v.target.value))
                          }
                        />
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
            <FormField
              control={form.control}
              name="num_guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      {...field}
                      type="number"
                      onChange={(v) => field.onChange(parseInt(v.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <QuillEditor
                      value={field.value}
                      setValue={field.onChange}
                      id="message"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" loading={isLoading}>
              Send your request
            </Button>
          </form>
        </Form>
        {/* <Separator className="my-4" /> */}
      </div>
    </div>
  );
}
