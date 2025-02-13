import backend from "./backend";
import { CreatePaymentInput } from "./inputs/payment/create-payment-input";
import { CreatePaymentOutput } from "./output/payment/create-payment-output";

export default class PaymentService {
  static async createPixPayment(payment: CreatePaymentInput) {
    const response = await backend.post<CreatePaymentOutput>(
      "/payments/pix",
      payment
    );
    return response.data;
  }

  static async createCreditCardPayment(payment: CreatePaymentInput) {
    const response = await backend.post<CreatePaymentOutput>(
      "/payments/credit-card",
      payment
    );
    return response.data;
  }

  static async createBankSlipPayment(payment: CreatePaymentInput) {
    const response = await backend.post<CreatePaymentOutput>(
      "/payments/bank-slip",
      payment
    );
    return response.data;
  }

  static async getPayment(paymentId: string) {
    const response = await backend.get<CreatePaymentOutput>(
      `/payments/${paymentId}`
    );
    return response.data;
  }
}
