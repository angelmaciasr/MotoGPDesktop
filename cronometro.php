<?php

session_start();

class Cronometro {

    private $tiempo;
    private $inicio;

    public function __construct(){
        $this->tiempo = 0;
    }

    public function arrancar(){
        $this->inicio = microtime(true);
    }

    public function parar(){
        $ahora = microtime(true);
        $this->tiempo = $ahora - $this->inicio;
    }

    public function mostrar(){
        $tiempo_total = $this->tiempo;
        $minutos = floor($tiempo_total / 60);
        $segundos = floor($tiempo_total) % 60;
        $decimas = round(($tiempo_total - floor($tiempo_total)) * 10);

        echo "Tiempo transcurrido --> " . str_pad($minutos, 2, "0", STR_PAD_LEFT) . ":" . str_pad($segundos, 2, "0", STR_PAD_LEFT) . "." . $decimas;
    }
}

// Recuperar o crear el cronómetro desde la sesión
if (!isset($_SESSION['cronometro'])) {
    $_SESSION['cronometro'] = new Cronometro();
}
$cronometro = $_SESSION['cronometro'];

?>

<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <title>MotoGP-Cronometro</title>
    <meta name="author" content="Ángel Macías" />
    <meta name="description" content="" />
    <meta name="keywords" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="icon" href="multimedia/favicon-juegos.ico" />
    <script src="js/mobile_menu.js"></script>

  </head>
  <body>
    <header>
      <h1><a href="index.html">MotoGP Desktop</a></h1>

      <button onclick="menu.showMenu()">☰</button> 

      <nav>
        <a href="index.html" title="Página de inicio">Inicio</a>
        <a href="piloto.html" title="Información sobre pilotos">Piloto</a>
        <a href="circuito.html" title="Información sobre circuitos">Circuito</a>
        <a href="meteorologia.html" title="Información sobre meteorología"
          >Meteorología</a
        >
        <a href="clasificaciones.php" title="Clasificaciones actuales"
          >Clasificaciones</a
        >
        <a href="juegos.html" title="Juegos relacionados con MotoGP">Juegos</a>
        <a href="ayuda.html" title="Página de ayuda" >Ayuda</a>
      </nav>
    </header>

    <p>Estás en: <a href="index.html">Inicio</a> >> <strong>Cronometro</strong></p>

    <main>
      <form method="POST">
        <label for="iniciar" class="button">Iniciar el cronómetro</label>
        <input type='submit' class='button' name='iniciar' value='Iniciar'/>
        <label for="parar" class="button">Parar el cronómetro</label>
        <input type='submit' class='button' name='parar' value='Parar'/>
        <label for="mostrar" class="button">Mostrar el cronómetro</label>
        <input type='submit' class='button' name='mostrar' value='Mostrar'/>
      </form>

      <?php
        //Solo se ejecutará si se ha pulsado un botón
        if (count($_POST)>0)
            {
                if(isset($_POST['iniciar'])) $cronometro->arrancar();
                if(isset($_POST['parar'])) $cronometro->parar();
                if(isset($_POST['mostrar'])) $cronometro->mostrar();

                // Guardar el cronómetro de nuevo en la sesión
                $_SESSION['cronometro'] = $cronometro;
            }
      ?>
    </main>

  </body>
</html>