
/* global app */


/*************servicio vs factory vs provider***************/
/*Todas son SINGLETON (Unicamente puede ser instanciada una vez en el contexto
 * en el cual se encuentre)*/


/*Se define el servicio (app.service(nombre servicio, funcionalidad))*/
/*El $http es un servicio por defecto para consumir GET,POST,ETC. El 
 * $httpParamSerializerJQLike es necesario, debido a que angular empaqueta los
 * datos diferente a como se hacia en jquery  y muchos webservices no encuentran
 * los datos que les llega, por lo que se hace necesario serializarlos como 
 * jquery para que lleguen al servidor*/
app.service('estudianteService', function ($http, $httpParamSerializerJQLike) {

    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.saveObject = function (estudiante, type) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: (type === 'save') ? "post" : "put",
            url: "/estudiante/guardar",
            data: $httpParamSerializerJQLike({
                id: estudiante.id,
                codigo: estudiante.codigo,
                nombre: estudiante.nombre,
                apellido: estudiante.apellido,
                cedula: estudiante.cedula,
                edad: estudiante.edad,
                semestre: estudiante.semestre}),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };


    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.listObject = function () {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "get",
            url: "/estudiante/listar"
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };


    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.searchObject = function (estudiante) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/

        /*El envio de datos por GET cambia, siendo este con el atributo params 
         * y son encapsular los datos con el metodo JQUERY*/
        var promise = $http({
            method: "get",
            url: "/estudiante/buscar",
            params: {codigo: estudiante.codigo
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };



    /*Se define una funcion interna llamada logIn, que recibe 2 parametros*/
    this.deleteObject = function (estudiante) {
        /*El resultado del $http es almacenado en la promesa*/
        /*Ademas se debe definir el tipo de cabecera para enviar los datos*/
        var promise = $http({
            method: "delete",
            url: "/estudiante/eliminar",
            params: {id: estudiante.id
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function mySucces(response) {
            return response.data;
        }, function myError(response) {
            alert("Error");
            alert(response.statusText);
        });

        /*Luego se retorna la promesa*/
        return promise;
    };
});