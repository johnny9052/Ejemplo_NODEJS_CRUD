/* global app */

/*Toda funcion de controlador debe tener un $scope, que es la referencia a todos
 * los elementos que pertenecen al constrolador*/
/*app.controller(nombre de la funcion)  ($scope, nombre de los servicios a utilizar)*/
app.controller('CtlEstudiante', function ($scope, estudianteService) {


    $scope.estudiante = "";


    /*Se define una funcion en el controlador*/
    $scope.saveObject = function (form, type) {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        if (form) {
            estudianteService.saveObject($scope.estudiante, type).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.res) {
                    alert("Operacion exitosa");
                    /*Solo con limpiar el objeto se borrar todos los input
                     * asociados*/
                    $scope.estudiante = "";
                    /*Se llama a la funcion listObjectar*/
                    $scope.listObject();
                } else {
                    alert(response);
                }
            });
        } else {
            alert("Verifique los datos ingresados");
        }
    };


    /*Se define una funcion en el controlador*/
    $scope.listObject = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        estudianteService.listObject().then(function (response) {
            /*El resultado de la promesa se recibe por parametro*/
            if (response.estudiantes.length > 0) {
                $scope.estudiantes = response.estudiantes;
            } else {
                alert("No hay registros en la base de datos")
            }

        });

    };



    /*Se define una funcion en el controlador*/
    $scope.searchObject = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/
        if ($scope.estudiante.codigo) {
            estudianteService.searchObject($scope.estudiante).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.res !== false) {
                    $scope.estudiante = response.estudiante[0];
                } else {
                    $scope.estudiante="";
                    alert(response.msj);
                }
            });
        } else {
            alert("Ingrese campo de busqueda");
        }
    };



    /*Se define una funcion en el controlador*/
    $scope.deleteObject = function () {
        /*Al ser el servicio la llamada por http (funcion asincrona) toca definir
         * promesas con el "then", que se ejecuta unicamente cuando se le retorna
         * un valor valido. Este se ejecuta unicamente cuando el llamado http 
         * consume el REST ("REST" es un paradigma, mientras"RESTful" describe el 
         * uso de ese paradigma*/

        if ($scope.estudiante.id) {
            estudianteService.deleteObject($scope.estudiante).then(function (response) {
                /*El resultado de la promesa se recibe por parametro*/
                if (response.res) {
                    alert("Operacion exitosa");
                    $scope.estudiante = "";
                    /*Se llama a la funcion listObjectar*/
                    $scope.listObject();
                } else {
                    alert(response);
                    /*Solo con limpiar el objeto se limpian todos los input 
                     * asociados*/
                    $scope.identificacion = "";
                }
            });
        } else {
            alert("Busque el elemento a eliminar");
        }
    };


    /*Se define una funcion para ordenar los elementos*/
    $scope.ordenarPor = function (tipo) {
        $scope.ordenSeleccionado = tipo;
    };

    /*Se llama a la funcion listObjectar*/
    $scope.listObject();


});






