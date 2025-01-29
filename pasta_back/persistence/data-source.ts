import "reflect-metadata";
import { DataSource } from "typeorm";
import { Brawler } from "./brawler";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password : 'postgres',
    database: "brawl_joia",
    synchronize: true,
    logging: true,
    entities: [Brawler],
    migrations: [],
})

AppDataSource.initialize()
    .then(()=> {
        console.log('banco de dados Subiu!')
    })
    .catch((err)=> {
        console.error(`erro ao subir o banco ${err}`);
    }); 