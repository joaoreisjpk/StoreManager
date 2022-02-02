const sinon = require("sinon");
const { expect } = require("chai");

const salesController = require("../../controllers/salesController");
const salesModel = require("../../models/salesModel");
const salesService = require("../../services/salesService");
const object = require("@hapi/joi/lib/types/object");

const sales = {
  noId: [{ quantity: 2 }],
  noQuantity: [{ product_id: "Algum produto" }],
  invalidQuantity: [{ product_id: "Outro Produto", quantity: 0 }],
  correct: [{ product_id: 1, quantity: 3 }],
  createSale: { code: 201, data: { id: 1, itemSold: [] } },
  createFail: {
    code: 422,
    data: { message: "Such amount is not permitted to sell" },
  },
  returnSaleCreate: { id: 1, product_id: 1, quantity: 4 },
  allSales: [{ saleId: 1, quantity: 3, product_id: 1, date: 20220128 }],
  saleById: [{ quantity: 1, product_id: 1, date: 20220128 }],
};

describe("When calling salesValidation", () => {
  describe("and product_id dont exists", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = { message: '"product_id" is required' };

    before(async () => {
      request.body = sales.noId;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("is called with status code 400", async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(400)).to.be.true;
    });

    it('call json with a message ""product_id" is required"', async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("and the quantity dont exists", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = { message: '"quantity" is required' };

    before(async () => {
      request.body = sales.noQuantity;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("is called with status code 400", async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('call json with a message "quantity" is required"', async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.equal(true);
    });
  });

  describe("and the quantity isnt valid", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = {
      message: '"quantity" must be a number larger than or equal to 1',
    };

    before(async () => {
      request.body = sales.invalidQuantity;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("its called with status code 422", async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('call json with a message ""quantity" must be a number larger than or equal to 1"', async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("and its all validated", () => {
    const next = sinon.stub().returns();

    const response = {};
    const request = {};

    before(async () => {
      request.body = sales.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("next function should be called", async () => {
      await salesController.salesValidation(request, response, next);

      expect(next.calledWith()).to.be.true;
    });
  });
});

describe("When calling createSale", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before(async () => {
      request.body = sales.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "createSale").resolves(sales.createSale);
    });

    after(async () => {
      salesService.createSale.restore();
    });

    it("should return the status code 201", async () => {
      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });
    it("should return the new sale object", async () => {
      const newSale = await salesController.createSale(request, response);
      console.log(newSale);
      expect(response.json.calledWith(sales.createSale.data)).to.be.true;
    });
  });
  describe("and it fails", () => {
    const request = {};
    const response = {};

    before(async () => {
      request.body = sales.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, "createSale").resolves(sales.createFail);
    });

    after(async () => {
      salesService.createSale.restore();
    });

    it("should return the status code 422", async () => {
      await salesController.createSale(request, response);

      expect(response.status.calledWith(422)).to.be.true;
    });
    it("should return the message 'Such amount is not permitted to sell'", async () => {
      const newSale = await salesController.createSale(request, response);
      console.log(newSale);
      expect(response.json.calledWith(sales.createFail.data)).to.be.true;
    });
  });
});

describe("When calling getSaleById", () => {
  describe("and the sale dont exists", () => {
    const message = { message: "Sale not found" };
    const request = {};
    const response = {};

    before(async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesModel, "getById").resolves([]);
    });

    after(async () => {
      salesModel.getById.restore();
    });

    it("should return the status code 404", async () => {
      await salesController.getSaleById(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });
    it('should return the message "Sale not found"', async () => {
      await salesController.getSaleById(request, response);

      expect(response.json.calledWith(message)).to.be.true;
    });
  });
  describe("and the sale exists", () => {
    const request = {};
    const response = {};

    before(async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesModel, "getById").resolves(sales.saleById);
    });

    after(async () => {
      salesModel.getById.restore();
    });
    it('should return the message "Sale already exists"', async () => {
      await salesController.getSaleById(request, response);

      expect(response.json.calledWith(sales.saleById)).to.be.true;
    });
  });
});


describe("When calling getAllSales", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before(async () => {
      response.json = sinon.stub().returns();

      sinon.stub(salesModel, "getProductList").resolves(sales.allSales);
    });

    after(async () => {
      salesModel.getProductList.restore();
    });

    it("should return an array of sales objects", async () => {
      await salesController.getAllSales(request, response);

      expect(response.json.calledWith(sales.allSales)).to.be.true;
    });
  });
});
