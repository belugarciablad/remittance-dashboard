import { writable } from "svelte/store";

export interface Transaction {
  transaction_id: string;
  sender_whatsapp: string;
  receiver_whatsapp: string;
  amount_sent: number;
  exchange_rate: number;
  amount_received: number;
  status: TransactionStatus;
  payment_method: PaymentMethod;
  date: string;
}

export enum TransactionStatus {
  Pending = "Pending",
  InProgress = "In Progress",
  Completed = "Completed",
  Failed = "Failed"
}

export enum PaymentMethod {
  BankDeposit = "Bank deposit",
  CashPickup = "Cash pickup",
  MobileWallet = "Mobile wallet"
}

export const transactions = writable<Transaction[]>([
  {
    transaction_id: "FXP123456",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.Completed,
    payment_method: PaymentMethod.CashPickup,
    date: "2024-01-15T14:45:00Z"
  },
  {
    transaction_id: "FXP123457",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.Completed,
    payment_method: PaymentMethod.CashPickup,
    date: "2024-01-15T14:45:00Z"
  }
]);
