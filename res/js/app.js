//Al cargar el sitio estaremos cargando todos los productos
window.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});

// Selecciona el elemento HTML con la clase "productos" y lo guarda en la variable "contenedorProductos"
const contenedorProductos = document.querySelector(".productos");

// Esta función recibe como parámetro un arreglo de objetos "productos"
function mostrarProductos(productos) {
  // Limpia el contenido del elemento HTML "contenedorProductos"
  contenedorProductos.innerHTML = "";

  // Itera sobre cada objeto "producto" del arreglo "productos"
  productos.forEach((producto) => {
    // Crea un elemento HTML "div" y le añade la clase "col", guardándolo en la variable "cardProducto"
    const cardProducto = document.createElement("div");
    cardProducto.classList.add("col");

    // Crea un elemento HTML "div" y le añade las clases "card" y "text-center", y establece su ancho en 21rem, guardándolo en la variable "card"
    const card = document.createElement("div");
    card.classList.add("card", "text-center");
    card.style.width = "21rem";
    cardProducto.appendChild(card);

    // Crea un elemento HTML "img", le asigna la fuente del atributo "src" como la imagen del objeto "producto", le añade la clase "card-img-top", y le asigna el nombre del producto al atributo "alt"
    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = producto.nombre;
    card.appendChild(imagenProducto);

    // Crea un elemento HTML "div" y le añade la clase "card-body", guardándolo en la variable "cardBody"
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // Crea un elemento HTML "h5", le añade la clase "card-title" y asigna el nombre del producto como su contenido de texto
    const nombreProducto = document.createElement("h5");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;
    cardBody.appendChild(nombreProducto);

    // Crea un elemento HTML "p", le añade la clase "card-text" y asigna la descripción del producto como su contenido de texto
    const descripcionProducto = document.createElement("p");
    descripcionProducto.classList.add("card-text");
    descripcionProducto.textContent = producto.descripcion;
    cardBody.appendChild(descripcionProducto);

    // Crea un elemento HTML "p", le añade la clase "card-text" y asigna el precio del producto con formato de moneda como su contenido de texto
    const precioProducto = document.createElement("p");
    precioProducto.classList.add("card-text");
    precioProducto.textContent = `Precio: $${producto.precio.toFixed(2)}`;
    precioProducto.style.textAlign = "left";
    cardBody.appendChild(precioProducto);

    // Crea un elemento HTML "p", le añade la clase "card-text" y asigna la categoría del producto como su contenido de texto
    const categoriaProducto = document.createElement("p");
    categoriaProducto.classList.add("card-text");
    categoriaProducto.textContent = `Categoría: ${producto.categoria}`;
    categoriaProducto.style.textAlign = "left";
    cardBody.appendChild(categoriaProducto);

    // Crea un nuevo elemento HTML de tipo "a"
    const btnAgregarCarrito = document.createElement("a");

    // Le asigna el texto "Agregar al carrito"
    btnAgregarCarrito.textContent = "Agregar al carrito";

    // Le asigna un valor de href "#" para que el botón no redireccione a ninguna parte
    btnAgregarCarrito.href = "#";

    // Agrega las clases "btn" y "addToCart" al botón
    btnAgregarCarrito.classList.add("btn", "addToCart");

    // Agrega un evento de click al botón que llama a la función "agregarAlCarrito" y pasa el id del producto como parámetro
    btnAgregarCarrito.addEventListener("click", (event) => {
      event.preventDefault();
      agregarAlCarrito(producto.id);
    });

    // Agrega el botón al cuerpo de la tarjeta del producto
    cardBody.appendChild(btnAgregarCarrito);

    // Agrega la tarjeta del producto al contenedor de productos
    contenedorProductos.appendChild(cardProducto);

    // Agrega la tarjeta del producto a la fila de productos
    cardProducto.appendChild(card);
  });
}

// Obtiene todos los elementos del DOM que tienen la clase "categoria-btn"
const categoriaBtns = document.querySelectorAll(".categoria-btn");

// Itera sobre cada elemento obtenido anteriormente
categoriaBtns.forEach((btn) => {
  // Agrega un evento "click" a cada botón
  btn.addEventListener("click", () => {
    // Obtiene la categoría del botón en el que se hizo clic
    const categoria = btn.dataset.categoria;

    // Si la categoría es "todo", muestra todos los productos
    if (categoria === "todo") {
      mostrarProductos(productos);
    }
    // De lo contrario, filtra los productos por la categoría seleccionada y los muestra
    else {
      const productosFiltrados = productos.filter(
        (producto) => producto.categoria === categoria
      );
      mostrarProductos(productosFiltrados);
    }
  });
});

// Intentamos obtener el carrito del local storage al cargar la página
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarAlCarrito = (itemId) => {
  // Buscamos el producto con el id correspondiente en el array de productos
  const item = productos.find((producto) => producto.id === itemId);

  // Comprobar si el producto ya está en el carrito
  const itemExistente = carrito.find((producto) => producto.id === item.id);

  if (itemExistente) {
    // Si el producto ya está en el carrito, aumentar su cantidad
    itemExistente.cantidad++;
  } else {
    // Si el producto no está en el carrito, agregarlo con cantidad 1
    item.cantidad = 1;
    carrito.push(item);
  }

  // Guardamos el carrito actualizado en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Actualizamos la tabla del carrito en el HTML
  actualizarCarrito();
};

const actualizarCarrito = () => {
  const modalBody = document.getElementById("modal1-body");
  modalBody.innerHTML = "";

  // Agregar cada producto al carrito a la tabla
  let precioTotal = 0; // Inicializar variable de precio total
  carrito.forEach((producto, index) => {
    const fila = document.createElement("tr");

    // Crear imagen del producto
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.width = "150";
    imagen.height = "150";

    // Crear celda para la imagen y agregarla a la fila
    const celdaImagen = document.createElement("td");
    celdaImagen.appendChild(imagen);
    fila.appendChild(celdaImagen);

    // Crear celda para el nombre y agregarla a la fila
    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = producto.nombre;
    fila.appendChild(celdaNombre);

    // Crear celda para el precio y agregarla a la fila
    const celdaPrecio = document.createElement("td");
    celdaPrecio.id = "contadorPrecio";
    const precioProducto = (producto.precio * producto.cantidad).toFixed(2);
    celdaPrecio.innerText = `$${precioProducto}`;
    fila.appendChild(celdaPrecio);

    // Agregar precio del producto actual al precio total
    precioTotal += parseFloat(precioProducto);

    // Crear celda para la cantidad y agregarla a la fila
    const celdaCantidad = document.createElement("td");

    // Crear botón para restar la cantidad
    const botonRestar = document.createElement("button");
    botonRestar.innerText = "-";
    botonRestar.classList.add("btn", "btn-outline-secondary", "btn-sm", "me-2");
    botonRestar.addEventListener("click", () => {
      if (producto.cantidad > 1) {
        producto.cantidad--;
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
      } else {
        carrito.splice(index, 1);
        actualizarCarrito();
        localStorage.setItem("carrito", JSON.stringify(carrito));
      }
    });
    celdaCantidad.appendChild(botonRestar);

    // Mostrar la cantidad actual
    const cantidad = document.createElement("span");
    cantidad.innerText = producto.cantidad;
    cantidad.classList.add("border", "rounded", "p-1", "m-2");
    cantidad.id = "contadorCantidad";
    celdaCantidad.appendChild(cantidad);

    // Crear botón para sumar la cantidad
    const botonSumar = document.createElement("button");
    botonSumar.innerText = "+";
    botonSumar.classList.add("btn", "btn-outline-primary", "btn-sm", "me-2");
    botonSumar.addEventListener("click", () => {
      producto.cantidad++;
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    celdaCantidad.appendChild(botonSumar);

    // Agregar la celda de cantidad a la fila
    fila.appendChild(celdaCantidad);

    // Crear botón para eliminar el producto del carrito
    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML =
      '<i class="bi bi-trash"></i><span class="visually-hidden">Eliminar</span>';
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "me-2", "ms-2");
    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    // Crear celda para el botón de eliminar y agregarla a la fila
    // celdaCantidad.appendChild(botonEliminar); (( Intenar centrar el contenido celda ))
    // fila.appendChild(celdaCantidad)
    const celdaEliminar = document.createElement("td");
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    // Agregar la fila a la tabla
    modalBody.appendChild(fila);
  });

  // (( EN TESTEO))
  // const contadorCantidad = document.getElementById("contadorCantidad");
  // if (contadorCantidad !== null) {
  //   contadorCantidad.innerText = carrito.reduce(
  //     (acumulador, producto) => acumulador + producto.cantidad,
  //     0
  //   );
  // }

  const contadorPrecio = document.getElementById("PrecioTotal");
  if (contadorPrecio !== null) {
    contadorPrecio.innerText = `$${carrito
      .reduce(
        (acumulador, producto) =>
          acumulador + producto.precio * producto.cantidad,
        0
      )
      .toFixed(2)}`;
  }
};

// También actualizamos el contador de cantidad y precio al cargar la página
actualizarCarrito();

// Esta función es llamada al hacer clic en el botón "Eliminar" de un producto en el carrito
function eliminarDelCarrito(event) {
  // Obtenemos el botón que desencadenó el evento
  const button = event.target;

  // Buscamos el elemento padre más cercano con la clase "card", que es la tarjeta que contiene la información del producto
  const item = button.closest(".card");

  // Obtenemos el índice del producto en el carrito utilizando su ID, que se almacena en el atributo "data-id" de la tarjeta
  const itemIndex = carrito.findIndex(
    (producto) => producto.id === item.dataset.id
  );

  // Eliminamos el producto del carrito utilizando su índice
  carrito.splice(itemIndex, 1);

  // Actualizamos el carrito y lo guardamos en el almacenamiento local
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
