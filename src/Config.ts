interface Configuration {
  port: number;
  dataBase: {
    host: string
  }
}

export const Config: Configuration = {
  port: Number(process.env.PORT),
  dataBase: {
    host: process.env.DB_HOST || 'mongodb://database:27017/shop'
  }
};
