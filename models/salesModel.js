const connection = require('./connection');

const salesProductsValues = (salesArray, id) => {
  let values = '';
  salesArray.forEach(({ product_id: productId, quantity }, index) => {
    if (index) {
      values += `, (${id}, ${productId}, ${quantity})`;
    } else values += `(${id}, ${productId}, ${quantity})`;
  });
  return values;
};

const create = async (salesArray) => {
  const [rows] = await connection.execute('INSERT INTO sales VALUES ()');
  await connection.execute(
    `INSERT INTO sales_products (sale_id, product_id, quantity) VALUES ${salesProductsValues(
      salesArray,
      rows.insertId,
    )}`,
  );

  return {
    id: rows.insertId,
    itemsSold: salesArray,
  };
};

const getByIdQuery = `
  SELECT date, product_id, quantity
  FROM sales JOIN sales_products
  ON id = sale_id
  WHERE id = ?
`;

const getById = async (id) => {
  const [rows] = await connection.execute(getByIdQuery, [id]);

  return rows;
};

const getProductListQuery = `
  SELECT sale_id, date, product_id, quantity
  FROM sales JOIN sales_products
  ON id = sale_id
`;

const getProductList = async () => {
  const [rows] = await connection.execute(getProductListQuery);

  return rows.map(({ sale_id: saleId, ...rest }) => ({ saleId, ...rest }));
};

module.exports = { create, getById, getProductList };
