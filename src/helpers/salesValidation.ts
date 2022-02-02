function ProductIdValidation(producIdArray) {
  let response;
  producIdArray.forEach((id) => {
    if (!id) response = { code: 400, message: '"product_id" is required' };
  });
  return response;
}

function otherValidation(quantityArray) {
  let response;
  quantityArray.forEach((quantity) => {
    if (typeof quantity !== 'number' || quantity < 1) {
      response = { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
    }
  });
  return response;
}

function QuantityValidation(quantityArray) {
  let response;
  quantityArray.forEach((quantity) => {
    if (!quantity && quantity !== 0) response = { code: 400, message: '"quantity" is required' };
  });

  return response || otherValidation(quantityArray);
}

export { ProductIdValidation, QuantityValidation };