// FUNCIÓN DE CÁLCULO PURA: Recibe el array por parámetro, genera el resultado y lo devuelve usando return
const obtenerPromedioArreglo = (arregloNumeros) => {
    // .reduce() realiza la sumatoria elástica acumulando cada valor desde el índice 0
    const sumaTotal = arregloNumeros.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    
    // Calculamos el promedio matemático dividiendo el total acumulado entre la longitud de la lista
    const promedio = sumaTotal / arregloNumeros.length;

    // 🎯 REQUISITO: Genera el resultado y lo devuelve estrictamente mediante 'return'
    return promedio;
};

// Objeto global vacío para resguardar las referencias con nombre de las funciones flecha de escucha
const accionesCalculadora = {};


const activarEcosistemaCalculadora = () => {
    const formulario = document.getElementById("validador-form");
    const inputNumeros = document.getElementById("input-numeros");
    const boxResultado = document.getElementById("resultado-validacion");
    const txtObjeto = document.getElementById("texto-objeto");

    if (!formulario || !inputNumeros || !boxResultado || !txtObjeto) return;

    // A. ESCUCHADOR NATIVO 'input': Limpia y oculta el panel de resultados en tiempo real al escribir en el móvil
    inputNumeros.addEventListener("input", () => {
        boxResultado.className = "hidden";
        txtObjeto.textContent = "";
    });

    // B. 🎯 FUNCIÓN MAESTRA MAIN: Lee, valida, pasa parámetros, recibe en variable y muestra por pantalla
    accionesCalculadora.main = (evento) => {
        // Frenar el reinicio automático del navegador en pantallas de teléfonos móviles
        evento.preventDefault();

        // 1. LECTURA DE DATOS: Extrae la cadena de texto ingresada por el usuario desde la interfaz
        const textoIngresado = inputNumeros.value.trim();

        // 2. VALIDACIÓN DE DATOS: Comprueba que el campo no se procese vacío
        if (textoIngresado === "") {
            alert("⚠️ Por favor, introduce números separados por comas antes de calcular.");
            return;
        }

        // Cortamos la cadena por las comas, convertimos a decimales reales y filtramos valores inválidos
        const arrayProcesado = textoIngresado.split(",")
                                              .map(elemento => parseFloat(elemento.trim()))
                                              .filter(elemento => !isNaN(elemento));

        // Control por si la conversión no deja ningún número válido en la lista (ej: si el usuario metió letras)
        if (arrayProcesado.length === 0) {
            alert("❌ Error: No has introducido ningún número válido (Ejemplo correcto: 9,8,7,6,5,4,3,2,1,0).");
            return;
        }

        // 3. PASO DE DATOS Y RECEPCIÓN EN VARIABLE: Pasa la lista limpia por parámetro y guarda el 'return' en la variable 'resultadoRecibido'
        const resultadoRecibido = obtenerPromedioArreglo(arrayProcesado);

        // 4. MUESTRA POR PANTALLA: La función main toma la variable capturada del return y la imprime en la interfaz
        txtObjeto.textContent = `${resultadoRecibido}`;

        // Hacer visible la sección aplicando las clases elásticas responsivas de alto contraste de Tailwind CSS
        boxResultado.className = "mt-6 sm:mt-8 p-4 sm:p-5 rounded-2xl font-mono border-4 bg-slate-950 text-white border-slate-800 shadow-2xl max-w-full overflow-hidden text-left block animate-fade-in";
    };

    // D. ESCUCHADOR NATIVO 'submit': Captura de forma independiente el envío del formulario para disparar el Main
    formulario.addEventListener("submit", accionesCalculadora.main);
};

document.addEventListener("DOMContentLoaded", () => {
    // Lanzar de forma directa las operaciones de escucha para inicializar el ecosistema al estar listo el DOM
    activarEcosistemaCalculadora();
});

