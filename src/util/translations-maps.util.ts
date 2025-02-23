import { TransactionStatus, PaymentMethod } from '../types/transaction-model.type';
import { DateRangesEnum } from '../types/date-ranges-type';

// Use these functions with the $t translation function
export const getTranslationKey = {
  dateRange: (range: DateRangesEnum) => `dateRanges.${range}`,
  transactionStatus: (status: TransactionStatus) => `transactionStatus.${status}`,
  paymentMethod: (method: PaymentMethod) => `paymentMethod.${method}`,
};
