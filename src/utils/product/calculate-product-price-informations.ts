export const calculateProductPriceInformations = (
  price: number,
  salePrice: number,
  quantity = 0
) => {
  const originalPriceInReais = price / 100;
  const formattedOriginalPriceInBrl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  }).format(originalPriceInReais);

  const salePriceInReais = salePrice / 100;
  const formattedSalePriceInBrl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  }).format(salePriceInReais);

  const discountPriceInReais = (salePrice - price) / 100;
  const dicountInPercentage = Math.round((1 - salePrice / price) * 100);
  const formattedDiscountPriceInBrl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  }).format(discountPriceInReais);

  const subtotalPriceInReais = (salePrice * quantity) / 100;
  const subtotalPriceWithoutDiscountInReais = (price * quantity) / 100;
  const formattedSubtotalSalePriceInBrl = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "BRL",
  }).format(subtotalPriceInReais);
  const formattedSubtotalPriceWhithoutDiscountInBrl = new Intl.NumberFormat(
    "en-US",
    {
      style: "currency",
      currency: "BRL",
    }
  ).format(subtotalPriceWithoutDiscountInReais);

  return {
    formattedOriginalPriceInBrl,
    formattedSalePriceInBrl,
    formattedDiscountPriceInBrl,
    dicountInPercentage,
    formattedSubtotalSalePriceInBrl,
    formattedSubtotalPriceWhithoutDiscountInBrl,
  };
};
