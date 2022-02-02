const sinon = require("sinon");
const { expect } = require("chai");

const productModel = require('../../models/productModel');
const productService = require('../../services/productsService');

const product = {
  correct: { name: "Primeiro Produto", quantity: 4 },
}

describe('when calling getByName', () => {
  describe('and succeed', () => {
    before(() => {
      sinon.stub(productModel, 'getByName').resolves(product.correct)
    })

    after(() => {
      productModel.getByName.restore()
    })
    it('should return an product object', async () => {
      const response = await productService.getByName('banana');
      expect(response).to.be.equal(product.correct);
    })
  })
})