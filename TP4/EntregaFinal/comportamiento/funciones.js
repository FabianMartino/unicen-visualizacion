var pj = document.getElementById("personaje");
var esc = document.getElementById("escenario");
var fon = document.getElementById("fondo");
var vida = document.getElementById("vidas");
var en = document.getElementById("enemigo");
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
  perso.air = false;
  perso.correr(1);

}

Player.prototype.golpeado=function(x,y,ancho,alto){
  if (!this.hit) {
    if (((x+ancho)>=this.posX && x<= ( this.posX+this.ancho))){
      if (!this.air) {
        this.hit= true;
        this.vidas--;
        document.getElementById("vida").innerHTML = this.vidas;
        this.score -=350;
        document.getElementById("punto").innerHTML = this.score;
        setTimeout(invencible, 2000);
        pj.style.animation = 'correr 0.6s steps(9) infinite';
      }
      else {
        if (!enem.pago) {
          this.score += 100;
          document.getElementById("punto").innerHTML = this.score;
          enem.pago = true
        }
      }
    }
  }
  else {
  }
};
function invencible(){
  perso.hit = false;
}

function Enemigo(){
  this.pago=false;
  this.posX=900;
  this.posY=400;
  this.ancho=41;
  this.alto=50;
  this.dead=-1;
  en.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
  document.getElementById("enemigo").style.display = "block";

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
  setTimeout(this.revivir(),3000);
}
Enemigo.prototype.mover = function(){
  if (this.dead==1) {
    this.posX -= 10;
    if (this.posX > 0) {
      en.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
    }
  }
}
Enemigo.prototype.revivir = function(){
  this.pago=false;
  this.posX=900;
  this.posY=400;
  this.dead=1;
  en.style.transform = "translate("+this.posX+"px,"+this.posY+"px)";
  document.getElementById("enemigo").style.display = "block";
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
var partida = ""
function Juego(){
  this.P1 = new Player();
  this.enemigos = new Enemigo();
  this.jugando = true;
  this.actu ="";
}
Juego.prototype.actualizar = function(){
      perso = this.P1;
      enem = this.enemigos;
      partida = this.actu
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

function funcionando(){
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
  if (enem.dead==-1) {
    enem.nuevo();
  }
  else {
    enem.mover();
    enem.muerto();
  }
  perso.golpeado(enem.posX,enem.posY,enem.ancho,enem.alto);
}
