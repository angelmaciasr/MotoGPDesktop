"use strict";

class Ciudad {
  #nombre;
  #pais;
  #gentilicio;

  constructor(nombre, pais, gentilicio) {
    this.#nombre = nombre;
    this.#pais = pais;
    this.#gentilicio = gentilicio;

    this.cantidad_poblacion;
    this.coord_punto_central;
  }

  fillCityAttr(cantidad_poblacion, coord_punto_central) {
    this.cantidad_poblacion = cantidad_poblacion;
    this.coord_punto_central = coord_punto_central;
  }

  getCityName() {
    return this.#nombre;
  }

  getCountryName() {
    return this.#pais;
  }

  getCityAdditionalInfo() {
    return `<ul>
      <li>Gentilicio: ${this.#gentilicio}</li>
      <li>Población: ${this.cantidad_poblacion}</li>
    </ul>`;
  }

  writeCityCoords() {
    const p = document.createElement("p");

    p.innerText = `Coordenadas: ${this.coord_punto_central.lat}, ${this.coord_punto_central.lng}`;

    document.body.appendChild(p);

    // DOCUMENT WRITE REPLACED
    // document.write(
    //   `<p>Coordenadas: ${this.coord_punto_central.lat}, ${this.coord_punto_central.lng}</p>`
    // );
  }

  getMeteorologiaCarrera() {
    // franjas horarias del día de la carrera
    // temperatura a 2 metros del suelo
    // sensación térmica
    // lluvia
    // humedad relativa a 2 metros del suelo
    // velocidad del viento a 10 metros del suelo
    // dirección del viento a 10 metros del suelo
    // hora de salida del sol
    // hora de puesta del sol

    const meteoURL = `https://archive-api.open-meteo.com/v1/archive?latitude=-38.50263&longitude=145.232152&start_date=2025-10-19&end_date=2025-10-19&daily=sunrise,sunset&hourly=temperature_2m,rain,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=Australia%2FSydney&temporal_resolution=hourly_3`;

    $.ajax({
      dataType: "json",
      url: meteoURL,
      method: "GET",
      success: (datos) => {
        this.procesarJSONCarrera(datos);
      },
      error: function (err) {
        console.log("Error: ", err);
      },
    });
  }

  procesarJSONCarrera(data) {
    // diario
    const section = $("<section>");

    // diary info
    const diary = $("<ul>").html(`
      <li>Salida del sol: ${data.daily.sunrise[0]}</li>
      <li>Puesta del sol: ${data.daily.sunset[0]}</li>
    `);

    section.append(diary);

    const hourlyList = $("<ul>");
    // hourly info
    for (let i = 0; i < data.hourly.time.length; i += 1) {
      const hora = $("ul>").html(`
        <li>Hora: ${data.hourly.time[i]}</li>
        <li>Temperatura a 2m: ${data.hourly.temperature_2m[i]} °C</li>
        <li>Sensación térmica: ${data.hourly.apparent_temperature[i]} °C</li>
        <li>Lluvia: ${data.hourly.rain[i]} mm</li>
        <li>Humedad relativa a 2m: ${data.hourly.relative_humidity_2m[i]} %</li>
        <li>Velocidad del viento a 10m: ${data.hourly.wind_speed_10m[i]} km/h</li>
        <li>Dirección del viento a 10m: ${data.hourly.wind_direction_10m[i]} °</li>
      `);

      hourlyList.append(hora);
    }
    section.append(hourlyList);
    $("body").append(section);
  }
}
