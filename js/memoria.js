"use strict";

class Memoria {
  constructor() {
    this.tablero_bloqueado = true;
    this.primera_carta = null;
    this.segunda_carta = null;

    this.barajarCartas();
  }

  voltearCarta(carta) {
    carta.dataset.estado = "volteada";
  }

  barajarCartas() {
    const main = document.querySelector("main");
    const cartas = Array.from(document.querySelectorAll("main article"));

    for (let i = cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cartas[i], cartas[j]] = [cartas[j], cartas[i]];
    }

    cartas.forEach((carta) => {
      main.appendChild(carta);
    });
  }

  reiniciarAtributos() {
    this.tablero_bloqueado = true;
    this.primera_carta = null;
    this.segunda_carta = null;
  }

  deshabilitarCartas() {
    this.primera_carta.dataset.estado = "revelada";

    this.segunda_carta.dataset.estado = "revelada";

    this.reiniciarAtributos();

    this.comprobarJuego();
  }

  comprobarJuego() {
    const cartas = document.querySelectorAll("main article");

    Array.from(cartas).forEach((carta) => {
      if (carta.dataset.estado !== "revelada") {
        return;
      }
    });

    console.log("¡Felicidades! Has ganado el juego.");
  }
}
