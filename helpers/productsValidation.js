function NameValidation(name) {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
}

function QuantityValidation(quantity) {
  if (!quantity) return { code: 400, message: 'quantity is required' };
  if (typeof quantity !== 'number' || quantity < 1) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
}

module.exports = { NameValidation, QuantityValidation };