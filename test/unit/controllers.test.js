const sinon = require("sinon");
const { expect } = require("chai");

const productsController = require("../../controllers/productsController");
const salesController = require("../../controllers/salesController");
const productModel = require("../../models/productModel");
const object = require("@hapi/joi/lib/types/object");

const product = {
  noName: { quantity: 2 },
  invalidName: { name: "abc", quantity: 2 },
  noQuantity: { name: "Algum produto" },
  invalidQuantity: { name: "Outro Produto", quantity: "letra" },
  correct: { name: "Primeiro Produto", quantity: 4 },
  returnCreate: { id: 1, name: "Primeiro Produto", quantity: 4 },
  returnUpdate: { id: 1, name: "Produto Atualizado", quantity: 400 },
};

describe("When calling productsValidation", () => {
  describe("and the name dont exists", () => {
    const response = {};
    const request = {};
    const next = sinon.stub().returns();
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA \n', next.calledOnce)

    const message = { message: '"name" is required' };

    before( async () => {
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

    before( async () => {
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

    before( async () => {
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

    before( async () => {
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

    before( async () => {
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

    before( async () => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getByName").resolves(true);
    });

    after(async () => {
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

    before( async () => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getByName").resolves(false);
    });

    after(async () => {
      productModel.getByName.restore();
    });

    it("should call next function", async () => {
      await productsController.productAlreadyExists(request, response, next);

      expect(response.status.calledWith(409)).to.be.false;
      expect(response.json.calledWith(message)).to.be.false;
      expect(next.calledWith()).to.be.true;
    });
  });
});

describe("When calling productDontExists", () => {
  describe("and it dont exists", () => {
    const next = sinon.stub().returns();

    const message = { message: "Product not found" };
    const request = {};
    const response = {};

    before( async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getById").resolves(false);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it("should return the status code 404", async () => {
      await productsController.productDontExists(request, response, next);

      expect(response.status.calledWith(404)).to.be.true;
      expect(next.calledWith()).to.be.false;
    });
    it('should return the message "Product not found"', async () => {
      await productsController.productDontExists(request, response, next);

      expect(response.json.calledWith(message)).to.be.true;
      expect(next.calledWith()).to.be.false;
    });
  });
  describe("and it exists", () => {
    const next = sinon.stub().returns();

    const message = { message: "Product not found" };
    const request = {};
    const response = {};

    before( async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getById").resolves(true);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it("should call next function", async () => {
      await productsController.productDontExists(request, response, next);

      expect(response.status.calledWith(409)).to.be.false;
      expect(response.json.calledWith(message)).to.be.false;
      expect(next.calledWith()).to.be.true;
    });
  });
});

describe("When calling createProduct", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before( async () => {
      request.body = product.correct;

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "create").resolves(product.returnCreate);
    });

    after(async () => {
      productModel.create.restore();
    });

    it("should return the status code 201", async () => {
      await productsController.createProduct(request, response);

      expect(response.status.calledWith(201)).to.be.true;
    });
    it("should return the new product object", async () => {
      const newProduct = await productsController.createProduct(
        request,
        response
      );
      console.log(newProduct);
      expect(response.json.calledWith(product.returnCreate)).to.be.true;
    });
  });
});

describe("When calling getProductById", () => {
  describe("and the product dont exists", () => {
    const message = { message: "Product not found" };
    const request = {};
    const response = {};

    before( async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getById").resolves(false);
    });

    after(async () => {
      productModel.getById.restore();
    });

    it("should return the status code 404", async () => {
      await productsController.getProductById(request, response);

      expect(response.status.calledWith(404)).to.be.true;
    });
    it('should return the message "Product not found"', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith(message)).to.be.true;
    });
  });
  describe("and the product exists", () => {
    const message = { message: "Product not found" };
    const request = {};
    const response = {};

    before( async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getById").resolves(product.returnCreate);
    });

    after(async () => {
      productModel.getById.restore();
    });
    it("should return the status code 404", async () => {
      await productsController.getProductById(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });
    it('should return the message "Product already exists"', async () => {
      await productsController.getProductById(request, response);

      expect(response.json.calledWith(product.returnCreate)).to.be.true;
    });
  });
});

describe("When calling getAllProducts", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before( async () => {
      response.json = sinon.stub().returns();

      sinon
        .stub(productModel, "getProductList")
        .resolves([product.returnCreate]);
    });

    after(async () => {
      productModel.getProductList.restore();
    });

    it("should return an array of product objects", async () => {
      await productsController.getAllProducts(request, response);

      expect(response.json.calledWith([product.returnCreate])).to.be.true;
    });
  });
});

describe("When calling editProduct", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before( async () => {
      request.body = product.correct;
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
      sinon
        .stub(productModel, "update")
        .resolves(product.correct);
    });

    after(async () => {
      productModel.update.restore();
    });

    it("should return the updated product object", async () => {
      await productsController.editProduct(request, response);
      console.log();
      expect(
        response.json.calledWith(product.correct)).to.be.true;
    });
  });
});

describe("When calling deleteProduct", () => {
  describe("and succeed", () => {
    const request = {};
    const response = {};

    before( async () => {
      request.params = { id: 1 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productModel, "getById").resolves(product.returnCreate);
      sinon.stub(productModel, "remove").resolves();
    });

    after(async () => {
      productModel.getById.restore();
      productModel.remove.restore();
    });

    it("should return the updated product object", async () => {
      await productsController.deleteProduct(request, response);
      expect(response.json.calledWith(product.returnCreate)).to.be.true;
    });
  });
});
