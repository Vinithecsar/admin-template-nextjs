"use client";

import Produto from "@/model/Produto";
import { IconeEdicao, IconeLixo } from "../icons";

interface TabelaProps {
  produtos: Produto[];
  selecionarProduto: (produto: Produto) => void;
  excluirProduto: (produto: Produto) => void;
}

export default function Tabela(props: TabelaProps) {
  function renderizarCabecalho(): JSX.Element {
    return (
      <tr>
        <th className="p-4 text-left">Código</th>
        <th className="p-4 text-left">Produto</th>
        <th className="p-4 text-left">Categoria</th>
        <th className="p-4 text-left">Preço</th>
        <th className="p-4">Ações</th>
      </tr>
    );
  }

  function renderizarDados(): JSX.Element[] {
    return props.produtos.map((produto, i) => {
      return (
        <tr
          key={produto.id}
          className={`${
            i % 2 === 0
              ? "bg-gray-500 dark:bg-slate-600 "
              : "bg-gray-400 dark:bg-slate-500"
          }`}
        >
          <td className="p-4 text-left">{produto.id}</td>
          <td className="p-4 text-left">{produto.nome}</td>
          <td className="p-4 text-left">{produto.categoria}</td>
          {/* prettier-ignore */}
          <td className="p-4 text-left">R${(produto.preco).toFixed(2)}</td>
          <td className="flex justify-center">
            <button
              className="m-1 flex items-center justify-center rounded-full p-2 text-green-600 hover:bg-purple-50"
              onClick={() => props.selecionarProduto(produto)}
            >
              {IconeEdicao}
            </button>
            <button
              className="m-1 flex items-center justify-center rounded-full p-2 text-red-500 hover:bg-purple-50"
              onClick={() => props.excluirProduto(produto)}
            >
              {IconeLixo}
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="flex justify-center">
      <div className="flex w-2/3 flex-col rounded-md text-gray-800">
        <table className="mt-10 w-full overflow-hidden rounded-xl text-white">
          <thead className="bg-gradient-to-r from-indigo-500 to-purple-800">
            {renderizarCabecalho()}
          </thead>
          <tbody>{renderizarDados()}</tbody>
        </table>
      </div>
    </div>
  );
}
