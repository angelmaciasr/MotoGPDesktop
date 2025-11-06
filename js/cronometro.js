"use strict";

class Cronometro {
  constructor() {
    this.tiempo = 0;
  }

  arrancar() {
    try {
      this.inicio = Temporal.Now.instant().epochMilliseconds; // Returns the current time in milliseconds.
    } catch (error) {
      console.error("Error al arrancar el cronómetro:", error);
      this.inicio = Date.now(); // Returns the time in milliseconds
    }

    console.log("Cronómetro arrancado en:", this.inicio);

    this.corriendo = setInterval(this.actualizar.bind(this), 100);
  }

  actualizar() {
    var now = Date.now();

    this.tiempo = now - this.inicio;

    this.mostrar();
  }

  mostrar() {
    // mm:ss.s
    const minutos = parseInt(this.tiempo / 60000);
    const segundos = ((this.tiempo % 60000) / 1000).toFixed(1);

    const dateString = `${String(minutos).padStart(2, "0")}:${String(
      segundos
    ).padStart(4, "0")}`;

    const parrafoCronometro = document.querySelector("main p");

    parrafoCronometro.textContent = dateString;
  }

  parar() {
    clearInterval(this.corriendo);
  }

  reiniciar() {
    this.parar();

    this.tiempo = 0;

    this.mostrar();
  }

  addEventos() {
    const botones = document.querySelectorAll("main button");

    botones[0].addEventListener("click", () => {
      this.arrancar();
    });

    botones[1].addEventListener("click", () => {
      this.parar();
    });

    botones[2].addEventListener("click", () => {
      this.reiniciar();
    });
  }
}
