import { cpf, cnpj } from "cpf-cnpj-validator";
import { z } from "zod";

export enum CreatePaymentForm {
  PaymentMethod = "paymentMethod",
  DocumentType = "documentType",
  Document = "document",
  Name = "name",
  Amount = "amount",
}

export enum PaymentMethod {
  PIX = "pix",
  CreditCard = "credit-card",
  BankSlip = "bank-slip",
}

export enum DocumentType {
  CPF = "cpf",
  CNPJ = "cnpj",
}

export const CreatePaymentFormSchema = z
  .object({
    paymentMethod: z.nativeEnum(PaymentMethod),
    documentType: z.nativeEnum(DocumentType),
    document: z.string(),
    name: z
      .string({
        required_error: "Nome é obrigatório",
      })
      .trim()
      .min(7, "Nome deve conter pelo menos 7 caracteres")
      .max(100, "Nome deve conter no máximo 100 caracteres"),
    amount: z.number({
      required_error: "Valor é obrigatório",
    }),
  })
  .refine(
    (value) => {
      if (value.documentType === DocumentType.CPF) {
        return cpf.isValid(value.document);
      }
      return cnpj.isValid(value.document);
    },
    {
      message: "Documento inválido",
      path: ["document"],
    }
  )
  .refine(
    (value) => {
      if (value.paymentMethod === PaymentMethod.PIX) {
        return value.amount >= 5;
      }

      return true;
    },
    {
      message: "Valor mínimo de pagamento é de R$5,00",
      path: ["amount"],
    }
  )
  .refine(
    (value) => {
      if (value.paymentMethod === PaymentMethod.BankSlip) {
        return value.amount >= 5;
      }
      return true;
    },
    {
      message: "Valor mínimo de pagamento é de R$5,00",
      path: ["amount"],
    }
  );

export type CreatePaymentFormSchemaType = z.infer<
  typeof CreatePaymentFormSchema
>;

export const createPaymentDefaultValues: CreatePaymentFormSchemaType = {
  paymentMethod: PaymentMethod.PIX,
  documentType: DocumentType.CPF,
  document: "",
  name: "",
  amount: 0,
};
