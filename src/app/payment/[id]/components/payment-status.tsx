"use client";

import { Button } from "@/components/ui/button";
import { Clock, Check, X, Trash, Wallet } from "lucide-react";
import usePayment from "../hooks/use-payment";
import PaymentStatusSkeleton from "./payment-status-skeleton";
import { useRouter } from "next/navigation";

export default function PaymentStatus({ paymentId }: Props) {
  const { data, isLoading } = usePayment(paymentId);

  if (isLoading) {
    return <PaymentStatusSkeleton />;
  }

  if (data?.status === "PENDING") {
    return <PendingPayment paymentUrl={data.paymentUrl} />;
  }

  if (data?.status === "PAID") {
    return <PaidPayment />;
  }

  if (data?.status === "DELETED") {
    return <DeletedPayment />;
  }

  if (data?.status === "OVERDUE") {
    return <OverduePayment />;
  }

  if (data?.status === "REFUNDED") {
    return <RefundedPayment />;
  }

  return <div>Status não encontrado</div>;
}

type Props = {
  paymentId: string;
};

function PendingPayment({ paymentUrl }: { paymentUrl: string }) {
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="flex items-center justify-center w-20 h-20 bg-orange-200 rounded-full">
        <Clock className="w-10 h-10 text-orange-600" />
      </div>
      <div className="max-w-sm text-center">
        <span>
          O seu pagamento ainda está pendente. Clique no botão abaixo para pagar
        </span>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          onClick={() => window.open(paymentUrl, "_blank")}
        >
          Pagar
        </Button>
      </div>
    </div>
  );
}

function PaidPayment() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="flex items-center justify-center w-20 h-20 bg-green-200 rounded-full">
        <Check className="w-10 h-10 text-green-600" />
      </div>
      <div className="max-w-sm text-center">
        <span>O seu pagamento foi realizado com sucesso.</span>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}

function DeletedPayment() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="flex items-center justify-center w-20 h-20 bg-red-200 rounded-full">
        <Trash className="w-10 h-10 text-red-600" />
      </div>
      <div className="max-w-sm text-center">
        <span>O seu pagamento foi deletado.</span>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}

function OverduePayment() {
  const router = useRouter();
  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="flex items-center justify-center w-20 h-20 bg-red-200 rounded-full">
        <X className="w-10 h-10 text-red-600" />
      </div>
      <div className="max-w-sm text-center">
        <span>O seu pagamento está vencido.</span>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}

function RefundedPayment() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full">
      <div className="flex items-center justify-center w-20 h-20 bg-blue-200 rounded-full">
        <Wallet className="w-10 h-10 text-blue-600" />
      </div>
      <div className="max-w-sm text-center">
        <span>O seu pagamento foi estornado.</span>
        <Button
          className="w-full mt-4 bg-green-500 hover:bg-green-600"
          onClick={() => router.push("/")}
        >
          Voltar para a home
        </Button>
      </div>
    </div>
  );
}
