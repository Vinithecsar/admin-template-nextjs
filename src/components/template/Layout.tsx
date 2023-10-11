"use client";

import useAppData from "@/data/hook/useAppData";
import { Cabecalho } from "./Cabecalho";
import { Conteudo } from "./Conteudo";
import { MenuLateral } from "./MenuLateral";
//import forcarAutenticacao from "@/functions/forcarAutenticacao";
import ForcarAutenticacao from "../auth/ForcarAutenticacao";

interface LayoutProps {
  titulo: string;
  subtitulo: string;
  children?: any;
}

export function Layout(props: LayoutProps) {
  const { tema } = useAppData();
  //return forcarAutenticacao(
  return (
    <ForcarAutenticacao>
      <div className={`${tema} flex h-screen w-screen`}>
        <MenuLateral />
        <div
          className={`flex w-full flex-col bg-gray-300 p-7 dark:bg-gray-800`}
        >
          <Cabecalho titulo={props.titulo} subtitulo={props.subtitulo} />
          <Conteudo>{props.children}</Conteudo>
        </div>
      </div>
    </ForcarAutenticacao>
  );
}
