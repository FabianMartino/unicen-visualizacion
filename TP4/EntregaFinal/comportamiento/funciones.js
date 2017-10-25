$("info").hide();
$(document).ready(function(){
        $("info").hide();
      });
var pj = document.getElementById("personaje");
var esc = document.getElementById("escenario");
var fon = document.getElementById("fondo");
var vida = document.getElementById("vidas");
function Player(){
  this.posX = 300;
  this.posY = 400;
  this.alto = 63;
  this.ancho = 60;
  this.vidas = 3;
  this.score = 0;
  this.air = false;
  this.hit = false;
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
};

Player.prototype.correr = function (direccion) {

  this.posX+=(10*direccion);
  if (this.posX<0) {
    this.posX=0;
  }
  if (this.posX>=(900)) {
    this.posX =900;
  }
  if (!this.air) {
    pj.style.animation = 'correr 0.6s steps(9) infinite';
    direccion = 1;
  }
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px) scale("+direccion+",1)";

};
Player.prototype.saltar = function () {
  this.air = true;
  pj.style.animation = 'saltar 2s steps(8) normal forwards';
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
  pj.addEventListener("animationend", enAire)
};

function enAire(){
  P1.air = false;
  P1.correr(1);

}

Player.prototype.golpeado=function(x,y,ancho,alto){
  if (!this.hit) {
    if (((x+ancho)>=this.posX && x<= ( this.posX+this.ancho))){
      if (((y+alto)>=this.posY && y<= ( this.posY+this.alto))||(this.air)&&(y>=300)) {
        this.hit= true;
        this.vidas--;
        document.getElementById("vida").innerHTML = this.vidas,
        setTimeout(invencible, 2000);
        pj.style.animation = 'correr 0.6s steps(9) infinite';
      }
    }
  }
  else {
  }
};
function invencible(){
  P1.hit = false;
}



var P1 = new Player();
var dir = 0;
addEventListener("keypress", realizarAccion);

function realizarAccion(e){
  e = e || window.event;

  if (e.keyCode == '38') {
   P1.saltar();
  }
  if (e.keyCode == '40') {
   P1.golpeado(300,400,63,60);
  }
  else if (e.keyCode == '37') {
   P1.correr(-1);
  }
  else if (e.keyCode == '39') {
   P1.correr(1);
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
function instru(){
    document.getElementById("info").style.display = "block";
}
function startgame(){
  document.getElementById("empezar").style.display = "none";
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("mundo").style.display = "block";

}
