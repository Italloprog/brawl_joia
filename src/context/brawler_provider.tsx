import { useState } from "react";
import { Brawler } from "../interface";
import BrawlerContext from "./brawler_context";
import { ReactNode } from "react";




const BrawlerProvider = ({ children }: { children: ReactNode }) => {
  let [brawlers, SetBrawlers] = useState<Brawler[]>([]);

  return (
    <BrawlerContext.Provider value= {{brawlers, SetBrawlers}}>
      {children}
    </BrawlerContext.Provider>
  );
};

export default BrawlerProvider;