"use client";

import Formulario from "@/components/produto/Formulario";
import Tabela from "@/components/produto/Tabela";
import { Layout } from "@/components/template/Layout";
import useProdutos from "@/data/hook/useProdutos";

export default function Home() {
  const {
    produto,
    produtos,
    salvarProduto,
    selecionarProduto,
    setProduto,
    setVisivel,
    visivel,
    excluirProduto,
  } = useProdutos();

  return (
    <Layout
      titulo="Página inicial"
      subtitulo="Estamos construindo um template Admin"
    >
      <h3>Gerenciador de produtos</h3>

      {visivel === "table" ? (
        <>
          <div className="flex justify-end pr-[17rem]">
            <button
              onClick={() => {
                setProduto({
                  id: null,
                  nome: "",
                  categoria: "",
                });
                setVisivel("form");
              }}
              className="rounded-md bg-gradient-to-r from-green-400 to-green-700 px-4 py-2 text-white"
            >
              Novo Produto
            </button>
          </div>
          <Tabela
            produtos={produtos}
            selecionarProduto={selecionarProduto}
            excluirProduto={excluirProduto}
          />
        </>
      ) : (
        <div className="flex justify-center">
          <div className="mt-20 flex w-2/3 flex-col rounded-xl  bg-gradient-to-r from-indigo-500 to-purple-800 ">
            <Formulario
              produto={produto}
              cancelar={() => setVisivel("table")}
              atualizarProduto={() => setProduto}
              salvar={salvarProduto}
            />
          </div>
        </div>
      )}
    </Layout>
  );
}
