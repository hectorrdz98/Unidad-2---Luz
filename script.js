var maxTamCanvas = 2000;
var escalaCanvas = 20;

var rectsAgregados = {};
var lasersAgregados = {};

// Funciones de p5.js

function setup() {
    createCanvas(maxTamCanvas, maxTamCanvas);
    noLoop();
}

function draw() {
    clear();
    angleMode(DEGREES);
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
    	stroke(0);
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

    for (var key in lasersAgregados) {
    	if (lasersAgregados[key][0] != "") {
    		
    		var posX = rectsAgregados[lasersAgregados[key][0]][0];
    		var width = rectsAgregados[lasersAgregados[key][0]][2];
    		var height = rectsAgregados[lasersAgregados[key][0]][3];
    		var catO = (tan(lasersAgregados[key][1]) * rectsAgregados[lasersAgregados[key][0]][1]);
    		var tan0 = tan(lasersAgregados[key][1]);
    		var posY = rectsAgregados[lasersAgregados[key][0]][1];
    		var x0 = (rectsAgregados[lasersAgregados[key][0]][0] + parseInt(rectsAgregados[lasersAgregados[key][0]][2]/2)) 
    				- (tan(lasersAgregados[key][1]) * rectsAgregados[lasersAgregados[key][0]][1]);
    		var ang2 = asin((1 * sin(lasersAgregados[key][1])) / indicesRefraccion[rectsAgregados[lasersAgregados[key][0]][4]][0]);
    		var catO2 = tan(ang2)*height;
    		var angY = asin((indicesRefraccion[rectsAgregados[lasersAgregados[key][0]][4]][0] * sin(ang2)) / 1);
    		var catO3 = tan(angY)*(2000-posY-height);
    		console.log(catO3);
    		console.log("Ang Refractado: " + angY);
    		
    		// Recta normal
    		stroke(175,175,175)
    		line(
    			(posX+parseInt(width/2)),
    			0,
    			(posX+parseInt(width/2)),
    			2000
    		);

    		// Reflejado
    		stroke(255, 179, 179);
    		line(
    			(posX+parseInt(width/2)),
    			(posY),
    			((posX+parseInt(width/2))+catO),
    			0
    		);

    		// Normal
    		stroke(lasersAgregados[key][2]);
    		line(
    			(posX+parseInt(width/2)),
    			(posY),
    			((posX+parseInt(width/2))-catO),
    			0
    		);

    		// Refractada
    		stroke(lasersAgregados[key][2]);
    		line(
    			(posX+parseInt(width/2)),
    			(posY),
    			((posX+parseInt(width/2))+catO2),
    			(height+posY)
    		);

    		// Re-Refractada
    		stroke(lasersAgregados[key][2]);
    		line(
    			((posX+parseInt(width/2))+catO2),
    			(height+posY),
    			(((posX+parseInt(width/2))+catO2)+catO3),
    			2000
    		);
    		
    	}
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
		<div id="`+ nombre + `" class="elementoBita rect">
	      	<div class="detallesMaterialBita">
	      		<div></div>
	      		<p id="` + nombre + `_p">` + nombre + `</p>
	      	</div>
	    </div>
	`;

	$("#areaElementosBita").append(htmlElemento);

	activarElementoBita(nombre, "rect");

	redraw();
}

function addLaser(nombre) {

	lasersAgregados[nombre] = [
		"", // rectAsociado
		0,
		[255,0,0]
	];

	var htmlElemento = `
		<div id="`+ nombre + `" class="elementoBita laser">
	      	<div class="detallesMaterialBita">
	      		<div></div>
	      		<p id="` + nombre + `_p">` + nombre + `</p>
	      	</div>
	    </div>
	`;

	$("#areaElementosBita").append(htmlElemento);

	activarElementoBita(nombre, "laser");
}

function activarElementoBita(idElem, tipo) {
	$(("#" + elementoSeleccionado)).css("background-color", "rgba(255,255,255,0)");
	$(("#" + idElem)).css("background-color", "rgba(255,255,255,0.2)");
	if (tipo == "rect") {
		crearDetalles(idElem);
	} else if (tipo == "laser") {
		crearDetallesLaser(idElem);
	}
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

function crearDetallesLaser(nombre) {
	var htmlDetalles = `
		<div>
		    <p id="tipo_elemento" class="encabezados_secciones">Tipo de elemento: Laser<p>
		    <div class="seccion">
		      	<div class="sub_seccion">
		      		<p>Nombre</p>
		      		<input id="inputNombreDet2" type="text" value="` + nombre + `">
		      	</div>
		      	<div class="sub_seccion">
		      		<p style="width: 75px;">Superficie</p>
		      		<select id="selectRectDet2" style="width: 125px;"> 
		      			<option value="" `;
		      				if (key == lasersAgregados[nombre][0]) {
		      					htmlDetalles += ` selected`;
		      				}
		      			htmlDetalles += `>
		      			</option>`;

		      		for (key in rectsAgregados) {

		      			htmlDetalles += `
		      				<option value="` + 
		      					key
		      				+ `"`;

		      			if (key == lasersAgregados[nombre][0]) {
		      				htmlDetalles += ` selected`;
		      			}

		      			htmlDetalles += `>` + key +`</option>`;
		      		}

		htmlDetalles += `
		      		</select>
		      	</div>
		    </div>
		    <p class="encabezados_secciones">Dimensiones y posición<p>
		    <div class="seccion">
		      	<div class="sub_seccion">
		      		<p>Ángulo</p>
		      		<input id="inputAnguloDet2" type="text" value="` + 
		      			lasersAgregados[nombre][1]
		      		+ `" title="Ingrese un ángulo entre 0° y 90°">
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
var contLaser = 0;

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

$("#agregarLaser").on({
	click: function () {
		herramientaSeleccionada = "laser";
	}
});

$(document).on('click', 'canvas', function() {
	if (herramientaSeleccionada == "rect") {
		addRect(("Superficie" + cont), mouseX, mouseY, 500, 200);
		cont++;
	} else if (herramientaSeleccionada == "laser") {
		addLaser(("Laser" + contLaser));
		contLaser++;
	}
});

$(document).on('click', '.elementoBita', function() {
	if ($(this).attr("class") == "elementoBita rect") {
		activarElementoBita($(this).attr("id"), "rect");
	} else if ($(this).attr("class") == "elementoBita laser") {
		activarElementoBita($(this).attr("id"), "laser");
	}
	
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

$(document).on('keyup', '#inputNombreDet2', function() {
	if ($(this).val() != "" && $(this).val() != elementoSeleccionado) {
		lasersAgregados[$(this).val()] = lasersAgregados[elementoSeleccionado];
		delete lasersAgregados[elementoSeleccionado];
		$(("#"+elementoSeleccionado)).attr("id", $(this).val());
		$(("#"+elementoSeleccionado)+"_p").text($(this).val());
		$(("#"+elementoSeleccionado)+"_p").attr("id", ($(this).val() + "_p"));
		elementoSeleccionado = $(this).val();
	}
});

$(document).on('change', '#selectRectDet2', function() {
	var matSel = $("#selectRectDet2 option:selected").text();
	lasersAgregados[elementoSeleccionado][0] = matSel;
	redraw();
});

$(document).on('keyup', '#inputAnguloDet2', function() {
	if ($(this).val() != "") {
		if (parseInt($(this).val()) >= 0 && parseInt($(this).val()) < 90) {
			lasersAgregados[elementoSeleccionado][1] = $(this).val();
			redraw();
		} else if (parseInt($(this).val()) == 90) {

		}
		
	}
});