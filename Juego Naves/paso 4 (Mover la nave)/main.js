// Objetos importantes de canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// Creamos el objeto de la nave con JSON
// Contiene los atributos de la nave (posicion, ancho, alto)
var nave = {
  x: 100,
  y: canvas.height - 60,
  width: 50,
  height: 50
}

// Variable donde almacenaremos un objeto imagen
var fondo;

var teclado = {};

// Definimos las funciones del juego
// Se encarga de asegurar la carga de las imagenes
function loadMedia() {
  // Se utiliza objeto tipo Image de JS para crear una instancia en variable fondo
  fondo = new Image();
  // definimos la url de la imagen contenida en misma carpeta
  fondo.src = "space.jpg";
  fondo.onload = function() {
    var intervalo = window.setInterval(frameLoop,1000/55);
  }
}

function drawBackground() {
  ctx.drawImage(fondo,-630,-50);
}

function drawSpaceship() {
  // Salvamos la informacion actual del contexto primero
  ctx.save();
  ctx.fillStyle = "white";
  ctx.fillRect(nave.x, nave.y, nave.width, nave.height);
  ctx.restore();
}


// ************* PARTE 3 (Agregar Eventos al Teclado) *******
// Función para agregar eventos al teclado (variable teclado)
function addEventKeyboard(){

  // Eventos a agregar (keydown y keyup)
  agregarEvento(document,"keydown",function(e){
    // Ponemos en true el código de la tecla presionada
    teclado[e.keyCode] = true;
    console.log(teclado)
  });
  agregarEvento(document,"keyup",function(e){
    // Ponemos en false el código de la tecla que se deja de presionar
    teclado[e.keyCode] = false;
  });


  // Existen formas diferentes de agregar eventos I.Explorer y los demas
  function agregarEvento(elemento,nombreEvento,funcion) {
    if (elemento.addEventListener) {
      // Para Navegadores de verdad
      elemento.addEventListener(nombreEvento,funcion,false);
    }
    else {
      // Para Internet Explorer
      elemento.attachEvent(nombreEvento,funcion);
    }
  }
}
// ************* PARTE 3 (FIN) ***************


// ************* PARTE 4 *****************
function moveSpaceship(){
  // Movimiento a la izquierda
  if(teclado[37]) {
    nave.x  -= 6;
    if(nave.x < 0) nave.x = 0;
  }
  // Movimiento a la derecha
  if(teclado[39]) {
    var limite = canvas.width - nave.width;
    nave.x  += 6;
    if(nave.x > limite) nave.x = limite;
  }
}
// ************* PARTE 4 (FIN) *****************

function frameLoop() {
  addEventKeyboard();
  buttonEvent();
  moveByButton();
  moveSpaceship();
  drawBackground();
  drawSpaceship();
}


// ********** BOTONES PARA MOBILES ************
var btnLeft = document.getElementById("btn-left");
var btnRight = document.getElementById("btn-right");
var avanza = {};

function buttonEvent(){
  btnLeft.addEventListener("mousedown",function(e) {
    avanza["izquierda"] = true;
  });
  btnLeft.addEventListener("mouseup",function(e) {
    avanza["izquierda"] = false;
  });

  btnRight.addEventListener("mousedown",function(e) {
    avanza["derecha"] = true;
  });
  btnRight.addEventListener("mouseup",function(e) {
    avanza["derecha"] = false;
  });
}

function moveByButton() {
  if(avanza["derecha"]){
    var limite = canvas.width - nave.width;
    nave.x  += 6;
    if(nave.x > limite) nave.x = limite;
  }
  if(avanza["izquierda"]) {
    nave.x  -= 6;
    if(nave.x < 0) nave.x = 0;
  }
}
// ********** BOTONES PARA MOBILES (FIN) ************

loadMedia();