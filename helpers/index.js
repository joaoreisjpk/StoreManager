const salesProductsValues = (salesArray, id) => {
  let values = '';
  salesArray.forEach(({ product_id: productId, quantity }, index) => {
    if (index) {
      values += `, (${id}, ${productId}, ${quantity})`;
    } else values += `(${id}, ${productId}, ${quantity})`;
  });
  return values;
};

module.exports = { salesProductsValues };
