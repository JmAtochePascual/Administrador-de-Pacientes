class UI {

  // Metodo para validar el formulario
  validarFormulario() {
    const nombreMascota = document.querySelector('#mascota').value;
    const propietario = document.querySelector('#propietario').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const sintomas = document.querySelector('#sintomas').value;

    if ([nombreMascota, propietario, telefono, fecha, hora, sintomas].includes("")) {
      return false;
    }

    return true;
  };

  // Metodo para mostrar alertas
  mostrarAlerta(mensaje, tipo = true) {
    const existeAlerta = document.querySelector('.alert');

    if (!existeAlerta) {
      const divMensaje = document.createElement('div');
      divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
      divMensaje.textContent = mensaje;

      tipo
        ? divMensaje.classList.add('alert-success')
        : divMensaje.classList.add('alert-danger');

      document.querySelector('.container').insertBefore(divMensaje, document.querySelector('#contenido'));

      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    };
  };
}


export const ui = new UI();