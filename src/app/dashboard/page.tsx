import Grafico from "@/components/produto/Grafico";
import { Layout } from "@/components/template/Layout";
import { Card, Title } from "@tremor/react";

export const dynamic = "force-dynamic";

export default async function Dashboard() {
  return (
    <Layout
      titulo="Dashboard de produtos"
      subtitulo="Visualize tabelas de informações sobre produtos"
    >
      <div className="flex justify-center">
        <Card className="w-2/3">
          <Title>Quantidade de produtos por categoria</Title>
          <Grafico />
        </Card>
      </div>
    </Layout>
  );
}
