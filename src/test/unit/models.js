const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");
const productModel = require("../../models/productModel");
const salesModel = require('../../models/salesModel');

// Ajuda do Pr do Mannuel Boo
const product = {
  correct: { name: "Primeiro Produto", quantity: 4 },
  returnCreate: { id: 1, name: "Primeiro Produto", quantity: 4 },
  returnGet: [{ id: 1, name: "Primeiro Produto", quantity: 4 }],
  returnUptade: { id: 1, name: "Produto Atualizado", quantity: 400 },
};

const sales = { 
  salesArray: [{ product_id: 1, quantity: 3}],
  returnSalesArray: [{date: 20220128, product_id: 1, quantity: 4}],
  allSales: [{ saleId: 1, quantity: 3, product_id: 1, date: 20220128}],
}

describe("Search for a product by their name", () => {
  before(async () => {
    const execute = [product.returnGet];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", async () => {
    it("the object isnt empty", async () => {
      const { name } = product.correct;
      const GetByName = await productModel.getByName(name);

      expect(GetByName).to.not.be.empty;
    });
    it("have keys", async () => {
      const { name } = product.correct;
      const GetByName = await productModel.getByName(name);

      expect(GetByName).to.have.keys("id", "name", "quantity");
    });
    it("returns an object", async () => {
      const { name } = product.correct;
      const GetByName = await productModel.getByName(name);

      expect(GetByName).to.be.an("object");
    });
  });
});

describe("Search for a product by their id", () => {
  before(async () => {
    const execute = [product.returnGet];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", async () => {
    it("the object isnt empty", async () => {
      const getById = await productModel.getById(1);

      expect(getById).to.not.be.empty;
    });
    it("have keys", async () => {
      const getById = await productModel.getById(1);

      expect(getById).to.have.keys("id", "name", "quantity");
    });
    it("returns an object", async () => {
      const getById = await productModel.getById(1);

      expect(getById).to.be.an("object");
    });
  });
});

describe("Search for a product list", () => {
  before(async () => {
    const execute = [product.returnGet];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", async () => {
    it("must not be empty", async () => {
      const GetProductList = await productModel.getProductList();

      expect(GetProductList).to.not.be.empty;
    });
    it("return an array", async () => {
      const GetProductList = await productModel.getProductList();

      expect(GetProductList).to.be.an("array");
    });
    it("have keys", async () => {
      const GetProductList = await productModel.getProductList();

      expect(GetProductList[0]).to.have.keys("id", "name", "quantity");
    });
  });
});

describe("Create a new product", () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("must not be empty", async () => {
      const { name, quantity } = product.correct;
      const response = await productModel.create({ name, quantity });

      expect(response).to.not.be.empty;
    });
    it("returns the new product object", async () => {
      const { name, quantity } = product.correct;
      const response = await productModel.create({ name, quantity });

      expect(response).to.be.an("object");
    });
    it("have keys", async () => {
      const { name, quantity } = product.correct;
      const response = await productModel.create({ name, quantity });

      expect(response).to.have.keys("id", "name", "quantity");
    });
  });
});

describe("Update a product", () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("return the updated product", async () => {
      const response = await productModel.update(product.returnUptade);

      expect(response).to.have.keys("id", "name", "quantity");
    });
  });
});

describe("Remove a product", () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("returns void", async () => {
      const response = await productModel.remove(product.returnUptade);

      expect(response).to.be.equal();
    });
  });
});


describe("Search for a sale by their id", () => {
  before(async () => {
    const execute = [sales.returnSalesArray];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", async () => {
    it("the object isnt empty", async () => {
      const getById = await salesModel.getById(1);

      expect(getById).to.not.be.empty;
    });
    it("have keys", async () => {
      const getById = await salesModel.getById(1);

      expect(getById[0]).to.have.keys("date", "product_id", "quantity");
    });
    it("returns an object", async () => {
      const getById = await salesModel.getById(1);

      expect(getById).to.be.an("array");
    });
  });
});

describe("Get all sales + product relational list", () => {
  before(async () => {
    const execute = [sales.allSales];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", async () => {
    it("must not be empty", async () => {
      const GetProductList = await salesModel.getProductList();

      expect(GetProductList).to.not.be.empty;
    });
    it("return an array", async () => {
      const GetProductList = await salesModel.getProductList();

      expect(GetProductList).to.be.an("array");
    });
    it("have keys", async () => {
      const GetProductList = await salesModel.getProductList();

      expect(GetProductList[0]).to.have.keys("saleId", "date", "product_id", "quantity");
    });
  });
});

describe("Create a new sale", () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("must not be empty", async () => {
      const response = await salesModel.create(sales.salesArray);

      expect(response).to.not.be.empty;
    });
    it("returns the new product object", async () => {
      const response = await salesModel.create(sales.salesArray);

      expect(response).to.be.an("object");
    });
    it("have keys", async () => {
      const response = await salesModel.create(sales.salesArray);

      expect(response).to.have.keys("id", "itemsSold");
    });
  });
});

describe("Update a sale", () => {
  before(async () => {
    const execute = [];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("return the updated product", async () => {
      const response = await salesModel.update(1, sales.salesArray);

      expect(response).to.have.keys("saleId", "itemUpdated");
    });
  });
});

describe("Remove a product", () => {
  before(async () => {
    const execute = [{ insertId: 1 }];
    sinon.stub(connection, "execute").resolves(execute);
  });
  after(async () => {
    connection.execute.restore();
  });
  describe("when succeed", () => {
    it("returns void", async () => {
      const response = await salesModel.remove(1);

      expect(response).to.be.equal();
    });
  });
});
