/*Funciones globales que se necesitan sin importar en que formulario se encuentre, 
 * y se asigno globalmente en el app.js al asingarselo al / */

var express = require('express');
var router = express.Router();

//Se importa el archivo js que tiene la conexion a la base de datos
var bd = require('./database');

/***********************************************************/
/*****************REDIRECCIONAMIENTOS***********************/
/***********************************************************/


/*Cuando se carga la pagina inicial*/
router.get('/', function (req, res) {
    /*Se carga el archivo index dentro de layout, pero como se le indica que 
     * no va a tener ningun layout (Ni footer, banner, etc) el cual sera para 
     * el master page, y debido a que se establecio que el layout por defecto 
     * seria el masterPage, se debe quitar*/
    res.render('index', {layout: false});
});


/*Cuando se solicita cargar el master page*/
router.get('/masterpage', function (req, res) {
    /*Si no ha iniciado sesion, entonces carga el login*/
    if (req.session.user) {

        res.render('inicio', {
            nombre: req.session.name
        });
    } else {
        res.render('index', {layout: false});
    }
});



/*Cuando se solicita cargar el master page*/
router.get('/inicio', function (req, res) {
    /*Si no ha iniciado sesion, entonces carga el login*/
    if (req.session.user) {

        res.render('inicio', {
            nombre: req.session.name
        });
    } else {
        res.render('index', {layout: false});
    }
});



router.get('/estudiante', function (req, res) {
    /*Si no ha iniciado sesion, entonces carga el login*/
    if (req.session.user) {

        res.render('estudiante', {
            nombre: req.session.name
        });
    } else {
        res.render('index', {layout: false});
    }
});


/***********************************************************/
/*****************END REDIRECCIONAMIENTOS*******************/
/***********************************************************/




/***********************************************************/
/********************PETICIONES*****************************/
/***********************************************************/

/*Accion para cuando se da click en inicar sesion*/
router.post('/logIn', function (req, res) {


    bd.query('select nombre from usuario where nickname=? AND password = ?',
            [req.body.usuario, req.body.password], function (error, filas) {
        if (error) {
            console.log('error en la consulta');
            return;
        }
        if (filas.length > 0) {
            /*Si lo encuentra lista el elemento*/
            req.session.user = req.body.usuario;
            req.session.name = filas[0].nombre;

            /*Se abre la pagina, mandando por parametro un objeto JSON*/
            res.render('inicio', {
                nombre: filas[0].nombre
            });
        } else {
            /*Si no lo encuentra muestra mensaje indicando que no lo encontro*/
            res.render('mensajearticulos', {mensaje: 'No existe el codigo de articulo ingresado'});
        }
    });
});

router.get('/logout', function (req, res, next) {
    /*Se destruye las variables de sesion*/
    req.session.destroy();
    /*Se carga el login sin el layout*/
    res.render('index', {layout: false});
});


/***********************************************************/
/********************END PETICIONES*************************/
/***********************************************************/



/*Se debe colocar siempre al final, con el fin de que puesa ser llamado desde 
 * otro JS, en este caso del app.js */
module.exports = router;

