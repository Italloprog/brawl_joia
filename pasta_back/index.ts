import 'reflect-metadata';
import  { Request, Response } from 'express';
import { Brawler } from './persistence/brawler';
import { Brawler_repository } from './persistence/brawler_repository';
import express = require("express");
import { AppDataSource } from './persistence/data-source';

const app = express();
app.use(express.json());

AppDataSource.initialize()
    .then(()=> {
        console.log('banco de dados Subiu!')
    })
    .catch((err)=> {
        console.error(`erro ao subir o banco ${err}`);
    }); 
    
let repositorio = new Brawler_repository();

app.post('/criar', (req:Request, res: Response) => {
    let {nome, descricao, image} = req.body;
    let NovoBrawler = new Brawler(nome, descricao, image);

    repositorio.criar(NovoBrawler);

    res.json(NovoBrawler);
});

app.get('/listar', (req:Request, res: Response) => {

    let brawlers = repositorio.listar();
    
    res.json(brawlers);
});

app.put('/atualizar/:id', (req:Request, res: Response) => {
    let brawler_id = Number(req.params.id);
    let {nome, descricao, image} = req.body;

    let NovoBrawler = new Brawler(nome, descricao, image);

    let Brawler_atualizado = repositorio.atualizar(NovoBrawler,brawler_id);

    res.json(Brawler_atualizado);
});

app.delete('/remover/:id', (req:Request, res: Response) => {
    let brawler_id = Number(req.params.id);

    let Brawler_atualizado = repositorio.apagar(brawler_id);
    if (!Brawler_atualizado){
        res.json({message: "Brawler não encontrado"});
    }
    res.json({message: "Brawler removido com sucesso"});
});

app.listen(3000, () => {
    console.log("Server rodando em 127.0.0.1:3000");
});