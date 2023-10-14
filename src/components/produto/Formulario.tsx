import Produto from "@/model/Produto";
import { useState } from "react";

interface FormularioProps {
  produto: Produto;
  cancelar: () => void;
  salvar: (produto: Produto) => void;
  atualizarProduto: (produto: Produto) => void;
}

export default function Formulario(props: FormularioProps) {
  const id = props.produto?.id ?? null;
  const [nome, setNome] = useState(props.produto?.nome ?? "");
  const [categoria, setCategoria] = useState(props.produto?.categoria ?? "");

  return (
    <div>
      {id ? (
        <div className={`mb-2 flex flex-col`}>
          <label className="m-4 font-bold text-white">Código</label>
          <input
            type={"text"}
            value={id}
            readOnly
            className={`ml-4 mr-4 rounded-lg border border-purple-500 bg-gray-100 px-4 py-2 text-gray-800 focus:outline-none`}
          />
        </div>
      ) : (
        false
      )}
      <div className={`mb-2 flex flex-col`}>
        <label className={`m-4 font-bold text-white`}>Nome</label>
        <input
          type={"text"}
          value={nome}
          className={`ml-4 mr-4 rounded-lg border border-purple-500 bg-gray-100 px-4 py-2 text-gray-800 focus:bg-white`}
          onChange={(e) => setNome(e.target.value)}
        />
      </div>
      <div className={`flex flex-col`}>
        <label className="m-4 font-bold text-white">Categoria</label>
        <input
          type={"text"}
          value={categoria}
          className={`mb-4 ml-4 mr-4 rounded-lg border border-purple-500 bg-gray-100 px-4 py-2 text-gray-800 focus:bg-white`}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => props.salvar({ id, nome, categoria })}
          className="mb-4 mr-2 rounded-md bg-gradient-to-r from-blue-400 to-blue-700 px-4 py-2 text-white"
        >
          {id ? "Alterar" : "Salvar"}
        </button>
        <button
          onClick={props.cancelar}
          className="mb-4 mr-4 rounded-md bg-gradient-to-r from-gray-400 to-gray-700 px-4 py-2 text-white"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
