<?php

class Clasificaciones {

    public function __construct() {
        $this->documentos = "xml/circuitoEsquema.xml";
    }

    public function consultar(){
      $datos = file_get_contents($this->documentos);
      if ($datos === false) {
          throw new Exception("No se pudo leer el archivo XML.");
      }

      //convertir a objeto xml
      $xml = new SimpleXMLElement($datos);

      echo "<h3>Vencedor de " . $xml['nombre'] . "</h3>";
      echo "<p><strong>" . $xml->vencedor . "</strong> - Tiempo: " . $xml->vencedor['tiempo'] . "</p>";

      echo "<h3>Clasificación del Mundial tras la Carrera</h3>";

      echo "<ol>";
      foreach ($xml->clasificados->piloto as $piloto) {
          echo "<li>" . $piloto . " - " . $piloto['puntos'] . " puntos</li>";
      }
      echo "</ol>";
    }
}

$clasificaciones = new Clasificaciones();
?>



<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>MotoGP-Clasificaciones</title>
    <meta name="author" content="Ángel Macías" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/favicon-clasificaciones.ico" />
  </head>
  <body>
    <header>
      <h1><a href="index.html">MotoGP Desktop</a></h1>

      <nav>
        <a href="index.html" title="Página de inicio">Inicio</a>
        <a href="piloto.html" title="Información sobre pilotos">Piloto</a>
        <a href="circuito.html" title="Información sobre circuitos">Circuito</a>
        <a href="meteorologia.html" title="Información sobre meteorología"
          >Meteorología</a
        >
        <a
          href="clasificaciones.php"
          title="Clasificaciones actuales"
          class="active"
          >Clasificaciones</a
        >
        <a href="juegos.html" title="Juegos relacionados con MotoGP">Juegos</a>
        <a href="ayuda.html" title="Página de ayuda">Ayuda</a>
      </nav>
    </header>
    <p>
      Estás en: <a href="index.html">Inicio</a> >>
      <strong>Clasificaciones</strong>
    </p>

    <h2>Sección de Clasificaciones</h2>

    <main>
      <?php
        $clasificaciones->consultar();
      ?>
    </main>
  </body>
</html>
