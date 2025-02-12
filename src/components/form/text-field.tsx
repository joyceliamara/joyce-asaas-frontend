import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ComponentProps, useEffect, useState } from "react";
import brlFormatter from "@/lib/brl-formatter";
import numberFormatter from "@/lib/number-formatter";
import { cepMask, cnpjMask, cpfMask, phoneMask } from "@/lib/masks";
import { useDebounce } from "@uidotdev/usehooks";

export default function TextField({
  name,
  label,
  description,
  error,
  maxLength,
  maxPercentage,
  ...props
}: Props) {
  const form = useFormContext();
  const rawValue: number | string = form.watch(name);
  const debouncedValue = useDebounce(rawValue, 500);
  const [warmup, setWarmup] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    if (warmup) return;

    form.trigger(name);
  }, [debouncedValue]);

  useEffect(() => {
    setWarmup(false);

    if (error) {
      form.setError(name, { type: "manual", message: error });
    }
  }, [error, form, name]);

  useEffect(() => {
    // Atualiza o valor exibido quando o valor bruto muda
    if (props.type === "money") {
      setInputValue(rawValue ? brlFormatter.format(Number(rawValue)) : "");
    } else if (props.type === "percent") {
      setInputValue(
        rawValue !== undefined && rawValue !== null
          ? `${numberFormatter.format(Number(rawValue))}`
          : ""
      );
    } else if (props.type === "br-phone") {
      setInputValue(phoneMask(String(rawValue ?? "")));
    } else if (props.type === "cpf") {
      setInputValue(cpfMask(String(rawValue ?? "")));
    } else if (props.type === "cnpj") {
      setInputValue(cnpjMask(String(rawValue ?? "")));
    } else if (props.type === "cep") {
      setInputValue(cepMask(String(rawValue ?? "")));
    } else {
      setInputValue(String(rawValue ?? ""));
    }
  }, [rawValue, props.type]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    if (props.type === "money") {
      const numericValue = input.replace(/\D/g, "");
      const newValue = Number(numericValue) / 100 || 0;
      setInputValue(brlFormatter.format(newValue));
      form.setValue(name, newValue);
    } else if (props.type === "percent") {
      const numericValue = input.replace(/\D/g, "");

      if (input.endsWith("%")) {
        setInputValue(input);
      } else {
        let newValue = Number(numericValue) / 100 || 0;

        if (maxPercentage && newValue > maxPercentage) {
          newValue = maxPercentage;
        }

        setInputValue(`${numberFormatter.format(newValue)}`);
        form.setValue(name, newValue);
      }
    } else if (props.type === "br-phone") {
      const maskedValue = phoneMask(input);
      setInputValue(maskedValue);
      form.setValue(name, maskedValue);
    } else if (props.type === "cpf") {
      const maskedValue = cpfMask(input);
      setInputValue(maskedValue);
      form.setValue(name, maskedValue);
    } else if (props.type === "cnpj") {
      const maskedValue = cnpjMask(input);
      setInputValue(maskedValue);
      form.setValue(name, maskedValue);
    } else if (props.type === "cep") {
      const maskedValue = cepMask(input);
      setInputValue(maskedValue);
      form.setValue(name, maskedValue);
    } else if (props.type === "only-number") {
      const numericValue = input.replace(/\D/g, "");
      setInputValue(numericValue);
      form.setValue(name, numericValue);
    } else {
      setInputValue(input);
      form.setValue(name, input);
    }
  };

  const getMaxLength = () => {
    if (props.type === "br-phone") {
      return 15;
    }

    if (props.type === "cnpj") {
      return 18;
    }

    if (props.type === "cpf") {
      return 14;
    }

    if (props.type === "cep") {
      return 9;
    }

    return maxLength;
  };

  let type = props.type;

  if (props.type === "percent" || props.type === "money") {
    type = "text";
  } else if (
    props.type === "br-phone" ||
    props.type === "cnpj" ||
    props.type === "cpf" ||
    props.type === "only-number"
  ) {
    type = "tel";
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel>
              {label}
              {props.required && <span className="text-red-500 ml-0.5">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input
              {...field}
              {...props}
              maxLength={getMaxLength()}
              type={type}
              onChange={handleChange} // Atualiza o valor no input e no formulário
              value={inputValue} // Mostra o valor formatado
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

type Props = ComponentProps<"input"> & {
  name: string;
  label?: string;
  description?: string;
  error?: string;
  type?: Type;
  maxPercentage?: number;
};

type Type =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | "percent"
  | "money"
  | "br-phone"
  | "cnpj"
  | "cpf"
  | "cep"
  | "only-number";

export type TextFieldType = Type;
