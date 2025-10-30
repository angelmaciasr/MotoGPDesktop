"use strict";

class Ciudad {
  constructor(nombre, pais, gentilicio) {
    this.nombre = nombre;
    this.pais = pais;
    this.gentilicio = gentilicio;

    this.cantidad_poblacion;
    this.coord_punto_central;
  }

  fillCityAttr(cantidad_poblacion, coord_punto_central) {
    this.cantidad_poblacion = cantidad_poblacion;
    this.coord_punto_central = coord_punto_central;
  }

  getCityName() {
    return this.nombre;
  }

  getCountryName() {
    return this.pais;
  }

  getCityAdditionalInfo() {
    return `<ul>
      <li>Gentilicio: ${this.gentilicio}</li>
      <li>Población: ${this.cantidad_poblacion}</li>
    </ul>`;
  }

  writeCityCoords() {
    document.write(
      `<p>Coordenadas: ${this.coord_punto_central.lat}, ${this.coord_punto_central.lng}</p>`
    );
  }
}
