"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type Property, propertyInputSchema } from "../schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCategories } from "@/features/categories/hooks";
import { useCurrencies } from "@/features/currency/hooks";
import {
  useCreateProperty,
  useUpdateProperty,
} from "@/features/properties/hooks";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface IPropertyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  property: Property;
  propertyId: string;
}

export function PropertyFormDialog({
  open,
  onOpenChange,
  property,
  propertyId,
}: IPropertyFormDialogProps) {
  const router = useRouter();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: currencies, isLoading: isCurrenciesLoading } = useCurrencies();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createProperty = useCreateProperty();
  const updateProperty = useUpdateProperty();

  const form = useForm<Property>({
    resolver: zodResolver(propertyInputSchema),
    defaultValues: {
      title: property.title || "",
      description: property.description || "",
      currency_id: property.currency_id || "",
      location: property.location || "",
      price_min: property.price_min || 0,
      price_max: property.price_max || 0,
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    if (property) {
      form.reset(property);
    }
  }, [property]);

  async function onSubmit(values: Property) {
    try {
      setIsSubmitting(true);
      if (propertyId) {
        await updateProperty
          .mutateAsync({ ...values, id: propertyId })
          .then(({ data: { success, property } }) => {
            if (success) {
              onOpenChange(false);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsSubmitting(false);
          });
      } else {
        await createProperty
          .mutateAsync(values)
          .then(({ data: { success, property } }) => {
            if (success) {
              router.push(`/pm/properties/${property.id}`);
            }
          })
          .catch((err) => console.log(err))
          .finally(() => {
            setIsSubmitting(false);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {propertyId ? "Edit Property" : "Add New Property"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="category_id"
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription></FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription></FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea rows={10} placeholder="" {...field} />
                  </FormControl>
                  {/* <FormDescription></FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="price_min"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimun&nbsp;Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          {...field}
                          onChange={(v) =>
                            field.onChange(parseFloat(v.target.value))
                          }
                        />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name="price_max"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Maximum&nbsp;Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          {...field}
                          onChange={(v) =>
                            field.onChange(parseFloat(v.target.value))
                          }
                        />
                      </FormControl>
                      {/* <FormDescription></FormDescription> */}
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
                            <SelectValue placeholder="Select Currency" />
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
            <div className="flex items-center justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {propertyId ? "Edit Property" : "Add Property"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
