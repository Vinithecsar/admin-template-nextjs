import { db } from "@/firebase/config";
import {
  collection,
  collectionGroup,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

async function Dashboard(req: Request) {
  const newHeaders = new Headers(req.headers);
  newHeaders.set("Access-Control-Allow-Origin", "*");

  const querySnapshot = await getDocs(collection(db, "categorias"));
  const categorias: { id: any; nome: string }[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    categorias.push({ id: doc.id, nome: data.nome });
  });

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

  return NextResponse.json(produtosPorCategoria, {
    status: 200,
    headers: newHeaders,
  });
}
export { Dashboard as GET };
