$( document ).ready(function() {
/// --------------------------------------------    Authentication
//var Codebird = require('cd/codebird');
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
//CONSUMER ALT "ZjATE7n0u6cve4juuPiyitw9O", "32DuRj57NXTKp7pOMCw4c7Ubsee57qffr2jrk8vAmjHwwwLg4b"
//TOKEN ALT "926493527856566272-DW8mbl8NYupY9WY4ce9pUuCqALoKpPL", "m2Anmygd0uJ1tjTlU5WC8JCVH6S6R9DlTugfEQbwb9z8v"

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
  console.log(params.q);
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
        cambiar_tipo = true; // para que quede seteado en default otra vez
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
  alert( "tenes"+imagenes.length);
  var img = document.getElementById("grill");
  while (img.hasChildNodes()) {
      img.removeChild(img.firstChild);
  }

  for (var i = 0; i < imagenes.length; i++) {
    console.log(imagenes[i]);
    var divtamano = document.createElement('div');
    divtamano.className = "col-sm-3 imagenesGaleria";
    var divImages = document.createElement('div');
    divImages.className = "imagenesGaleria";
    var images = document.createElement('img');
    images.src = imagenes[i].url;
    images.id = i;
    images.className = "img-responsive";
    var lineado = document.createElement('br');
    var likes = document.createElement('div');
    likes.className = "text-center likes";
    var figura = document.createElement('i');
    figura.className = "fa fa-heart";
    var texto = document.createTextNode(imagenes[i].likes);
    divImages.appendChild(images);
    divtamano.appendChild(divImages);
    divtamano.appendChild(lineado);
    figura.appendChild(texto);
    likes.appendChild(figura);
    divtamano.appendChild(likes);
    document.getElementById('grill').appendChild(divtamano);
  }
}

//-------------------------Cargado de las vistas----------------------------------//

var cargarvista = function(pagina) {
  $.ajax({
    url: pagina+".html",
    method:"GET",
    dataType:"html",
    success: function(textoCargado, status){
      $("#contenido").html(textoCargado);
    }
  });
};
//-------------------------pagina de inicio----------------------------------//


$(document).on("click", "#primeraBusqueda", function(e){
  e.preventDefault();
  document.body.style.background = "url('css/images/background_t.png')";
  var busqueda = document.getElementById("primerFormulario").buscar.value;
  console.log(busqueda);
  consultar(busqueda,"popular");
  document.getElementById("paginaInicio").style.display = "none";
  document.getElementById("paginaGaleria").style.display = "block"
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
  cargarvista("vista1");
  cargargrilla();
});


//-------------------------Busqueda--------------------------------------------//
$('#hash').submit(function(e){
  e.preventDefault();
  var busqueda = document.getElementById("hash").buscar.value;
  imagenes = [];
  consultar(busqueda,"popular");
  cargarvista("vista1");
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  cargargrilla();
});

//-------------------------Cambio de galerias--------------------------------------------//

$('#grilla').click(function(e){
  e.preventDefault();
  cargarvista("vista1");
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
  cargargrilla();
});

$('#exposicion').click(function(e){
  e.preventDefault();
  cargarvista("vista2");
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "lightblue";
  document.getElementById("presentacion").style.backgroundColor = "white";
});

$('#presentacion').click(function(e){
  e.preventDefault();
  cargarvista("vista3");
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "lightblue";
});

});
