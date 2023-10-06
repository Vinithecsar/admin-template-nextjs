"use client";

import AuthInput from "@/components/auth/AuthInput";
import { IconeAtencao } from "@/components/icons";
import useAuth from "@/data/hook/useAuth";
import { useState } from "react";

export default function Autenticacao() {
  const { cadastrar, login, loginGoogle } = useAuth();

  const [modo, setModo] = useState<"login" | "cadastro">("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(null);

  function exibirErro(msg: string, tempoEmSegundos = 5) {
    setErro(msg);
    setTimeout(() => setErro(null), tempoEmSegundos * 1000);
  }

  async function submeter() {
    try {
      if (modo === "login") {
        await login(email, senha);
      } else {
        await cadastrar(email, senha);
      }
    } catch (e: any) {
      exibirErro(e?.message ?? "Erro desconhecido");
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="hidden md:block md:w-1/2 lg:w-2/3">
        <img
          src="https://source.unsplash.com/random"
          alt="Imagem da Tela de Autenticação"
          className="h-screen w-full object-cover"
        />
      </div>
      <div className="m-10 w-full md:w-1/2 lg:w-1/3">
        <h1 className="mb-5 text-2xl font-bold">
          {modo === "login"
            ? "Entre com a Sua Conta"
            : "Cadastre-se na Plataforma"}
        </h1>

        {erro ? (
          <div className="my-2 flex items-center rounded-lg border border-red-700 bg-red-400 px-5 py-3 text-white">
            {IconeAtencao()}
            <span className="ml-3">{erro}</span>
          </div>
        ) : (
          false
        )}

        <AuthInput
          label="Email"
          tipo="email"
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput
          label="Senha"
          tipo="password"
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />

        <button
          className="mt-6 w-full rounded-lg bg-indigo-500 px-4 py-3 text-white hover:bg-indigo-400"
          onClick={submeter}
        >
          {modo === "login" ? "Entrar" : "Cadastrar"}
        </button>

        <hr className="my-6 w-full border-gray-300" />

        <button
          className="w-full rounded-lg bg-red-500 px-4 py-3 text-white hover:bg-red-400"
          onClick={loginGoogle}
        >
          Entrar com Google
        </button>

        {modo === "login" ? (
          <p className="mt-8">
            Novo por aqui?
            <a
              onClick={() => setModo("cadastro")}
              className="cursor-pointer font-semibold text-blue-500 hover:text-blue-700"
            >
              {" "}
              Crie uma Conta Gratuitamente
            </a>
          </p>
        ) : (
          <p className="mt-8">
            Já faz parte da nossa comunidade?
            <a
              onClick={() => setModo("login")}
              className="cursor-pointer font-semibold text-blue-500 hover:text-blue-700"
            >
              {" "}
              Entre com as suas Credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  );
}