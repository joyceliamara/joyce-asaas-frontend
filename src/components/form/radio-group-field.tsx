import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useMemo } from "react";

export default function RadioGroupField({
  label,
  name,
  required,
  options,
  parser,
}: Props) {
  const form = useFormContext();

  const defaultValue = useMemo(() => {
    const defaultOption = options.find((option) => option.default);

    return defaultOption?.value ?? "";
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="space-y-3">
          {label && (
            <FormLabel>
              {label}
              {required && <span className="text-red-500 ml-0.5">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                form.setValue(name, parser ? parser(value) : value);
              }}
              defaultValue={defaultValue}
              className="flex flex-col space-y-1"
            >
              {options.map((option) => (
                <FormItem
                  key={option.value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={option.value} />
                  </FormControl>
                  <FormLabel className="font-normal">{option.label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type Props = {
  name: string;
  label?: string;
  options: Option[];
  required?: boolean;
  parser?: (value: string) => unknown;
};

type Option = {
  label: string;
  value: string;
  default?: boolean;
};
