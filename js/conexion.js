const URLCELULAR = 'http://localhost:3000/celulares';
const ver = document.getElementById('errorglobal')

function verError(clase,mensaje) {
    ver.classList.add(clase);
    ver.innerHTML = mensaje;

    // Ocultar el mensaje después de 1 segundo
    setTimeout(() => {
        ver.classList.remove(clase);
        ver.innerHTML = ''; // Limpia el mensaje
    }, 5000);  
}

async function ListaDeCelulares() {
    try {
        const CONEXION = await fetch(URLCELULAR);

        // Verificar si la respuesta es exitosa
        if (!CONEXION.ok) {
            throw new Error(`Error en la conexión: ${CONEXION.status} ${CONEXION.statusText}`);
        }

        const CONEXIONCONVERTIDA = await CONEXION.json();
        document.getElementById('totalProducto').innerHTML = `Total: ${CONEXIONCONVERTIDA.length}`;
        return CONEXIONCONVERTIDA; // Devuelve los datos obtenidos
    } catch (error) {
    
        verError('mensajeError','Error con el serivor :(')
    }
}

async function AgregarProductos(titulo, precio, imagen, descripcion) {
    try {
        const CONEXION = await fetch(URLCELULAR, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                title: titulo,
                price: precio,
                image: imagen,
                description: descripcion
            })
        });

        // Verificar si la respuesta es exitosa
        if (!CONEXION.ok) {
            throw new Error(`Error al agregar el producto: ${CONEXION.status} ${CONEXION.statusText}`);
        }

        const conexionConvertida = await CONEXION.json();
        verError('mensajeExito','Producto añadido :)')
        return conexionConvertida;
    } catch (error) {
        verError('mensajeError','Error al agregar el producto :(')
    }
}

async function BuscarCelular(palabraClave) {
    try {
        const busquedaPalabra = await fetch(`http://localhost:3000/celulares?q=${palabraClave}`);
        if (!busquedaPalabra.ok) {
            throw new Error('Error en la búsqueda de videos');
        }
        const busquedaConvertida = await busquedaPalabra.json();
        return busquedaConvertida;
    } catch (error) {
        verError('mensajeError','Error al buscar :(')
        return []; // Devuelve un arreglo vacío si hay un error
    }
}


// Función para eliminar un recurso por ID
async function deleteResource(id) {
    const url = `http://localhost:3000/celulares/${id}`; // Construimos la URL del recurso
  
    try {
      const response = await fetch(url, {
        method: 'DELETE'
      });
  
      if (response.ok) {
       
        return true;
      } else {
        verError('mensajeError','Error con el serivor para eliminar :(')
        return false;
      }
    } catch (error) {
        verError('mensajeError','Error con el serivor para eliminar :(')
      return false;
    }
}
  
  

export const conexionApi = {
    ListaDeCelulares,
    AgregarProductos,
    BuscarCelular,
    deleteResource,
};
