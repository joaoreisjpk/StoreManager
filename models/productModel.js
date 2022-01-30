const connection = require('./connection');

const getByName = async (name) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);

  return rows[0];
};

const getById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  return rows[0];
};

const getProductList = async () => {
  const [rows] = await connection.execute('SELECT * FROM products');

  return rows;
};

const create = async ({ name, quantity }) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
      [name, quantity],
  );

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

module.exports = { getByName, create, getById, getProductList };