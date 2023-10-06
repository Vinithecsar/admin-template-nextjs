interface TituloProps {
  titulo: string;
  subtitulo: string;
}

export function Titulo(props: TituloProps) {
  return (
    <div>
      <h1 className={`text-3xl font-black text-gray-900 dark:text-gray-100`}>
        {props.titulo}
      </h1>
      <h2 className={`text-sm font-light text-gray-600 dark:text-gray-300`}>
        {props.subtitulo}
      </h2>
    </div>
  );
}
