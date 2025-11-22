import xml.etree.ElementTree as ET


def prologoSVG(archivo, maxX, maxY):
    # <svg viewBox="0 0 357.5 410" xmlns="http://www.w3.org/2000/svg">
    archivo.write(f'<svg viewBox="0 0 {maxX} {maxY}" xmlns="http://www.w3.org/2000/svg">\n')
    archivo.write('<polyline points = "')

def epilogoPolilineaSVG(archivo):
    archivo.write('"\n')
    archivo.write('style="fill:lightyellow;stroke:red;stroke-width:2" />\n')

def epilogoSVG(archivo):
    archivo.write("</svg>\n")

def textoSVG(archivo, x, y, texto):
    archivo.write('<text x="' + x + '" y="' + y + '" style="writing-mode: tb; glyph-orientation-vertical: 0;">\n')
    archivo.write(texto + "\n")
    archivo.write('</text>\n')

def main():
    fileName = input("Introduzca el nombre del archivo xml    = ")

    try:
        entrada = open(fileName,'r')
    except IOError:
        print ('No se encuentra el archivo ', fileName)
        exit()

    circuito = ET.parse(fileName).getroot()

        
    nombreSalida  = input("Introduzca el nombre del archivo generado (*.svg) = ")
    try:
        salida = open(nombreSalida + ".svg",'w')
    except IOError:
        print ('No se puede crear el archivo ', nombreSalida + ".kml")
        exit()

    comienzoTexto = "210" # altura máxima

    #Polilinea
    comienzoPoligonoX = 10
    
    comienzoAltitud = "200"
    svgText = ""
    svgText += str(comienzoPoligonoX) + "," + comienzoAltitud + "\n"
    

    # Punto de Inicio
    altitudCircuito = circuito.find('.//{http://www.uniovi.es}punto_origen/{http://www.uniovi.es}altitud_origen').text
    svgText += str(comienzoPoligonoX) + "," + str(float(comienzoAltitud) - float(altitudCircuito)) + "\n"


    incrementoX = 5
    puntos = circuito.findall('.//{http://www.uniovi.es}puntos_circuito/{http://www.uniovi.es}punto')
    ultimo_punto = puntos[-1]
    for punto_circuito in puntos:
        altitud = punto_circuito.find('.//{http://www.uniovi.es}altitud_punto').text
        distancia = punto_circuito.get("distancia")
        incrementoX += float(distancia) * 0.5  # Escala para que quepa en el SVG
        svgText += str(incrementoX) + "," + str((float(comienzoAltitud) - float(altitud))) + "\n" # multiplicar por 2 para identificar la altitud en el SVG

        if( punto_circuito == ultimo_punto ):
            prologoSVG(salida, str(incrementoX + 100), str(float(comienzoTexto) +200))

    salida.write(svgText)

    salida.write(str(incrementoX) + "," + comienzoAltitud + "\n") # poner el ultimo punto final para que la línea sea recta
    salida.write(str(comienzoPoligonoX) + "," + comienzoAltitud)
    epilogoPolilineaSVG(salida)


    #Texto polilinea
    # escribir la altitud
    salida.write('<text x="' + str(comienzoPoligonoX) + '" y="' + str(float(comienzoAltitud) - float(altitudCircuito)) + '">' + altitudCircuito + ' m</text>\n')


    incrementoX = 5
    anterior_sector = 0
    for punto_circuito in puntos:
        distancia = punto_circuito.get('distancia')
        incrementoX += float(distancia) * 0.5  # Escala para que
        
        # escribir nombre sectores cuando cambie porque los puntos son anónimos
        sector = punto_circuito.get("sector")
        if sector != anterior_sector:
            anterior_sector = sector
            textoSVG(salida, str(incrementoX), comienzoTexto, "Sector " + sector)
        

        # escribir la altitud
        altitud = punto_circuito.find('.//{http://www.uniovi.es}altitud_punto').text
        salida.write('<text x="' + str(incrementoX) + '" y="' + str(float(comienzoAltitud) - float(altitud)) + '">' + altitud + ' m</text>\n')

    # escribir los 0 metros
    salida.write('<text x="' + str(comienzoPoligonoX) + '" y="' + str(float(comienzoAltitud) - float(0)) + '">0 m</text>\n')

    epilogoSVG(salida)
    salida.close()
    entrada.close()


if __name__ == "__main__":
    main()