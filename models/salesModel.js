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
  FROM sales
  JOIN sales_products
  ON id = sale_id
  WHERE id = ?
`;

const getById = async (id) => {
  const [rows] = await connection.execute(getByIdQuery, [id]);

  return rows;
};

const getProductListQuery = `
  SELECT sale_id, date, product_id, quantity
  FROM sales
  JOIN sales_products
  ON id = sale_id
`;

const getProductList = async () => {
  const [rows] = await connection.execute(getProductListQuery);

  return rows.map(({ sale_id: saleId, ...rest }) => ({ saleId, ...rest }));
};

const updateQuery = `
  UPDATE sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ? 
`;

const update = async (saleId, data) => {
  const { product_id: productId, quantity } = data[0];

  await connection.execute(updateQuery, [quantity, saleId, productId]);

  return { saleId, itemUpdated: data };
};

const remove = async (id) => {
  await connection.execute('DELETE FROM sales WHERE id = ?', [id]);
};

module.exports = { create, getById, getProductList, update, remove };
