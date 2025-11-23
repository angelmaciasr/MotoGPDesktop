import xml.etree.ElementTree as ET

def prologoHTML(archivo):
    # head
    archivo.write('<!DOCTYPE html>\n')
    archivo.write('<html lang="es">\n')
    archivo.write('<head>\n')
    archivo.write('<meta charset="UTF-8">\n')
    archivo.write('<title>MotoGP-Datos Circuito</title>\n')
    archivo.write('<meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
    archivo.write('<link rel="stylesheet" href="../estilo/estilo.css">\n')
    archivo.write('</head>\n')
    
    # body
    archivo.write('<body>\n')

def datosCircuito(archivo, circuito):
    archivo.write('<h2>Circuito</h2>\n')
    archivo.write('<ul>\n')
    archivo.write(f'<li>Nombre: {circuito.get("nombre")}</li>\n')
    archivo.write(f'<li>Numero de Vueltas: {circuito.get("n_vueltas")}</li>\n')
    archivo.write(f'<li>Patrocinador: {circuito.get("patrocinador")}</li>\n')
    archivo.write(f'<li>Fecha: {circuito.get("fecha")}</li>\n')
    archivo.write(f'<li>Hora: {circuito.get("hora")}</li>\n')
    archivo.write('</ul>\n')


def referencias(archivo, circuito):
    referencias = circuito.findall('.//{http://www.uniovi.es}referencias/{http://www.uniovi.es}referencia')
    archivo.write('<h2>Referencias</h2>\n')
    archivo.write('<ul>\n')
    for referencia in referencias:
        archivo.write(f'<li><a href="{referencia.get("url")}">{referencia.text}</a></li>\n')
    archivo.write('</ul>\n')


def galeriaFotos(archivo, circuito):
    fotos = circuito.findall('.//{http://www.uniovi.es}g_fotos/{http://www.uniovi.es}foto')
    archivo.write('<h2>Galeria de Fotos</h2>\n')
    for foto in fotos:
        archivo.write('<picture>\n')
        # small img
        smallImgSrc = foto.get("source").replace(".jpg","-300px.jpg")
        archivo.write(f'<source media="(max-width: 600px)" srcset="{smallImgSrc}">\n')
        # medium img
        mediumImgSrc = foto.get("source").replace(".jpg","-600px.jpg")
        archivo.write(f'<source media="(max-width: 999px)" srcset="{mediumImgSrc}">\n')
        # default img
        archivo.write(f'<source media="(min-width: 1000px)" srcset="{foto.get("source")}">\n')
        archivo.write(f'<img src="{foto.get("source")}" alt="{foto.get("alt")}"/>\n')
        archivo.write('</picture>\n')

def galeriaVideos(archivo, circuito):
    videos = circuito.findall('.//{http://www.uniovi.es}g_videos/{http://www.uniovi.es}video')
    archivo.write('<h2>Galeria de Videos</h2>\n')
    for video in videos:
        archivo.write(f'<video controls preload="auto">\n<source src="{video.get("source")}" type="{video.get("type")}">{video.text}</video>\n')


def clasificados(archivo, circuito):
    clasificados = circuito.findall('.//{http://www.uniovi.es}clasificados/{http://www.uniovi.es}piloto')
    archivo.write('<h2>Clasificacion tras Carrera</h2>\n')
    archivo.write('<ul>\n')
    for piloto in clasificados:
        archivo.write(f'<li>{piloto.get("posicion")}. {piloto.text} ({piloto.get("puntos")} puntos)</li>\n')
    archivo.write('</ul>\n')

def epilogoHTML(archivo):
    archivo.write('</body>\n')
    archivo.write('</html>\n')


def main():
    fileName = input("Introduzca el nombre del archivo xml    = ")

    try:
        entrada = open(fileName,'r')
    except IOError:
        print ('No se encuentra el archivo ', fileName)
        exit()

    circuito = ET.parse(fileName).getroot()

        
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.html) = ")
    try:
        salida = open(nombreSalida + ".html",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".html")
        exit()

    prologoHTML(salida)

    # circuito
    datosCircuito(salida, circuito)

    # longitud
    longitud_element = circuito.find('.//{http://www.uniovi.es}longitud')
    salida.write('<h2>Longitud del circuito</h2>\n')
    salida.write(f'<p>{longitud_element.text} {longitud_element.get("unidad")}</p>\n')

    # anchura
    anchura_element = circuito.find('.//{http://www.uniovi.es}anchura')
    salida.write('<h2>Anchura del circuito</h2>\n')
    salida.write(f'<p>{anchura_element.text} {anchura_element.get("unidad")}</p>\n')

    # localización
    localizacion_element = circuito.find('.//{http://www.uniovi.es}localizacion/{http://www.uniovi.es}localidad_proxima')
    salida.write('<h2>Localizacion</h2>\n')
    salida.write(f'<p>{localizacion_element.text}; {localizacion_element.get("pais")}</p>\n')

    # referencias
    referencias(salida, circuito)

    # galería de fotos
    galeriaFotos(salida, circuito)
    
    # galería de videos
    galeriaVideos(salida, circuito)
    
    # vencedor
    vencedor_element = circuito.find('.//{http://www.uniovi.es}vencedor')
    salida.write('<h2>Vencedor del Gran Premio</h2>\n')
    salida.write(f'<p>{vencedor_element.text}</p>\n')
    salida.write(f'<p>Tiempo final - {vencedor_element.get("tiempo")}</p>\n')


    # clasificados
    clasificados(salida, circuito)

    epilogoHTML(salida)

    entrada.close()
    salida.close()

    print("Archivo generado correctamente: ", nombreSalida + ".html")


if __name__ == "__main__":
    main()