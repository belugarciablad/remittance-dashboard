import {TransactionStatus} from '../store/transactions'

const statusColors: Record<TransactionStatus, string> = {
    [TransactionStatus.Completed]: 'bg-green-100',
    [TransactionStatus.Pending]: 'bg-orange-100',
    [TransactionStatus.Failed]: 'bg-red-100',
    [TransactionStatus.InProgress]: 'bg-gray-200'
};

export const getColorByStatus = (status: string): string => {
    return statusColors[status] || 'bg-gray-300'; 
};