export type CreatePaymentOutput = {
  id: string;
  createdAt: string;
  updatedAt: string;
  amount: number;
  status: "PENDING" | "PAID" | "DELETED" | "OVERDUE" | "REFUNDED";
  dueDate: string;
  paymentUrl: string;
};
