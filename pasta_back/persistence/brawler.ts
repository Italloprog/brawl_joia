import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Brawler{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    descricao!: string;

    @Column()
    imagem!: string;

    constructor(name?:string, descricao?: string, imagem?:string){
        if(name) this.name = name;
        if(descricao) this.descricao = descricao;
        if (imagem) this.imagem = imagem;
    }
}