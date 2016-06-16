'use strict';

/*Se importa el framework express*/
var express = require('express');
/*Se importa la libreria HBS para la vistas, y con esto se puede manejar el 
 * master page y adicionalmente se pueden enviar datos JSON del server a la 
 * pagina cuando esta es solicitada, permitiendo cargar selects, etc*/
var exphbs = require('express-handlebars');
/*Import necesario para el manejo de sesiones, aunque funciona como libreria 
 * auxiliar de la express-session*/
var cookieParser = require('cookie-parser');
/*Import necesario para la creacion de variables de sesion*/
var session = require('express-session');
/*Import necesario para poder mandar datos por POST - GET al servidor*/
var bodyParser = require('body-parser');


/*Se inicia el Framework Express*/
var app = express();

/*INICIO DE ADICION DE DEPENDENCIAS ESTANDAR AL FRAMEWORK EXPRESS*/

/*Se añade el bodyParser, indicando que todo sera en formato JSON*/
app.use(bodyParser.json());
/*Se indica con el false que no se enviaran archivos, con true se indica que si*/
app.use(bodyParser.urlencoded({extended: false}));
/*Se añade el cookieParser*/
app.use(cookieParser());
/*Se añade e inicializa el manejo de sesiones, indicando el pass para acceder
 * a ellas remotamente, permitiendo sobreescribirlas y añadir datos sin
 * inicializarlas*/
app.use(session({secret: 'ejemplonodecrud', resave: true, saveUninitialized: true}));

/*END DE ADICION DE DEPENDENCIAS AL FRAMEWORK EXPRESS*/


/*INICIO DE ADICION DE DEPENDENCIAS GRAFICAS AL FRAMEWORK EXPRESS*/

/*Se indica que la extension que leera sera .hbs, y que el layout por defecto 
 * sera el masterPage.hbs*/
app.engine('.hbs', exphbs({extname: '.hbs', defaultLayout: 'masterPage'}));
/*Se añade la configuracion al framework express*/
app.set('view engine', '.hbs');

/*END DE ADICION DE DEPENDENCIAS GRAFICAS AL FRAMEWORK EXPRESS*/



/*INICIO DE ADICION DE DEPENDENCIAS PROPIAS AL FRAMEWORK EXPRESS*/


/*Imports de los JS que se añadiran a las vistas*/
var routes = require('./services/index');
/*Se añade el index.js como listener del formulario que se carga cuando se llama
 * a la ruta / */
app.use('/', routes);

/*END Imports de los JS que se añadiran a las vistas*/

/*END DE ADICION DE DEPENDENCIAS PROPIAS AL FRAMEWORK EXPRESS*/




/************************************************************/
/*******************DEFINICION DE PAGINAS DE ERROR***********/
/************************************************************/


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            layout: false,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        layout: false,
        error: {}
    });
});


/************************************************************/
/***************END DEFINICION DE PAGINAS DE ERROR***********/
/************************************************************/



/*Se inicia el servidor, escuchando por el puerto 3000*/
app.listen(3000, function () {
    console.log('Servidor web iniciado listening on: 3000');
});