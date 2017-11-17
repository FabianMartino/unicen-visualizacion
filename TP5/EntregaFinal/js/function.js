$( document ).ready(function() {
/// --------------------------------------------    Authentication
//var Codebird = require('cd/codebird');
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
//CONSUMER ALT "ZjATE7n0u6cve4juuPiyitw9O", "32DuRj57NXTKp7pOMCw4c7Ubsee57qffr2jrk8vAmjHwwwLg4b"
//TOKEN ALT "926493527856566272-DW8mbl8NYupY9WY4ce9pUuCqALoKpPL", "m2Anmygd0uJ1tjTlU5WC8JCVH6S6R9DlTugfEQbwb9z8v"
var vistaActiva = "grilla";
var cambio_tipo = true;
var imagenes = [];
/// --------------------------------------------    Authentication
//var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");

//cb.setProxy("https://cb-proxy.herokuapp.com/"); // proxy que paso Axel


function consultar(busqueda,tipo){
  var consulta; // para chequear si no arranca con un #
  consulta = busqueda.substring(0,1);
  if  (consulta != "#"){
    consulta = "#"+ busqueda;
  }
  else {
    consulta = busqueda;
  }
 var params = {
   //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets

      q: consulta, 			// busqueda a realizar , hacer un chequeo si lo que viene no posee ya un #
      result_type: tipo, 	// mixta era el dafault pero no traia todos, sino que traia los que tenia en comun
      count:50, 					// maximo de 50 twitters
  };
	cb.__call(
	"search_tweets",
	params,
	function (reply) {
	 for (var i = 0; i < reply.statuses.length; i++) {
	  // var pertenece = false;
	   var twitter = reply.statuses[i];
	   if(( twitter.extended_entities && twitter.extended_entities.media[0].type == "photo" )){
		   var paquete = {
			   // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/extended-entities-object
			   url: twitter.extended_entities.media[0].media_url_https,
			   //https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
			   likes: twitter.favorite_count,
			   // Nombre del emisor del twit
			   usuario: twitter.user.name
		   }
		   // armar un contains para evitar imagenes repetidas (re-twitts)
      if (! existeImagen(paquete)){
        imagenes.push(paquete);

      }
		 }
	   }
	   if (cambio_tipo){
          cambio_tipo = false; //asi evita entrar en el if la segunda vuelta
          consultar(busqueda,"recent");
	   }
	   else{
        cambio_tipo = true; // para que quede seteado en default otra vez
        cargarvista();
	   }
	}

);
}


function existeImagen(paquete){
  //Funcion encargada de determinar si una imagen de un Twitt ya esta en el arreglo iamgenes
  for (var i = 0; i < imagenes.length; i++) {
    if (imagenes[i].url == paquete.url){
      //usarMejorImagen(imagenes[i],paquete);
      return true;
    }
  }
  return false;

}

//-----------------------metodos de carga de galerias----------------------------//
function cargargrilla(){
  var img = document.getElementById("grillaCompleta");
  while (img.hasChildNodes()) {
      img.removeChild(img.firstChild);
  }

  for (var i = 0; i < imagenes.length; i++) {
    var divtamano = document.createElement('div');
    divtamano.className = "col-sm-3 imagenesgrilla";
    var divImages = document.createElement('div');
    //divImages.className = "imagenesGaleria";
    var images = document.createElement('img');
    images.src = imagenes[i].url;
    images.id = i;
    images.className = "img-responsive";
    var divDatos = document.createElement('div');
    divDatos.className = "row";

    var likes = document.createElement('div');
    likes.className = "text-center col-sm-3 likes latiendo";
    var figura = document.createElement('i');
    figura.className = "fa fa-heart";
    var texto = document.createTextNode(imagenes[i].likes);
    var divUser = document.createElement('div');
    divUser.className = "text-left col-sm-9 user";
    var p = document.createElement('p');
    var nombre = document.createTextNode("@"+imagenes[i].usuario);

    p.appendChild(nombre);
    divUser.appendChild(p);


    figura.appendChild(texto);
    likes.appendChild(figura);

    divDatos.appendChild(divUser);
    divDatos.appendChild(likes);

    divImages.appendChild(images);
    divtamano.appendChild(divImages);
    divtamano.appendChild(divDatos);
    document.getElementById('grillaCompleta').appendChild(divtamano);
  }
}

function moverCarrusel(direccion){
  var primera = document.getElementById('muestra1');
  var segunda = document.getElementById('muestra2');
  var tercera = document.getElementById('muestra3');
  var cuarta = document.getElementById('muestra4');
  primera.classList.add("opacoAtrans");
  segunda.classList.add("opacoAtrans");
  tercera.classList.add("opacoAtrans");
  cuarta.classList.add("opacoAtrans");
  setTimeout(function(){
    primera.classList.remove("opacoAtrans");
    segunda.classList.remove("opacoAtrans");
    tercera.classList.remove("opacoAtrans");
    cuarta.classList.remove("opacoAtrans");
    var posicion = contador;
    if (posicion >= imagenes.length) {
      posicion = 0;
    }
    else {
      if (posicion < 0) {
        posicion = imagenes.length-1;
      }
    }
    primera.src = imagenes[posicion].url;
    posicion+=direccion;
    if (posicion >= imagenes.length) {
      posicion = 0;
    }
    else {
      if (posicion < 0) {
        posicion = imagenes.length-1;
      }
    }
    segunda.src = imagenes[posicion].url;
    posicion+=direccion;
    if (posicion >= imagenes.length) {
      posicion = 0;
    }
    else {
      if (posicion < 0) {
        posicion = imagenes.length-1;
      }
    }
    tercera.src = imagenes[posicion].url;
    posicion+=direccion;
    if (posicion >= imagenes.length) {
      posicion = 0;
    }
    else {
      if (posicion < 0) {
        posicion = imagenes.length-1;
      }
    }
    cuarta.src = imagenes[posicion].url;
    posicion+=direccion;
    if (posicion >= imagenes.length) {
      posicion = 0;
    }
    else {
      if (posicion < 0) {
        posicion = imagenes.length-1;
      }
    }
    contador=posicion+direccion;

    primera.classList.add("trasAopaco");
    segunda.classList.add("trasAopaco");
    tercera.classList.add("trasAopaco");
    cuarta.classList.add("trasAopaco");
    setTimeout(function(){
      primera.classList.remove("trasAopaco");
      segunda.classList.remove("trasAopaco");
      tercera.classList.remove("trasAopaco");
      cuarta.classList.remove("trasAopaco");

    },1000 );
  },1000 );
}


function cargar_foto(clase1,clase2,src){
  imagen = document.getElementById("bigImg");
  imagen.classList.add(clase1);
  setTimeout(function(){
    document.getElementById("activa2").src = src;
    imagen.classList.remove(clase1);
    imagen.classList.add(clase2);
    setTimeout(function(){
      imagen.classList.remove(clase2);
    },2000 );
  },2000 );
}
$(document).on("click", "#muestra1", function(e){
    e.preventDefault();
    var src = $(this).attr('src');
    cargar_foto("cambio_automatico_v1","cambio_automatico_v2",src);
    var suma = contador-4
    if (suma<0) {
      suma+=imagenes.length
    }
    document.getElementById("like2").innerHTML = imagenes[suma].likes;
    document.getElementById("usuario2").innerHTML = imagenes[suma].usuario;
});
$(document).on("click", "#muestra2", function(e){
  e.preventDefault();
  var src = $(this).attr('src');

  cargar_foto("cambio_automatico_v1","cambio_automatico_v2",src);
  var suma = contador-3
  if (suma<0) {
    suma+=imagenes.length
  }
  document.getElementById("like2").innerHTML = imagenes[suma].likes;
  document.getElementById("usuario2").innerHTML = imagenes[suma].usuario;
});
$(document).on("click", "#muestra3", function(e){
  e.preventDefault();
  var src = $(this).attr('src');

  cargar_foto("cambio_automatico_v1","cambio_automatico_v2",src);
  var suma = contador-2
  if (suma<0) {
    suma+=imagenes.length
  }

  document.getElementById("like2").innerHTML = imagenes[suma].likes;
  document.getElementById("usuario2").innerHTML = imagenes[suma].usuario;
});
$(document).on("click", "#muestra4", function(e){
  e.preventDefault();
  var src = $(this).attr('src');

  cargar_foto("cambio_automatico_v1","cambio_automatico_v2",src);
  var suma = contador-1
  if (suma<0) {
    suma+=imagenes.length
  }
  document.getElementById("like2").innerHTML = imagenes[suma].likes;
  document.getElementById("usuario2").innerHTML = imagenes[suma].usuario;
});
$(document).on("click", "#flechaDerecha", function(e){
    e.preventDefault();
    if (imagenes.length>4) {
      moverCarrusel(1)
    }
});
$(document).on("click", "#flechaIzquierda", function(e){
    e.preventDefault();
    if (imagenes.length>4) {
      moverCarrusel(-1)
    }
});
function segundaVista(){
  if (imagenes.length>0) {
    contador = 0;
    var activa = document.getElementById('activa2');
    var primera = document.getElementById('muestra1');
    var segunda = document.getElementById('muestra2');
    var tercera = document.getElementById('muestra3');
    var cuarta = document.getElementById('muestra4');
    activa.src = imagenes[0].url;
    primera.src = imagenes[0].url;
    document.getElementById("like2").innerHTML = imagenes[0].likes;
    document.getElementById("usuario2").innerHTML = imagenes[0].usuario;
    if (imagenes.length>1) {
      segunda.src = imagenes[1].url;
      if (imagenes.length>2) {
        tercera.src = imagenes[2].url;
        if (imagenes.length>3) {
          cuarta.src = imagenes[3].url;
        }
      }
    }
  }
  var tamano = imagenes.length;
  if (tamano>4) {
    contador=4;
  }
  else {
    contador=imagenes.length;
  }
}


/// --------------------------------------- VISTA 3 - MOVIMIENTO AUTOMATICO CON GIRO
var contador = 0;
var intervalo03;
var imagenV3;
function iniciandoVista3(){
  contador = 0;
  imagenV3 = document.getElementById("imagenV3");
  document.getElementById("imagenV3").src = imagenes[contador].url;
  document.getElementById("like3").innerHTML = imagenes[contador].likes;
  document.getElementById("usuario3").innerHTML = imagenes[contador].usuario;
  // setTimeout(function(){ // le dejamos 2 segundos de inicio a la primera imagen
  intervalo03 = setInterval(function (){
    muestraAutomaticaV3();},7000); // cada 6 segundos se reinicia el ciclo
  // },2000 );

}
function terminandoIntervalo3(){ // destruye el intervalo03 para evitar que se repita (unir para cuando se salga de la vista3)
  clearInterval(intervalo03);
  contador = 0;
}

function  muestraAutomaticaV3(){
    imagenV3.classList.remove("giroShow");
    imagenV3.classList.add("giroHide");
    setTimeout(function(){
      if( contador < (imagenes.length -1)) {
        contador++
      }
      else {
        contador = 0;
      }
      imagenV3.classList.remove("giroHide");
      document.getElementById("imagenV3").src = imagenes[contador].url;
      document.getElementById("like3").innerHTML = imagenes[contador].likes;
      document.getElementById("usuario3").innerHTML = imagenes[contador].usuario;
      imagenV3.classList.add("giroShow");
    },2000 );
}



//-------------------------Cargado de las vistas----------------------------------//

var cargarvista = function() {
  var pagina = "";
  switch (vistaActiva) {
    case "grilla":
      pagina = "vista1";
      break;
    case "exposicion":
      pagina = "vista2";
      break;
    case "presentacion":
      pagina = "vista3";
      break;
  }
  $.ajax({
    url: pagina+".html",
    method:"GET",
    dataType:"html",
    success: function(textoCargado, status){
      $("#contenido").html(textoCargado);
      switch (vistaActiva) {
        case "grilla":
          cargargrilla();
          break;
        case "exposicion":
          segundaVista();
          pagina = "vista2";
          break;
        case "presentacion":
          iniciandoVista3();
          break;
      }

    }
  });
};
//-------------------------pagina de inicio----------------------------------//

$(document).on("click", "#nuevoHash", function(e){
  e.preventDefault();
  if (vistaActiva == "presentacion") {
    terminandoIntervalo3();
  }
  var busqueda = document.getElementById("hash").buscar.value;
  if (busqueda!="") {
    imagenes = [];
    consultar(busqueda,"popular");
  }
  else {
    alert("ingreso una busqueda vacia");
  }
});

$(document).on("click", "#primeraBusqueda", function(e){
  e.preventDefault();
  var busqueda = document.getElementById("primerFormulario").buscar.value;
  if (busqueda!="") {
    document.body.style.background = "url('css/images/background_t.png')";
    document.getElementById("paginaInicio").style.display = "none";
    document.getElementById("paginaGaleria").style.display = "block"
    document.getElementById("grilla").style.backgroundColor = "lightblue";
    document.getElementById("exposicion").style.backgroundColor = "white";
    document.getElementById("presentacion").style.backgroundColor = "white";
    consultar(busqueda,"popular");
  }
  else {
    alert("ingreso una busqueda vacia");
  }
});



//-------------------------Cambio de galerias--------------------------------------------//

$('#grilla').click(function(e){
  e.preventDefault();
  if (vistaActiva == "presentacion") {
    terminandoIntervalo3();
  }
  vistaActiva = "grilla";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
});

$('#exposicion').click(function(e){
  e.preventDefault();
  if (vistaActiva == "presentacion") {
    terminandoIntervalo3();
  }
  vistaActiva = "exposicion";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "lightblue";
  document.getElementById("presentacion").style.backgroundColor = "white";
});

$('#presentacion').click(function(e){
  e.preventDefault();
  vistaActiva = "presentacion";
  cargarvista();
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "lightblue";
});

});
