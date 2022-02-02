import connection from './connection';

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
  const [rows]: any = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
      [name, quantity],
  );

  return {
    id: rows.insertId,
    name,
    quantity,
  };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const remove = async (id) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

export { getByName, create, getById, getProductList, update, remove };