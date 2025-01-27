"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var brawler_1 = require("./brawler");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: "brawl_joia",
    synchronize: true,
    logging: true,
    entities: [brawler_1.Brawler],
    migrations: [],
});
exports.AppDataSource.initialize()
    .then(function () {
    console.log('banco de dados Subiu!');
})
    .catch(function (err) {
    console.error("erro ao subir o banco ".concat(err));
});
