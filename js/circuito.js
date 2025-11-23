"use strict";

class Circuito {
  constructor() {
    this.comprobarApiFile();
  }

  comprobarApiFile() {
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
      const msg = document.createElement("p");
      msg.textContent =
        "The File APIs are not fully supported in this browser.";
      document.body.appendChild(msg);
      return;
    }
    console.log("The File APIs are supported in this browser.");
  }

  leerArchivoHTML(files) {
    var archivo = files[0];

    var tipoTexto = /text.*/;
    if (archivo.type.match(tipoTexto)) {
      var lector = new FileReader();

      lector.onload = function () {
        const parser = new DOMParser();
        var doc = parser.parseFromString(lector.result, "text/html");

        Array.from(doc.body.children).forEach((node) => {
          // cambiar el srcset de las imágenes para que apunten a la carpeta xml
          if (node.nodeName === "PICTURE") {
            const innerHtml = node.innerHTML.replaceAll(
              'srcset="',
              'srcset="xml/'
            );
            node.innerHTML = innerHtml;
          }

          // cambiar el src de los videos para que apunten a la carpeta xml
          if (node.nodeName === "VIDEO") {
            const innerHtml = node.innerHTML.replaceAll('src="', 'src="xml/');
            node.innerHTML = innerHtml;
          }

          $("main").append($(node));
        });
      };
      lector.readAsText(archivo);
    } else {
      alert("El archivo no es de tipo texto.");
    }
  }
}

class CargadorSVG {
  leerArchivoSVG(files) {
    var archivo = files[0];

    if (archivo && archivo.type === "image/svg+xml") {
      var lector = new FileReader();

      lector.onload = (e) => this.insertarSVG(e.target.result);
      lector.readAsText(archivo);
    } else {
      alert("El archivo no es de tipo SVG.");
    }
  }

  insertarSVG(svgContent) {
    const parser = new DOMParser();
    const docSVG = parser.parseFromString(svgContent, "image/svg+xml");

    const elementoSVG = docSVG.documentElement;

    const svgTitle = $("<h3>").text("SVG con Altimetría del Circuito");
    $("main").append(svgTitle);

    $("main").append($(elementoSVG));
  }
}

const circuito = new Circuito();
const cargadorSVG = new CargadorSVG();
