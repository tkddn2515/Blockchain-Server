import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import * as path from 'path';

function getEnv() {
  switch(process.env.NODE_ENV) {
    case "prod":
      return ".env.prod";
    case "dev":
    default:
      return ".env.dev";
    case "local":
      return ".env.local";
  }
}

dotenv.config({
  path: path.resolve(getEnv())
});

export const typeORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [
    __dirname + '/../modules/**/*.entity.{js,ts}'
  ],
  synchronize: true
}