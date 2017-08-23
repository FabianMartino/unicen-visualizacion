 $("#imagen").change(function(){
     cargarImagen(this);
 });
 var ctx1 = document.getElementById("canvasOriginal").getContext("2d");


function cargarImagen(img){
 		 var width = ctx1.width;
 		 var heigth = ctx1.heigth;
     var image1 = new Image();
     image1 = document.getElementById("imagen");
     image1.onload = myDrawImageMethod(this);

}
function myDrawImageMethod(image){
  ctx1.drawImage(image, 0, 0,this.width,this.width);
}
