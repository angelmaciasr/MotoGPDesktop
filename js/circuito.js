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
            var innerHtml = node.innerHTML.replaceAll(
              'srcset="',
              'srcset="xml/'
            );

            innerHtml = innerHtml.replaceAll('src="', 'src="xml/');
            node.innerHTML = innerHtml;
          }

          // cambiar el src de los videos para que apunten a la carpeta xml
          if (node.nodeName === "VIDEO") {
            const innerHtml = node.innerHTML.replaceAll('src="', 'src="xml/');
            node.innerHTML = innerHtml;
          }

          $("body").append($(node));
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
    $("body").append(svgTitle);

    $("body").append($(elementoSVG));
  }
}

class CargadorKML {
  leerArchivoKML(files) {
    var archivo = files[0];

    var lector = new FileReader();
    lector.onload = (e) => this.insertarCapaKML(e.target.result);
    lector.readAsText(archivo);
  }

  insertarCapaKML(kmlContent) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(kmlContent, "application/xml");

    const data = doc.children[0].children[0].children;
    const placemarks = Array.from(data).filter(
      (node) => node.nodeName === "Placemark"
    );

    // console.log(placemarks[0].children[1].children[0].textContent); ===> 145.232152,-38.502630,15
    const coordenadas =
      placemarks[0].children[1].children[0].textContent.split(",");
    const coordenadasInicio = new google.maps.LatLng(
      coordenadas[1], // latitud
      coordenadas[0] // longitud
    );

    const mapContainer = $("<div>");

    var mapOptions = {
      zoom: 15,
      center: coordenadasInicio,
      mapId: "myMap",
    };
    const mapa = new google.maps.Map(mapContainer[0], mapOptions);

    // marcador
    const marcadorInicio = new google.maps.marker.AdvancedMarkerElement({
      position: coordenadasInicio,
      map: mapa,
      title: placemarks[0].children[0].textContent,
    });

    // poliínea

    var coordsPath = [];
    var meanLat = 0;
    var meanLng = 0;
    Array.from(placemarks).forEach((pm) => {
      const coords = pm.children[1].children[0].textContent.split(",");

      meanLat += parseFloat(coords[1]);
      meanLng += parseFloat(coords[0]);

      coordsPath.push({
        lat: parseFloat(coords[1]), // latitud
        lng: parseFloat(coords[0]), // longitud
      });
    });

    meanLat /= placemarks.length;
    meanLng /= placemarks.length;
    mapa.setCenter(new google.maps.LatLng(meanLat, meanLng));

    const polyline = new google.maps.Polyline({
      path: coordsPath,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    polyline.setMap(mapa);

    $("body").append(mapContainer);
  }
}

const circuito = new Circuito();
const cargadorSVG = new CargadorSVG();
const cargadorKML = new CargadorKML();
