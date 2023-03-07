// Esperar a que la ventana cargue completamente
window.addEventListener('load', function() {
  // Obtener todos los formularios con la clase "needs-validation"
  const forms = document.getElementsByClassName('needs-validation');
  
  // Iterar sobre los formularios y prevenir su envío si no son válidos
  Array.prototype.forEach.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      // Verificar si el formulario es válido
      if (form.checkValidity() === false) {
        event.preventDefault(); // Prevenir el envío del formulario
        event.stopPropagation(); // Detener la propagación del evento
      }
      
      // Añadir la clase "was-validated" al formulario
      form.classList.add('was-validated');
    });
  });
});


const btnVerificar = document.querySelector('.btn-success');
btnVerificar.addEventListener('click', (event) => {
  // Detener el comportamiento predeterminado del botón
  event.preventDefault();
  // Obtener el formulario
  const form = document.querySelector('form');
  // Verificar si el formulario es válido
  if (form.checkValidity()) {
    // Si el formulario es válido, cerrar modal2
    const modal2 = document.querySelector('#modal2');
    const modal2Instance = new bootstrap.Modal(modal2);
    modal2Instance.hide();
    // Abrir la modal3
    const modal3 = document.querySelector('#modal3');
    const modal3Instance = new bootstrap.Modal(modal3);
    modal3Instance.show();
  } else {
    // Si el formulario no es válido, no hacer nada
    return false;
  }
});


    // TODO Al darle click al boton debera limpiar el localstorage y reiniciar la web para vaciar el minicarrito
const btnNewCarrito = document.getElementById('NewCarrito');
btnNewCarrito.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
});
