// TODO Cuando se cargue la web, generar productos para evitar que la web se encuentre totalmente vacia
window.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});

const contenedorProductos = document.querySelector(".productos");

function mostrarProductos(productos) {
  contenedorProductos.innerHTML = "";

  //TODO Recorre todo el listado de productos para generar la cantidad que posea
  for (let i = 0; i < productos.length; i++) {
    const producto = productos[i];

    const cardProducto = document.createElement("div");
    cardProducto.classList.add("col");

    // TODO Creación de la card que contiene cada producto con sus caracteristicas
    const card = document.createElement("div");
    card.classList.add("card", "text-center");
    card.style.width = "21rem";
    cardProducto.appendChild(card);

    // TODO Creación de la imagen del producto, integrandolo en la card con el append
    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = producto.nombre;
    card.appendChild(imagenProducto);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // TODO integrar dentro de cada card su respectivo nombre de cada producto
    const nombreProducto = document.createElement("h5");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;
    cardBody.appendChild(nombreProducto);

    // TODO NO UTILIZAR LOREM IPSUM
    // TODO integrar dentro de cada card su respectiva descripción
    const descripcionProducto = document.createElement("p");
    descripcionProducto.classList.add("card-text");
    descripcionProducto.textContent = producto.descripcion;
    cardBody.appendChild(descripcionProducto);

    // TODO integrar dentro de cada card su respectivo precio
    const precioProducto = document.createElement("p");
    precioProducto.classList.add("card-text");
    precioProducto.textContent = "Precio: $" + producto.precio.toFixed(2);
    precioProducto.style.textAlign = "left";
    cardBody.appendChild(precioProducto);

    // TODO integrar dentro de cada card su respectiva categoria
    const categoriaProducto = document.createElement("p");
    categoriaProducto.classList.add("card-text");
    categoriaProducto.textContent = "Categoría: " + producto.categoria;
    categoriaProducto.style.textAlign = "left";
    cardBody.appendChild(categoriaProducto);

    // TODO Arreglar la  class del BTN
    // TODO Asignar un ID unico para cada card y tomar su elemento padre
    const btnAgregarCarrito = document.createElement("a");
    btnAgregarCarrito.textContent = "Agregar al carrito";
    btnAgregarCarrito.href = "#";
    btnAgregarCarrito.classList.add("btn", "addToCart");
    btnAgregarCarrito.addEventListener("click", (event) => {
      event.preventDefault();
      agregarAlCarrito(producto.id);
    });

    // TODO integrar en el footer el button de agregar al carrito
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    cardFooter.appendChild(btnAgregarCarrito);
    card.appendChild(cardFooter);
    
    contenedorProductos.appendChild(cardProducto);
    cardProducto.appendChild(card);
  }
}


// Obtener todos los elementos del DOM con la clase "categoria-btn"
const categoriaBtns = document.querySelectorAll(".categoria-btn");

// Iterar sobre cada botón obtenido anteriormente
for (let i = 0; i < categoriaBtns.length; i++) {
  // Agregar un evento "click" a cada botón
  categoriaBtns[i].addEventListener("click", function() {
    // Obtener la categoría del botón en el que se hizo clic
    let categoria = this.getAttribute("data-categoria");

    // Si la categoría es "todo", mostrar todos los productos
    if (categoria === "todo") {
      mostrarProductos(productos);
    }
    // De lo contrario, filtrar los productos por la categoría seleccionada y mostrarlos
    else {
      // Crear un arreglo vacío para almacenar los productos filtrados
      let productosFiltrados = [];

      // Iterar sobre el arreglo de productos
      for (let j = 0; j < productos.length; j++) {
        // Si el producto pertenece a la categoría seleccionada, agregarlo al arreglo de productos filtrados
        if (productos[j].categoria === categoria) {
          productosFiltrados.push(productos[j]);
        }
      }

      // Mostrar los productos filtrados
      mostrarProductos(productosFiltrados);
    }
  });
}

const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(itemId) {
  let item, itemExistente = false;

  for (let i = 0; i < productos.length; i++) {
    if (productos[i].id === itemId) {
      item = productos[i];
      break;
    }
  }
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === item.id) {
      itemExistente = true;
      carrito[i].cantidad++;
      break;
    }
  }
  if (!itemExistente) {
    item.cantidad = 1;
    carrito.push(item);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarCarrito();
}

function actualizarCarrito() {
  // Obtener el contenedor de la tabla del carrito
  const modalBody = document.getElementById("modal1-body");
  // Limpiar el contenido previo de la tabla
  modalBody.innerHTML = "";
  // Inicializar el precio total en cero
  let precioTotal = 0;
  
  // Recorrer los productos del carrito
  for (let i = 0; i < carrito.length; i++) {

    // Obtener el producto actual del carrito
    const producto = carrito[i];

    // Crear una nueva fila en la tabla
    const fila = document.createElement("tr");

    // Crear una celda para la imagen del producto
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.width = "150";
    imagen.height = "150";
    const celdaImagen = document.createElement("td");
    celdaImagen.appendChild(imagen);
    fila.appendChild(celdaImagen);

    // Crear una celda para el nombre del producto
    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = producto.nombre;
    fila.appendChild(celdaNombre);

    // Crear una celda para el precio del producto
    const celdaPrecio = document.createElement("td");
    celdaPrecio.id = "contadorPrecio";

    // Calcular el precio total del producto (precio * cantidad) y formatearlo a dos decimales
    const precioProducto = (producto.precio * producto.cantidad).toFixed(2);

    // Mostrar el precio total del producto en la celda
    celdaPrecio.innerText = "$" + precioProducto;
    fila.appendChild(celdaPrecio);

    // Actualizar el precio total de la compra
    precioTotal += parseFloat(precioProducto);
    
    // Crear una celda para la cantidad del producto
    const celdaCantidad = document.createElement("td");

    // Crear un botón para restar la cantidad del producto
    const botonRestar = document.createElement("button");
    botonRestar.innerText = "-";
    botonRestar.classList.add("btn", "btn-outline-secondary", "btn-sm", "me-2");

    // Agregar un evento de click para restar la cantidad del producto
    botonRestar.addEventListener("click", restarProducto.bind(null, producto, i));
    celdaCantidad.appendChild(botonRestar);

    // Crear un span para mostrar la cantidad del producto
    const cantidad = document.createElement("span");
    cantidad.innerText = producto.cantidad;
    cantidad.classList.add("border", "rounded", "p-1", "m-2");
    cantidad.id = "contadorCantidad";
    celdaCantidad.appendChild(cantidad);

    // Crear un botón para sumar la cantidad del producto
    const botonSumar = document.createElement("button");
    botonSumar.innerText = "+";
    botonSumar.classList.add("btn", "btn-outline-primary", "btn-sm", "me-2");

    // Agregar un evento de click para sumar la cantidad del producto
    botonSumar.addEventListener("click", sumarProducto.bind(null, producto));
    celdaCantidad.appendChild(botonSumar);
    fila.appendChild(celdaCantidad);

    // Crear un botón para eliminar el producto del carrito
    const botonEliminar = document.createElement("button");
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "me-2", "ms-2");
    botonEliminar.addEventListener("click", function() {
      eliminarProducto(i);
    });

    const iconoEliminar = document.createElement("i");
    iconoEliminar.classList.add("bi", "bi-trash");
    botonEliminar.appendChild(iconoEliminar);

    const textoEliminar = document.createElement("span");
    textoEliminar.classList.add("visually-hidden");
    textoEliminar.innerText = "Eliminar";
    botonEliminar.appendChild(textoEliminar);

    const celdaEliminar = document.createElement("td");
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    
    // Agregar la fila actual al cuerpo del modal
    modalBody.appendChild(fila);
  }

  // Busca el elemento del DOM con el id "PrecioTotal" y lo asigna a la letiable contadorPrecio
  const contadorPrecio = document.getElementById("PrecioTotal");
  
  // Verifica que el elemento exista antes de actualizar su contenido
  if (contadorPrecio !== null) {
    // Actualiza el contenido del elemento con el precio total del carrito formateado con dos decimales
    contadorPrecio.textContent = "$" + precioTotal.toFixed(2);
  }
};

// Reducir en 1 la cantidad del producto en el carrito
function restarProducto(producto, index) {
  // Si el producto tiene una cantidad mayor que 1, se reduce en 1
  if (producto.cantidad > 1) {
    producto.cantidad--;
    actualizarCarrito(); // Actualiza el carrito en la interfaz gráfica
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en el almacenamiento local del navegador
  } else {
    // Si el producto tiene una cantidad de 1, se elimina del carrito
    carrito.splice(index, 1); // Elimina el producto del array del carrito
    actualizarCarrito(); // Actualiza el carrito en la interfaz gráfica
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en el almacenamiento local del navegador
  }
};

// Aumentar en 1 la cantidad del producto en el carrito
function sumarProducto(producto) {
  producto.cantidad++; // Aumenta la cantidad del producto en 1
  actualizarCarrito(); // Actualiza el carrito en la interfaz gráfica
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en el almacenamiento local del navegador
};

// Eliminar un producto del carrito
function eliminarProducto(indiceProducto) {
  carrito.splice(indiceProducto, 1); // Elimina el producto del array del carrito
  actualizarCarrito(); // Actualiza el carrito en la interfaz gráfica
  localStorage.setItem("carrito", JSON.stringify(carrito)); // Guarda el carrito en el almacenamiento local del navegador
}

actualizarCarrito();