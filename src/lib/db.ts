import mysql from 'mysql2/promise';

export const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root', // O el usuario que me confirmes
  password: '', // O tu contraseña real si tienes
  database: 'postmedb',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
