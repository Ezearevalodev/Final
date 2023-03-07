const lis = document.querySelectorAll('.dropdown-menu li');

for (let i = 0; i < lis.length; i++) {
  lis[i].addEventListener('click', function() {
    const categoria = lis[i].querySelector('.categoria-btn').getAttribute('data-categoria');

    if (categoria === 'todo') {
      return;
    }

    // TODO Utilizar atributos data-bs para evitar que se cierre la modal dando click fuera o escape
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.setAttribute('id', 'modal-' + categoria);
    modal.setAttribute('data-bs-backdrop', 'static');
    modal.setAttribute('data-bs-keyboard', 'false');

    const modalContent = document.createElement('div');
    // TODO modal-dialog-centered, centra la modal en el medio de la pantalla vertical y horizontal
    modalContent.classList.add('modal-dialog', 'modal-dialog-centered');

    const modalContentInner = document.createElement('div');
    modalContentInner.classList.add('modal-content');

    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    // TODO Asignar titulo a la modal correspondiendo segun su categoria
    const modalTitle = document.createElement('h5');
    modalTitle.classList.add('modal-title');
    modalTitle.textContent = `Has seleccionado la categoria: ${categoria.toUpperCase()}`;

    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');

    // TODO Contiene todo el contenido del body, no borrar
    const row = document.createElement('div');
    row.classList.add('row');

    const col1 = document.createElement('div');
    col1.classList.add('col-md-12');

    //TODO creación de la imagen dentro del contenedor con su respectivo banner
    const imagen = document.createElement('img');
    imagen.setAttribute('src', '');
    imagen.classList.add('img-fluid');
    imagen.setAttribute('id', 'producto-imagen');

    const col2 = document.createElement('div');
    col2.classList.add('col-md-12');

    const h3 = document.createElement('h3');
    h3.textContent = 'OFERTA LIMITADA';

    const p = document.createElement('p');
    p.textContent = `¡Disfruta de los nuevos Doritos ${categoria} con una oferta especial por tiempo limitado! No te pierdas la oportunidad de probarlos.`;

    const h4 = document.createElement('h4');
    h4.textContent = `Ventajas de los nuevos Doritos ${categoria}`;

    const ul = document.createElement('ul');

    // TODO Creación de todos los li y su texto correspondiente en orden
    const li1 = document.createElement('li');
    // TODO asignar la clase list-group-item para prevenir el list-item
    li1.classList.add('list-group-item');
    li1.innerHTML = '<i class="bi bi-check"></i> Más crujientes que nunca';
    
    const li2 = document.createElement('li');
    li2.classList.add('list-group-item');
    li2.innerHTML = '<i class="bi bi-check"></i> Sabor más intenso';
    
    const li3 = document.createElement('li');
    li3.classList.add('list-group-item');
    li3.innerHTML = '<i class="bi bi-check"></i> Ahora en paquete de 200g';
    
    const li4 = document.createElement('li');
    li4.classList.add('list-group-item');
    li4.innerHTML = '<i class="bi bi-check"></i> Disponibles en tiendas seleccionadas';
    
    const li5 = document.createElement('li');
    li5.classList.add('list-group-item');
    li5.innerHTML = '<i class="bi bi-check"></i> ¡Con un toque picante que te encantará!';
    
    // TODO Comprobar la anidación de elementos previamente creados para su generación en HTML
    col1.appendChild(imagen);
    
    ul.appendChild(li1);
    ul.appendChild(li2);
    ul.appendChild(li3);
    ul.appendChild(li4);
    ul.appendChild(li5);
    
    col2.appendChild(h3);
    col2.appendChild(p);
    col2.appendChild(h4);
    col2.appendChild(ul);
    
    row.appendChild(col1);
    row.appendChild(col2);
    
    modalHeader.appendChild(modalTitle);
    
    modalBody.appendChild(row);
    
    modalContentInner.appendChild(modalHeader);
    modalContentInner.appendChild(modalBody);
    
    modalContent.appendChild(modalContentInner);

    const productoImagen = modalContent.querySelector('#producto-imagen');

    // TODO Dependiendo la categoria seleccionada, la modal contendrá el banner correspondiente segun su categoria
    switch (categoria) {
      case 'suave':
        productoImagen.src = '../../res/img/extras/Suave.png';
        break;
      case 'normal':
        productoImagen.src = '../../res/img/extras/Normal.png';
        break;
      case 'picante':
        productoImagen.src = '../../res/img/extras/Picantes.png';
        break;
      default:
        console.error('Error: (Categoría no reconocida)');
        break;
    }

    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // TODO Deberá generar la modal, con sus respectivos atributos de BOOTSTRAP5
    const modalTrigger = document.createElement('a');
    modalTrigger.setAttribute('href', '#modal-' + categoria);
    modalTrigger.setAttribute('data-bs-toggle', 'modal');
    document.body.appendChild(modalTrigger);
    modalTrigger.click();

    // TODO La modal deberá cerrarse después de 10 segundos
    setTimeout(() => {
    let modalElement = document.getElementById(`modal-${categoria}`);
    let modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();
    modal.remove();
    }, 10000);
    
    // TODO Barra de progreso como ayuda visual al usuario
    // TODO Utilizar position fixed para que el usuario vea constantemente la barra de progreso, añadir zIndex y un color llamativo
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
    
    // TODO La barra de progreso debera ir disminuyendo cada segundo
    const barWidth = progressBar.offsetWidth;
    let currentWidth = barWidth;
    const interval = setInterval(() => {
    currentWidth -= barWidth / 100;
    progressBar.style.width = currentWidth + "px"; // TODO añadir + "px" para que tome bien la cantidad 
    if (currentWidth <= 0) {
    clearInterval(interval);
    
    // TODO Elimina el div creado en la web para que cuando finalice no permanezca ahi
    progressBar.remove();
    }
    }, 100);
  });
};