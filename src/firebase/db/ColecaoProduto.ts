import {
  doc,
  updateDoc,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc,
  collection,
  getDoc,
  deleteDoc,
  getDocs,
  collectionGroup,
  where,
  query,
} from "firebase/firestore";
import { db } from "../config";
import Produto from "@/model/Produto";

export default class ColecaoProduto {
  // #conversor = {
  //   toFirestore(produto: Produto) {
  //     return {
  //       nome: produto.nome,
  //       categoria: produto.categoria,
  //     };
  //   },
  //   fromFirestore(
  //     snapshot: QueryDocumentSnapshot,
  //     options: SnapshotOptions,
  //   ): Produto {
  //     const dados = snapshot.data(options);
  //     return { id: snapshot.id, nome: dados.nome, categoria: dados.categoria };
  //   },
  // };

  async salvar(produto: Produto): Promise<Produto> {
    if (produto?.id) {
      await updateDoc(doc(db, "produtos", produto.id), {
        nome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        categoriaId: produto.categoriaId,
      });
      return produto;
    } else {
      const docRef = await addDoc(collection(db, "produtos"), {
        nome: produto.nome,
        categoria: produto.categoria,
        preco: produto.preco,
        categoriaId: produto.categoriaId,
      });
      const doc = await getDoc(docRef);
      const data = doc.data();

      return {
        id: data.id,
        nome: data.id,
        categoria: data.categoria,
        preco: data.preco,
        categoriaId: data.categoriaId,
      };
    }
  }

  async excluir(produto: Produto): Promise<void> {
    await deleteDoc(doc(db, "produtos", produto.id));
  }

  async obterCategorias(): Promise<{ id: any; nome: string }[]> {
    const querySnapshot = await getDocs(collection(db, "categorias"));
    const categorias: { id: any; nome: string }[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      categorias.push({ id: doc.id, nome: data.nome });
    });
    return categorias;
  }

  async obterProdutosPorCategoria(): Promise<
    { nome: string; "Número de produtos": number }[]
  > {
    const categorias = await this.obterCategorias();
    const produtosPorCategoria = [];

    for (const categoria of categorias) {
      const querySnapshot = await getDocs(
        query(
          collectionGroup(db, "produtos"),
          where("categoriaId", "==", categoria.id),
        ),
      );
      produtosPorCategoria.push({
        nome: categoria.nome,
        "Número de produtos": querySnapshot.size,
      });
    }
    return produtosPorCategoria;
  }

  // async obterTodos(): Promise<Produto[]> {
  //   const querySnapshot = await getDocs(collection(db, "produtos"));
  //   const produtos: Produto[] = [];
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     produtos.push({ id: doc.id, nome: data.nome, categoria: data.categoria });
  //   });
  //   return produtos;
  // }
}
