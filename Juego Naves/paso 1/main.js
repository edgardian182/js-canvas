// Objetos importantes de canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

// Variable donde almacenaremos un objeto imagen
var fondo;

// Definimos las funciones del juego
// Se encarga de asegurar la carga de las imagenes
function loadMedia() {
  // Se utiliza objeto tipo Image de JS para crear una instancia en variable fondo
  fondo = new Image();
  // definimos la url de la imagen contenida en misma carpeta
  fondo.src = "space.jpg";
  fondo.onload = function() {
    var intervalo = window.setInterval(frameLoop(),1000/55);
  }
}

function drawBackground() {
  ctx.drawImage(fondo,-630,-50);
}

function  frameLoop() {
  drawBackground();
}

loadMedia();