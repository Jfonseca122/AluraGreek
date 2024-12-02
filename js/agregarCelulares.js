import { conexionApi } from "./conexion.js";

const FORMULARIO = document.querySelector('[data-formulario]');
const TITULO = document.querySelector('[data-titulo]');
const PRECIO = document.querySelector('[data-precio]');
const DESCRIPCION = document.querySelector('[data-descripcion]');
const IMAGEN = document.querySelector('[data-imagen]');
const MENSAJE = document.querySelector('#mensajeMostrar');

function mostrarMensaje(mensaje, clase) {
   
    MENSAJE.classList.add(clase); // Agrega la nueva clase
    MENSAJE.textContent = mensaje;
   

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
        MENSAJE.classList.remove(clase);
        MENSAJE.innerHTML = ''; // Limpia el mensaje
    }, 3000);
}

function validarFormulario( precio) {
   
    if (isNaN(precio) || precio <= 0) {
        return 'El precio debe ser un número positivo.';
    }

    return null; // No hay errores
}

async function AgregarCelulares(evento) {
    
    evento.preventDefault();

    // Capturar los valores del formulario
    const titulo = TITULO.value.trim();
    const precio = PRECIO.value.trim();
    const descripcion = DESCRIPCION.value.trim();
    const imagen = IMAGEN.value.trim();

    // Validar campos
    const error = validarFormulario(precio);
    if (error) {
        mostrarMensaje(error, 'mensajeError');
        return;
    }

    try {
        // Llamar a la API con los datos capturados
        
        await conexionApi.AgregarProductos(titulo, precio, imagen, descripcion);
       
    } catch (error) {
        
    }
}

// Escuchar el evento submit del formulario
FORMULARIO.addEventListener('submit',evento => AgregarCelulares(evento));
