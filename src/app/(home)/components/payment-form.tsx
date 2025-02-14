"use client";

import { Form } from "@/components/ui/form";
import useUserPayment from "../hooks/user-payment";
import SelectField from "@/components/form/select-field";
import TextField from "@/components/form/text-field";
import RadioGroupField from "@/components/form/radio-group-field";
import { Button } from "@/components/ui/button";
import { CreatePaymentForm } from "../form/create-payment-form";

export default function PaymentForm() {
  const { form, documentType, onSubmit, isLoading } = useUserPayment();

  return (
    <Form {...form}>
      <form className="space-y-4 max-w-sm w-full" onSubmit={onSubmit}>
        <SelectField
          name={CreatePaymentForm.PaymentMethod}
          label="Método de Pagamento"
          placeholder="Selecione o método de pagamento"
          items={[
            {
              label: "PIX",
              value: "pix",
            },
            {
              label: "Cartão de Crédito",
              value: "credit-card",
            },
            {
              label: "Boleto",
              value: "bank-slip",
            },
          ]}
        />
        <RadioGroupField
          name={CreatePaymentForm.DocumentType}
          label="Tipo de documento"
          options={[
            { label: "CPF", value: "cpf", default: true },
            { label: "CNPJ", value: "cnpj" },
          ]}
        />
        <TextField
          name={CreatePaymentForm.Document}
          label={documentType === "cpf" ? "CPF" : "CNPJ"}
          type={documentType === "cpf" ? "cpf" : "cnpj"}
          placeholder={
            documentType === "cpf" ? "Digite o CPF" : "Digite o CNPJ"
          }
        />
        <TextField
          name={CreatePaymentForm.Name}
          label="Nome Completo"
          placeholder="Digite o nome completo"
        />
        <TextField
          name={CreatePaymentForm.Amount}
          label="Valor"
          type="money"
          placeholder="Digite o valor"
        />
        <Button type="submit" className="w-full" loading={isLoading}>
          Pagar
        </Button>
      </form>
    </Form>
  );
}
