const lis = document.querySelectorAll('.dropdown-menu li');

lis.forEach(li => {
  li.addEventListener('click', () => {
    const categoria = li.querySelector('.categoria-btn').getAttribute('data-categoria');
    console.log(`Has seleccionado la categoría "${categoria}"`);

    // TODO Evitar que cuando se seleccione todo se genere una modal sin sentido
    if (categoria === "todo") {
      return;
    }

    // TODO Crear el modal de cada categoria y añadir su ID, categoria
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("id", `modal-${categoria}`);
    modal.setAttribute("data-bs-backdrop", "static");
    modal.setAttribute("data-bs-keyboard", "false");

    // TODO Crear el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-dialog", "modal-dialog-centered");
    modalContent.innerHTML = `
      <div class="modal-content" >
        <div class="modal-header">
          <h5 class="modal-title">Has seleccionado la categoria: "${categoria.toUpperCase()}"</h5>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-12">
              <img src="" class="img-fluid" id="producto-imagen">
            </div>
            <div class="col-md-12">
              <h3>OFERTA LIMITADA</h3>
              <p>¡Disfruta de los nuevos Doritos ${categoria} con una oferta especial por tiempo limitado! No te pierdas la oportunidad de probarlos.</p>
              <h4>Ventajas de los nuevos Doritos ${categoria}</h4>
              <ul>
                <li class="list-group-item"><i class="bi bi-check"></i> Más crujientes que nunca</li>
                <li class="list-group-item"><i class="bi bi-check"></i> Sabor más intenso</li>
                <li class="list-group-item"><i class="bi bi-check"></i> Ahora en paquete de 200g</li>
                <li class="list-group-item"><i class="bi bi-check"></i> Disponibles en tiendas seleccionadas</li>
                <li class="list-group-item"><i class="bi bi-check"></i> ¡Con un toque picante que te encantará!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    // TODO Cambiar el src de la imagen del producto según la categoría
    const productoImagen = modalContent.querySelector("#producto-imagen");
    switch (categoria) {
      case "suave":
        productoImagen.src = "../../res/img/extras/Suave.png";
        break;
      case "normal":
        productoImagen.src = "../../res/img/extras/Normal.png";
        break;
      case "picante":
        productoImagen.src = "../../res/img/extras/Picantes.png";
        break;
      default:
        console.error("Error: (Categoría no reconocida)");
        break;
      }
    

    // Agregar el contenido al modal y al body
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Mostrar el modal al hacer clic en el li
    const modalTrigger = document.createElement("a");
    modalTrigger.setAttribute("href", `#modal-${categoria}`);
    modalTrigger.setAttribute("data-bs-toggle", "modal");
    modalTrigger.style.display = "none"; // Ocultar el enlace
    document.body.appendChild(modalTrigger);
    modalTrigger.click();

    // Cerrar el modal después de 10 segundos
    setTimeout(() => {
      const modalElement = document.getElementById(`modal-${categoria}`);
      const modalInstance = bootstrap.Modal.getInstance(modalElement);
      modalInstance.hide();
      modal.remove();
    }, 10000);

    // Barra de progreso
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar", "progress-bar-striped", "bg-danger");
    progressBar.style.width = "100%";
    progressBar.style.height = "6px";
    progressBar.style.backgroundColor = "blue";
    progressBar.style.position = "fixed";
    progressBar.style.top = "0";
    progressBar.style.left = "0";
    progressBar.style.zIndex = "9999";
    document.body.appendChild(progressBar);

    const barWidth = progressBar.offsetWidth;
    let currentWidth = barWidth;
    const interval = setInterval(() => {
      currentWidth -= barWidth / 100;
      progressBar.style.width = currentWidth + "px";
      if (currentWidth <= 0) {
        clearInterval(interval);
        progressBar.remove();
      }
    }, 100);
  });
});