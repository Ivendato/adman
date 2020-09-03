
var $$ = Dom7;

//MuestraMensaje();

var codigo;
 
var app = {
    /* Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }*/
};



function showSplashScreen(){

  setTimeout(function(){  InitApp();   }, 2000);

}


function InitApp(){

   if(localStorage.getItem("adman-login")=="autenticado"){
       mainView.router.navigate('/home/',{animate:true});   
   }else{
    mainView.router.navigate('/login/',{animate:true});
   }

}


function CerrarSesion(){

  //checkConnection();

  localStorage.setItem("adman-login", "false");

  mainView.router.navigate('/login/',{animate:true});

}



function checkConnection() {
  var networkState = navigator.connection.type;

  var states = {};
  states[Connection.UNKNOWN]  = 'Unknown connection';
  states[Connection.ETHERNET] = 'Ethernet connection';
  states[Connection.WIFI]     = 'WiFi connection';
  states[Connection.CELL_2G]  = 'Cell 2G connection';
  states[Connection.CELL_3G]  = 'Cell 3G connection';
  states[Connection.CELL_4G]  = 'Cell 4G connection';
  states[Connection.CELL]     = 'Cell generic connection';
  states[Connection.NONE]     = 'No network connection';

  alert('Connection type: ' + states[networkState]);
}


var app7 = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: 'Adman',
    // App id
    id: 'com.adman.app',
    /* Enable swipe panel
    panel: {
      swipe: 'left',
    },*/
    // Add default routes
    routes: [
      {
        path: '/home/',
        url: 'views/home.html',
      },
      {
        path: '/registro/',
        url: 'views/registro.html',
      },
      
      {
        path: '/login/',
        url: 'views/login.html',
      },
      {
        path: '/nueva/',
        url: 'views/nueva.html',
      },{
        path: '/perfil/',
        url: 'views/perfil.html',
      },
      {
        path: '/falla/',
        url: 'views/falla.html',
      },
      {
        path: '/seguimiento/',
        url: 'views/seguimiento.html',
      },
      {
        path: '/anteriores/',
        url: 'views/anteriores.html',
      },
      {
        path: '/horas/',
        url: 'views/horas.html',
      },
      {
        path: '/servicio/',
        url: 'views/servicio.html',
      },
    
    ],
    // ... other parameters
  });


  var mainView = app7.views.create('.view-main');


  app7.panel.allowOpen = true;


  // Show preloader before Ajax request
   //app7.preloader.show('blue');


   // Create full-layout notification
var notificationFull = app7.notification.create({
    icon: '<i class="f7-icons">alarm</i>',
    title: 'Framework7',
    titleRightText: 'now',
    subtitle: 'This is a subtitle',
    text: 'This is a simple notification message',

  });

  
var dialogCodi = app7.dialog.create({
    title: 'Verificación de codigo',
    text: 'Por favor ingrese su codigo',
    content: '<input type="codigo" name="codigo" id="codigo" placeholder="codigo Registrado">',    
    buttons: [{text: 'Verificar'}],
    onClick: function (dialog) {
      codigo=document.getElementById("codigo").value;
       revCodigo();
    },

});


var dialogPrueba = app7.dialog.create({
  text: 'Hello World',
  on: {
    opened: function () {
      console.log('Dialog opened')
    }
  }
})

  function Ingresar(){

    
    var usuario = $$('#usuario').val();
    var password = $$('#password').val();

    if(usuario!=""){

    app7.preloader.show('gray');

    app7.request({
      url: 'http://localhost/adman/api/login.php',
      data:{username:usuario,password:password},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        if(objson.data == "AUTENTICADO"){

          localStorage.setItem("adman-login", "autenticado");

        mainView.router.navigate('/home/',{animate:true});
        
        }else{
          console.log("respuesta appi:"+objson.data);
          alert("USUARIO Y/O PASSWORD INCORRECTO");
        }
      
      },
      error:function(error){

        app7.preloader.hide();
      
      }

      });
    } else{
      alert("Ingrese un usuario por favor")
    }

  }


  function revCodigo(){

    var codigo = $$('#codigo').val();
  

    app7.preloader.show('gray');

    app7.request({
      url: 'http://localhost/adman/api/codigo.php',
      data:{codigos:codigo},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();

        var objson = JSON.parse(data);

        if(objson.data == "si"){
     
        mainView.router.navigate('/registro/',{animate:true});
        
        }else{
          alert("CODIGO INCORRECTO O YA USADO");
        }
      
      },
      error:function(error){
        app7.preloader.hide();
      
      }
      
      });

  }

  function pruebavalores(){

   
    var codisponible = 'no';
    var usuario = $$('#usuarior').val();
    var password = $$('#passwordr').val();
    var perfil = $$('#perfilr').val();
    var nombre = $$('#nombrer').val();
    var telefono = $$('#telefonor').val();
    var correo = $$('#correor').val();


    alert("el valor es"+perfil);

  }
    



  function Registrarse(){

      var codigos = codigo;
      var codisponible = 'no';
      var usuario = $$('#usuarior').val();
      var password = $$('#passwordr').val();
      var perfil = $$('#perfilr').val();
      var nombre = $$('#nombrer').val();
      var telefono = $$('#telefonor').val();
      var correo = $$('#correor').val();
      
      app7.preloader.show('blue');

    
  
      app7.request({
        url: 'http://localhost/adman/api/users.php',
        data:{ codigo:codigos,usuario:usuario,password:password,perfil:perfil,nombre:nombre,telefono:telefono,correo:correo,},
        method:'POST',
        crossDomain: true,
        success:function(data){
             
          app7.preloader.hide();
  
          var objson = JSON.parse(data);
  
          if(objson.status_message == "CORRECTO"){
  
  
          
          }else{
  
            alert("Hubo un error intentalo nuevamente");
          }
        
        },
        error:function(error){
  
          app7.preloader.hide();
        
        }
        
        });
  
  }
 
  function AbrirNotificacion(){
    

    notificationFull.open();
   

  }

  
  function checarCodi(){
    

    dialogCodi.open();
   

  }

 


  function MuestraMensaje(){
      alert("ehh funciona!!!");
      console.log("ehh funciona!!");
  }
  

  $$(document).on('page:init', '.page[data-name="login"]', function (e) {
     
/*
    var calendarDefault = app7.calendar.create({
      inputEl: '#demo-calendar-default',
    });
    */
          
  
  });


  $$(document).on('page:init', '.page[data-name="home"]', function (e) {

     // alert("alerta");

    
     //app7.panel.enableSwipe('left');

  });

  $$(document).on('page:init', '.page[data-name="nueva"]', function (e) {

    var fruits = ('Apple Apricot Avocado Banana Melon Orange Peach Pear Pineapple 955l01_traxacavo').split(' ');  

    var autocompleteDropdownSimple = app7.autocomplete.create({
      inputEl: '#autocomplete-dropdown',
      openIn: 'dropdown',
      source: function (query, render) {
        var results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
        // Find matched items
        for (var i = 0; i < fruits.length; i++) {
          if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
        }
        // Render items by passing array with result items
        render(results);
      }
    });

 });


  


function showMenu(){

  app7.panel.open('left', true);

}

function mostrarmenu(){

  app7.panel.open('right', true);

}










  

