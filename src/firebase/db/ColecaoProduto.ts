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
      });
      return produto;
    } else {
      const docRef = await addDoc(collection(db, "produtos"), {
        nome: produto.nome,
        categoria: produto.categoria,
      });
      const doc = await getDoc(docRef);
      const data = doc.data();

      return { id: data.id, nome: data.id, categoria: data.categoria };
    }
  }

  async excluir(produto: Produto): Promise<void> {
    await deleteDoc(doc(db, "produtos", produto.id));
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
