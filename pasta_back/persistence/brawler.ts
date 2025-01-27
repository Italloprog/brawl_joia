import "reflect-metadata";
import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Brawler{
    @PrimaryGeneratedColumn()
    id: number | undefined;

    @Column()
    name: string;

    @Column()
    descricao: string;

    @Column()
    imagem: string;

    constructor(name:string,descricao:string,image:string){
        this.name = name;
        this.descricao = descricao;
        this.imagem = image;
    }
}