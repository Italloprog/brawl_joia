"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var brawler_1 = require("./persistence/brawler");
var brawler_repository_1 = require("./persistence/brawler_repository");
var express = require("express");
var data_source_1 = require("./persistence/data-source");
var app = express();
app.use(express.json());
data_source_1.AppDataSource.initialize()
    .then(function () {
    console.log('banco de dados Subiu!');
})
    .catch(function (err) {
    console.error("erro ao subir o banco ".concat(err));
});
var repositorio = new brawler_repository_1.Brawler_repository();
app.post('/criar', function (req, res) {
    var _a = req.body, nome = _a.nome, descricao = _a.descricao, image = _a.image;
    var NovoBrawler = new brawler_1.Brawler(nome, descricao, image);
    repositorio.criar(NovoBrawler);
    res.json(NovoBrawler);
});
app.get('/listar', function (req, res) {
    var brawlers = repositorio.listar();
    res.json(brawlers);
});
app.put('/atualizar/:id', function (req, res) {
    var brawler_id = Number(req.params.id);
    var _a = req.body, nome = _a.nome, descricao = _a.descricao, image = _a.image;
    var NovoBrawler = new brawler_1.Brawler(nome, descricao, image);
    var Brawler_atualizado = repositorio.atualizar(NovoBrawler, brawler_id);
    res.json(Brawler_atualizado);
});
app.delete('/remover/:id', function (req, res) {
    var brawler_id = Number(req.params.id);
    var Brawler_atualizado = repositorio.apagar(brawler_id);
    if (!Brawler_atualizado) {
        res.json({ message: "Brawler não encontrado" });
    }
    res.json({ message: "Brawler removido com sucesso" });
});
app.listen(3000, function () {
    console.log("Server rodando em 127.0.0.1:3000");
});
