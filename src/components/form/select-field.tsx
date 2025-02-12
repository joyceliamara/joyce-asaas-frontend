import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useMemo } from "react";

export default function SelectField({
  name,
  label,
  description,
  placeholder,
  items,
  required,
  className,
}: Props) {
  const form = useFormContext();

  const defaultItem = useMemo(
    () => items.find((item) => item.default),
    [items]
  );

  return (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultItem?.value}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </FormLabel>
          )}
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item, key) => (
                <SelectItem key={key} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type Props = {
  name: string;
  items: SelectItems;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
};

export type SelectItems = Array<{
  value: string;
  label: string;
  default?: boolean;
}>;
