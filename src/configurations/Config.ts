import dotenv from 'dotenv';

interface Configuration {
  port: number;
  dataBase: {
    host: string;
    port: number;
    name: string;
    poolSize: number;
  };
  jwt: {
    cookieName: string;
    secret: string;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    s3Bucket: string;
    region: string;
  };
  logs: {
    enabled: boolean;
    config: 'tiny' | 'short' | 'common' | 'combined';
  };
}

dotenv.config();

export const Config: Configuration = {
  port: Number(process.env.PORT || 3000),
  dataBase: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 27017),
    name: process.env.DB_NAME || 'shop',
    poolSize: Number(process.env.DB_POOL_SIZE || 2)
  },
  jwt: {
    cookieName: process.env.JWT_COOKIE_NAME || 'shopToken',
    secret: process.env.JWT_SECRET || 'secret'
  },
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    s3Bucket: process.env.AWS_S3_BUCKET || 'shop-test-s3',
    region: process.env.AWS_REGION || 'eu-west-1'
  },
  logs: {
    enabled: process.env.NODE_ENV !== 'test',
    config: process.env.LOGS_CONFIG as any || 'tiny'
  }
};
