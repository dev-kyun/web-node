import { DataSourceOptions } from 'typeorm';

export const config = {
  pipeline: {},
  gaurd: {
    validation: {},
    jwt: {
      logging: false,
    },
    role: {
      logging: false,
    },
  },
  middleware: {
    logger: {
      logging: false,
    },
  },
  runType: process.env.CLIENT_ADMIN_RUN_TYPE,
  rds: {
    host: process.env.CLIENT_ADMIN_RDS_HOST,
    port: process.env.CLIENT_ADMIN_RDS_PORT,
    username: process.env.CLIENT_ADMIN_RDS_USERNAME,
    password: process.env.CLIENT_ADMIN_RDS_PASSWORD,
    schema: process.env.CLIENT_ADMIN_RDS_SCHEMA,
    ssl: process.env.CLIENT_ADMIN_RDS_SSL_CONNECTION ? { rejectUnauthorized: false } : false,
  },
  apiToken: process.env.CLIENT_ADMIN_API_TOKEN,
};

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  database: config.rds.schema,
  host: config.rds.host,
  port: Number(config.rds.port),
  username: config.rds.username,
  password: config.rds.password,
  logging: false,
  // synchronize: false,
  entities: [__dirname + `/db/entity/*.{ts,js}`],
  migrations: [__dirname + `/db/migrations/${config.runType}/*.{ts,js}`],
  migrationsRun: false,
  migrationsTableName: 'migration',
  useUTC: true,
  ssl: config.rds.ssl,
};

console.warn('[DB Config]', {
  database: dataSourceConfig.database,
  host: dataSourceConfig.host,
  port: dataSourceConfig.port,
  username: dataSourceConfig.username,
  useUTC: true,
  syncronize: dataSourceConfig.synchronize,
});
