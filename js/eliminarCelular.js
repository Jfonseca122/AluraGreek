import { conexionApi } from './conexion.js';

export default async function handleDelete(event) {
  const producto = event.target.closest('li'); // Encuentra el elemento más cercano 'li'
  const id = producto.getAttribute('data-id'); // Obtiene el ID desde el atributo 'data-id'

  try {
    // Llama a la función de eliminación y espera el resultado
    const eliminado = await conexionApi.deleteResource(id);

    if (eliminado) {
      producto.remove(); // Elimina el elemento del DOM
      return true;
    } else {
      return false;
    }
  } catch (error) {
    alert('Ocurrió un error al intentar eliminar el producto');
    return false;
  }
}


