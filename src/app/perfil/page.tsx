import { Layout } from "@/components/template/Layout";
// import { AppConsumer } from "@/data/context/AppContext";
//import useAppData from "@/data/hook/useAppData";

export default function Perfil() {
  // const { tema, alternarTema } = useAppData();

  return (
    <Layout
      titulo="Perfil de usuário"
      subtitulo="Administre as suas informações de usuário!"
    >
      {/* <AppConsumer>{(dados) => <h3>{dados.nome}</h3>}</AppConsumer> */}
      {/* <button onClick={alternarTema}>Alternar Tema</button> */}
      <h1>Perfil do Usuário</h1>
    </Layout>
  );
}
