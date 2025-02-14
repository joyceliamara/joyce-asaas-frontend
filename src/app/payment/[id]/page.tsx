import PaymentStatus from "./components/payment-status";

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;

  return <PaymentStatus paymentId={id} />;
}

type Props = {
  params: Promise<{
    id: string;
  }>;
};
