import { createContext, Dispatch, SetStateAction } from "react";
import { Brawler } from "../interface";

// Criando o contexto com valor padrão

const BrawlerContext = createContext<{ brawlers: Brawler[], SetBrawlers: Dispatch<SetStateAction<Brawler[]>> }>({

    brawlers: [],
  
    SetBrawlers: () => []
  
});

export default BrawlerContext;