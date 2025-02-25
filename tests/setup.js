import { vi } from 'vitest';

// Create a mock store function
function createMockStore(value) {
  const subscribers = new Set();
  
  return {
    subscribe(subscriber) {
      subscribers.add(subscriber);
      subscriber(value);
      return () => subscribers.delete(subscriber);
    }
  };
}

// Mock translations
const translations = {
  'transaction.detail.sender': 'Sender:',
  'transaction.detail.receiver': 'Receiver:',
  'transaction.detail.amountSent': 'Amount Sent:',
  'transaction.detail.amountReceived': 'Amount Received:',
  'transaction.detail.status': 'Status:',
  'transactionStatus.Completed': 'Completed',
  'transactionStatus.Pending': 'Pending',
  'transaction.table.sender': 'Sender',
  'transaction.table.receiver': 'Receiver',
  'transaction.amount_sent': 'Amount Sent',
  'transaction.amount_received': 'Amount Received',
  
  // Add format translations
  'transaction.format.phone': (params) => params.value,
  'transaction.format.amount': (params) => params.value,
  'transaction.format.id': (params) => params.value,
};

// Mock format functions globally
vi.mock('../src/util/format.util', () => ({
  formatPhoneNumber: (phone) => phone,
  formatCurrency: (amount) => amount.toString(),
}));

// Mock svelte-i18n globally
vi.mock('svelte-i18n', () => ({
  t: createMockStore((key, params) => {
    const translation = translations[key];
    if (typeof translation === 'function') {
      return translation(params);
    }
    return translation || (params ? params.value : key);
  }),
  locale: createMockStore('en'),
  init: vi.fn(),
  getLocaleFromNavigator: vi.fn(),
}));