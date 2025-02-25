export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length < 10) return phone;

  const countryCode = cleaned.length > 10 ? `+${cleaned.slice(0, cleaned.length - 10)} ` : '';
  const mainNumber = cleaned.slice(-10);
  const formatted = `(${mainNumber.slice(0, 3)}) ${mainNumber.slice(3, 6)}-${mainNumber.slice(6)}`;

  return `${countryCode}${formatted}`;
};

export const formatCurrency = (amount: number, currency: string): string => {
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);

  return formatted.replace(/\.00$/, '');
};
