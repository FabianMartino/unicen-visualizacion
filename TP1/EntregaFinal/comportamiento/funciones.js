    var ancho = 350;
    var alto = 350;
    var ctx1 = document.getElementById("canvasOriginal").getContext("2d");
    var ctx2 = document.getElementById("canvasResultado").getContext("2d");
    var image1 = new Image();
    image1.src = "default.jpg";

    image1.onload = function(){
      determinarTamano(image1);
			myDrawImageMethod(this);
		};


   $('#imagen').change(function(e) {
        var file = e.target.files[0],
            imageType = /image.*/;

        if (!file.type.match(imageType))
            return;

        var reader = new FileReader();
        reader.onload = fileOnload;
        reader.readAsDataURL(file);

    });

    function determinarTamano(img){
      var dif_ancho = 0;
      var dif_alto = 0;
      if (img.width<350) {
        ancho = img.width;
      }
      else {
        ancho = 350;
        dif_ancho = 100-350*100/img.width;
      }
      if (img.height<350) {
        alto = img.height;
      }
      else {
        alto = 350;
        dif_alto = 100-350*100/img.height;
      }
      if ((dif_ancho-dif_alto)!=0) {
        if (dif_ancho<dif_alto) {
          dif_alto = dif_alto-dif_ancho;
          ancho = dif_alto*ancho/100;
        }
        else {
          dif_alto = dif_alto-dif_ancho;
          dif_ancho = dif_ancho-dif_alto;
          alto = dif_ancho*alto/100;
        }
      }
    }

  function fileOnload(e){
    var $img = $('<img>', { src: e.target.result });
    $img.load(function() {
      determinarTamano(this);
      ctx1.drawImage(this, 0, 0, ancho, alto);
      ctx2.drawImage(this, 0, 0, ancho, alto);
  });
  }

  function cargarImagen(img){
    alert(img.src);
   		 var width = ctx1.width;
   		 var heigth = ctx1.heigth;
       var image1 = new Image();
       image1.src = img;
       image1.onload = myDrawImageMethod(this);

  }
  function myDrawImageMethod(image){
    ctx1.drawImage(image, 0, 0,ancho,alto);
    ctx2.drawImage(image, 0, 0,ancho,alto);
  }

  function f_blancoNegro(){
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    var proporcion = 0;
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
          proporcion = (getRed(imageData1, x ,y)+getGreen(imageData1, x ,y)+getBlue(imageData1, x ,y))/3;
          setPixel(imageData1, x, y, proporcion , proporcion, proporcion, getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData1, 0, 0);

  }

  function f_negativo(){
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
          setPixel(imageData1, x, y, 255-getRed(imageData1, x ,y) , 255-getGreen(imageData1, x ,y), 255-getBlue(imageData1, x ,y), getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData1, 0, 0);
  }

  $('#Binarizacion').change(function(){
    var valor = document.getElementById('Binarizacion').value;
    var width = ancho;
    var heigth = alto;
    var proporcion = 0;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
          proporcion = (getRed(imageData1, x ,y)+getGreen(imageData1, x ,y)+getBlue(imageData1, x ,y))/3;
          if (valor>proporcion) {
            setPixel(imageData1, x, y, 0 , 0, 0, getAlpha(imageData1, x ,y));
          }
          else {
            setPixel(imageData1, x, y, 255 , 255, 255, getAlpha(imageData1, x ,y));
          }
      }
    }
    ctx2.putImageData(imageData1, 0, 0);
  })

    $('#Brillo').change(function(){
    var brillo = document.getElementById('Brillo').value;
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
        setPixel(imageData1, x, y, valorPermitido(getRed(imageData1, x ,y),brillo) ,valorPermitido(getGreen(imageData1, x ,y),brillo), valorPermitido(getBlue(imageData1, x ,y),brillo), getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData1, 0, 0);
  })

  function valorPermitido(valor1, valor2){
    var temporal = valor1 + parseInt(valor2);
    if (temporal<0) {
      return 0;
    }
    else {
      if (temporal>255) {
        return 255;
      }
      else {
        return temporal;
      }
    }
  }

  function f_sepia(){
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
        var rojo = getRed(imageData1, x ,y);
        var verde = getGreen(imageData1, x ,y);
        var azul = getBlue(imageData1, x ,y);
          setPixel(imageData1, x, y, (rojo*.393)+(verde*.769)+(azul*.189), (rojo*.349)+(verde*.686)+(azul*.168), (rojo*.272)+(verde*.534)+(azul*.131), getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData1, 0, 0);
  }


  function f_blur(){
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    imageData2 = ctx1.getImageData(0, 0, ancho, alto);
    for(x=1; x<width-1; x++){
      for(y=1; y<heigth-1; y++){
        var rojo = (getRed(imageData1, x-1 ,y-1)+getRed(imageData1, x-1 ,y)+getRed(imageData1, x-1 ,y+1)+getRed(imageData1, x ,y-1)+getRed(imageData1, x ,y)+getRed(imageData1, x ,y+1)+getRed(imageData1, x+1 ,y-1)+getRed(imageData1, x+1 ,y)+getRed(imageData1, x+1 ,y+1))/9;
        var verde = (getGreen(imageData1, x-1 ,y-1)+getGreen(imageData1, x-1 ,y)+getGreen(imageData1, x-1 ,y+1)+getGreen(imageData1, x ,y-1)+getGreen(imageData1, x ,y)+getGreen(imageData1, x ,y+1)+getGreen(imageData1, x+1 ,y-1)+getGreen(imageData1, x+1 ,y)+getGreen(imageData1, x+1 ,y+1))/9;
        var azul = (getBlue(imageData1, x-1 ,y-1)+getBlue(imageData1, x-1 ,y)+getBlue(imageData1, x-1 ,y+1)+getBlue(imageData1, x ,y-1)+getBlue(imageData1, x ,y)+getBlue(imageData1, x ,y+1)+getBlue(imageData1, x+1 ,y-1)+getBlue(imageData1, x+1 ,y)+getBlue(imageData1, x+1 ,y+1))/9;
          setPixel(imageData2, x, y, rojo, verde, azul, getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData2, 0, 0);
  }

  function f_sobel(){
    var width = ancho;
    var heigth = alto;
    imageData1 = ctx1.getImageData(0, 0, ancho, alto);
    imageData2 = ctx1.getImageData(0, 0, ancho, alto);
    var proporcion = 0;
    for(x=0; x<width; x++){
      for(y=0; y<heigth; y++){
          proporcion = (getRed(imageData1, x ,y)+getGreen(imageData1, x ,y)+getBlue(imageData1, x ,y))/3;
          setPixel(imageData1, x, y, proporcion , proporcion, proporcion, getAlpha(imageData1, x ,y));
      }
    }
    for(x=1; x<width-1; x++){
      for(y=1; y<heigth-1; y++){
        var vertical = (getRed(imageData1, x-1 ,y-1)*-1+getRed(imageData1, x-1 ,y)*-2+getRed(imageData1, x-1 ,y+1)*-1+getRed(imageData1, x+1 ,y-1)+getRed(imageData1, x+1 ,y)*2+getRed(imageData1, x+1 ,y+1));
        var horizontal = (getGreen(imageData1, x-1 ,y-1)*-1+getGreen(imageData1, x ,y-1)*-2+getGreen(imageData1, x+1 ,y-1)*-1+getGreen(imageData1, x-1 ,y+1)+getGreen(imageData1, x,y+1)*2+getGreen(imageData1, x+1 ,y+1));
          setPixel(imageData2, x, y, vertical+horizontal, vertical+horizontal, vertical+horizontal, getAlpha(imageData1, x ,y));
      }
    }
    ctx2.putImageData(imageData2, 0, 0);
  }

  function getRed(imageData, x ,y){
    return imageData.data[(x + y * imageData.width)*4+0];
  }
  function getGreen(imageData, x ,y){
    return imageData.data[(x + y * imageData.width)*4+1];
  }
  function getBlue(imageData, x ,y){
    return imageData.data[(x + y * imageData.width)*4+2];
  }
  function getAlpha(imageData, x ,y){
    return imageData.data[(x + y * imageData.width)*4+3];
  }

  function setPixel(imageData, x, y, r, g , b, a){
    index = (x + y * imageData.width)*4;
    imageData.data[index+0] = r;
    imageData.data[index+1] = g;
    imageData.data[index+2] = b;
    imageData.data[index+3] = a;
  }

  function download() {
      var ctx2 = document.getElementById("canvasResultado");
      var dt = ctx2.toDataURL('image/jpeg');
      this.href = dt;
  };
  downloadLnk.addEventListener('click', download, false);
