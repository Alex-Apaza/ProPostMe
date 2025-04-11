import sql from 'mssql';


const config: sql.config = {
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  server: process.env.DB_SERVER as string,
  database: process.env.DB_NAME as string,
  port: parseInt(process.env.DB_PORT as string),
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getConnection() {
  if (pool) return pool;
  try {
    pool = await sql.connect(config);
    return pool;
  } catch (error) {
    console.error('Error de conexión:', error);
    throw error;
  }
}
