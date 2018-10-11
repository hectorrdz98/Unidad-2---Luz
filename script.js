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
        stroke(245, 245, 245);
        line(0, i, maxTamCanvas, i);
    }
    for (var i = 0; i<=2000; i=i+escalaCanvas) {
        stroke(245, 245, 245);
        line(i, 0, i, maxTamCanvas);
    }  

    // Agregar al canvas los rects del array
    for (var key in rectsAgregados) { 
    	// Fill de cada rectángulo
    	fill(
			indicesRefraccion[rectsAgregados[key][4]][1]
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
		posX, // Posición en X
		posY,  // Posición en Y
		widthR,  // Width del rect
		heightR,  // Height del rect
		"Agua"
	];

	var htmlElemento = `
		<div id="`+ nombre + `" class="elementoBita">
	      	<div class="detallesMaterialBita">
	      		<div></div>
	      		<p id="` + nombre + `_p">` + nombre + `</p>
	      	</div>
	    </div>
	`;

	$("#areaElementosBita").append(htmlElemento);

	activarElementoBita(nombre);

	redraw();
}

function activarElementoBita(idElem) {
	$(("#" + elementoSeleccionado)).css("background-color", "rgba(255,255,255,0)");
	$(("#" + idElem)).css("background-color", "rgba(255,255,255,0.2)");
	crearDetalles(idElem);
	elementoSeleccionado = idElem;
}

function crearDetalles(nombre) {
	var htmlDetalles = `
		<div>
		    <p id="tipo_elemento" class="encabezados_secciones">Tipo de elemento: Superficie<p>
		    <div class="seccion">
		      	<div class="sub_seccion">
		      		<p>Nombre</p>
		      		<input id="inputNombreDet" type="text" value="` + nombre + `">
		      	</div>
		      	<div class="sub_seccion">
		      		<p>Material</p>
		      		<select id="selectTipoMaterialDet"> `;

		      		for (key in indicesRefraccion) {

		      			htmlDetalles += `
		      				<option value="` + 
		      					key
		      				+ `"`;

		      			if (key == rectsAgregados[nombre][4]) {
		      				htmlDetalles += ` selected`;
		      			}

		      			htmlDetalles += `>` + key +`</option>`;
		      		}

		htmlDetalles += `
		      		</select>
		      	</div>
		      	<div class="sub_seccion">
		      		<p id="indiceRefraccionDet" style="width: 150px;">
		      			Índice de refracción: ` + 
		      				indicesRefraccion[rectsAgregados[nombre][4]][0] + `
		      		</p>
		      	</div>
		    </div>
		    <p class="encabezados_secciones">Dimensiones y posición<p>
		    <div class="seccion">
		      	<div class="sub_seccion">
		      		<p>Ángulo</p>
		      		<input type="text">
		      	</div>
		      	<div class="sub_seccion">
		      		<p>Posición</p>
		      		<input id="inputPosDet" type="text" value="` + 
		      			rectsAgregados[nombre][0] + `, ` +
		      			rectsAgregados[nombre][1]
		      		+ `">
		      	</div>
		      	<div class="sub_seccion">
		      		<p>Tamaño</p>
		      		<input id="inputTamDet" type="text" value="`+ 
		      			rectsAgregados[nombre][2] + `, ` +
		      			rectsAgregados[nombre][3]
		      		+`">
		      	</div>
		    </div>
		</div>
	`;

	$("#detalles").empty();
	$("#detalles").append(htmlDetalles);
}

/*function colocarTodoGris() {
	// Colocar cada ícono del menu en gris
	$(".h_cont_boton span").css("color", "rgb(150,150,150)");
}*/



// Funciones de eventos

var herramientaSeleccionada = "seleccionar";
var elementoSeleccionado = "";
var cont = 0;

var indicesRefraccion = {
	"Aire": [1, [255,255,255, 125]],
	"Agua": [1.33, [153, 255, 204, 125]],
	"Glicerina": [1.473, [204, 204, 255, 125]],
	"Diamante": [2.419, [102, 255, 255, 125]],
	"Vidrio sin plomo": [1.52, [255, 255, 102, 125]],
	"Vidrio con plomo": [1.66, [153, 255, 102, 125]],
	"Hielo": [1.309, [51, 102, 153, 125]],
	"Cloruro de sodio": [1.544, [191, 191, 191, 125]]
}

$("#agregarRect").on({
	click: function () {
		if ($("#agregarRect span:first-child").css("color") != "rgb(255, 255, 255)") {
			$("#agregarRect span:first-child").css("color", "white");
			herramientaSeleccionada = "rect";
		} else if ($("#agregarRect span:first-child").css("color") == "rgb(255, 255, 255)") {
			$("#agregarRect span:first-child").css("color", "rgb(150,150,150)");
			herramientaSeleccionada = "seleccionar";
		}
	}
});

$(document).on('click', 'canvas', function() {
	if (herramientaSeleccionada == "rect") {
		addRect(("Superficie" + cont), mouseX, mouseY, 500, 200);
		cont++;
	}
});

$(document).on('click', '.elementoBita', function() {
	activarElementoBita($(this).attr("id"));
});

$(document).on('keyup', '#inputNombreDet', function() {
	if ($(this).val() != "" && $(this).val() != elementoSeleccionado) {
		rectsAgregados[$(this).val()] = rectsAgregados[elementoSeleccionado];
		delete rectsAgregados[elementoSeleccionado];
		$(("#"+elementoSeleccionado)).attr("id", $(this).val());
		$(("#"+elementoSeleccionado)+"_p").text($(this).val());
		$(("#"+elementoSeleccionado)+"_p").attr("id", ($(this).val() + "_p"));
		elementoSeleccionado = $(this).val();
	}
});

$(document).on('keyup', '#inputPosDet', function() {
	if ($(this).val() != "") {
		var contenido = $(this).val().split(",");
		if (contenido.length>1) {
			if (contenido[1]!="" && contenido[1]!=" ") {
				rectsAgregados[elementoSeleccionado][0] = parseInt(contenido[0]);
				rectsAgregados[elementoSeleccionado][1] = parseInt(contenido[1]);
				redraw();
			}
		}
	}
});

$(document).on('keyup', '#inputTamDet', function() {
	if ($(this).val() != "") {
		var contenido = $(this).val().split(",");
		if (contenido.length>1) {
			if (contenido[1]!="" && contenido[1]!=" ") {
				rectsAgregados[elementoSeleccionado][2] = parseInt(contenido[0]);
				rectsAgregados[elementoSeleccionado][3] = parseInt(contenido[1]);
				redraw();
			}
		}
	}
});

$(document).on('change', '#selectTipoMaterialDet', function() {
	var matSel = $("#selectTipoMaterialDet option:selected").text();
	rectsAgregados[elementoSeleccionado][4] = matSel;
	$("#indiceRefraccionDet").text(
		("Índice de refracción: " + indicesRefraccion[rectsAgregados[elementoSeleccionado][4]][0])
	);
	redraw();
});