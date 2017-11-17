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
    pj.style.animation = 'correr '+(6+(direccion*(-2)))/10+'s steps(9) infinite';
    direccion = 1;
  }
  pj.style.transform = "translate("+this.posX+"px,"+this.posY+"px) scale("+direccion+",1)";

};
function bajar(){
  if (contadorSaltos>0) {
    console.log(contadorSaltos);
    contadorSaltos--;
    var posY = 300;
    perso.posY+=5;
    pj.style.transform = "translate("+perso.posX+"px,"+perso.posY+"px)";
  }
  else {
    perso.air = false;
    perso.correr(1);
    clearInterval(saltando);

  }
}
function subir(){
  if (contadorSaltos<20) {
    console.log(contadorSaltos);
    var posY = 400;
    perso.posY-=5;
    contadorSaltos++;
    pj.style.transform = "translate("+perso.posX+"px,"+perso.posY+"px)";
  }
  else {
    clearInterval(saltando);
    saltando = setInterval(function (){bajar();},50);
    console.log("termino con "+contadorSaltos);
  }
}
var contadorSaltos = 0;
var saltando = "";
Player.prototype.saltar = function () {
  this.air = true;
  pj.style.animation = 'saltar 2s steps(8) normal forwards';
  var x = this.posX;
  var y = this.posY;
  saltando = setInterval(function (){
    subir();},50);
};



Player.prototype.golpeado=function(x,y,ancho,alto){
  if (!this.hit) {
    if (((x+ancho)>=this.posX && x<= ( this.posX+this.ancho))){
      if ((this.posY+this.alto)>y) {
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
  this.posY=410;
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
  this.posY=410;
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
var game = ""
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
      partida = setInterval(function(){funcionando(); }, 50)
}
Juego.prototype.endgame = function(){
  if (!this.jugando) {
     clearInterval(partida);
     document.getElementById("menu").style.display = "block";
     document.getElementById("mundo").style.display = "none";
     document.getElementById("resultado").innerHTML = "Tu puntuacion es de "+perso.score;
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
  document.getElementById("menu").style.display = "none";
  document.getElementById("mundo").style.display = "block";

  game = new Juego();
  document.getElementById("vida").innerHTML = game.P1.vidas;
  document.getElementById("punto").innerHTML = game.P1.score;
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
  if (perso.vidas==0) {
    game.jugando=false;
    game.endgame();
  }
}
