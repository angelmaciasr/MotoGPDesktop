"use strict";

class Noticias {
  // API KEY = FrHC5GroSiVb1bWuK5f2Yl5Z3gMIDHv7NK6wTuGl
  constructor() {
    this.busqueda = "Phillip island, MotoGP"; // sstring para contener el término de búsqueda en la llamada a la API TheNewsAPI

    //maybe change top ep for all
    this.url =
      "https://api.thenewsapi.com/v1/news/top?api_token=FrHC5GroSiVb1bWuK5f2Yl5Z3gMIDHv7NK6wTuGl"; //string con la parte fija de la URL de la API de TheNewsAPI
  }

  async buscar() {
    try {
      const url = this.url + `&language=en,es,&search=${this.busqueda}`;
      const respuesta = await fetch(url);

      if (!respuesta.ok) {
        throw new Error(`HTTP error! status: ${respuesta.status}`);
      }

      const data = await respuesta.json();

      this.procesarInformacion(data);
    } catch (error) {
      console.error("Error fetching news:", error);
      return null;
    }
  }

  procesarInformacion(data) {
    const news = data.data;

    // titular, entradilla, enlace y fuente
    const noticiasContainer = $("<article>").html("<h2>Noticias</h2>");

    news.forEach((noticia) => {
      const titular = noticia.title;
      const entradilla = noticia.description;
      const enlace = noticia.url;
      const fuente = noticia.source;

      const noticiaHTML = $("<section>").html(
        `<h3>${titular}</h3>
            <p>${entradilla}</p>
            <p><a href="${enlace}" target="_blank">Leer más</a></p>
            <p><em>Fuente: ${fuente}</em></p>
            `
      );

      noticiasContainer.append(noticiaHTML);
    });
    $("main").append(noticiasContainer);
  }
}
