const sinon = require('sinon');
const { expect } = require('chai');

const productModel = require('../../models/productModel');

// Ajuda do Pr do Mannuel Boo

const product = {
  correct: { name: 'Primeiro Produto', quantity: 4 },
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnGet: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnUptade: {id: 1, name: 'Produto Atualizado', quantity: 400 }
}

describe('Search for a product on DB', async() => {
  before(async () => {
    const execute = [product.returnCreate];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('Search by their name', async () => {
    it('returns an object', () => {
      const { name } = product.correct;
      const GetByName = await productModel.getByName(name);

      expect(GetByName).to.be.equal(product.returnGet)
    });
  });
  describe('Search by their id', async () => {
    it('returns an object', () => {
      const GetById = await productModel.getById(1);

      expect(GetById).to.be.equal(product.returnGet)
    });
  });
  describe('Search all the products', async () => {
    it('returns an object array', () => {
      const GetProductList = await productModel.getProductList();

      expect(GetProductList).to.be.equal([product.returnGet])
    });
  });
});
