import { DateRangesEnum } from '../types/date-ranges-type';

export const getStartOfWeek = (date: Date): Date => {
    const startOfWeek = new Date(date);
    const dayOfWeek = startOfWeek.getDay();
    const difference = (dayOfWeek === 0 ? 6 : dayOfWeek - 1); 
    startOfWeek.setDate(startOfWeek.getDate() - difference);
    startOfWeek.setHours(0, 0, 0, 0); 
    return startOfWeek;
};

export const filterDate = (transactionDate: Date, dateRange: DateRangesEnum): boolean => {
    const today = new Date();
    let startDate = new Date(today.setHours(0, 0, 0, 0));

    switch (dateRange) {
        case DateRangesEnum.Today:
            return transactionDate.toDateString() === startDate.toDateString();

        case DateRangesEnum.Yesterday:
            const yesterday = new Date(startDate);
            yesterday.setDate(yesterday.getDate() - 1);
            return transactionDate.toDateString() === yesterday.toDateString();

        case DateRangesEnum.ThisWeek:
            const startOfWeek = getStartOfWeek(today);
            const tomorrow = new Date(startDate);
            tomorrow.setDate(tomorrow.getDate() + 1);
            return transactionDate >= startOfWeek && transactionDate < tomorrow;

        case DateRangesEnum.ThisMonth:
            return transactionDate.getMonth() === today.getMonth() && transactionDate.getFullYear() === today.getFullYear();

        case DateRangesEnum.ThisYear:
            return transactionDate.getFullYear() === today.getFullYear();
        case DateRangesEnum.All:
        default:
            return true;
    }
}  