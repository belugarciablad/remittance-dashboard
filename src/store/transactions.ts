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
  },
  {
    transaction_id: "FXP123458",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.Pending,
    payment_method: PaymentMethod.BankDeposit,
    date: "2025-01-15T14:45:00Z"
  },
  {
    transaction_id: "FXP123459",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.Failed,
    payment_method: PaymentMethod.CashPickup,
    date: "2025-02-18T14:45:00Z"
  },
  {
    transaction_id: "FXP1234560",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.InProgress,
    payment_method: PaymentMethod.MobileWallet,
    date: "2025-02-20T14:45:00Z"
  }
]);
