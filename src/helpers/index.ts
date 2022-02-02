import { basicSale } from "../interfaces/ISales";

const salesProductsValues = (salesArray: basicSale[], id: number) => {
  let values = '';
  salesArray.forEach(({ product_id: productId, quantity }, index) => {
    if (index) {
      values += `, (${id}, ${productId}, ${quantity})`;
    } else values += `(${id}, ${productId}, ${quantity})`;
  });
  return values;
};

export { salesProductsValues };
