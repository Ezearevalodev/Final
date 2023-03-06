window.addEventListener('load', function() {
  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  var forms = document.getElementsByClassName('needs-validation');
  // Loop over them and prevent submission
  var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
}, false);

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

const btnNewCarrito = document.getElementById('NewCarrito');
btnNewCarrito.addEventListener('click', () => {
  localStorage.clear()
  location.reload()
});
