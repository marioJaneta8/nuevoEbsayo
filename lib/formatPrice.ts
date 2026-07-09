


export const formatDate = (date: Date | string) => {
  const d = new Date(date);
  // Formato manual sin Intl — 100% consistente en server y client
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
export const formatPrice = (price: number | string | null | undefined) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(price ?? 0));
};

export const formatPriceGratuito = (price: number | string | null | undefined) => {
  return  price === 0  ?"Gratis":formatPrice(price)
};