import { conexionApi } from "./conexion.js";

const ContenidoVideoHTML = document.querySelector('[data-contenidoProductos]');


export default function CrearPuestoCelulares(titulo,precio,image,id,descripcion) {
    const LI = document.createElement('li');
    LI.classList.add('producto', 'card');


    // Agregar los datos del producto como atributos data- en el LI
    LI.setAttribute('data-titulo', titulo);
    LI.setAttribute('data-precio', precio);
    LI.setAttribute('data-image', image);
    LI.setAttribute('data-id', id);
    LI.setAttribute('data-descripcion', descripcion);

    LI.innerHTML = `<div class="card_tres">
                            <img src="${image}" alt="Producto ${id}">
                        </div>
                        
                        <h3 class="titulo_producto">${titulo}</h3>
                        <p>$${precio}</p>
                        
                       
                        <div class="acciones">
                            <a href="#" class="btn-ver-mas" title="Ver más" id="idVermas${id}">
                                <i class="fas fa-eye"></i>
                            </a>
                            
                            <button class="btn-eliminar" title="Eliminar" id="idEliminar${id}">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                          
                        </div>`
                        ContenidoVideoHTML.appendChild(LI);


    return LI                    
}


async function DatosDbJSON() {
    const listaApi = await conexionApi.ListaDeCelulares();
    

    listaApi.forEach(element => ContenidoVideoHTML.appendChild(CrearPuestoCelulares(element.title,element.price,element.image,element.id,element.description)));

    
}


DatosDbJSON()
