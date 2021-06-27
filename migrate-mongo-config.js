require('dotenv').config();

const getEnvironmentValue = (variableName) => {
  if (!process.env[variableName]) {
    throw new Error(`Not found environment variable with name: ${variableName}`);
  }
  return process.env[variableName];
};

const host = getEnvironmentValue('DB_HOST');
const port = getEnvironmentValue('DB_PORT');
const name = getEnvironmentValue('DB_NAME');

const config = {
  mongodb: {
    url: `mongodb://${host}:${port}/`,
    databaseName: name,

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  migrationsDir: 'migrations',
  changelogCollectionName: 'changelog',
  migrationFileExtension: '.js',
  useFileHash: false
};

module.exports = config;
