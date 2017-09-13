function Circulo(x,y,r,color,tipo,i){
  this.tipo = tipo;
  this.posCorrecta = false;
  this.posX = x;
  this.posY = y;
  this.radio = r;
  this.color = color;
  figuras[i] = this;
}

Circulo.prototype.pintar = function (color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(this.posX,this.posY,this.radio,0,Math.PI *2);
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.stroke();
  ctx.closePath();
};

Circulo.prototype.detector = function(x,y){
  if (this.radio>=Math.sqrt(Math.pow(x-this.posX,2)+(Math.pow(y-this.posY,2)))) {
    return true;
  }
  else {
    return false;
  }
}

Circulo.prototype.moverFigura = function(x,y){
  this.posX = x;
  this.posY = y;
}

function Rectangulo(x,y,largo,alto,color,tipo,i){
  this.posCorrecta = false;
  this.tipo = tipo;
  this.color = color;
  this.posX = x;
  this.posY = y;
  this.largo = largo;
  this.alto = alto;
  figuras[i] = this;
}

Rectangulo.prototype.pintar = function (color) {
  ctx.fillStyle = "#000000";
  ctx.beginPath();
  ctx.fillRect(this.posX, this.posY, this.largo, this.alto);
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(this.posX+2, this.posY+2, this.largo-4, this.alto-4);
  ctx.fill();
  ctx.closePath();
};

Rectangulo.prototype.detector = function(x,y){
  if ((this.posX <= x) && (x <= this.posX+this.largo) && (this.posY <=y) && (y <= this.posY+this.alto)){
    return true;
  }
  else {
    return false;
  }
}

Rectangulo.prototype.moverFigura = function(x,y){
  this.posX = x-(this.largo/2);
  this.posY = y-(this.alto/2);
}



function Tablero(){
  this.completado = false;
  this.relej = 0;
  this.espacios = [];
  this.relacion = [];

}

Tablero.prototype.cargarEspacios = function (){
  var valido = false;
  for (var i = 0; i < dificultad; i++) {
    valido = false;
    while (!valido) {
      this.relacion[i] = Math.floor(Math.random() * dificultad);
      valido = true;
      for (var j = 0; j < this.espacios.length; j++) {
        if (this.espacios[j] == this.relacion[i]) {
          valido = false;
        }
      }
      if (valido) {
        this.espacios[i] = this.relacion[i];
      }
    }
  }
  for (var i = 0; i < this.espacios.length; i++) {
    var copia = figuras[this.espacios[i]]
    if (copia.tipo=="circulo") {
      this.espacios[i] = new Circulo(copia.x,copia.y,copia.radio,copia.color,copia.tipo,copia.i)
    }
    else {
      this.espacios[i] = new Rectangulo(copia.x,copia.y,copia.largo,copia.alto,copia.color,copia.tipo,copia.i);
    }
  }
};

Tablero.prototype.crearTablero = function (){
  var x = 600;
  var y = 3;
  for (var i = 0; i < this.espacios.length; i++) {
    if (this.espacios[i].tipo=="circulo") {
      this.espacios[i].posX = x+10+this.espacios[i].radio;
      this.espacios[i].posY = y+10+this.espacios[i].radio;
      this.espacios[i].radio+=10;
      this.espacios[i].pintar(this.espacios[i].color);
      this.espacios[i].radio-=10;
      if (!this.espacios[i].posCorrecta) {
        this.espacios[i].pintar("#000000")
      }
    }
    else {
      this.espacios[i].posX = x;
      this.espacios[i].posY = y;
      this.espacios[i].alto+=20;
      this.espacios[i].largo+=20;
      this.espacios[i].pintar(this.espacios[i].color);
      this.espacios[i].alto-=20;
      this.espacios[i].largo-=20;
      this.espacios[i].posX = x+10;
      this.espacios[i].posY = y+10;
      if (!this.espacios[i].posCorrecta) {
        this.espacios[i].pintar("#000000");
      }
    }
    x+=150;
    if (x==1200) {
      x=600;
      y+=150;
    }
  }
}

Tablero.prototype.terminoPartida = function(){
  clearInterval(cron);
  iniciado = false;
  var grd = ctx.createLinearGradient(0,0,1200,0);
  grd.addColorStop(0,"blue");
  grd.addColorStop(1,"white");
  ctx.fillStyle = grd;
  ctx.fillRect(0,0,1200,600);
  ctx.font = "60px Arial";
  ctx.strokeText("Ganaste en con un tiempo de "+sv_hor+":"+sv_min+":"+sv_seg+".",100,300);
}

/////****************************************************************///////
var dificultad = 0;
var click = false;
var seleccionado = -1;
var figuras = [];
var ctx = document.getElementById("canvas").getContext("2d");
var Tab = new Tablero();

function iniciarJuego(valor) {
  dificultad = parseInt(valor);
  figuras = [];
  Tab = new Tablero();
  crearFiguras();
  sv_min = 00;
  sv_hor = 00;
  sv_seg = 00;
  seg.innerHTML = "00";
  min.innerHTML = "00";
  hor.innerHTML = "00";
  if(!iniciado){ iniciado = true; start_cron(); }
}

function crearFiguras(){
  for (var i = 0; i < dificultad; i++) {
    var j = Math.floor(Math.random() * 10 );
    var color = 'rgb(' + (Math.floor(Math.random() * 250)+6) + ',' + (Math.floor(Math.random() * 250)+6) + ',' + (Math.floor(Math.random() * 250)+6) + ')';
    var x = 0;
    var y = 0;
    if (j >= 5) {
      var radio = 37 + (Math.floor(Math.random() * 6))*5;
      figuras[i] = new Circulo(130,130,radio,color,"circulo",i)
    }
    else {
      var alto = 99 + (Math.floor(Math.random() * 6))*5;
      var largo = 99 + (Math.floor(Math.random() * 6))*5;
      figuras[i] = new Rectangulo(300,100,alto,largo,color,"rectangulo",i)
    }
  }
  Tab.cargarEspacios();
  redibujar();

}

function redibujar(){
  ctx.fillStyle = "#eeee00";
  ctx.fillRect(0, 0, 1200, 600);
  Tab.crearTablero();
  for (var i = 0; i < figuras.length; i++) {
    if (!figuras[i].posCorrecta) {
      figuras[i].pintar(figuras[i].color);
    }
  }
}
document.getElementById("canvas").addEventListener("mousedown",mouseDown);
document.getElementById("canvas").addEventListener("mousemove",mouseMove);
document.getElementById("canvas").addEventListener("mouseup",mouseUp);


function mouseDown(e){
  click = true;
  var rect = canvas.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  if (click) {
    for (var i = 0; i < figuras.length; i++) {
      if (!figuras[i].posCorrecta) {
        if (figuras[i].detector(x,y)) {
          seleccionado = i;
        }
      }
    }
    if (seleccionado == -1) {
      click = false;
    }
  }
}

function mouseMove(e){
  if (click) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    for (var i = 0; i < figuras.length; i++) {
      if (seleccionado>=0) {
        figuras[seleccionado].moverFigura(x,y);
      }

    }
    redibujar();
  }
}

function mouseUp(e){
  if (click) {
    var rect = canvas.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    for (var i = 0; i < Tab.espacios.length; i++) {
      if ((Tab.espacios[i].detector(x,y))&&(Tab.relacion[i]==seleccionado)) {
        Tab.espacios[i].posCorrecta = true;
        figuras[seleccionado].posCorrecta = true;
        redibujar();
        var verificar = true;
        for (var j = 0; j < figuras.length; j++) {
          if (!figuras[j].posCorrecta) {
            verificar = false;
          }
        }
        Tab.completado = verificar;
        if (Tab.completado) {
          Tab.terminoPartida();
        }
      }
    }
    click = false;
    seleccionado = -1;
  }
  click = false;
  seleccionado = -1;
  for (var i = 0; i < figuras.length; i++) {
  }
}


var cron;
 var sv_min = 00;
 var sv_hor = 00;
 var sv_seg = 00;
 var seg = document.getElementById('seg');
 var min = document.getElementById('min');
 var hor = document.getElementById('hor');
 var iniciado = false;

// $("#btn_play").click(function(){
//  if(!iniciado){ iniciado = true; start_cron(); }
// });

function start_cron(){
cron = setInterval(function(){
 sv_seg++;
 if(sv_seg < 60){
   if(sv_seg < 10){ seg.innerHTML = "0"+sv_seg; }else{ seg.innerHTML = sv_seg; }
 }else{
   sv_seg = 0; seg.innerHTML = "00";
   sv_min++;
   if(sv_min < 60){
     if(sv_min < 10){ min.innerHTML = "0"+sv_min; }else{ min.innerHTML = sv_min; }
   }else{
     sv_min = 0; min.innerHTML = "00";
     sv_hor++;
     if(sv_hor < 10){ hor.innerHTML = "0"+sv_hor; }else{ hor.innerHTML = sv_hor; }
   }
 }
}, 1000);
}
