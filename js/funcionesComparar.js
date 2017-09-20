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
		if (var1 == arr[i].Nombre) {
			pos1 = i;
		} else if (var2 == arr[i].Nombre) {
			pos2 = i;
		}
	}
	mensaje = "<table><tr><td></td><td>" + arr[pos1].Nombre 
	+ "</td><td>"+ arr[pos2].Nombre 
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
	//pos1 y pos2 apuntan al siguiente de encontdar el Nombre (En el JSON por bytes: 0 - Nombre ; 1 - caracteristicas
	var pos1 = 0;
	var pos2 = 0;
	//Buscamos dentdo del array cual es el elegido
	for (var i = 0;i<arr.length;i++) {
		if (var1 == arr[i].Nombre) {
			pos1 = i+1;
		} else if (var2 == arr[i].Nombre) {
			pos2 = i+1;
		}
	}
	/*try {
	mensaje += "<tr><td>Numero de jugadores</td><td>" + arr[pos1].caracteristicas[0].Jugadores + "</td><td>"
	} catch(err) {
		mensaje += "<tr><td>Numero de jugadores</td><td>Sin jugadores</td><td>"
	}
	try {
	mensaje += arr[pos2].caracteristicas[0].Jugadores + "</td></tr>"
	} catch(err) {
		mensaje += "Sin jugadores</td><td>"
	}
	try {
	mensaje += "<tr><td>Género</td><td>" + arr[pos1].caracteristicas[1].Genero+ "</td><td>"
	} catch(err) {
		mensaje += "<tr><td>Genero</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += arr[pos2].caracteristicas[1].Genero + "</td></tr>";
	} catch(err) {
		mensaje += "<tr><td>Genero</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += "<tr><td>Tiempo de campaña</td><td>" + arr[pos1].caracteristicas[2].Campaña+ "</td>"
	} catch(err) {
		mensaje += "<tr><td>Campaña</td><td>Indefinido</td><td>"
	}
	try {
	mensaje += "<td>" + arr[pos2].caracteristicas[2].Campaña+ "</td><td>"
	} catch(err) {
		mensaje += "<td>No tiene campaña</td>";
	}*/;
	var arrCar1 = arr[pos1].caracteristicas;
	var arrCar2 = arr[pos2].caracteristicas;
	var caruni1 = new Array;
	var caruni2 = new Array;
	var arrvalue1 = 0;
	var arrvalue2 = 0;
	//Puesto que el nombre cae en array[0+2^X] y las caracteristicas en array[1+2^x], restamos 1 en los arrays para encontrar los nombres
	//Dentro del array de caracteristicas[][y], donde y representa
	/*
	0 -> Jugadores
	1 -> Genero
	2 -> Tiempo de campaña
	*/
	if (arrCar1[arrvalue1].Jugadores === undefined || arrCar2[arrvalue2].Jugadores === undefined) {
		if (arrCar1[arrvalue1].Jugadores === undefined) {
			if (arrCar2[arrvalue2].Jugadores == 1) {
				caruni2[arrvalue2] = "Tiene 1 jugador.";
			} else {
				caruni2[arrvalue2] = "Tiene " + arrCar2[arrvalue2].Jugadores + " jugadores.";
			}
			arrvalue2++;
		} else {
			if (arrCar1[arrvalue1].Jugadores == 1) {
				caruni1[arrvalue1] = "Tiene 1 jugador.";
			} else {
				caruni1[arrvalue1] = "Tiene " + arrCar1[arrvalue1].Jugadores + " jugadores.";
			}
			arrvalue1++;
		}
	} else {
		mensaje += "<tr><td>Numero de jugadores</td><td>" + arrCar1[arrvalue1].Jugadores + "</td><td>" + arrCar2[arrvalue2].Jugadores + "</td></tr>";
		arrvalue1++;
		arrvalue2++;
	}
	if (arrCar1[arrvalue1].Genero === undefined || arrCar2[arrvalue2].Genero === undefined) {
		if (arrCar1[arrvalue1].Genero === undefined) {
			caruni2[arrvalue2] = "Su genero es " + arrCar2[arrvalue2].Genero;
			arrvalue2++;
		} else {
			caruni1[arrvalue1] = "Su genero es " + arrCar1[arrvalue1].Genero;
			arrvalue1++;
		}
	} else {
		mensaje += "<tr><td>Genero</td><td>" + arrCar1[arrvalue1].Genero + "</td><td>" + arrCar2[arrvalue2].Genero + "</td></tr>";
		arrvalue1++;
		arrvalue2++;
	}
		if (arrCar1[arrvalue1].Campaña === undefined || arrCar2[arrvalue2].Campaña === undefined) {
		if (arrCar1[arrvalue1].Campaña === undefined) {
			caruni2[arrvalue2] = "La duracion de la campaña es de " + arrCar2[arrvalue2].Campaña;
			arrvalue2++;
		} else {
			caruni1[arrvalue1] = "La duracion de la camapaña es de " + arrCar1[arrvalue1].Campaña;
			arrvalue1++;
		}
	} else {
		mensaje += "<tr><td>Camapaña</td><td>" + arrCar1[arrvalue1].Campaña + "</td><td>" + arrCar2[arrvalue2].Campaña + "</td></tr>";
		arrvalue1++;
		arrvalue2++;
	}
	mensaje +="</table></br>Las caracteristicas unicas de cada juego son:</br><li>" + arr[pos1-1].Nombre;
	if (caruni1.length == 0) {
		mensaje += "<ul>No hay caracteristicas únicas en este juego</ul>";
	} else { 
		for (var i = 0;i<caruni1.length;i++) {
			mensaje += "<ul>" + caruni1[i] + "</ul>";
		}
	}
	mensaje += "</li>";
	mensaje += "<li>" + arr[pos2-1].Nombre;
	if (caruni2.length == 0) {
		mensaje += "<ul>No hay caracteristicas únicas en este juego</ul>";
	} else { 
		for (var i = 0;i<caruni2.length;i++) {
			mensaje += "<ul>" + caruni2[i] + "</ul>";
		}
	}
	mensaje += "</li>";
	document.getElementById("infoprocesador").innerHTML = mensaje;
}