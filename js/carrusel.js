"use strict";

class Carrusel {
  constructor() {
    this.busqueda = "MotoGP"; //string para contener el término de búsqueda en la llamada a la API de Flickr
    this.actual = 0; //indicará el número de foto actual que se visualiza en el carrusel. Valor inicial 0.
    this.maximo = 4; // indicará el número de fotos del carrusel. Valor inicial 4.
  }

  getFotografias() {
    // z -> 640 px en el borde más grande

    var flickrAPI =
      "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

    $.ajax({
      dataType: "json",
      url: flickrAPI,
      method: "GET",
      data: {
        tags: "motogp,phillipisland",
        tagmode: "all",
        format: "json",
      },
      success: function (data) {
        // Convertir todas las fotos al formato _z (640px)
        data.items.forEach(function (item) {
          // Cambiar _m.jpg por _z.jpg en la URL
          item.media.m = item.media.m.replace("_m.jpg", "_z.jpg");
        });

        this.procesarJSONFotografias(data);
      }.bind(this),
      error: function (err) {
        console.log("ERROR EN LA LLAMADA: ", err);
      },
    });
  }

  procesarJSONFotografias(fotos) {
    const first5 = fotos.items.slice(0, this.maximo + 1); // Obtener las primeras 5 fotos

    this.mostrarFotografias(first5);
  }

  mostrarFotografias(fotos) {
    const primeraFoto = fotos[0];
    $("article").remove(); // eliminar artículo vacío
    const article = $("<article>");

    const h2 = $("<h2>").text("Imágenes del circuito de Phillip Island");

    const foto = $(`<img>`).attr("src", primeraFoto.media.m);
    foto.attr("alt", primeraFoto.title);

    article.append(h2, foto);
    $("main").append(article);

    setInterval(this.cambiarFotografia.bind(this, fotos), 3000);
  }

  cambiarFotografia(fotos) {
    const siguiente = this.actual + 1 > this.maximo ? 0 : this.actual + 1;

    // cambiar src y alt de la imagen
    $("article img").attr("src", fotos[siguiente].media.m);
    $("article img").attr("alt", fotos[siguiente].title);

    this.actual = siguiente;
  }
}
