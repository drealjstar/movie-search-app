export const getTotal = (items) => {
  let price = 0;
  let tax = 0;
  
// eslint-disable-next-line
  items.map((item) => {
    price = price + item.price * item.quantity;
    tax = tax + item.tax_pct * item.quantity;
  });

  return {
    price,
    tax,
  };
};
