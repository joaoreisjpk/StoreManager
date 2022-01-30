const connection = require('./connection');

const create = async (salesArray) => {
  const [rows] = await connection.execute(
    'INSERT INTO sales VALUES ()',
  );
    console.log(rows.insertId);
  await salesArray.forEach(async ({ product_id: productId, quantity }) => {
    await connection.execute(
      'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
        [rows.insertId, productId, quantity],
    );
  });

  return {
    id: rows.insertId,
    itemsSold: salesArray,
  };
};

module.exports = { create };