import { conexionApi } from "./conexion.js";
import CrearPuestoCelulares from "./mostrarCelulares.js";

const BTTBUSCAR = document.querySelector('[data-botonBuscar]');
const INPUTBUSCAR = document.querySelector('[data-inputbuscar]');

const ver = document.getElementById('errorglobal');

function verError2(clase, mensaje) {
    ver.classList.add(clase);
    ver.innerHTML = mensaje;

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
        ver.classList.remove(clase);
        ver.innerHTML = ''; // Limpia el mensaje
    }, 2000);
}

async function BuscarCelularHTML(evento) {
    evento.preventDefault();

    const query = INPUTBUSCAR.value.trim(); // Obtener el valor actual del input

    // Validar que la entrada no esté vacía
    if (!query) {
        alert('Ingrese el valor  a buscar')
        return; // No realizar búsqueda si la entrada está vacía
    }

    try {
        const busquedacelu = await conexionApi.BuscarCelular(query);
        const listaCelu = document.querySelector('[data-contenidoProductos]');

        // Limpiar la lista antes de agregar nuevos resultados
        while (listaCelu.firstChild) {
            listaCelu.removeChild(listaCelu.firstChild);
        }

        if (Array.isArray(busquedacelu) && busquedacelu.length > 0) {
            // Si la búsqueda devuelve un array y tiene resultados
            busquedacelu.forEach(element => {
                listaCelu.appendChild(CrearPuestoCelulares(element.title, element.price, element.image, element.id, element.description));
            });

        } else if (Array.isArray(busquedacelu) && busquedacelu.length === 0) {
            verError2('mensajeError', 'No se encuentra tu búsqueda');
        } else {
            verError2('mensajeError','Hubo un problema al obtener los datos');
        }

    } catch (error) {
        verError2('mensajeError','Problema con el servidor');
    }
}

// Escuchar el evento de clic en el botón de búsqueda
BTTBUSCAR.addEventListener('click', evento => BuscarCelularHTML(evento));

INPUTBUSCAR.addEventListener('keydown', evento => {
    if (evento.key === 'Enter') {
        BuscarCelularHTML(evento);
    }
});
