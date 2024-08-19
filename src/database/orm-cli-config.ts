import { DataSource } from "typeorm";
import { dataSourceOptions } from "./database.module";

export const dataSource = new DataSource({
    ...dataSourceOptions,
    migrations: [__dirname + '/migrations/*.ts'],

})