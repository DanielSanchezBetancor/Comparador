var var1;
var var2;
var eleccion;
function recogerDatos() {
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {	
		for (var i = 0;i<value.length;i++) {
			if (value.charAt(i) == "+") {
				value = value.substring(0, i) + " " + value.substring(i+1);
			} 
		}
		vars[key] = value;
	});
	var1 = vars.plat1;
	var2 = vars.plat2;
	eleccion = "plataforma";
	if (var1 == "" || var2 == "") {
		window.location.replace("main.html");
	} else if (var1 === undefined && var2 === undefined) {
		var1 = vars.jueg1;
		var2 = vars.jueg2;
		eleccion = "juego";
	}
	if (eleccion == "plataforma") {
		 document.getElementById("plat1").innerHTML = "Plataforma 1: " + var1;
		 document.getElementById("plat2").innerHTML = "Plataforma 2: " + var2;
	} else {
		 document.getElementById("jueg1").innerHTML = "Juego 1: " + var1;
		 document.getElementById("jueg2").innerHTML = "Juego 2: " + var2;	
	}
	 mainLoop();
}
function mainLoop() {
	$(document).ready(function() {
		buscarDatos();
	})
}
function buscarDatos(callback) {
	var xobj = new XMLHttpRequest();
	xobj.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var arr = JSON.parse(this.responseText);
			if (eleccion == "plataforma") {
				manejarDatosPlat(arr);
			} else {
				manejarDatosJueg(arr);
			}
		}
	};
	if (eleccion == "plataforma") {
		xobj.open("GET", "../data/dataPlat.json", true);
	} else {
		xobj.open("GET", "../data/dataJueg.json", true);
	}
	xobj.send();
}
function manejarDatosPlat(arr) {
	var mensaje = "";
	var pos1, pos2;
	for (var i = 0;i<arr.length;i++) {
		if (var1 == arr[i].nombre) {
			pos1 = i;
		} else if (var2 == arr[i].nombre) {
			pos2 = i;
		}
	}
	mensaje = "<table><tr><td></td><td>" + arr[pos1].nombre 
	+ "</td><td>"+ arr[pos2].nombre 
	+ "</td></tr><tr><td>GPU</td><td>" + arr[pos1+1].caracteristicas 
	+ "</td><td>" + arr[pos2+1].caracteristicas + "</td></tr></table>";
	document.getElementById("infoprocesador").innerHTML = mensaje;
}
//caracteristicas[0] -> Sera siempre jugadores
//arr[0] -> Nombre ---- arr[1] -> caracteristicas ---- 2 registdos mide un objeto JSON
// (vacio) juego1 juego2
// car gen1  car1   car2
// car gen2  car1   car2
function manejarDatosJueg(arr) {
	var mensaje = "<table><tr><td></td><td>" + var1 + "</td><td>" + var2 + "</td></tr>";
	//pos1 y pos2 apuntan al siguiente de encontdar el nombre (En el JSON por bytes: 0 - nombre ; 1 - caracteristicas
	var pos1 = 0;
	var pos2 = 0;
	//Buscamos dentdo del array cual es el elegido
	for (var i = 0;i<arr.length;i++) {
		if (var1 == arr[i].nombre) {
			pos1 = i+1;
		} else if (var2 == arr[i].nombre) {
			pos2 = i+1;
		}
	}
	try {
	mensaje += "<tr><td>Numero de jugadores</td><td>" + arr[pos1].caracteristicas[0].Jugadores + "</td><td>"
	} catch(err) {
		mensaje += "<tr><td>Numero de jugadores</td><td>Sin jugadores</td><td>"
	}
	try {
	mensaje += arr[pos2].caracteristicas[0].Jugadores + "</td></tr>"
	} catch(err) {
		console.log(err);
		mensaje += "<tr><td>Numero de jugadores</td><td>Sin jugadores</td><td>"
	}
	try {
	mensaje += "<tr><td>Género</td><td>" + arr[pos1].caracteristicas[1].Genero+ "</td><td>"
	} catch(err) {
		console.log(err);
		mensaje += "<tr><td>Genero</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += arr[pos2].caracteristicas[1].Genero + "</td></tr>";
	} catch(err) {
		console.log(err);
		mensaje += "<tr><td>Genero</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += "<tr><td>Tiempo de campaña</td><td>" + arr[pos1].caracteristicas[2].Campaña+ "</td>"
	} catch(err) {
		console.log(err);
		mensaje += "<tr><td>Campaña</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += "<td>" + arr[pos2].caracteristicas[2].Campaña+ "</td><td>"
	} catch(err) {
		console.log(err);
		mensaje += "<td>No tiene campaña</td>";
	}
	
	mensaje +="</table>";
	document.getElementById("infoprocesador").innerHTML = mensaje;
}