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

// Array para los disparos
var disparos = [];

// Arreglo que almacena los enemigos
var enemigos = [];

// Objeto del juego que guarda su estado
var juego = {
  estado: "iniciando"
}

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

  // -----------------PARA PARTE 5------------------
  if(teclado[32]){
    if(!teclado.fire) {
      fire();
      teclado.fire = true;
    }
    else {
      teclado.fire = false;
    }
  }
}
// ************* PARTE 4 (FIN) *****************

// ********** BOTONES PARA MOBILES ************
var btnLeft = document.getElementById("btn-left");
var btnRight = document.getElementById("btn-right");
var btnShoot = document.getElementById("btn-shoot");
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

  btnShoot.addEventListener("mousedown",function(e) {
    avanza["disparo"] = true;
  });
  btnShoot.addEventListener("mouseup",function(e) {
    avanza["disparo"] = false;
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

  if(avanza["disparo"]) {
    if(!avanza.fire) {
      fire();
      avanza.fire = true;
    }
    else {
      avanza.fire = false;
    }
  }
}
// ********** BOTONES PARA MOBILES (FIN) ************


// ************* PARTE 5 (DISPAROS) *****************
function moveShoots(){
  for(var i in disparos) {
    var disparo = disparos[i];
    disparo.y -= 2;
  }
  // Filtramos los disparos para eliminar del Arreglo los disparos que ya hayan salido de la pantalla
  // Ayuda a optimizar la memoria
  disparos = disparos.filter(function(disparo){
    return disparo.y > 0;
  })
}

// fire agrega un objeto JSON por cada disparo a la variable disparos con sus atributos (Posicion de salida y tamaño)
function fire() {
  disparos.push({
    x: nave.x + 20,
    y: nave.y - 10,
    width: 10,
    height: 30
  })
}

function drawShoots() {
  ctx.save();
  ctx.fillStyle = "white";
  for(var i in disparos) {
    var disparo = disparos[i];
    ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height);
  }
  ctx.restore();
}

// ************* PARTE 5 (FIN) *****************

// ************* PARTE 6 (ENEMIGOS) *****************

function drawEnemy(){
  for (var i in enemigos) {
    var enemigo = enemigos[i];
    ctx.save();
    if(enemigo.estado == "vivo") ctx.fillStyle = "red";
    if(enemigo.estado == "muerto") ctx.fillStyle = "black";
    ctx.fillRect(enemigo.x,enemigo.y,enemigo.width,enemigo.height);
    ctx.restore();
  }
}

function updateEnemys(){
  if(juego.estado == "iniciando") {
    for(var i = 0; i < 10; i++) {
      enemigos.push({
        x: 10 + (i*50),
        y: 10,
        height: 40,
        width: 40,
        estado: "vivo",
        contador: 0
      });
    }
    // Para que entre solo una vez a este ciclo
    juego.estado = "jugando";
  }

  // ********* PARTE 7 (MOVER ENEMIGOS) *******************
  for(var i in enemigos) {
    var enemigo = enemigos[i];
    if(!enemigo) continue;
    if(enemigo && enemigo.estado == "vivo") {
      enemigo.contador++;
      // Se utiliza sin() porque dependiendo del valor que se le pase a veces es positivo y a veces negativo y se usa para mover las naves de un lado a otro
      enemigo.x += Math.sin(enemigo.contador * Math.PI/90)*5
    }

    // ********* PARTE 9 (Eliminar enemigos) **********
    if(enemigo && enemigo.estado == 'hit') {
      enemigo.contador++;
      // Condicion >= 20 para que no desaparezcan instantaneamente
      if(enemigo.contador >= 20){
        enemigo.estado = "muerto";
        enemigo.contador = 0;
      }
    }
  }
  enemigos = enemigos.filter(function(enemigo){
    if(enemigo && enemigo.estado != "muerto") return true;
    return false;
  });
  // ++++++++++ PARTE 9 (FIN) +++++++++++
  // ********* PARTE 7 (FIN) **********************
}


// ************* PARTE 6 (FIN) *****************

// ********* PARTE 8 (LOGICA COLISIONES) ******************

function hit(a,b){
  var hit = false;
  // Definimos los algoritmos de colisiones
  if(b.x + b.width >= a.x && b.x < a.x + a.width){
    if(b.y + b.height >= a.y && b.y < a.y + a.height) {
      hit = true
    }
  }
  if(b.x <= a.x && b.x + b.width >= a.x + a.width) {
    if(b.y <= a.y && b.y + b.height >= a.y + a.height){
      hit = true;
    }
  }
  if(a.x <= b.x && a.x + a.width >= b.x + b.width) {
    if(a.y <= b.y && a.y + a.height >= b.y + b.height){
      hit = true;
    }
  }
  return hit;
}

// ********* PARTE 8 (FIN) ******************

// ********* PARTE 9 (ELIMINAR ENEMIGO) ******************

// Confirmamos que hubo contacto entre el disparo y las naves enemigas con la logica de colisiones implementada
function hitConfirm() {
  for(var i in disparos){
    var disparo = disparos[i];
    for(var j in enemigos){
      var enemigo = enemigos[j];
      if(hit(disparo,enemigo)){
        enemigo.estado = "hit";
        enemigo.contador = 0;
      }
    }
  }
}

// ********* PARTE 9 (FIN) ******************


function frameLoop() {
  addEventKeyboard();
  buttonEvent();
  moveByButton();
  moveSpaceship();
  updateEnemys();   // PARTE 6
  moveShoots();
  drawBackground();
  hitConfirm();     // PARTE 9
  drawShoots();
  drawSpaceship();
  drawEnemy();      // PARTE 6
}

loadMedia();