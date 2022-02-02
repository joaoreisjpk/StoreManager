const sinon = require("sinon");
const { expect } = require("chai");

const connection = require("../../models/connection");
const salesModel = require('../../models/salesModel');

const sales = { 
  salesArray: [{ product_id: 1, quantity: 3}],
  returnSalesArray: [{date: 20220128, product_id: 1, quantity: 4}],
  allSales: [{ saleId: 1, quantity: 3, product_id: 1, date: 20220128}],
}

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
