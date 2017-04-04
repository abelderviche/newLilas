aplicacion.filter('getById', function() {
  return function(input, id) {
    var i=0, len=input.length;
    for (; i<len; i++) {
      if (+input[i].id == +id) {
        return input[i];
      }
    }
    return null;
  }
});

aplicacion.factory('registroCantidadVentas',function(){
  var items = [];
  var itemsService = {};

  if (localStorage.getItem("laslilas_nro_ventas") === null) {
    localStorage.setItem("laslilas_nro_ventas",0);
  }

  itemsService.add = function() {
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    var nueva_vta = (Number(nro_vta) + Number(1));
    localStorage.setItem("laslilas_nro_ventas", nueva_vta);
    items[0] = nueva_vta;
  };

  itemsService.list = function() {
    items[0] = localStorage.getItem("laslilas_nro_ventas");
      return items;
  };

  itemsService.delete = function() {
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    var nueva_vta = (Number(nro_vta) - Number(1));
    if (nueva_vta < 0){
      nueva_vta = 0;
    }
    localStorage.setItem("laslilas_nro_ventas", nueva_vta);
    items[0] = nueva_vta;
  };

  return itemsService;
});

aplicacion.factory('registroVentas',function(){

  if (localStorage.getItem("laslilas_nro_ventas") >= 1){
    var items = JSON.parse(localStorage.getItem("laslilas_listado_ventas"));
  } else {
    var items = [];
  }

  var itemsService = {};

  itemsService.add = function(detalle) {
    var venta = {};
    var nro_vta = localStorage.getItem("laslilas_nro_ventas");
    ventaid = nro_vta;
    ventaid2 = "ventaid_" + nro_vta;
    detalle.ventaidparaborrar = nro_vta;
    venta[ventaid2] = detalle;
    items.push(venta);
    localStorage.setItem("laslilas_listado_ventas",JSON.stringify(items));
  };

  itemsService.delete = function(key) {
    delete items[key];
    localStorage.setItem("laslilas_listado_ventas",JSON.stringify(items));
  };

  itemsService.list = function() {
    var items = JSON.parse(localStorage.getItem("laslilas_listado_ventas"));
    return items;
  };

  return itemsService;
});


aplicacion.factory('registroCantidadFavoritos',function(){
  var items = [];
  var itemsService = {};

  if (localStorage.getItem("laslilas_nro_favoritos") === null) {
    localStorage.setItem("laslilas_nro_favoritos",0);
  }

  itemsService.add = function() {
    var nro_fav = localStorage.getItem("laslilas_nro_favoritos");
    var nueva_fav = (Number(nro_fav) + Number(1));
    localStorage.setItem("laslilas_nro_favoritos", nueva_fav);
    items[0] = nueva_fav;
  };

  itemsService.list = function() {
    items[0] = localStorage.getItem("laslilas_nro_favoritos");
      return items;
  };

  itemsService.delete = function() {
    var nro_fav = localStorage.getItem("laslilas_nro_favoritos");
    var nueva_fav = (Number(nro_fav) - Number(1));
    if (nueva_fav < 0){
      nueva_fav = 0;
    }
    localStorage.setItem("laslilas_nro_favoritos", nueva_fav);
    items[0] = nueva_fav;
  };

  return itemsService;
});

aplicacion.factory('registroFavoritos',function(){

  if (localStorage.getItem("laslilas_nro_favoritos") >= 1){
    var items = JSON.parse(localStorage.getItem("laslilas_listado_favoritos"));
  } else {
    var items = [];
  }

  var itemsService = {};

  itemsService.getItemById = function (itemId) {
    //console.log(itemId.id);
      var idToro = itemId.id;
      var build = false;
      angular.forEach(items, function (item) {
        angular.forEach(item,function(it){
          if  (idToro === it.id) {
              build = item;
          }
        });
          //if  (item.id === itemId.id) {
        //      build = item;
        //  }
      });
      return build;
  };

  itemsService.add = function(detalle) {
    var fav = itemsService.getItemById(detalle);
    if(!fav){
      var venta = {};
      var nro = items.length;
      venta[nro] = detalle;
      items.push(venta);
      localStorage.setItem("laslilas_listado_favoritos",JSON.stringify(items));
    }
  };

  itemsService.delete = function(key) {
    delete items[key];
    localStorage.setItem("laslilas_listado_favoritos",JSON.stringify(items));
  };

  itemsService.list = function() {
    var items = JSON.parse(localStorage.getItem("laslilas_listado_favoritos"));
    return items;
  };

  return itemsService;
});

aplicacion.factory('misComprasFactory',function(){
  var compras = JSON.parse(localStorage.getItem('LLCompras')) || [];
  var comprasService = {};
  comprasService.add = function(carrito,totalCost) {
    carrito.fecha = new Date();
    carrito.totalCost = totalCost;
    compras.push(carrito);
    localStorage.setItem('LLCompras', JSON.stringify(compras));
  };
  comprasService.delete = function(key) {
    delete compras[key];
    localStorage.setItem("LLCompras",JSON.stringify(compras));
  };
  comprasService.list = function() {
    var compras = JSON.parse(localStorage.getItem('LLCompras'));
    return compras;
  };
  return comprasService;
});

aplicacion.controller('graciasCtrl',['$scope','$location','$http', function($scope,$location,$http){
  $scope.closeFunction = function(){
    navigator.app.exitApp();
  }
}]);

aplicacion.controller('carritoCtrl',['$scope','$location','$http','misComprasFactory','registroVentas','registroCantidadVentas','ngCart', function($scope,$location,$http,misComprasFactory,registroVentas,registroCantidadVentas,ngCart){
  ngCart.setTaxRate(21.0);
  ngCart.setShipping(400.00);
  ngCart.setNitrogen(350.00);
  var user = JSON.parse(localStorage.getItem('LLUsers'));
  $scope.user = user;
  $scope.closeFunction = function(){
    navigator.app.exitApp();
  }
  $scope.submitForm = function() {
    var user = {
      name:$scope.user.name,
      tel:$scope.user.tel,
      address:$scope.user.address,
      city:$scope.user.city,
      state:$scope.user.state,
      cp:$scope.user.cp,
      cuit:$scope.user.cuit,
      social:$scope.user.social,
    }
    localStorage.setItem('LLUsers', JSON.stringify(user));
    $scope.mail();
  }

  function getBody(){
    var body ="";
    var bodyUser ="";
    var user = JSON.parse(localStorage.getItem('LLUsers'));
    bodyUser +="Nombre y Apellido: "+user.name +"\n";
    bodyUser +="Tel.: "+user.tel +"\n";
    bodyUser +="Direccion: "+user.address +"\n";
    bodyUser +="Ciudad: "+user.city +"\n";
    bodyUser +="Provincia: "+user.city +"\n";
    bodyUser +="Cod. Postal: "+user.cp +"\n";
    bodyUser +="CUIT: "+user.cuit +"\n";
    bodyUser +="Razon Social: "+user.social +"\n";
    var bodyCart = "Nombre\t\t\t\tCantidad\t\t\t\tPrecio\t\t\t\tTotal\n";
    for (item of ngCart.getCart().items) {
      if(item._name.length <= 7){var separacion = "\t\t\t\t\t"}else{var separacion = "\t\t\t\t"}
      bodyCart+= item._name + separacion + item._quantity + "\t\t\t\t$" + item._price + "\t\t\t\t$"+(item._price*item._quantity)+"\n";
    }
    bodyCart += "Subtotal:\t\t\t$"+ngCart.getSubTotal()+"\n";
    bodyCart += "Nitrogeno:\t\t$"+ngCart.getNitrogen()+"\n";
    bodyCart += "Envio:\t\t\t$"+ngCart.getShipping()+"\n";
    bodyCart += "IVA("+ ngCart.getTaxRate()+ "%):\t\t$"+ngCart.getTax()+"\n";
    bodyCart += "TOTAL:\t\t\t$"+ngCart.totalCost()+"\n";

    body = "Datos de comprador\n";
    body+="--------------------------\n";
    body += bodyUser;
    body += "\n\nDatos de carrito\n";
    body+="--------------------------\n";
    body += bodyCart;
    return body;
}
  $scope.showClose = false;
  $scope.mail = function(){
    var link = "mailto:ecommerce@laslilas.com?subject=Nueva Compra&body=";
    link += encodeURIComponent(getBody());
    registroCantidadVentas.add();
    misComprasFactory.add(ngCart.getCart(),ngCart.totalCost());
    //  console.log(JSON.parse(localStorage.getItem('LLUsers')));
    //  localStorage.setItem("rc2016_nombre",$scope.user.name);
    //    localStorage.setItem("rc2016_email",$scope.user.email);
    window.location.href = link;
    ngCart.empty();
    $scope.showClose = true;
    //window.location = "#/gracias";
  }
  $scope.vaciar = function(){
    var r = confirm("Desea vaciar el carrito?");
      if (r == true) {
          ngCart.empty();
          $scope.cantidad_carrito = ngCart.getTotalItems();
      } else {
          x = "You pressed Cancel!";
      }
  }

  $scope.cantidad_carrito = ngCart.getTotalItems();
    listar();
    function listar(){
      var returnArr = [];
      $scope.listado_ventas = registroVentas.list();
      angular.forEach($scope.listado_ventas, function(value,key) {
        angular.forEach(value, function(value2,key2) {
          value2.esteeselkeydelarray = key;
          returnArr.push(value2);
        });
      });
      $scope.listado_ventas = returnArr;
      $scope.no_ventas = true;
      if (returnArr.length >= 1){
        $scope.no_ventas = false;
      }
  }

  //para eliminar ventas
  $scope.borrarVenta = function(key){
    registroCantidadVentas.delete();
    registroVentas.delete(key);
    listar();
  }
}]);
aplicacion.controller('miscomprasCtrl',['$scope','misComprasFactory','registroCantidadVentas', function($scope,misComprasFactory,registroCantidadVentas){
  var returnArr=[];
   $scope.misCompras = misComprasFactory.list()
   angular.forEach($scope.misCompras, function(value,key) {
      if(value){
        value.idArray = key;
        returnArr.push(value);
      }
   });
  $scope.misCompras = returnArr;
  console.log($scope.misCompras);
  $scope.misComprasCount = $scope.misCompras.length;
  $scope.date_format = function(date){
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(date);
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
  }
  $scope.borrarCompra = function(key){
    registroCantidadVentas.delete();
    misComprasFactory.delete(key);
    window.location.reload();
  }
}]);
aplicacion.controller('navegacionCtrl',['$scope','registroCantidadVentas','registroCantidadFavoritos', function($scope,registroCantidadVentas,registroCantidadFavoritos){
  $scope.ventasActuales = registroCantidadVentas.list();
  $scope.favoritosActuales = registroCantidadFavoritos.list();
}]);

aplicacion.controller('catalogoCtrl',['$scope','$location','$http', function($scope, $location,$http){
  if (localStorage.getItem("rc2016_firstime") === null || localStorage.getItem("rc2016_firstime") == "0") {
    $scope.loginview = true;
  } else {
    $scope.loginview = false;
  }
  $scope.submitForm = function() {
    localStorage.setItem("rc2016_firstime","1");
    var user = {
      name:$scope.user.name,
      tel:$scope.user.tel,
      address:$scope.user.address,
      city:$scope.user.city,
      state:$scope.user.state,
      cp:$scope.user.cp,
      cuit:$scope.user.cuit,
      social:$scope.user.social,
    }
    localStorage.setItem('LLUsers', JSON.stringify(user));
    window.location.reload();
  };

  $http.get('razas.json').success(function(data){
    $scope.razas = data;
  });
}]);

aplicacion.controller('subcatalogoCtrl',['$scope', '$routeParams', '$http','$sce','$rootScope',
    function($scope, $routeParams, $http,$sce,$rootScope) {
      $scope.id_raza = $routeParams.id_raza;
      $scope.nombre_raza = $routeParams.nombre_raza;
      $http.get('laslilas.json').success(function(data){
        $scope.catalogo = data;
      });
  }]);
  aplicacion.controller('userCtrl',['$scope', '$routeParams', '$http','$sce','$rootScope',
      function($scope, $routeParams, $http,$sce,$rootScope) {
        var user = JSON.parse(localStorage.getItem('LLUsers'));
        $scope.user = user;
        $scope.submitForm = function() {
          var user = {
            name:$scope.user.name,
            tel:$scope.user.tel,
            address:$scope.user.address,
            city:$scope.user.city,
            state:$scope.user.state,
            cp:$scope.user.cp,
            cuit:$scope.user.cuit,
            social:$scope.user.social,
          }
          localStorage.setItem('LLUsers', JSON.stringify(user));
          window.location = "#/";
        };
    }]);
aplicacion.controller('destacadosCtrl',['$scope', '$routeParams', '$http','$sce','$rootScope',
    function($scope, $routeParams, $http,$sce,$rootScope) {
      $scope.filters = { };
      $scope.nombre_raza  = 'Destacados';
      $scope.filters.destacado = 1
      $http.get('laslilas.json').success(function(data){
        $scope.catalogo = data;
      });
  }]);
aplicacion.controller('detalleCtrl',['$scope', '$routeParams', '$http','$sce','$rootScope','$filter','registroVentas','registroFavoritos','registroCantidadVentas','registroCantidadFavoritos',function($scope, $routeParams, $http,$sce,$rootScope,$filter,registroVentas,registroFavoritos,registroCantidadVentas,registroCantidadFavoritos) {
      $scope.id_toro = $routeParams.id_detalle;
      $http.get('laslilas.json').success(function(data){
        var found = $filter('getById')(data, $scope.id_toro);
        $scope.detalle = found;
        var infav = registroFavoritos.getItemById($scope.detalle);
        if(infav){
          $scope.botones_favoritos = false;
        }else{
          $scope.botones_favoritos = true;
        }
        console.log($scope.botones_favoritos)
        if(found.avanzado){
          $scope.extra = "AVANZADO - " + found.avanzado;
        }
        if(found.definitivo){
          $scope.extra = "DEFINITIVO - " + found.definitivo;
        }
        if(found.registrado){
          $scope.extra = "REGISTRADO";
        }
        if(found.preparatorio){
          $scope.extra = "PREPARATORIO - " + found.preparatorio;
        }
        if(found.controlado){
          $scope.extra = "CONTROLADO - " + found.controlado;
        }
      });

      //boton carrito agrega pedido
      $scope.botones_venta = true;
      $scope.agregarVenta = function (count){
        registroCantidadVentas.add();
        if ($scope.count < 1){
            $scope.count = 1;
        }
        $scope.detalle.cantidad_dosis = $scope.count;
        registroVentas.add($scope.detalle);
        $scope.botones_venta = false;
      };
      $scope.cant_dosis = function (tipo,count){
        console.log("cant_dosis");
        console.log("dosis" + count);
        if (tipo == "add"){
          $scope.count = count + 1;
        }
        if (tipo == "same"){
          $scope.count = count;
        }
        if (tipo == "remove"){
          if (count <= 1){
            $scope.count = 1;
          } else {
            $scope.count = count - 1;
          }
        }
      }
      //boton carrito agrega pedido de abajo
      $scope.botones_venta_abajo = true;
      $scope.agregarVentaAbajo = function (count){
        registroCantidadVentas.add();
        $scope.detalle.cantidad_dosis = $scope.count;
        registroVentas.add($scope.detalle);
        $scope.botones_venta_abajo = false;
      };
      //boton favoritos

      $scope.agregarFavoritos = function (count){
        var infav = registroFavoritos.getItemById($scope.detalle);
        $scope.detalle.cantidad_favoritos = $scope.count;
        registroFavoritos.add($scope.detalle);
        $scope.botones_favoritos = false;
        if(!infav){
          registroCantidadFavoritos.add();
        }

      //  registroCantidadFavoritos.add();
        //asdasdasdasdasd
      };

}]);

aplicacion.controller('filtrosCtrl',['$scope', '$routeParams', '$http','$sce','$rootScope','$filter',
    function($scope, $routeParams, $http,$sce,$rootScope,$filter) {
      $http.get('laslilas.json').success(function(data){
        $scope.catalogo = data;
         for (var i = 0; i < $scope.catalogo.length; i++) {
            $scope.catalogo[i].precio = parseFloat($scope.catalogo[i].precio);
         };
      });
      $http.get('razas.json').success(function(data){
        $scope.razas = data;
      });
      $scope.relevantes = false;
      $scope.ranking = false;
      $scope.filters = { };
      $scope.relevante_src = "destacado1";
      $scope.src_predesc = "menosprecio1";
      $scope.src_preasc = "masprecio1";
      $scope.src_ranking = "ranking1";


      $scope.activeRanking = function(){
        $scope.ranking = !$scope.ranking;
        if ($scope.ranking) {
          $scope.filters.ranking = 1;
          $scope.src_ranking = "ranking2"
        }else{
          $scope.filters.ranking = '';
          $scope.src_ranking = "ranking1"
        }
      }


      $scope.activeRelevantes = function(){
        $scope.relevantes = !$scope.relevantes;
        if ($scope.relevantes) { $scope.filters.destacado = 1; $scope.relevante_src = "destacado2"}else{$scope.filters.destacado = '';$scope.relevante_src = "destacado1" }
      }

     $scope.order = function(predicate,reverse) {
      $scope.reverse = reverse;
      $scope.predicate = predicate;
      if(reverse){
        $scope.seleccionado = 'prec_asc';
        $scope.src_preasc = "masprecio2"
        $scope.src_predesc = "menosprecio1"
      }else{
        $scope.seleccionado = 'prec_desc';
        $scope.src_predesc = "menosprecio2"
        $scope.src_preasc = "masprecio1"

      }

  };


   $scope.colourIncludes = [];
    $scope.includeColour = function(colour) {
        var i = $.inArray(colour, $scope.colourIncludes);
        if (i > -1) {
            $scope.colourIncludes.splice(i, 1);
        } else {
            $scope.colourIncludes.push(colour);
        }
    }

    $scope.colourFilter = function(fruit) {
        if ($scope.colourIncludes.length > 0) {
            if ($.inArray(fruit.aptosvaquillonas, $scope.colourIncludes) < 0)
                return;
        }

        return fruit;
    }

  }]);



aplicacion.controller('favoritosCtrl',['$scope','$location','$http','registroFavoritos','registroCantidadFavoritos', function($scope,$location,$http,registroFavoritos,registroCantidadFavoritos){

  listar_favoritos();

  //listamos los pedidos
  function listar_favoritos(){
    $scope.listado_favoritos = registroFavoritos.list();

    var returnArr2 = [];
    angular.forEach($scope.listado_favoritos, function(value,key) {
      angular.forEach(value, function(value2,key2) {
        value2.esteeselkeydelarray = key;
        returnArr2.push(value2);
      });
    });
    $scope.listado_favoritos = returnArr2;

    $scope.no_favoritos = true;
    if (returnArr2.length >= 1){
      $scope.no_favoritos = false;
    }

  }

  //para eliminar ventas
  $scope.borrarFavorito = function(key){
    registroCantidadFavoritos.delete();
    registroFavoritos.delete(key);
    listar_favoritos();
  }
}]);
