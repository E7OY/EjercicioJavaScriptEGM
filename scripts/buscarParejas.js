let mostrarIntentos = document.getElementById('intentos');
let mostrarAciertos = document.getElementById('aciertos');
let tablero = document.getElementById('tablero');
let mensajeResultado = document.getElementById('mensaje_resultado');
let formDificultad = document.getElementById('form_dificultad');
let personalizadoBoton = document.getElementById('personalizado');
let seleccionarDificultad = document.getElementById('seleccionar_dificultad');
let mensajeError = document.getElementById('mensaje_error');


let filas = 3;
let columnas = 4;
let intentos = 0;

function generarTablero() {
    tablero.innerHTML = '';
    for(let i = 0; i<filas; i++){
        let fila = document.createElement('tr');
        for(let j = 0; j<columnas; j++) {
            let tarjeta = document.createElement('td');
            let boton = document.createElement('button');
            boton.className = 'tarjeta casilla';
            boton.id = i * columnas + j;
            boton.setAttribute('onclick', `destapar(${boton.id})`);
            fila.appendChild(tarjeta); 
            tarjeta.appendChild(boton);
        } 
        tablero.appendChild(fila);
    }
}

function iniciarJuego() {
    numeros = [];
    for(let i = 1; i<=(filas * columnas) / 2; i++) {
        numeros.push(i);
        numeros.push(i);
    }
    numeros = numeros.sort(() => Math.random() - 0.5);

    const parejasRestantes = numeros.length/2;

    mostrarIntentos.innerHTML = `Numero de intentos: ${intentos}`;
    mostrarAciertos.innerHTML = `Parejas restantes: ${parejasRestantes}`;

}

