const sinon = require("sinon");
const { expect } = require("chai");

const salesModel = require("../../models/salesModel");
const productModel = require("../../models/productModel");
const salesService = require("../../services/salesService");

const sales = {
  smallSale: [{ product_id: 1, quantity: 1 }],
  bigSale: [{ product_id: 1, quantity: 100 }],
  onFail: {
    code: 422,
    data: { message: "Such amount is not permitted to sell" },
  },
  newSale: { id: 1, itemsSold: [{ product_id: 1, quantity: 1 }] },
  newSaleSucess: {
    code: 201,
    data: { id: 1, itemsSold: [{ product_id: 1, quantity: 1 }] },
  },
  updateSale: { saleId: 1, itemUpdated: [{ product_id: 1, quantity: 1 }] },
  updateSaleSucess: {
    code: 200,
    data: { saleId: 1, itemUpdated: [{ product_id: 1, quantity: 1 }] },
  },
};

const product = {
  smallProduct: { quantity: 10, name: "banana" },
  smallProductArray: [{ quantity: 10, product_id: 1 }],
};

describe("when calling the createSale", () => {
  describe("and everything succeeds", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves(product.smallProduct);

      sinon.stub(productModel, "update").resolves();

      sinon.stub(salesModel, "create").resolves(sales.newSale);
    });
    after(() => {
      productModel.getById.restore();
      productModel.update.restore();
      salesModel.create.restore();
    });

    it("should return an object with code 201 and a new saleObject", async () => {
      const response = await salesService.createSale(sales.smallSale);
      expect(response).to.be.deep.equal(sales.newSaleSucess);
    });
  });
  describe("and the stock quantity is unsuficient", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves(product.smallProduct);

      sinon.stub(productModel, "update").resolves();

      sinon.stub(salesModel, "create").resolves(sales.newSale);
    });
    after(() => {
      productModel.getById.restore();
      productModel.update.restore();
      salesModel.create.restore();
    });

    it("should return an object with code 422 and the message: ''Such amount is not permitted to sell''", async () => {
      const response = await salesService.createSale(sales.bigSale);
      expect(response).to.be.deep.equal(sales.onFail);
    });
  });
});

describe("When calling the updateSale", () => {
  describe("and everything succeed", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves(product.smallProduct);
      sinon.stub(productModel, "update").resolves();
      sinon.stub(salesModel, "update").resolves(sales.updateSale);
    });
    after(() => {
      productModel.getById.restore();
      productModel.update.restore();
      salesModel.update.restore();
    });
    it("should return the code 200, and the updatedSale", async () => {
      const response = await salesService.updateSale(
        1,
        sales.smallSale,
        product.smallProductArray
      );

      expect(response).to.be.deep.equal(sales.updateSaleSucess);
    });
  });
  describe("and the stock quantity isn't enought", () => {
    before(() => {
      sinon.stub(productModel, "getById").resolves(product.smallProduct);
      sinon.stub(productModel, "update").resolves();
      sinon.stub(salesModel, "update").resolves(sales.updateSale);
    });
    after(() => {
      productModel.getById.restore();
      productModel.update.restore();
      salesModel.update.restore();
    });
    it("should return the code 422, and the message: 'Such amount is not permitted to sell'", async () => {
      const response = await salesService.updateSale(
        1,
        sales.bigSale,
        product.smallProductArray
      );

      expect(response).to.be.deep.equal(sales.onFail);
    });
  });
});

