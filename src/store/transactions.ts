import { writable } from "svelte/store";
import type {Transaction} from '../types/transaction-model'
import { TransactionStatus, PaymentMethod } from '../types/transaction-model'

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
  },
  {
    transaction_id: "FXP123461",
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
    transaction_id: "FXP123462",
    sender_whatsapp: "+12025550123",
    receiver_whatsapp: "+50255512345",
    amount_sent: 300,
    exchange_rate: 19.5,
    amount_received: 5850,
    status: TransactionStatus.Completed,
    payment_method: PaymentMethod.CashPickup,
    date: "2025-01-11T14:45:00Z"
  },
  {
    transaction_id: "FXP123463",
    sender_whatsapp: "+22",
    receiver_whatsapp: "+3333436",
    amount_sent: 304,
    exchange_rate: 9.5,
    amount_received: 58350,
    status: TransactionStatus.Completed,
    payment_method: PaymentMethod.CashPickup,
    date: "2024-09-30T14:45:00Z"
  },
  {
    transaction_id: "FXP123464",
    sender_whatsapp: "+12025550434123",
    receiver_whatsapp: "+50255343512345",
    amount_sent: 33300,
    exchange_rate: 15,
    amount_received: 1250,
    status: TransactionStatus.Completed,
    payment_method: PaymentMethod.CashPickup,
    date: "2025-02-15T14:45:00Z"
  },
]);
