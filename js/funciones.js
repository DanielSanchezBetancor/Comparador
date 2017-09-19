var optionsPlat = ["PlayStation 4", "Xbox One", "Nintendo 3DS", "PlayStation 3"];
var optionsJueg = ["Shadow Of Mordor", "The Stanley Parable", "Call of Duty", "Battlefield"];
var optionsDisp = ["HTC Vive", "Oculus Rift"];
var opcion;
function JuegoOPlataforma() {
	var textoP = "<div class='ventana_selects'>Escoge una de las opciones para comenzar la busqueda.</div>";
	if (opcion !== undefined) {
		rellenarSelects();
		textoP = "<div class='ventana_selects'>";
		if (opcion == "plataforma") {
			textoP += 
			"<form action='/comparador/pages/comparar.html' method='GET' id='formplat'>" 
			+ "<div class='ventana_selects_1'>"
			+ "Plataforma 1: "
			+ "<select id='plat1' name='plat1' form='formplat' onchange='rellenarSegundoSelect()'></select>"
			+ "</div><div class='ventana_selects_2'>"
			+ "Plataforma 2:" 
			+ "<select id='plat2' name='plat2' form='formplat'></select>"
			+ "</div><div class='ventana_selects_comparar'>"
			+ "<input type='submit' value='Comparar'></form>";
			+ "</div>"
		} else if (opcion == "juego") {
			textoP += 
			"<form action='/comparador/pages/comparar.html' method='GET' id='formjueg'>"
			+ "<div class='ventana_selects_1'>"
			+ "Juego 1: <select id='jueg1' onchange='rellenarSegundoSelect()' form='formjueg' name='jueg1'></select>"
			+ "</div><div class='ventana_selects_2'>"
			+ "Juego 2: <select id='jueg2' form='formjueg' name='jueg2'></select>"
			+ "</div><div class='ventana_selects_comparar'>"
			+ "<input type='submit' value='Comparar'>";
			+ "</div>"
		} else if (opcion == "dispositivo") {
			textoP += 
			"<form action='/comparador/pages/comparar.html' method='GET' id='formdisp'>" 
			+ "<div class='ventana_selects_1'>"
			+ "Dispositivo 1: "
			+ "<select id='disp1' name='disp1' form='formdisp' onchange='rellenarSegundoSelect()'></select>"
			+ "</div><div class='ventana_selects_2'>"
			+ "Dispositivo 2:" 
			+ "<select id='disp2' name='disp2' form='formdisp'></select>"
			+ "</div><div class='ventana_selects_comparar'>"
			+ "<input type='submit' value='Comparar'></form>";
			+ "</div>"
		}  else {
			textoP += "Error escogiendo la categoria seleccionada";
		}
	}
	textoP += "</div>";
	document.getElementById("JoP").innerHTML = textoP;
}
function rellenarSelects() {
	$(document).ready(function() {
		getPlataformas();
		rellenarSegundoSelect();
	})
}
function getPlataformas() {
	if (opcion !== undefined) {
		var lista;
		if (opcion == "juego") {
			lista = optionsJueg;
		} else if (opcion == "plataforma") {
			lista = optionsPlat;
		} else if (opcion == "dispositivo") {
			lista = optionsDisp;
		}
		var sel = document.getElementById("plat1");
		if (sel === undefined || sel == null) {
			sel = document.getElementById("jueg1");
		}
		if (sel === undefined || sel == null) {
			sel = document.getElementById("disp1");
		}
		for (var i = 0;i<lista.length;i++) {
			var eleOpt = document.createElement("option");
			eleOpt.text = lista[i];
			sel.options.add(eleOpt);
		}
	}
}
function rellenarSegundoSelect() {
	if (opcion !== undefined) {
		var lista;
		if (opcion == "juego") {
			lista = optionsJueg;
		} else if (opcion == "plataforma") {
			lista = optionsPlat;
		} else if (opcion == "dispositivo") {
			lista = optionsDisp;
		}
		var index = document.getElementById("plat1");
		var sel;
		if (index === undefined || index == null) {
			index = document.getElementById("jueg1");
			if (index === undefined || index == null) {
				index = document.getElementById("disp1").selectedIndex;
				sel = document.getElementById("disp2");
			} else {
				index = index.selectedIndex;
				sel = document.getElementById("jueg2");
			}
		} else {
			index = index.selectedIndex;
			sel = document.getElementById("plat2");
		}
		if (sel.length > 0) {
			for (var i = sel.length-1;i >= 0;i--) {
				sel.remove(i);
			}
		}
		for (var j = 0;j < lista.length;j++) {
			if (j != index) {
				sel.options.add(new Option(lista[j]));
			} 
		}
	} else {
		console.log("Undefined -> option\n" + opcion);
	}
}
function estadoRadioButton(radioPres) {
	opcion = radioPres.value;
    JuegoOPlataforma();
}
function sacarDatos(opc) {
	document.getElementById("datos").innerHTML = "<lu>"
	if (opc == "juegos") {
		for (var i = 0;i<optionsJueg.length;i++) {
			document.getElementById("datos").innerHTML +=  "<li> " + optionsJueg[i] + "</li>";
		}
	} else if (opc == "plataformas") {
		for (var i = 0;i<optionsJueg.length;i++) {
			document.getElementById("datos").innerHTML +=  "<li> " + optionsPlat[i] + "</li>";
		}
	} else if (opc == "dispositivos") {
		for (var i = 0;i<optionsDisp.length;i++) {
			document.getElementById("datos").innerHTML +=  "<li> " + optionsDisp[i] + "</li>";
		}
	}
	document.getElementById("datos").innerHTML += "</lu>";
}