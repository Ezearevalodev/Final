const lis = document.querySelectorAll('.dropdown-menu li');

lis.forEach(li => {
  li.addEventListener('click', () => {
    const categoria = li.querySelector('.categoria-btn').getAttribute('data-categoria');
    console.log(`Has seleccionado la categoría "${categoria}"`);

    // Crear el modal
    const modal = document.createElement("div");
    modal.classList.add("modal", "fade");
    modal.setAttribute("id", `modal-${categoria}`);

    // Crear el contenido del modal
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-dialog");
    modalContent.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${categoria.toUpperCase()}</h5>
        </div>
        <div class="modal-body">
          <p>Aquí puedes agregar el contenido que desees para la categoría ${categoria}.</p>
        </div>
      </div>
    `;

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
