import { cn } from "@/lib/utils";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format, parse } from "date-fns";
import { Calendar } from "../ui/calendar";
import { FormControl } from "../ui/form";
import { CalendarDaysIcon } from "lucide-react";

interface FormDatePickerAsTextProps {
  onSelect: (date: string) => void;
  value: string;
  disabled?: boolean;
}

export function FormDatePickerAsText({
  onSelect,
  value = "",
  disabled = false,
}: FormDatePickerAsTextProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleOnSelect: SelectSingleEventHandler = (date) => {
    onSelect?.(format(date, "yyyy-MM-dd"));
    setIsPopoverOpen(false);
  };

  const date = parse(value, "yyyy-MM-dd", new Date());

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            className={cn(
              "flex w-full min-w-[160px] items-center justify-between px-2",
              !value && "text-muted-foreground",
            )}
            disabled={disabled}
          >
            {value ? value : <span>Pick a date</span>}
            <CalendarDaysIcon className="ml-2 h-4 w-4" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleOnSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
