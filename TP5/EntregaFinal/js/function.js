
 document.body.style.background = "url('css/images/background_t.png')";
/// --------------------------------------------    Authentication
//var Codebird = require('cd/codebird');
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
//CONSUMER ALT "ZjATE7n0u6cve4juuPiyitw9O", "32DuRj57NXTKp7pOMCw4c7Ubsee57qffr2jrk8vAmjHwwwLg4b"
//TOKEN ALT "926493527856566272-DW8mbl8NYupY9WY4ce9pUuCqALoKpPL", "m2Anmygd0uJ1tjTlU5WC8JCVH6S6R9DlTugfEQbwb9z8v"


var imagenes = [];
/// --------------------------------------------    Authentication
//var Codebird = require("cd/codebird");
// or with leading "./", if the codebird.js file is in your main folder:
// var Codebird = require("./codebird");
var cb = new Codebird;
cb.setConsumerKey("8Vmq8hzhPIPjYc4EAfGQ3vlke", "8h2fSU4vYhLqeJJmpRQRv9JxwtUP6jkmBU4vgitWR6Gjt859Ov");
cb.setToken("163239019-rJLe5uULgm7ZVDO8yPVstjugvQRSqB6LzEtiakAV", "FnOHS2LkDQfICIBmlwia4oCsfGrSx4ohBQPOmViuToBTU");

//consulta("perro");

function consulta(busqueda){
  imagenes = [];
 var params = {
   //https://developer.twitter.com/en/docs/tweets/search/api-reference/get-search-tweets
      q: "#"+busqueda, 			// busqueda a realizar
	  result_type: "mixed", 	// tipo de busqueda mixta
      count:50 					// maximo de 50 twitters
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
		 /* var hasht = twitter.entities.hashtags; for (var j = 0; j < hasht.length; j++) {if ( hasht[i].text == params.q){pertenece = true;}} if (pertenece){ */
		   var paquete = {
			   // https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/extended-entities-object
			   url: twitter.extended_entities.media[0].media_url_https,
			   //https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/tweet-object
			   likes: twitter.favorite_count
		   }
			imagenes.push(paquete);
		 }
	   }
	  cargarImagenes();// la encargada de mandar las imagenes a la pagina
	}

);
}

function cargarImagenes(){
  alert( imagenes.length);
  var img = document.getElementById("galeria");
  while (img.hasChildNodes()) {
      img.removeChild(img.firstChild);
  }
  var divs = document.createElement('div');
  divs.className = "row";
  divs.id = 'grill'
  for (var i = 0; i < imagenes.length; i++) {
    console.log(imagenes[i]);
    var divtamano = document.createElement('div');
    divtamano.className = "col-md-3";
    var divclase = document.createElement('div');
    divclase.className = "imagenesGaleria";
    var images = document.createElement('img');
    images.src = imagenes[i].url;
    images.id = i;
    images.className = "img-responsive";
    divclase.appendChild(images);
    divtamano.appendChild(divclase);
    divs.appendChild(divtamano);

  }
  document.getElementById('galeria').appendChild(divs);
}

$('#hash').submit(function(e){
  e.preventDefault();
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  var busqueda = document.getElementById("hash").buscar.value;
  //consulta(busqueda);
  $("body").load("vista1");
});
$('#grilla').click(function(e){
  e.preventDefault();
  cargarpagina("vista1.html");
  document.getElementById("grilla").style.backgroundColor = "lightblue";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "white";
});
$('#exposicion').click(function(e){
  e.preventDefault();
  cargarpagina("vista2.html");
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "lightblue";
  document.getElementById("presentacion").style.backgroundColor = "white";
});
$('#presentacion').click(function(e){
  cargarpagina("vista3.html");
  document.getElementById("grilla").style.backgroundColor = "white";
  document.getElementById("exposicion").style.backgroundColor = "white";
  document.getElementById("presentacion").style.backgroundColor = "lightblue";
});
function cargarpagina(pagina){
  location.href = pagina;
}
