import dotenv from 'dotenv';

interface Configuration {
  port: number;
  dataBase: {
    host: string;
    port: number;
    name: string;
    poolSize: number;
  }
}

dotenv.config();

export const Config: Configuration = {
  port: Number(process.env.PORT || 3000),
  dataBase: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 27017),
    name: process.env.DB_NAME || 'shop',
    poolSize: Number(process.env.DB_POOL_SIZE || 2)
  }
};
