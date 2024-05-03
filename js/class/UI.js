class UI {

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
  }
}


export const ui = new UI();