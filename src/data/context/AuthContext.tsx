"use client";

import Usuario from "@/model/Usuario";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import {
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  onIdTokenChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from "@/firebase/config";

interface AuthContextProps {
  usuario?: Usuario;
  carregando?: boolean;
  loginGoogle?: () => Promise<void>;
  login?: (email: string, senha: string) => Promise<void>;
  cadastrar?: (email: string, senha: string) => Promise<void>;
  logout?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(user: User): Promise<Usuario> {
  const token = await user.getIdToken();
  return {
    uid: user.uid,
    nome: user.displayName,
    email: user.email,
    token,
    provedor: user.providerId,
    imagemUrl: user.photoURL,
  };
}

function gerenciarCookie(logado: boolean) {
  logado = logado.toString() === "true";
  if (logado) {
    Cookies.set("admin-template-cod3r-auth", logado.toString(), {
      expires: 7,
    });
  } else {
    Cookies.remove("admin-template-cod3r-auth");
  }
}

export function AuthProvider(props: any) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario>(null);
  const [carregando, setCarregando] = useState(true);

  async function configurarSessao(usuarioFirebase: User) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase);
      setUsuario(usuario);
      gerenciarCookie(true);
      setCarregando(false);
      return usuario.email;
    } else {
      setUsuario(null);
      gerenciarCookie(false);
      setCarregando(false);
      return false;
    }
  }

  async function login(email: string, senha: string) {
    try {
      setCarregando(true);
      const resp = await signInWithEmailAndPassword(auth, email, senha);

      if (await configurarSessao(resp.user)) {
        router.push("/");
      }
    } finally {
      setCarregando(false);
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      setCarregando(true);

      const resp = await createUserWithEmailAndPassword(auth, email, senha);

      if (await configurarSessao(resp.user)) {
        router.push("/");
      }
    } finally {
      setCarregando(false);
    }
  }

  async function loginGoogle() {
    try {
      setCarregando(true);
      const resp = await signInWithPopup(auth, new GoogleAuthProvider());
      //const resp = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());

      if (await configurarSessao(resp.user)) {
        router.push("/");
      }
    } finally {
      setCarregando(false);
    }
  }

  async function logout() {
    try {
      setCarregando(true);
      await signOut(auth);
      await configurarSessao(null);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    if (Cookies.get("admin-template-cod3r-auth")) {
      const cancelar = onIdTokenChanged(auth, configurarSessao);
      return () => cancelar();
    } else {
      setCarregando(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, loginGoogle, login, cadastrar, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
