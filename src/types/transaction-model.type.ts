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