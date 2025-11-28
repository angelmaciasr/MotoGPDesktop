-- Eliminación de tablas si existen (en orden inverso por las claves foráneas)
DROP TABLE IF EXISTS Observacion_Resultado;
DROP TABLE IF EXISTS Observaciones;
DROP TABLE IF EXISTS Resultados;
DROP TABLE IF EXISTS Usuarios;

-- Tabla para almacenar los datos de los usuarios que hacen la prueba
CREATE TABLE Usuarios (
    Codigo_Usuario INT AUTO_INCREMENT PRIMARY KEY,
    Profesion VARCHAR(100),
    Edad INT,
    Genero VARCHAR(50),
    Pericia_Informatica VARCHAR(50)
);

-- Tabla con los resultados del test de usabilidad realizado por el usuario
CREATE TABLE Resultados (
    ID_Resultado INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Usuario INT NOT NULL,
    Dispositivo VARCHAR(50),
    Tiempo_Completado TIME,
    Completada BOOLEAN,
    Comentarios_Usuario TEXT,
    Propuestas_Mejora TEXT,
    Valoracion DECIMAL(3,1) CHECK (Valoracion >= 0 AND Valoracion <= 10),
    FOREIGN KEY (Codigo_Usuario) REFERENCES Usuarios(Codigo_Usuario) ON DELETE CASCADE
);

-- Tabla de observaciones del facilitador con los comentarios al test de usabilidad
CREATE TABLE Observaciones (
    ID_Observacion INT AUTO_INCREMENT PRIMARY KEY,
    Codigo_Usuario INT NOT NULL,
    Comentarios_Facilitador TEXT,
    FOREIGN KEY (Codigo_Usuario) REFERENCES Usuarios(Codigo_Usuario) ON DELETE CASCADE
);

-- Tabla intermedia para relacionar Resultados con Observaciones específicas
CREATE TABLE Observacion_Resultado (
    ID_Resultado INT NOT NULL,
    ID_Observacion INT NOT NULL,
    PRIMARY KEY (ID_Resultado, ID_Observacion),
    FOREIGN KEY (ID_Resultado) REFERENCES Resultados(ID_Resultado) ON DELETE CASCADE,
    FOREIGN KEY (ID_Observacion) REFERENCES Observaciones(ID_Observacion) ON DELETE CASCADE
);
