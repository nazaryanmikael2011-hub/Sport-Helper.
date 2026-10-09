export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('ru-RU').format(num);
};

export const getRussianDate = (date = new Date()) => {
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }).format(date);
};
