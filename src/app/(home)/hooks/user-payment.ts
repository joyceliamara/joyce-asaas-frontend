import { CreatePaymentInput } from "@/services/inputs/payment/create-payment-input";
import PaymentService from "@/services/payment-service";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createPaymentDefaultValues,
  CreatePaymentFormSchema,
  CreatePaymentFormSchemaType,
} from "../form/create-payment-form";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function useUserPayment() {
  const router = useRouter();
  const { toast } = useToast();
  const form = useForm({
    defaultValues: createPaymentDefaultValues,
    resolver: zodResolver(CreatePaymentFormSchema),
  });
  const documentType: "cpf" | "cnpj" = form.watch("documentType");

  const { mutate: createPayment, isLoading } = useMutation({
    mutationFn: async (data: CreatePaymentFormSchemaType) => {
      if (data.paymentMethod === "pix") {
        return PaymentService.createPixPayment(data as CreatePaymentInput);
      } else if (data.paymentMethod === "credit-card") {
        return PaymentService.createCreditCardPayment(
          data as CreatePaymentInput
        );
      }

      return PaymentService.createBankSlipPayment(data as CreatePaymentInput);
    },
    onSuccess: (data) => {
      toast({
        title: "Pagamento criado com sucesso",
        description: "Você tem até 1 hora para pagar antes do vencimento",
        variant: "success",
      });
      router.push(`/payment/${data.id}`);
    },
  });

  const onSubmit = form.handleSubmit(
    (data) => {
      createPayment(data);
    },
    (error) => {
      console.log(error);
    }
  );

  return { form, documentType, onSubmit, isLoading };
}
