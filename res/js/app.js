'use strict'

const contenedorProductos = document.querySelector(".productos");
const carrito = [];

// Función para mostrar los productos en la página
function mostrarProductos(productos) {
  // Limpiar el contenedor de productos antes de agregar los nuevos
  contenedorProductos.innerHTML = "";

  // Crear y agregar una card de producto para cada producto
  productos.forEach((producto) => {
    const cardProducto = document.createElement("div");
    cardProducto.classList.add("col");

    const card = document.createElement("div");
    card.classList.add("card", "text-center");
    card.style.width = "21rem";
    cardProducto.appendChild(card);

    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = producto.nombre;
    card.appendChild(imagenProducto);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    const nombreProducto = document.createElement("h5");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;
    cardBody.appendChild(nombreProducto);

    const descripcionProducto = document.createElement("p");
    descripcionProducto.classList.add("card-text");
    descripcionProducto.textContent = producto.descripcion;
    cardBody.appendChild(descripcionProducto);

    const precioProducto = document.createElement("p");
    precioProducto.classList.add("card-text");
    precioProducto.textContent = `Precio: $${producto.precio.toFixed(2)}`;
    precioProducto.style.textAlign = "left";
    cardBody.appendChild(precioProducto);

    const categoriaProducto = document.createElement("p");
    categoriaProducto.classList.add("card-text");
    categoriaProducto.textContent = `Categoría: ${producto.categoria}`;
    categoriaProducto.style.textAlign = "left";
    cardBody.appendChild(categoriaProducto);

    const btnAgregarCarrito = document.createElement("a");
    btnAgregarCarrito.textContent = "Agregar al carrito";
    btnAgregarCarrito.href = "#";
    btnAgregarCarrito.classList.add("btn", "addToCart");
    btnAgregarCarrito.addEventListener("click", (event) => {
      event.preventDefault();
      agregarAlCarrito(producto.id);
    });
    cardBody.appendChild(btnAgregarCarrito);

    contenedorProductos.appendChild(cardProducto);
    cardProducto.appendChild(card);
  });
}

//Recibo el ID del boton clickeado para que sea agregado al carrito
const agregarAlCarrito = (itemid) =>{
  //Recogemos el producto mediante su ID
  const item = productos.find((productoSeleccionado) => productoSeleccionado.id === itemid);
  //Almaceno en el carrito el producto seleccionado
  carrito.push(item);
  //Ejecuto la función para que se actualicé el carrito, con contador de cantidad y precio
  CarritoContenido();
}

const CarritoContenido = () => {
  // Busco dentro del HTML el contador de cantidad
  const contadorCantidad = document.getElementById("contadorCantidad");
  // Agarro dentro del carrito la cantidad de items dentro del array y se lo sumo al contador de cantidad
  contadorCantidad.innerText = carrito.length;
  
  // Busco dentro del HTML el contador de precio
  const contadorPrecio = document.getElementById("contadorPrecio");
  // Realizo un acumulador que recorra mi carrito y que le sume el precio del producto seleccionado por el usuario, le asigno un valor inicial de 0 y luego el resultado lo integro dentro del contador de precio en el HTML
  contadorPrecio.innerText = carrito.reduce(
  (acumulador, productoSeleccionado) =>
  acumulador + productoSeleccionado.precio,
  0
  );
}

// Obtener todos los botones de categoría
const categoriaBtns = document.querySelectorAll(".categoria-btn");

// Añadir un evento clic a cada botón de categoría
categoriaBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Obtener la categoría seleccionada
    const categoria = btn.dataset.categoria;

    // Filtrar los productos según la categoría seleccionada
    const productosFiltrados = productos.filter(
      (producto) => producto.categoria === categoria || categoria === "todo"
    );

    // Mostrar los productos filtrados en la página
    mostrarProductos(productosFiltrados);
  });
});

