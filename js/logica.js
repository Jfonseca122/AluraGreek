import handleDelete from "./eliminarCelular.js";

// Elementos globales
const LIMPIAR = document.getElementById('limpiar');
const FORMULARIO = document.querySelector('[data-formulario]');
const contenedorProductos = document.querySelector('[data-contenidoProductos]');

// Mostrar el modal con los detalles del producto
const mostrarModal = ({ titulo, descripcion, precio, imagen }) => {
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalPrice = document.getElementById('modal-price');
    const closeModal = document.getElementById('closeModal');

    // Actualizar contenido del modal
    modalImage.src = imagen;
    modalTitle.textContent = titulo;
    modalDescription.textContent = descripcion;
    modalPrice.textContent = `Precio: $${precio}`;

    // Mostrar el modal
    modal.style.display = "block";

    // Cerrar el modal al hacer clic en el botón de cerrar o fuera del modal
    const cerrarModal = (event) => {
        if (event.target === modal || event.target === closeModal) {
            modal.style.display = "none";
            window.removeEventListener('click', cerrarModal); // Limpiar evento
        }
    };
    window.addEventListener('click', cerrarModal);
};

// Manejar clic en el botón "Ver más"
const manejarVerMas = (producto) => {
    const { titulo, descripcion, precio, image: imagen } = producto.dataset;
    mostrarModal({ titulo, descripcion, precio, imagen });
};

// Manejar clic en el botón "Eliminar"
const manejarEliminar = async (producto) => {
    const id = producto.dataset.id;
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        const eliminado = await handleDelete({ target: producto });
        alert(eliminado ? 'Producto eliminado correctamente.' : 'No se pudo eliminar el producto.');
    }
};

// Delegación de eventos en el contenedor
contenedorProductos.addEventListener('click', (event) => {
    const btnVerMas = event.target.closest('.btn-ver-mas');
    const btnEliminar = event.target.closest('.btn-eliminar');
    const producto = event.target.closest('li');

    if (btnVerMas) {
        event.preventDefault();
        manejarVerMas(producto);
    }

    if (btnEliminar) {
        event.preventDefault();
        manejarEliminar(producto);
    }
});

// Limpiar formulario al hacer clic en el botón "Limpiar"
LIMPIAR.addEventListener('click', () => FORMULARIO.reset());
