"use client";

import { useState } from "react";
import Dado from "./Dado";

type Jogador = 1 | 2;

export default function JogoDados() {
  const [rodada, setRodada] = useState(1);

  const [dadosJogador1, setDadosJogador1] = useState([1, 1]);
  const [dadosJogador2, setDadosJogador2] = useState([1, 1]);

  const [jogadorDaVez, setJogadorDaVez] = useState<Jogador>(1);

  const [resultado, setResultado] = useState(
    "Aguardando jogadas..."
  );

  const [placar, setPlacar] = useState({
    jogador1: 0,
    jogador2: 0,
    empates: 0,
  });

  const [partidaEncerrada, setPartidaEncerrada] = useState(false);

  function sortearDado() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function jogar(jogador: Jogador) {
    if (partidaEncerrada || jogador !== jogadorDaVez) {
      return;
    }

    const novosDados = [sortearDado(), sortearDado()];

    if (jogador === 1) {
      setDadosJogador1(novosDados);
      setJogadorDaVez(2);

      setResultado(
        "Jogador 1 jogou. Agora é a vez do Jogador 2!"
      );

      return;
    }

    setDadosJogador2(novosDados);

    const somaJogador1 =
      dadosJogador1[0] + dadosJogador1[1];

    const somaJogador2 =
      novosDados[0] + novosDados[1];

    let novoResultado = "";

    const novoPlacar = { ...placar };

    if (somaJogador1 > somaJogador2) {
      novoResultado = "Jogador 1 venceu a rodada!";
      novoPlacar.jogador1++;
    } else if (somaJogador2 > somaJogador1) {
      novoResultado = "Jogador 2 venceu a rodada!";
      novoPlacar.jogador2++;
    } else {
      novoResultado = "Empate na rodada!";
      novoPlacar.empates++;
    }

    setPlacar(novoPlacar);

    setResultado(
      `${novoResultado} (${somaJogador1} x ${somaJogador2})`
    );

    if (rodada === 5) {
      setPartidaEncerrada(true);
      return;
    }

    setTimeout(() => {
      setRodada((rodadaAtual) => rodadaAtual + 1);
      setJogadorDaVez(1);
      setResultado("Nova rodada! Jogador 1 começa.");
    }, 1500);
  }

  function jogarNovamente() {
    setRodada(1);

    setDadosJogador1([1, 1]);
    setDadosJogador2([1, 1]);

    setJogadorDaVez(1);

    setResultado("Aguardando jogadas...");

    setPlacar({
      jogador1: 0,
      jogador2: 0,
      empates: 0,
    });

    setPartidaEncerrada(false);
  }

  function resultadoFinal() {
    if (placar.jogador1 > placar.jogador2) {
      return "Jogador 1 venceu a partida!";
    }

    if (placar.jogador2 > placar.jogador1) {
      return "Jogador 2 venceu a partida!";
    }

    return "A partida terminou empatada!";
  }

  return (
    <main className="jogo-container">

      {/* CABEÇALHO */}
      <header className="cabecalho">
        <div className="titulo-container">
          <span className="titulo-dado"></span>

          <h1>Jogo de Dados</h1>
        </div>

        <p>
          5 rodadas • Quem fizer a maior soma vence!
        </p>
      </header>


      {/* PLACAR */}
      <section className="placar">

        <div className="placar-jogador">
          <span className="icone-placar">🏆</span>

          <div>
            <span>Jogador 1</span>
            <strong>{placar.jogador1}</strong>
          </div>
        </div>


        <div className="rodada-atual">
          Rodada {rodada} / 5
        </div>


        <div className="placar-jogador">
          <div>
            <span>Jogador 2</span>
            <strong>{placar.jogador2}</strong>
          </div>

          <span className="icone-placar">🏆</span>
        </div>


        <div className="empates">
          <span>🤝</span>

          <div>
            <span>Empates</span>
            <strong>{placar.empates}</strong>
          </div>
        </div>

      </section>


      {/* JOGADORES */}
      <section className="jogadores">

        {/* JOGADOR 1 */}
        <div
          className={`card-jogador ${
            jogadorDaVez === 1 && !partidaEncerrada
              ? "jogador-ativo"
              : ""
          }`}
        >

          <div className="nome-jogador">
            <span className="numero-jogador">1</span>

            <h2>Jogador 1</h2>
          </div>


          <div className="dados">

            <Dado valor={dadosJogador1[0]} />

            <Dado valor={dadosJogador1[1]} />

          </div>


          <div className="soma">
            <span>Soma:</span>

            <strong>
              {dadosJogador1[0] + dadosJogador1[1]}
            </strong>
          </div>


          <button
            className="botao-jogar"
            onClick={() => jogar(1)}
            disabled={
              jogadorDaVez !== 1 || partidaEncerrada
            }
          >
            🎲 Jogar Dados
          </button>

        </div>


        {/* INFORMAÇÃO CENTRAL */}
        <div className="mensagem-central">

          <div className="dados-icone">
            🎲🎲
          </div>

          <p>
            {jogadorDaVez === 1
              ? "Jogue os dados na sua vez e veja quem vence a rodada!"
              : "Agora é a vez do Jogador 2!"}
          </p>

        </div>


        {/* JOGADOR 2 */}
        <div
          className={`card-jogador ${
            jogadorDaVez === 2 && !partidaEncerrada
              ? "jogador-ativo"
              : ""
          }`}
        >

          <div className="nome-jogador">

            <span className="numero-jogador numero-2">
              2
            </span>

            <h2>Jogador 2</h2>

          </div>


          <div className="dados">

            <Dado valor={dadosJogador2[0]} />

            <Dado valor={dadosJogador2[1]} />

          </div>


          <div className="soma">
            <span>Soma:</span>

            <strong>
              {dadosJogador2[0] + dadosJogador2[1]}
            </strong>
          </div>


          <button
            className="botao-jogar"
            onClick={() => jogar(2)}
            disabled={
              jogadorDaVez !== 2 || partidaEncerrada
            }
          >
            🎲 Jogar Dados
          </button>

        </div>

      </section>


      {/* RESULTADO */}
      <section className="resultado">

        <div className="resultado-icone">
          🏆
        </div>

        <div>

          <strong>
            {partidaEncerrada
              ? resultadoFinal()
              : resultado}
          </strong>

          <span>
            {partidaEncerrada
              ? `Placar final: ${placar.jogador1} x ${placar.jogador2}`
              : jogadorDaVez === 1
                ? "Jogador 1 começa!"
                : "Jogador 2 deve jogar!"}
          </span>

        </div>

      </section>


      {/* JOGAR NOVAMENTE */}
      {partidaEncerrada && (
        <button
          className="botao-novamente"
          onClick={jogarNovamente}
        >
          ↻ &nbsp; Jogar Novamente
        </button>
      )}

    </main>
  );
}