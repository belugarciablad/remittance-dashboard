import { writable } from 'svelte/store';
import type { Transaction } from '../types/transaction-model.type';

export const transactions = writable<Transaction[]>();
export const transactionsLoading = writable<boolean>(true);
export const transactionsError = writable<string>();

export const fetchTransactions = async () => {
  try {
    const response = await fetch(
      'https://67b8f03b51192bd378dc42b0.mockapi.io/felix/v1/transactions'
    );
    if (response.ok) {
      const data = await response.json();
      transactions.set(data);
      transactionsLoading.set(false);
    } else {
      console.error('Error fetching data');
      transactionsLoading.set(false);
      transactionsError.set(error);
    }
  } catch (error) {
    console.error('Error:', error);
  }
};
