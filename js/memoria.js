"use strict";

class Memoria {
  constructor() {
    this.tablero_bloqueado = true;
    this.primera_carta = null;
    this.segunda_carta = null;

    this.barajarCartas();

    this.tablero_bloqueado = false;
  }

  voltearCarta(carta) {
    if (this.tablero_bloqueado) return;
    if (carta.dataset.estado === "volteada") return;
    if (carta.dataset.estado === "revelada") return;

    carta.dataset.estado = "volteada";

    if (this.primera_carta === null) {
      this.primera_carta = carta;
      return;
    }

    this.segunda_carta = carta;
    this.comprobarPareja();
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
    this.tablero_bloqueado = false;
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

    var finished = true;
    Array.from(cartas).forEach((carta) => {
      console.log(carta.dataset.estado);
      if (carta.dataset.estado !== "revelada") {
        finished = false;
        return;
      }
    });

    if (finished) {
      console.log("¡Felicidades! Has ganado el juego.");
    }
  }

  cubrirCartas() {
    this.tablero_bloqueado = true;

    setTimeout(() => {
      this.primera_carta.dataset.estado = null;
      this.segunda_carta.dataset.estado = null;
      this.reiniciarAtributos();
    }, 1500);
  }

  comprobarPareja() {
    this.primera_carta.children[1].getAttribute("alt") ===
    this.segunda_carta.children[1].getAttribute("alt")
      ? this.deshabilitarCartas()
      : this.cubrirCartas();
  }
}
