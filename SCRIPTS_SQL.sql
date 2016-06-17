CREATE TABLE usuario(
nickname VARCHAR( 50 ) NOT NULL ,
nombre VARCHAR( 50 ) ,
PASSWORD VARCHAR( 50 ) ,
PRIMARY KEY ( nickname )
);

CREATE TABLE estudiante
(
  id int primary key auto_increment,
  codigo varchar(30),
  nombre varchar(30),
  apellido varchar(30),
  cedula varchar(30),
  edad int,
  semestre int
);