// TODO Espera a que se cargue completamente la página antes de ejecutar la función mostrarProductos
window.addEventListener("DOMContentLoaded", () => {
  mostrarProductos(productos);
});

// TODO Selecciona el contenedor de productos del HTML
const contenedorProductos = document.querySelector(".productos");

// TODO Define la función mostrarProductos, que toma un array de productos como parámetro
function mostrarProductos(productos) {
  // TODO Limpia el contenido previo del contenedor de productos
  contenedorProductos.innerHTML = "";

  // TODO Itera sobre cada producto en el array productos
  productos.forEach((producto) => {
    // TODO Crea un elemento div para cada producto y le añade la clase "col"
    const cardProducto = document.createElement("div");
    cardProducto.classList.add("col");

    // TODO Crea un elemento div para la tarjeta del producto y le añade las clases "card" y "text-center", y le establece un ancho de 21rem
    const card = document.createElement("div");
    card.classList.add("card", "text-center");
    card.style.width = "21rem";
    cardProducto.appendChild(card);

    // TODO Crea un elemento img para la imagen del producto, le establece la ruta de la imagen, le añade la clase "card-img-top" y establece el atributo alt con el nombre del producto
    const imagenProducto = document.createElement("img");
    imagenProducto.src = producto.imagen;
    imagenProducto.classList.add("card-img-top");
    imagenProducto.alt = producto.nombre;
    card.appendChild(imagenProducto);

    // TODO Crea un elemento div para el cuerpo de la tarjeta del producto y le añade la clase "card-body"
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    card.appendChild(cardBody);

    // TODO Crea un elemento h5 para el nombre del producto, le añade la clase "card-title" y establece el contenido con el nombre del producto
    const nombreProducto = document.createElement("h5");
    nombreProducto.classList.add("card-title");
    nombreProducto.textContent = producto.nombre;
    cardBody.appendChild(nombreProducto);

    // TODO Crea un elemento p para la descripción del producto, le añade la clase "card-text" y establece el contenido con la descripción del producto
    const descripcionProducto = document.createElement("p");
    descripcionProducto.classList.add("card-text");
    descripcionProducto.textContent = producto.descripcion;
    cardBody.appendChild(descripcionProducto);

    // TODO Crea un elemento p para el precio del producto, le añade la clase "card-text", establece el contenido con el precio del producto formateado a 2 decimales y le establece el estilo de texto a la izquierda
    const precioProducto = document.createElement("p");
    precioProducto.classList.add("card-text");
    precioProducto.textContent = `Precio: $${producto.precio.toFixed(2)}`;
    precioProducto.style.textAlign = "left";
    cardBody.appendChild(precioProducto);

    // TODO Crea un elemento p para la categoría del producto, le añade la clase "card-text", establece el contenido con la categoría del producto y le establece el estilo de texto a la izquierda
    const categoriaProducto = document.createElement("p");
    categoriaProducto.classList.add("card-text");
    categoriaProducto.textContent = `Categoría: ${producto.categoria}`;
    categoriaProducto.style.textAlign = "left";
    cardBody.appendChild(categoriaProducto);

    // TODO Crea un elemento a para el botón de agregar al carrito
    const btnAgregarCarrito = document.createElement("a");

    // TODO Le asigna el texto "Agregar al carrito"
    btnAgregarCarrito.textContent = "Agregar al carrito";

    // TODO Le asigna un valor de href "#" para que el botón no redireccione a ninguna parte
    btnAgregarCarrito.href = "#";

    // TODO Agrega las clases "btn" y "addToCart" al botón
    btnAgregarCarrito.classList.add("btn", "addToCart");

    // TODO Agrega un evento de click al botón que llama a la función "agregarAlCarrito" y pasa el id del producto como parámetro
    btnAgregarCarrito.addEventListener("click", (event) => {
    event.preventDefault();
    agregarAlCarrito(producto.id);
    });

    // TODO Agrega el botón al cuerpo de la tarjeta del producto
    cardBody.appendChild(btnAgregarCarrito);

    // TODO Agrega la tarjeta del producto al contenedor de productos
    contenedorProductos.appendChild(cardProducto);

    // TODO Agrega la tarjeta del producto a la fila de productos
    cardProducto.appendChild(card);
  });
}

// TODO Obtiene todos los elementos del DOM que tienen la clase "categoria-btn"
const categoriaBtns = document.querySelectorAll(".categoria-btn");

// TODO Itera sobre cada elemento obtenido anteriormente
categoriaBtns.forEach((btn) => {

  // TODO Agrega un evento "click" a cada botón
  btn.addEventListener("click", () => {
    // TODO Obtiene la categoría del botón en el que se hizo clic
    const categoria = btn.dataset.categoria;

    // TODO Si la categoría es "todo", muestra todos los productos
    if (categoria === "todo") {
      mostrarProductos(productos);
    }
    // TODO De lo contrario, filtra los productos por la categoría seleccionada y los muestra
    else {
      // TODO Filtra los productos por la categoría seleccionada
      const productosFiltrados = productos.filter(
        (producto) => producto.categoria === categoria
      );

      // TODO Muestra los productos filtrados
      mostrarProductos(productosFiltrados);
    }
  });
});

// TODO Intentamos obtener el carrito del local storage al cargar la página
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const agregarAlCarrito = (itemId) => {
  // TODO Buscamos el producto con el id correspondiente en el array de productos
  const item = productos.find((producto) => producto.id === itemId);

  // TODO Comprobar si el producto ya está en el carrito
  const itemExistente = carrito.find((producto) => producto.id === item.id);

  if (itemExistente) {
    // TODO Si el producto ya está en el carrito, aumentar su cantidad
    itemExistente.cantidad++;
  } else {
    // TODO Si el producto no está en el carrito, agregarlo con cantidad 1
    item.cantidad = 1;
    carrito.push(item);
  }

  // TODO Guardamos el carrito actualizado en el local storage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // TODO Actualizamos la tabla del carrito en el HTML
  actualizarCarrito();
};

const actualizarCarrito = () => {
  const modalBody = document.getElementById("modal1-body");
  modalBody.innerHTML = "";

  // TODO Agregar cada producto al carrito a la tabla
  let precioTotal = 0; // TODO Inicializar variable de precio total
  carrito.forEach((producto, index) => {
    const fila = document.createElement("tr");

    // TODO Crear imagen del producto
    const imagen = document.createElement("img");
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;
    imagen.width = "150";
    imagen.height = "150";

    // TODO Crear celda para la imagen y agregarla a la fila
    const celdaImagen = document.createElement("td");
    celdaImagen.appendChild(imagen);
    fila.appendChild(celdaImagen);

    // TODO Crear celda para el nombre y agregarla a la fila
    const celdaNombre = document.createElement("td");
    celdaNombre.innerText = producto.nombre;
    fila.appendChild(celdaNombre);

    // TODO Crear celda para el precio y agregarla a la fila
    const celdaPrecio = document.createElement("td");
    celdaPrecio.id = "contadorPrecio";
    const precioProducto = (producto.precio * producto.cantidad).toFixed(2);
    celdaPrecio.innerText = `$${precioProducto}`;
    fila.appendChild(celdaPrecio);

    // TODO Agregar precio del producto actual al precio total
    precioTotal += parseFloat(precioProducto);

    // TODO Crear celda para la cantidad y agregarla a la fila
    const celdaCantidad = document.createElement("td");

    // TODO Crear botón para restar la cantidad
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

    // TODO Mostrar la cantidad actual
    const cantidad = document.createElement("span");
    cantidad.innerText = producto.cantidad;
    cantidad.classList.add("border", "rounded", "p-1", "m-2");
    cantidad.id = "contadorCantidad";
    celdaCantidad.appendChild(cantidad);

    // TODO Crear botón para sumar la cantidad
    const botonSumar = document.createElement("button");
    botonSumar.innerText = "+";
    botonSumar.classList.add("btn", "btn-outline-primary", "btn-sm", "me-2");
    botonSumar.addEventListener("click", () => {
      producto.cantidad++;
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });
    celdaCantidad.appendChild(botonSumar);

    // TODO Agregar la celda de cantidad a la fila
    fila.appendChild(celdaCantidad);

    // TODO Crear botón para eliminar el producto del carrito
    const botonEliminar = document.createElement("button");
    botonEliminar.innerHTML =
      '<i class="bi bi-trash"></i><span class="visually-hidden">Eliminar</span>';
    botonEliminar.classList.add("btn", "btn-danger", "btn-sm", "me-2", "ms-2");
    botonEliminar.addEventListener("click", () => {
      carrito.splice(index, 1);
      actualizarCarrito();
      localStorage.setItem("carrito", JSON.stringify(carrito));
    });

    // TODO TODO Crear celda para el botón de eliminar y agregarla a la fila
    // celdaCantidad.appendChild(botonEliminar); // TODO Intenar centrar el contenido celda
    // fila.appendChild(celdaCantidad)
    const celdaEliminar = document.createElement("td");
    celdaEliminar.appendChild(botonEliminar);
    fila.appendChild(celdaEliminar);

    // TODO Agregar la fila a la tabla
    modalBody.appendChild(fila);
  });

  // TODO Experimental bug de contador con el first-child elemento
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

// TODO También actualizamos el contador de cantidad y precio al cargar la página
actualizarCarrito();

// TODO Esta función es llamada al hacer clic en el botón "Eliminar" de un producto en el carrito
function eliminarDelCarrito(event) {
  // TODO Obtenemos el botón que desencadenó el evento
  const button = event.target;

  // TODO Buscamos el elemento padre más cercano con la clase "card", que es la tarjeta que contiene la información del producto
  const item = button.closest(".card");

  // TODO Obtenemos el índice del producto en el carrito utilizando su ID, que se almacena en el atributo "data-id" de la tarjeta
  const itemIndex = carrito.findIndex(
    (producto) => producto.id === item.dataset.id
  );

  // TODO Eliminamos el producto del carrito utilizando su índice
  carrito.splice(itemIndex, 1);

  // TODO Actualizamos el carrito y lo guardamos en el almacenamiento local
  actualizarCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
