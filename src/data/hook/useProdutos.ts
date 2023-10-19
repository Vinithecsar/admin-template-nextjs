import ColecaoProduto from "@/firebase/db/ColecaoProduto";
import { db } from "@/firebase/config";
import Produto from "@/model/Produto";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function useProdutos() {
  const repo = new ColecaoProduto();

  const [visivel, setVisivel] = useState<"form" | "table">("table");
  const [produto, setProduto] = useState<Produto>({
    id: null,
    nome: null,
    categoria: null,
    preco: null,
  });
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<{ id: string; nome: string }[]>(
    [],
  );

  // useEffect(obterTodos, []);

  // function obterTodos() {
  //   repo.obterTodos().then((produtos) => {
  //     console.log(produtos);
  //     setProdutos(produtos);
  //   });
  // }

  function selecionarProduto(produto: Produto) {
    setProduto(produto);
    setVisivel("form");
  }

  async function salvarProduto(produto: Produto) {
    await repo.salvar(produto);
    setVisivel("table");
  }

  async function excluirProduto(produto: Produto) {
    await repo.excluir(produto);
  }

  onSnapshot(collection(db, "produtos"), (snapshot) => {
    const produtos: Produto[] = [];
    snapshot.docs.map((doc) =>
      produtos.push({
        id: doc.id,
        nome: doc.data().nome,
        categoria: doc.data().categoria,
        preco: doc.data().preco,
      }),
    );
    setProdutos(produtos);
  });

  onSnapshot(collection(db, "categorias"), (snapshot) => {
    const categorias: { id: string; nome: string }[] = [];
    snapshot.docs.map((doc) =>
      categorias.push({
        id: doc.id,
        nome: doc.data().nome,
      }),
    );
    setCategorias(categorias);
  });

  return {
    salvarProduto,
    selecionarProduto,
    produtos,
    setProdutos,
    produto,
    setProduto,
    visivel,
    setVisivel,
    excluirProduto,
    categorias,
  };
}
