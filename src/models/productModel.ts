import { basicProduct, basicProductResponse } from '../interfaces/IProducts';
import connection from './connection';

const getByName = async (name: string): Promise<basicProductResponse> => {
  const [rows] = await connection.execute('SELECT * FROM products WHERE name = ?', [name]);

  return rows[0];
};

const getById = async (id: number): Promise<basicProductResponse> => {
  const [rows]: any = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);

  return rows[0];
};

const getProductList = async (): Promise<basicProductResponse[]> => {
  const [rows]: any = await connection.execute('SELECT * FROM products');

  return rows;
};

const create = async ({ name, quantity }: basicProduct): Promise<basicProductResponse> => {
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

const update = async ({ id, name, quantity }: basicProductResponse): Promise<basicProductResponse> => {
  await connection.execute(
    'UPDATE products SET name = ?, quantity = ? WHERE id = ?',
    [name, quantity, id],
  );

  return { id, name, quantity };
};

const remove = async (id: number) => {
  await connection.execute('DELETE FROM products WHERE id = ?', [id]);
};

export { getByName, create, getById, getProductList, update, remove };