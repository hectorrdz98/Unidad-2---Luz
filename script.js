var maxTamCanvas = 2000;
var escalaCanvas = 20;

var rectsAgregados = {};


// Funciones de p5.js

function setup() {
    createCanvas(maxTamCanvas, maxTamCanvas);
    noLoop();
}

function draw() {
    clear();
    for (var i = 0; i<=maxTamCanvas; i=i+escalaCanvas) {
        stroke(220, 220, 220);
        line(0, i, maxTamCanvas, i);
    }
    for (var i = 0; i<=2000; i=i+escalaCanvas) {
        stroke(220, 220, 220);
        line(i, 0, i, maxTamCanvas);
    }  

    // Agregar al canvas los rects del array
    for (var key in rectsAgregados) { 
    	// Fill de cada rectángulo
    	fill(
			rectsAgregados[key][4][0],
			rectsAgregados[key][4][1],
			rectsAgregados[key][4][2]
		);
		// Creación de cada rectángulo
    	rect(
    		rectsAgregados[key][0],
    		rectsAgregados[key][1],
    		rectsAgregados[key][2],
    		rectsAgregados[key][3],
    	);
    }
}


// Funciones elementales

function addRect(nombre, posX, posY, widthR, heightR) {
	// Datos de cada rectángulo
	rectsAgregados[nombre] = [
		posX, 
		posY, 
		widthR, 
		heightR, 
		[
			Math.floor(Math.random() * 200) + 30,
			Math.floor(Math.random() * 200) + 30,
			Math.floor(Math.random() * 200) + 30
		]
	];
	redraw();
}

function colocarTodoGris() {
	// Colocar cada ícono del menu en gris
	$(".h_cont_boton span").css("color", "rgb(150,150,150)");
}



// Funciones de eventos

var herramientaSeleccionada = "seleccionar";
var cont = 0;

$("#agregarRect").on({
	click: function () {
		if ($("#agregarRect span:first-child").css("color") != "rgb(255, 255, 255)") {
			$("#agregarRect span:first-child").css("color", "white");
			herramientaSeleccionada = "rect";
		} else if ($("#agregarRect span:first-child").css("color") == "rgb(255, 255, 255)") {
			colocarTodoGris();
			herramientaSeleccionada = "seleccionar";
		}
	}
});

$(document).on('click', 'canvas', function() {
	if (herramientaSeleccionada == "rect") {
		addRect(("Rect" + cont), mouseX, mouseY, 400, 200);
		cont++;
	}
});