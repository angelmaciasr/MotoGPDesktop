-- Eliminación de tablas si existen (en orden inverso por las claves foráneas)
DROP TABLE IF EXISTS Observacion_Resultado;
DROP TABLE IF EXISTS Observacion;
DROP TABLE IF EXISTS Resultado;
DROP TABLE IF EXISTS Usuario;

-- Tabla para almacenar los datos de los Usuario que hacen la prueba
CREATE TABLE Usuario (
    ID_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Profesion VARCHAR(100),
    Edad INT,
    Genero Enum('Masculino', 'Femenino', 'Otro'),
    Pericia_Informatica INT CHECK (Pericia_Informatica >= 0 AND Pericia_Informatica <= 10),
);

-- Tabla con los Resultado del test de usabilidad realizado por el usuario
CREATE TABLE Resultado (
    ID_Resultado INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    Dispositivo VARCHAR(50),
    Tiempo_Completado TIME,
    Completada BOOLEAN,
    Comentarios_Usuario TEXT,
    Propuestas_Mejora TEXT,
    Valoracion DECIMAL(3,1) CHECK (Valoracion >= 0 AND Valoracion <= 10),
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE
);

-- Tabla de Observacion del facilitador con los comentarios al test de usabilidad
CREATE TABLE Observacion (
    ID_Observacion INT AUTO_INCREMENT PRIMARY KEY,
    ID_Usuario INT NOT NULL,
    Comentarios_Facilitador TEXT,
    FOREIGN KEY (ID_Usuario) REFERENCES Usuario(ID_Usuario) ON DELETE CASCADE
);

-- Tabla intermedia para relacionar Resultado con Observacion específicas
CREATE TABLE Observacion_Resultado (
    ID_Resultado INT NOT NULL,
    ID_Observacion INT NOT NULL,
    PRIMARY KEY (ID_Resultado, ID_Observacion),
    FOREIGN KEY (ID_Resultado) REFERENCES Resultado(ID_Resultado) ON DELETE CASCADE,
    FOREIGN KEY (ID_Observacion) REFERENCES Observacion(ID_Observacion) ON DELETE CASCADE
);
