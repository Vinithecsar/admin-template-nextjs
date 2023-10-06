import { Layout } from "@/components/template/Layout";
// import { AppConsumer } from "@/data/context/AppContext";
//import useAppData from "@/data/hook/useAppData";

export default function Notificacoes() {
  // const { tema, alternarTema } = useAppData();

  return (
    <Layout
      titulo="Notificações"
      subtitulo="Aqui você irá gerenciar suas notificações"
    >
      {/* <AppConsumer>{(dados) => <h3>{dados.nome}</h3>}</AppConsumer> */}
      {/* <button onClick={alternarTema}>Alternar Tema</button> */}
      <h1>Notificações</h1>
    </Layout>
  );
}
