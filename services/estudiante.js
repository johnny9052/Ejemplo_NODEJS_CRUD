'use strict';

/*Funciones globales que se necesitan sin importar en que formulario se encuentre, 
 * y se asigno globalmente en el app.js al asingarselo al / */

var express = require('express');
var router = express.Router();

//Se importa el archivo js que tiene la conexion a la base de datos
var bd = require('./database');


/***********************************************************/
/********************INICIO REST****************************/
/***********************************************************/

/*Rest GUARDAR*/
router.post('/guardar', function (req, res, next) {
    /*Se obtienen los datos por POST y se construye un objeto*/
    var registro = {
        id: req.body.id,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        edad: req.body.edad,
        semestre: req.body.semestre
    };

    //Se realiza la insercion de los datos
    bd.query('insert into estudiante set ?', registro, function (error, resultado) {
        /*Si sucede un error*/
        if (error) {
            console.log(error);
            res.status(500);	// Server Error
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: false});
        } else {
            res.status(200);	// OK
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: true});
        }

        res.end();
    });
});



//Listado de registros
router.get('/listar', function (req, res, next) {

    //Se realiza la consulta
    bd.query('select codigo,nombre,apellido,cedula,edad,semestre from estudiante', function (error, filas) {
        if (error) {
            console.log(error);
            res.status(500);	// Server Error
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: false});
        } else {
            res.status(200);	// OK
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({estudiantes: filas});
        }

        res.end();


    });
});



/*Solicitud por post para buscar un elemento por su codigo*/
router.get('/buscar', function (req, res, next) {
    /*El dsto que llega por get es CODIGO*/
    bd.query('SELECT id,codigo,nombre,apellido,cedula,edad,semestre from estudiante where codigo=?', req.query.codigo, function (error, filas) {
        if (error) {
            console.log(error);
            res.status(500);	// Server Error
            res.json({res: false});
        }
        if (filas.length > 0) {
            res.status(200);	// OK
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({estudiante: filas});
        } else {
            //res.status(404);	// Registro no encontrado
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: false, msj: "No se encuentra el registro"});
        }
    });
});



router.delete('/eliminar', function (req, res, next) {
    //Se realiza la insercion de los datos, el dato que llega es id
    bd.query('delete from estudiante where id=?', req.query.id, function (error, filas) {
        if (error) {
            console.log(error);
            res.status(500);	// Server Error
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: false});
        } else {
            res.status(200);	// OK
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: true});
        }
        res.end();
    });
});



router.put('/guardar', function (req, res, next) {
    /*Se obtienen los datos por POST y se construye un objeto*/
    var registro = {
        id: req.body.id,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        cedula: req.body.cedula,
        edad: req.body.edad,
        semestre: req.body.semestre
    };

    //Se realiza la insercion de los datos
    bd.query('UPDATE estudiante SET ? WHERE ?', [registro, {id: req.body.id}], function (error, resultado) {
        if (error) {
            console.log(error);
            res.status(500);	// Server Error
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: false});
        } else {
            res.status(200);	// OK
            /*Se le responde al cliente en formato JSON, debido a que su 
             * consumo fue por AJAX no se redirecciona a otra pagina*/
            res.json({res: true});
        }

        res.end();
    });
});




/***********************************************************/
/********************¨¨¨FIN REST****************************/
/***********************************************************/




/*Se debe colocar siempre al final, con el fin de que puesa ser llamado desde 
 * otro JS, en este caso del app.js */
module.exports = router;