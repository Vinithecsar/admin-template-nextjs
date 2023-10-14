import Image from "next/image";
import loading from "../../../public/images/loading.gif";
import useAuth from "@/data/hook/useAuth";
import React from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

interface ForcarAutenticacaoProps {
  children: React.ReactNode;
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps) {
  const router = useRouter();
  const { usuario, carregando } = useAuth();

  function RenderizarConteudo() {
    return (
      <>
        <Script
          id="82da8601-44a5-4e4b-bee1-06fad832f310"
          dangerouslySetInnerHTML={{
            __html: `
      if(!document.cookie?.includes("admin-template-cod3r-auth")) {
        window.location.href = "/autenticacao"
      }
      `,
          }}
        />
        {props.children}
      </>
    );
  }

  function RenderizarCarregando() {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-800">
        <Image src={loading} alt="Carregando página" />
      </div>
    );
  }

  if (!carregando && usuario?.email) {
    return RenderizarConteudo();
  } else if (carregando) {
    return RenderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
}
