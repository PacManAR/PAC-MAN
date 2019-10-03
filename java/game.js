// Esta es una representación numérica del juego pacman.
// Utilizamos números para representar pacman, monedas, fondo y paredes.
let gameData = [ 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,1,2,2,2,2,2,1,2,2,2,2,2,1,1],
  [1,2,2,1,2,1,2,2,2,1,2,1,2,2,1],
  [1,7,1,2,2,2,2,1,2,2,2,2,1,2,1],
  [1,2,2,2,2,2,4,2,2,2,2,2,2,5,1],
  [1,2,2,1,2,1,1,3,1,1,2,1,2,2,1],
  [1,2,1,2,2,1,3,3,3,1,2,2,1,2,1],
  [1,2,1,2,2,1,3,8,3,1,2,2,1,2,1],
  [1,2,2,1,2,1,1,1,1,1,2,1,2,2,1],
  [1,2,1,2,2,2,1,9,1,2,2,2,1,2,1],
  [1,2,6,1,2,1,2,2,2,1,2,1,2,2,1],
  [1,1,2,2,2,2,2,1,2,2,2,2,2,1,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
 

const pared = 1;// 1 es la pared,
const moneda = 2;// 2 va a ser la moneda.
const fondo = 3;//fondo es 3 pero en el mapa no se muetra porque utilizamos el fondo del css.
const pacman = 4; //4 nos representa el pacman.
const fantasma =5;// 5 fantasma rosa
const fantasma1 =6;// 6  fantasma naranja
const fantasma2 =7;// 7 fantasma celeste
const fantasma3 =8;// 8 fantasma rojo
const cereza = 9; //9 cereza

//la instruccion no perimite declarar una variable de alcanze local, que solo se mueve en el js.
let mapa; //usamos la variale mapa para idenficar el mapa del juego.

let pac = { //declara la posicion del pacman.
  x: 6,		//en la cordenada x.
  y: 4,		//e y.
  direction: 'right'		//la direccion inicial va a ser derecha.
};

function createTiles(data){ //convierte al gamedata en objetos que el navegador pueda alteral mediante JS 
							//y cambiar los contenidos y aspectos de la pagina.

 let tilesArray = []; // mantiene los objetos dentro de la matriz gamedata.
	for (let row of data){//comienza observando cada fila

		for (let col of row){//para luego mirar cada columna en esa fila

		let tile = document.createElement('div');//igualamos el elemento tile a los elementos crados en el div.
		tile.classList.add('tile');       //le asignamos un titulo a cada clase.

      //cramos una condicional que va a depender del valor numerico de cada clase.
			if (col === pared){
				tile.classList.add('pared');
			} else if (col === moneda){
				tile.classList.add('moneda');
			} else if (col === fondo){
				tile.classList.add('fondo');
      }  else if (col === fantasma){
        tile.classList.add('fantasma');
      }else if (col === fantasma1){
        tile.classList.add('fantasma1');
      }else if (col === fantasma2){
        tile.classList.add('fantasma2');
      }else if (col === fantasma3){
        tile.classList.add('fantasma3');
      }else if (col === cereza) {
        tile.classList.add('cereza');
			} else if (col === pacman){
				tile.classList.add('pacman');
				tile.classList.add(pac.direction);//se agrega otra clase que hace referencia 
                                          //a la direccion inicial del pacman.
			}
			tilesArray.push(tile); //agregamos todo la configuracion de la condicional en tilesArray.
		}
		let brTile= document.createElement('br');//le indica al navegador que deve crear un salto de linea
                                             //cuando llega al final de cada fila.

		tilesArray.push(brTile);//agregamos el elemento br al tilesArray.
	}

 return tilesArray;//devolvemos toda la matriz creada de los tiles configurados.
}

function drawMap(){ //creamos un elemnto de mapa
	mapa =document.createElement('div'); //igualamos la variable mapa a los elementos creados en el div.
  //agregamos a la pagina todos los elemnentos tile
	let tiles =createTiles(gameData);
	for (let tile of tiles){
		mapa.appendChild(tile);
	}

	document.body.appendChild(mapa);//aqui se agrega a la pagina
}
 //nos permite eliminar elemntos del mapa del mapa dentro de la pagina
function eraseMap(){
		document.body.removeChild(mapa);
}
//funciones de movimiento 
//todas la funciones contienen las direcciones del pacman para mostrar la imagen indicada
function moverArriba(){
   pac.direction = 'arriba';//direccion de pacman
   //creamos una condicional que nos va a permiitir
   if (gameData[pac.y-1][pac.x] !== pared) {//comprobar cuando el pacman choque la pared
   gameData[pac.y][pac.x] = fondo;//y si es un no, coloca al pacman en su ubicacion de origen en un espacio vacio
   pac.y = pac.y - 1;//para actualiza la ubiacion del pacman
   gameData[pac.y][pac.x] = pacman;//para luego dibujar/establecer la nueva ubicacion
  }
}
//esta condicional se repite para cada funcion de movimiento del pacman
function moverAbajo(){ 
    pac.direction = 'abajo'; 
    if (gameData[pac.y+1][pac.x] !== pared) {
    gameData[pac.y][pac.x] = fondo;
    pac.y = pac.y + 1 ;
    gameData[pac.y][pac.x] = pacman;
  }
}
function moverIzquierda(){
  pac.direction = 'izquierda';
  if (gameData[pac.y][pac.x-1] !== pared) {
    gameData[pac.y][pac.x] = fondo;
    pac.x = pac.x - 1 ;
    gameData[pac.y][pac.x] = pacman;
  }
}
function moverDerecha(){
	pac.direction = 'derecha';
    if (gameData[pac.y][pac.x+1] !== pared) {
    gameData[pac.y][pac.x] = fondo;
    pac.x = pac.x + 1 ;
    gameData[pac.y][pac.x] = pacman;
  }	
}
//configuramos las teclas de movimento del personaje
function setupKeyboardControls(){//esta funcion establece los controles de toda la pagina
 document.addEventListener('keydown', function (e){//especificamente cuando el jugador precione una tecla
  //se ejecutara una funcion
 	console.log(e.keyCode);//nos muestra en la consola las teclas que son presionadas con su valor numerico
  //cada if anidado maneja una pulsacion de tecla
 	if (e.keyCode === 37) {//flecha izquierda es 37
		moverIzquierda();
	} else if (e.keyCode === 38) {//flecha arriba es 38
		moverArriba();
	} else if (e.keyCode === 39) {//flecha derecha es 39
		moverDerecha();
    } else if (e.keyCode === 40) {//flecha abajo es 40
		moverAbajo();
	}
  //despues de cada movmiento
	eraseMap();//borramos el mapa y
	drawMap();//actualizamos el dibujo del mapa
  }); 
}
//funcion principal de la configuracion del juego
function main(){//inciliazamos el juego

	drawMap();//dibujando el mapa
	setupKeyboardControls();//y configurando los controles del teclado
}

main();//comenzamos el juego una vez definidas todas las fucniones