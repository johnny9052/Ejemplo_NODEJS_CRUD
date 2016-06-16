var express = require('express');
var router = express.Router();


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
        var numero = Math.round(Math.random() * 10);
        res.render('inicio', {
            name: numero
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
    /*Se crea una variable de sesion¨*/
    req.session.user = req.body.usuario;

    var numero = Math.round(Math.random() * 10);

    /*Se abre la pagina, mandando por parametro un objeto JSON*/
    res.render('inicio', {
        name: numero
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



router.get('/about', function (req, res) {
    res.render('about');
});



/*Se debe colocar siempre al final, con el fin de que puesa ser llamado desde 
 * otro JS, en este caso del app.js */
module.exports = router;

