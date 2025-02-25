import { render, fireEvent, screen } from '@testing-library/svelte';
import TransactionList from '../src/components/TransactionList.svelte';
import { transactions } from '../src/store/transactions.store';
import { beforeEach, describe, it, expect } from 'vitest';

// Mock de datos
const mockTransactions = [
  {
    transaction_id: 12345678,
    sender_whatsapp: '+123456789',
    receiver_whatsapp: '+987654321',
    amount_sent: 100,
    amount_received: 95,
    exchange_rate: 0.95,
    status: 'Completed',
    payment_method: 'Bank Transfer',
    date: new Date().toISOString(),
  },
  {
    transaction_id: 999999,
    sender_whatsapp: '+111111111',
    receiver_whatsapp: '+222222222',
    amount_sent: 50,
    amount_received: 47,
    exchange_rate: 0.94,
    status: 'Pending',
    payment_method: 'Credit Card',
    date: new Date().toISOString(),
  },
];

describe('TransactionList Component', () => {
  beforeEach(() => {
    transactions.set(mockTransactions);
  });

  it('Renderiza la lista con transacciones', async () => {
    render(TransactionList);
    expect(screen.getAllByText('Sender:')).toBeTruthy();
    expect(screen.getAllByText('Receiver:')).toBeTruthy();
    expect(screen.getAllByText('Amount Sent:')).toBeTruthy();
    expect(screen.getAllByText('Amount Received:')).toBeTruthy();

    // Verifica si las transacciones aparecen en la tabla
    expect(screen.getByText('12345678')).toBeTruthy();
    expect(screen.getByText('100')).toBeTruthy();
    expect(screen.getByText('95')).toBeTruthy();
    expect(screen.getAllByText('Completed')).toBeTruthy();

    expect(screen.getByText('999999')).toBeTruthy();
    expect(screen.getByText('50')).toBeTruthy();
    expect(screen.getByText('47')).toBeTruthy();
    expect(screen.getAllByText('Pending')).toBeTruthy();
  });

  it('Filtra transacciones por búsqueda', async () => {
    render(TransactionList);

    const searchInput = screen.getByRole('textbox'); // Usa getByRole para mayor accesibilidad
    await fireEvent.input(searchInput, { target: { value: '12345678' } });

    expect(screen.getByText('12345678')).toBeTruthy();
    expect(screen.queryByText('999999')).toBeFalsy(); // queryByText para verificar que NO existe
  });

  it('Abre y cierra el modal de detalle', async () => {
    render(TransactionList);

    const firstTransaction = screen.getByText('12345678');
    await fireEvent.click(firstTransaction);

    expect(screen.getByRole('dialog')).toBeTruthy(); // Usa getByRole

    const closeButton = screen.getByRole('button', { name: 'Close modal' }); // Usa getByRole y name
    await fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog')).toBeFalsy(); // Usa queryByRole
  });
});
