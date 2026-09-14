type DadoProps = {
  valor: number;
};

export default function Dado({ valor }: DadoProps) {
  return (
    <img
      className="dado"
      src={`/dados/dado-${valor}.jpeg`}
      alt={`Dado mostrando o número ${valor}`}
    />
  );
}