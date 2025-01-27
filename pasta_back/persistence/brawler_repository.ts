import "reflect-metadata"
import { Repository } from "typeorm";
import { Brawler } from "./brawler";
import { AppDataSource } from "./data-source";


export class Brawler_repository{
    private repositorio: Repository<Brawler> = AppDataSource.getRepository(Brawler);

    async listar(): Promise<Brawler[]> {
        let brawlers = await this.repositorio.find();
        return brawlers;
    }

    async criar(brawler: Brawler): Promise<Brawler> {
        let brawler1 = await this.repositorio.save(brawler);
        return brawler1;
    }
    
    async apagar(id_brawler:number): Promise<boolean> {
        let brawler_apagar = await this.repositorio.findOneBy({id: id_brawler});

        if(brawler_apagar){
            
            await this.repositorio.remove(brawler_apagar);
            return true;
        }
        
       return false
        
    }

    async atualizar(brawler: Brawler,id_brawler:number): Promise<Brawler | null> {

        let brawler_atualizar = await this.repositorio.findOneBy({id: id_brawler});

        if(brawler_atualizar){
            brawler_atualizar.name = brawler.name;
            brawler_atualizar.descricao = brawler.descricao;
            brawler_atualizar.imagem = brawler.imagem;
            let brawler1 = await this.repositorio.save(brawler_atualizar);
            return brawler1;
        }
        
        return null;
    }
}