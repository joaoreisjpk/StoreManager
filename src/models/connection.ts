import * as mysql from 'mysql2/promise';
import 'dotenv/config';

const connection = mysql.createPool({
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  database: 'StoreManager',
});

export default connection;
