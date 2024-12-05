let mostrarIntentos = document.getElementById('intentos');
let mostrarAciertos = document.getElementById('aciertos');
let tablero = document.getElementById('tablero');
let mensajeResultado = document.getElementById('mensaje_resultado');
let formDificultad = document.getElementById('form_dificultad');
let seleccionarDificultad = document.getElementById('seleccionar_dificultad');
let mensajeError = document.getElementById('mensaje_error');
let filas = 3;
let columnas = 4;
let intentos = 0;
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let primerNumeroDestapado = null;
let tarjeta2 = null;
let segundoNumeroDestapado = null;
let aciertos = 0;
let numeros = [];


let imagenOriginal = 'img/favicon.png';
let imagenAlternativa = 'img/favicon2.png';
let imagenAlternativaActiva = false;

document.querySelectorAll('input[name="selector-imagenes"]').forEach((radio) => {
    radio.addEventListener('change', (event) => {
        imagenAlternativaActiva = event.target.value === 'alternativa';
        resetearTarjetas();
    });
});


let partidasGanadas = document.getElementById('partidas_ganadas');
let ganadas = localStorage.getItem('partidasGanadas');
partidasGanadas.innerHTML = `Partidas ganadas: ${ganadas}`;


let tarjetasAcertadas = [];
function resetearTarjetas() {
    let tarjetas = document.querySelectorAll('.tarjeta');
    let imagen = imagenAlternativaActiva ? 'img/favicon2.png' : 'img/favicon.png';
    tarjetas.forEach((tarjeta, index) => {
        if (!tarjetasAcertadas.includes(index)) {
            tarjeta.innerHTML = `<img src="${imagen}" alt="imagen de tarjeta" width="100%">`;
            tarjeta.disabled = false;
        }
    });
}



function generarTablero() {
    tablero.innerHTML = '';
    for (let i = 0; i < filas; i++) {
        let fila = document.createElement('tr');
        for (let j = 0; j < columnas; j++) {
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

function mezclarNumeros(numeros) {
    for (let i = numeros.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
    }
    return numeros;
}



function iniciarJuego() {
    numeros = [];
    for (let i = 1; i <= (filas * columnas) / 2; i++) {
        numeros.push(i);
        numeros.push(i);
    }
    numeros = mezclarNumeros(numeros);

    const parejasRestantes = numeros.length / 2;

    mostrarIntentos.innerHTML = `Numero de intentos: ${intentos}`;
    mostrarAciertos.innerHTML = `Parejas restantes: ${parejasRestantes}`;

    tarjetasAcertadas = [];
    resetearTarjetas();
}

function destapar(id) {
    tarjetasDestapadas++;

    if (tarjetasDestapadas == 1) {
        tarjeta1 = document.getElementById(id);
        primerNumeroDestapado = numeros[id];
        let imagen = imagenAlternativaActiva ? 'img/favicon2.png' : 'img/favicon.png';
        tarjeta1.innerHTML = primerNumeroDestapado;
        tarjeta1.disabled = true;
    } else if (tarjetasDestapadas == 2) {
        tarjeta2 = document.getElementById(id);
        segundoNumeroDestapado = numeros[id];
        let imagen = imagenAlternativaActiva ? 'img/favicon2.png' : 'img/favicon.png';
        tarjeta2.innerHTML = segundoNumeroDestapado;
        tarjeta2.disabled = true;
        intentos++;
        mostrarIntentos.innerHTML = `Numero de intentos: ${intentos}`;

        if (primerNumeroDestapado == segundoNumeroDestapado) {
            tarjetasDestapadas = 0;
            aciertos++;
            tarjetasAcertadas.push(parseInt(tarjeta1.id));
            tarjetasAcertadas.push(parseInt(tarjeta2.id));
            const parejasRestantes = (numeros.length / 2) - aciertos;
            mostrarAciertos.innerHTML = `Parejas restantes: ${parejasRestantes}`;
            mensajeResultado.innerHTML = `Los números destapados son iguales.`;
            mensajeResultado.style.display = 'block';
            mensajeResultado.style.color = '#7ED4AD';
            tarjeta1.style.backgroundColor = '#7ED4AD';
            tarjeta2.style.backgroundColor = '#7ED4AD';

            if (aciertos == (numeros.length / 2)) {
                mostrarAciertos.innerHTML = `Parejas restantes: 0 ¡Felicidades!`;
                mostrarIntentos.innerHTML = `Juego completado en ${intentos} intentos.`;

                ganadas++;
                localStorage.setItem('partidasGanadas', ganadas);
                partidasGanadas.innerHTML = `Partidas ganadas: ${ganadas}`;

                confetti({
                    particleCount: 300,
                    spread: 200,
                    origin: { y: 0.8 }
                });
            }
        } else {
            mensajeResultado.innerHTML = `Los números destapados son distintos.`;
            mensajeResultado.style.display = 'block';
            mensajeResultado.style.color = '#F95454';
            tarjeta2.style.backgroundColor = '#F95454';
            tarjeta1.style.backgroundColor = '#F95454';
            setTimeout(() => {
                tarjeta2.style.backgroundColor = '#00000057';
                tarjeta1.style.backgroundColor = '#00000057';
                tarjetasDestapadas = 0;
                tarjeta1.innerHTML = `<img src="${imagen}" alt="imagen de tarjeta" width="100%">`;
                tarjeta2.innerHTML = `<img src="${imagen}" alt="imagen de tarjeta" width="100%">`;
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
            }, 1000);
        }
        setTimeout(() => {
            mensajeResultado.style.display = 'none';
        }, 1000);
    }
}

seleccionarDificultad.addEventListener('click', () => {
    const dificultad = formDificultad.dificultad.value;
    parejasRestantes =  (numeros.length / 2) - aciertos;
    if(dificultad == 'facil') {
        aciertos = 0;
        intentos = 0;
        columnas = 4;
        filas = 3;
    } else if (dificultad == 'medio') {
        aciertos = 0;
        intentos = 0;
        filas = 4;
        columnas = 5;
    } else if (dificultad == 'dificil') {
        aciertos = 0;
        intentos = 0;
        filas = 6;
        columnas = 6;
    } else if(dificultad == 'personalizado') {
        aciertos = 0;
        intentos = 0;
        filas = parseInt(document.getElementById('filas').value);
        columnas = parseInt(document.getElementById('columnas').value);
        if((filas * columnas) % 2 == 0) {
            mensajeError.style.display = 'none';
        } else {
                mensajeError.style.display = 'block';
                mensajeError.innerHTML = 'El número de casillas debe ser par.';
                setTimeout(() => {
                    mensajeError.style.display = 'none';
                 }, 5000);
             return;
        }
    }

    generarTablero();
    iniciarJuego();
});

 
generarTablero();
iniciarJuego();