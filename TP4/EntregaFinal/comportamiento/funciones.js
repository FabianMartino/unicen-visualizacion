var pj = document.getElementById("personaje");

function Player(){
  this.posX = 300;
  this.posY = 300;
  this.alto = 30;
  this.ancho = 37;
  this.vidas = 3;
  this.score = 0;
  this.air = false;
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
};

Player.prototype.correr = function (direccion) {
pj.style.animation = 'correr 0.6s steps(9) infinite';
this.posX+=(10*direccion);
if (this.posX<0) {
  this.posX=0;
}
pj.style.transform = " translate("+this.posX+"px,"+this.posY+"px) scale("+direccion+",1)";
};

Player.prototype.saltar = function () {
  this.air = true;
  pj.style.animation = 'correr 0.6s steps(9) infinite';
  this.posY-=30;
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
};

var P1 = new Player();
addEventListener("keypress", realizarAccion);

function realizarAccion(e){
  e = e || window.event;

     if (e.keyCode == '38') {
       P1.saltar();

     }
     else if (e.keyCode == '40') {
         // down arrow
     }
     else if (e.keyCode == '37') {
       P1.correr(-1);
     }
     else if (e.keyCode == '39') {
       P1.correr(1);
     }
}
