import { BarChart } from "@tremor/react";

export default async function Grafico() {
  const chartdata = await fetch(
    "https://admin-template-nextjs-ten.vercel.app/api/dashboard",
    {
      cache: "no-store",
    },
  );
  const chart = await chartdata.json();

  return (
    <BarChart
      data={chart}
      index="nome"
      categories={["Número de produtos"]}
      colors={["amber", "blue"]}
      yAxisWidth={48}
    />
  );
}
