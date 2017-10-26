var pj = document.getElementById("personaje");
var esc = document.getElementById("escenario");
var fon = document.getElementById("fondo");
var vida = document.getElementById("vidas");
var tecla = "";


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
        document.getElementById("vida").innerHTML = this.vidas;
        this.score -=350;
        document.getElementById("punto").innerHTML = this.score,
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

function Enemigo(){
  this.pago=false;
  this.posX=900;
  this.posY=400;
  this.ancho=41;
  this.alto=50;
  this.dead=-1;
}

Enemigo.prototype.pagar = function(x,score){
  if (this.valor) {
    if ((this.posX+this.ancho)<x) {
      this.pago = true;
      score +=100;
      document.getElementById("punto").innerHTML = this.score;
    }
  }
};

Enemigo.prototype.nuevo = function(){
  this.dead=0;
  setTimeout(this.revivir(),3000)
}

Enemigo.prototype.revivir = function(){
  this.pago=false;
  this.posX=900;
  this.posY=400;
  this.dead=1;
}

Enemigo.prototype.muerto = function(){
    if (this.posX<=0) {
      document.getElementById("enemigo").style.display = "none";
      this.dead=-1;
      this.posX=1000;
    }
}

var perso = ""
var enem = ""

function Juego(){
  this.P1 = new Player();
  console.log(this.P1);
  this.enemigos = new Enemigo();
  this.jugando = true;
  this.actu ="";
}
Juego.prototype.actualizar = function(){
      perso = this.P1;
      enem = this.enemigos;
      this.actu = setInterval(function(){funcionando(); }, 50)
}
Juego.prototype.endgame = function(){
  if (!this.jugando) {
     clearInterval(this.actu);
  }
}


function pressKey(){
  addEventListener("keypress", realizarAccion);
  function realizarAccion(e){
    e = e || window.event;
    tecla = e.keyCode;
    return tecla;
  }
}

function instru(){
    document.getElementById("info").style.display = "block";
}
function startgame(){
  document.getElementById("empezar").style.display = "none";
  document.getElementById("instrucciones").style.display = "none";
  document.getElementById("info").style.display = "none";
  document.getElementById("mundo").style.display = "block";
  var game = new Juego();
  game.actualizar();
}

function funcionando(per,enem){
  pressKey();
  if (tecla == '38') {
    tecla = "";
   perso.saltar();
  }
  else if (tecla == '37') {
    tecla = "";
   perso.correr(-1);
  }
  else if (tecla == '39') {
    tecla = "";
   perso.correr(1);
  }
}
