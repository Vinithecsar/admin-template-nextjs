import useAuth from "@/data/hook/useAuth";
import Link from "next/link";
import { useEffect } from "react";

interface AvatarUsuarioProps {
  className?: string;
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
  const { usuario } = useAuth();
  useEffect(() => {
    console.log(usuario);
  }, []);
  return (
    <Link href={"/perfil"}>
      <img
        src={usuario?.imagemUrl ?? "/images/avatar.svg"}
        alt="Avatar do Usuário"
        className={`h-10 w-10 cursor-pointer rounded-full ${props.className}`}
      />
    </Link>
  );
}
