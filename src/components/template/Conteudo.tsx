interface ConteudoProps {
  children?: any;
}

export function Conteudo(props: ConteudoProps) {
  return (
    <div className={`mt-7 flex flex-col dark:text-gray-200`}>
      {props.children}
    </div>
  );
}
