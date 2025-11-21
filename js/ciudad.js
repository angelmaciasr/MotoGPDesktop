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

    const meteoURL = `https://archive-api.open-meteo.com/v1/archive?latitude=-38.50263&longitude=145.232152&start_date=2025-10-19&end_date=2025-10-19&daily=sunrise,sunset&hourly=temperature_2m,rain,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m&timezone=Australia%2FSydney&temporal_resolution=hourly_1`;

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
    const section = $("<section>").html("<h3>Meteorología en Carrera</h3>");

    // diary info
    const salidaSol = data.daily.sunrise[0];
    const salidaSolString = salidaSol.split("T");
    const puestaSol = data.daily.sunset[0];
    const puestaSolString = puestaSol.split("T");

    const diary = $("<ul>").html(`
      <li>Salida del sol: ${salidaSolString[0].replace("-", "/")} - ${
      salidaSolString[1]
    }</li>
      <li>Puesta del sol: ${puestaSolString[0].replace("-", "/")} - ${
      puestaSolString[1]
    }</li>
    <li>Datos horarios cada 3 horas</li>
    `);

    section.append(diary);

    const hourlyList = $("<ul>");
    // hourly info
    for (let i = 0; i < data.hourly.time.length; i += 1) {
      const hora = $("<ul>").html(`
        <li>Temperatura a 2m: ${data.hourly.temperature_2m[i]} ${data.hourly_units.temperature_2m}</li>
        <li>Sensación térmica: ${data.hourly.apparent_temperature[i]} ${data.hourly_units.apparent_temperature}</li>
        <li>Lluvia: ${data.hourly.rain[i]} ${data.hourly_units.rain}</li>
        <li>Humedad relativa a 2m: ${data.hourly.relative_humidity_2m[i]} ${data.hourly_units.relative_humidity_2m}</li>
        <li>Velocidad del viento a 10m: ${data.hourly.wind_speed_10m[i]} ${data.hourly_units.wind_speed_10m}</li>
        <li>Dirección del viento a 10m: ${data.hourly.wind_direction_10m[i]} ${data.hourly_units.wind_direction_10m}</li>
      `);
      const hourlyTitle = data.hourly.time[i].split("T");
      const dayTitle = hourlyTitle[0].replace("-", "/");
      const title = $("<h5>").text(`${dayTitle} - ${hourlyTitle[1]}`);
      hora.prepend(title);
      hourlyList.append(hora);
    }
    section.append(hourlyList);
    $("body").append(section);
  }

  getMeteorologiaEntrenos() {
    // temperatura a 2 metros del suelo
    // lluvia
    // humedad relativa a 2 metros del suelo
    // velocidad del viento a 10 metros del suelo

    const meteoURL = `https://archive-api.open-meteo.com/v1/archive?latitude=-38.50263&longitude=145.232152&start_date=2025-10-16&end_date=2025-10-18&hourly=temperature_2m,rain,relative_humidity_2m,wind_speed_10m&timezone=Australia%2FSydney&temporal_resolution=hourly_1`;

    $.ajax({
      dataType: "json",
      url: meteoURL,
      method: "GET",
      success: (datos) => {
        this.procesarJSONEntrenos(datos);
      },
      error: function (err) {
        console.log("Error: ", err);
      },
    });
  }

  procesarJSONEntrenos(data) {
    console.log(data);

    const mediaRain =
      data.hourly.rain.reduce((a, b) => a + b, 0) / data.hourly.rain.length;

    const mediaHumidity =
      data.hourly.relative_humidity_2m.reduce((a, b) => a + b, 0) /
      data.hourly.relative_humidity_2m.length;

    const mediaTemp =
      data.hourly.temperature_2m.reduce((a, b) => a + b, 0) /
      data.hourly.temperature_2m.length;

    const mediaWind =
      data.hourly.wind_speed_10m.reduce((a, b) => a + b, 0) /
      data.hourly.wind_speed_10m.length;

    const section = $("<section>").html("<h3>Meteorología en Entrenos</h3>");

    const summary = $("<ul>").html(`
      <li>Media de lluvia: ${mediaRain.toFixed(2)} ${
      data.hourly_units.rain
    }</li>
      <li>Media de humedad relativa a 2m: ${mediaHumidity.toFixed(2)} ${
      data.hourly_units.relative_humidity_2m
    }</li>
      <li>Media de temperatura a 2m: ${mediaTemp.toFixed(2)} ${
      data.hourly_units.temperature_2m
    }</li>
      <li>Media de velocidad del viento a 10m: ${mediaWind.toFixed(2)} ${
      data.hourly_units.wind_speed_10m
    }</li>
    `);

    section.append(summary);
    $("body").append(section);
  }
}
