var pj = document.getElementById("personaje");
var esc = document.getElementById("escenario");
var fon = document.getElementById("fondo");

function Player(){
  this.posX = 300;
  this.posY = 400;
  this.alto = 63;
  this.ancho = 60;
  this.vidas = 3;
  this.score = 0;
  this.air = false;
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
};

Player.prototype.correr = function (direccion, pos) {
  if (!this.air) {
    pj.style.animation = 'correr 0.6s steps(9) infinite';
  }
  this.posX+=(10*direccion);
  if (this.posX<0) {
    this.posX=0;
    M.mover("pausa");
  }
  if (this.posX>=(pos+500)) {
    this.posX =500;
    M.mover("x");
  }
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px) scale("+direccion+",1)";

};

Player.prototype.saltar = function () {

  this.air = true;
  pj.style.animation = 'saltar 2s steps(8) forwards';
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
  pj.addEventListener("animationend", enAire)
};
function enAire(){
  this.air = false;
}

Player.prototype.golpeado=function(direccion){
  if ((x>=this.posX || x<= ( this.posX+this.ancho))&&(y>=this.posY || y<= ( this.posY+this.alto))) {
  pj.style.animation = 'correr 0.6s steps(9) infinite';
  this.posX+=(30*direccion);
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px) scale("+direccion+",1)";
  }
};

function Mundo(){
  this.inicio = 0;

}

Mundo.prototype.mover=function(valor){
  if (valor == "pausa"){
    esc.style.animationPlayState ="paused";
  }
  else{
    esc.style.animationPlayState ="running";
    }
}


var P1 = new Player();
var M = new Mundo();
var dir = 0;
addEventListener("keypress", realizarAccion);

function realizarAccion(e){
  e = e || window.event;

  if (e.keyCode == '38') {
   P1.saltar();
  }
  else if (e.keyCode == '37') {
   P1.correr(-1,M.inicio);
  }
  else if (e.keyCode == '39') {
   P1.correr(1,M.inicio);
  }
}
//
// function Juego(){
//   this.pantalla = new mundo();
//   this.pj = new Player();
// //  this.pisos = [];
//   this.enemigos = [];
//   this.puntaje = 0;
// }
// // Juego.prototype.crearPiso(){
// //   var i = 0;
// //   var f = 1500
// //   while i<9000{
// //     var temp = new Piso(i,f,0);
// //     this.pisos = temp;
// //     i = f + 30;
// //     f += (Math.Random()*1000)+50;
// //   }
// //   var temp = new Piso(i,10000,0);
// //   this.pisos = temp;
// // }
// // Juego.prototype.crearEnemigos(){
// //
// // }
// Juego.prototype.enemigoPantalla=function(){
//   var resultado = [];
//   for (var i = 0; i < this.enemigos.length; i++) {
//     if (this.enemigos[i]>=this.pantalla.inicio&&this.enemigos[i]<=(this.pantalla.inicio+1000)) {
//       resultado = this.enemigos[i];
//     }
//   }
//   return resultado;
// }
// juego.prototype.actualizar=function(){
//   var enemigos_pantalla = enemigoPantalla();
//   for (var i = 0; i < enemigos_pantalla.length; i++) {
//     var golpe = enemigos_pantalla[i].hit(this.pj.posX,this.pj.posY,this.pj.ancho,this.pj.alto);
//     if (golpe != 0) {
//       this.pj.golpeado(golpe);
//       this.pantalla.mover(30*golpe);
//     }
//   }
// }
