import { config } from '../../src/config';

export const pgConfig = {
  containerName: 'web-node-pgsql',
  imageName: 'postgres:15.3',
  rootUser: config.rds.username,
  rootPassword: config.rds.password,
  host: config.rds.host,
  port: config.rds.port,
  schema: config.rds.schema,
};

console.log('config', config);

console.log('ENV', config.runType);

export const tempRunType = process.env.RUN_TYPE;

export const pgsqlConnectionOptions = {
  host: pgConfig.host,
  port: pgConfig.port,
  user: pgConfig.rootUser,
  password: pgConfig.rootPassword,
  database: pgConfig.schema,
  ssl: config.rds.ssl,
};
