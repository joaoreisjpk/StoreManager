const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection')
const productModel = require('../../models/productModel');

// Ajuda do Pr do Mannuel Boo
const product = {
  correct: { name: 'Primeiro Produto', quantity: 4 },
  returnCreate: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnGet: {id: 1, name: 'Primeiro Produto', quantity: 4 },
  returnUptade: {id: 1, name: 'Produto Atualizado', quantity: 400 }
}

describe('Search for a product by their name', () => {
  before(async () => {
    const execute = [[product.returnCreate]];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', async () => {
    it('returns an object', async () => {
      const { name } = product.correct;
      const GetByName = await productModel.getByName(name);

      expect(GetByName).to.have.keys('id', 'name', 'quantity')
    });
  });
});

describe('Search for a product by their id', () => {
  before(async () => {
    const execute = [[product.returnCreate]];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', async () => {
    it('returns an object', async () => {
      const GetById = await productModel.getById(1);

      expect(GetById).to.have.keys('id', 'name', 'quantity')
    });
  });
});

describe('Search for a product list', () => {
  before(async () => {
    const execute = [product.returnCreate];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', async () => {
    it('returns an object array', async () => {
      const GetProductList = await productModel.getProductList();

      expect(GetProductList).to.have.keys('id', 'name', 'quantity')
    });
  });
});

describe('Create a new product', () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', () => { 
    it('returns the new product object', async () => {
      const { name, quantity } = product.correct;
      const response = await productModel.create({name, quantity});

      expect(response).to.have.keys('id', 'name', 'quantity')
    });
  });
});

describe('Update a product', () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', () => { 
    it('return the updated product', async () => {
      const response = await productModel.update(product.returnUptade);

      expect(response).to.have.keys('id', 'name', 'quantity')
    });
  });
});

describe('Remove a product', () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, 'execute').resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe('when succeed', () => { 
    it('returns void', async () => {
      const response = await productModel.remove(product.returnUptade);

      expect(response).to.be.equal();
    });
  });
});