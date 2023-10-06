import Image from "next/image";
import loading from "../../public/images/loading.gif";
import useAuth from "@/data/hook/useAuth";
import React from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";

export default function forcarAutenticacao(jsx: React.ReactNode) {
  const router = useRouter();
  const { usuario, carregando } = useAuth();

  function renderizarConteudo() {
    return (
      <>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
      if(!document.cookie?.includes("admin-template-cod3r-auth")) {
        window.location.href = "/autenticacao"
      }
      `,
          }}
        />
        {jsx}
      </>
    );
  }

  function renderizarCarregando() {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-800">
        <Image src={loading} alt="Carregando página" />
      </div>
    );
  }

  if (!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    router.push("/autenticacao");
    return null;
  }
}
