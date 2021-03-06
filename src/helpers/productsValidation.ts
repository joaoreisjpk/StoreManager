function NameValidation(name: string) {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
    return { code: 422, message: '"name" length must be at least 5 characters long' };
  }
}

function QuantityValidation(quantity: number) {
  if (!quantity && quantity !== 0) return { code: 400, message: '"quantity" is required' };
  if (typeof quantity !== 'number' || quantity < 1) {
    return { code: 422, message: '"quantity" must be a number larger than or equal to 1' };
  }
}

export { NameValidation, QuantityValidation };