import { useToast } from "@/hooks/use-toast";
import PaymentService from "@/services/payment-service";
import { useQuery } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function usePayment(paymentId: string) {
  const { toast } = useToast();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["payment", paymentId],
    queryFn: () => PaymentService.getPayment(paymentId),
    refetchInterval: (data) => {
      if (data?.status === "PENDING") {
        return 1500;
      }

      return false;
    },
  });

  useEffect(() => {
    if (!error) return;

    if (!isAxiosError(error)) {
      toast({
        title: "Erro ao buscar pagamento",
        description: "Ocorreu um erro ao buscar o pagamento",
        variant: "destructive",
      });

      router.push("/");
      return;
    }

    if (error.response?.status === 404) {
      toast({
        title: "Pagamento não encontrado",
        description: "O pagamento não foi encontrado",
        variant: "destructive",
      });

      router.push("/");
      return;
    }

    toast({
      title: "Erro ao buscar pagamento",
      description: "Ocorreu um erro ao buscar o pagamento",
      variant: "destructive",
    });

    router.push("/");
  }, [error]);

  return { data, isLoading };
}
