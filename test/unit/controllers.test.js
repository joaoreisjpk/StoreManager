const sinon = require("sinon");
const { expect } = require("chai");

const productsController = require("../../controllers/productsController");
const salesController = require("../../controllers/salesController");
const productModel = require("../../models/productModel");

const product = {
  noName: { quantity: 2 },
  invalidName: { name: "abc", quantity: 2 },
  noQuantity: { name: "Algum produto" },
  invalidQuantity: { name: "Outro Produto", quantity: "letra" },
  correct: { name: "Primeiro Produto", quantity: 4 },
  returnCreate: { id: 1, name: "Primeiro Produto", quantity: 4 },
  returnUptade: { id: 1, name: "Produto Atualizado", quantity: 400 },
};

describe("When calling productsValidation", () => {
  describe("and the name dont exists", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = { message: '"name" is required' };

    before(() => {
      request.body = product.noName;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("its called with status code ", async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(400)).to.be.true;
    });

    it('call json with a message ""name" is required"', async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("and the name is invalid", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = {
      message: '"name" length must be at least 5 characters long',
    };

    before(() => {
      request.body = product.invalidName;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("its called with status code ", async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(422)).to.be.true;
    });

    it('call json with a message ""name" length must be at least 5 characters long"', async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("and the quantity dont exists", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();

    const message = { message: '"quantity" is required' };

    before(() => {
      request.body = product.noQuantity;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("its called with status code ", async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('call json with a message ""quantity" is required"', async () => {
      await productsController.productsValidation(request, response, next);

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

    before(() => {
      request.body = product.invalidQuantity;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("its called with status code ", async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.status.calledWith(422)).to.be.equal(true);
    });

    it('call json with a message ""quantity" must be a number larger than or equal to 1"', async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.false;
      expect(response.json.calledWith(message)).to.be.true;
    });
  });

  describe("and its all validated", () => {
    const next = sinon.stub().returns();

    const response = {};
    const request = {};

    before(() => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });

    it("next function should be called", async () => {
      await productsController.productsValidation(request, response, next);

      expect(next.calledWith()).to.be.true;
    });
  });
});

describe("When calling productAlreadyExists", () => {
  describe("and it exists", () => {
    const next = sinon.stub().returns();

    const message = { message: "Product already exists" };
    const request = {};
    const response = {};

    before(() => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getByName").resolves(true);
    });

    after(() => {
      productModel.getByName.restore();
    });

    it("should return the status code 409", async () => {
      await productsController.productAlreadyExists(request, response, next);

      expect(response.status.calledWith(409)).to.be.true;
      expect(next.calledWith()).to.be.false;
    });
    it('should return the message "Product already exists"', async () => {
      await productsController.productAlreadyExists(request, response, next);

      expect(response.json.calledWith(message)).to.be.true;
      expect(next.calledWith()).to.be.false;
    });
  });
  describe("and it dont exists", () => {
    const next = sinon.stub().returns();

    const message = { message: "Product already exists" };
    const request = {};
    const response = {};

    before(() => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getByName").resolves(false);
    });

    after(() => {
      productModel.getByName.restore();
    });

    it("should return the status code 409", async () => {
      await productsController.productAlreadyExists(request, response, next);

      expect(response.status.calledWith(409)).to.be.false;
      expect(response.json.calledWith(message)).to.be.false;
      expect(next.calledWith()).to.be.true;
    });
  });
});
