
var src_nuevo = "css/images/colage.png";

var imagen;
function cargar_foto(clase1,clase2){
  imagen = document.getElementById("imagen_auto");
  imagen.classList.add(clase1);
  setTimeout(function(){
    document.getElementById("imagen_auto").src = src_nuevo;
    imagen.classList.remove(clase1);
    imagen.classList.add(clase2);

  },2000 );

}



var btn = $('.btn-imagen');
var btn2 = $('.btn-imagen2');

btn.click(function(){
  cargar_foto("cambio_automatico_v1","cambio_automatico_v2");
});

btn2.click(function(){
  cargar_foto("giroShow","giroHide");
});
