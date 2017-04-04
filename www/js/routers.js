 var aplicacion = angular.module('App', ['ngRoute','ngAnimate','ngCart']);
 aplicacion.config(function ($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    }).config(function ($routeProvider) {
    $routeProvider
        .when('/', {
              templateUrl : 'catalogo.html',
              controller  : 'catalogoCtrl'
          })
        .when('/subcatalogo/:id_raza/nombre_raza/:nombre_raza', {
              templateUrl : 'subcatalogo.html',
              controller  : 'subcatalogoCtrl'
          })
        .when('/destacados', {
              templateUrl : 'subcatalogo.html',
              controller  : 'destacadosCtrl'
          })
          .when('/miscompras', {
                templateUrl : 'miscompras.html',
                controller  : 'miscomprasCtrl'
            })
        .when('/usuario', {
                templateUrl : 'usuario.html',
                controller  : 'userCtrl'
        })
          .when('/detalle/:id_detalle', {
              templateUrl : 'detalle.html',
              controller  : 'detalleCtrl'
          })
          .when('/filtros', {
              templateUrl : 'filtros.html',
              controller  : 'filtrosCtrl'
          })
          .when('/buscador', {
              templateUrl : 'buscador.html',
              controller  : 'filtrosCtrl'
          })
          .when('/carrito', {
              templateUrl : 'carrito.html',
              controller  : 'carritoCtrl'
          })
          .when('/datoscompra', {
              templateUrl : 'datoscompra.html',
              controller  : 'carritoCtrl'
          })
          .when('/gracias', {
              templateUrl : 'gracias.html',
              controller  : 'graciasCtrl'
          })
          .when('/favoritos', {
              templateUrl : 'favoritos.html',
              controller  : 'favoritosCtrl'
          });
  });

/*angular.module('App', [])
.config(function ($compileProvider){
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})
.config(function ($routeProvider) {

    $routeProvider
    .when('/', {
        controller: TestCtrl,
        templateUrl: 'catalogo.html'
    })
    .when('/view', {
        controller: ViewCtrl,
        templateUrl: 'partials/view.html'
    });
});*/
