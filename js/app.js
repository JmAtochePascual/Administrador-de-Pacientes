// importaciones
import { ui } from "./class/UI.js";

// Variables
const formularioElement = document.querySelector('#nueva-cita');


// Funcion de inicializacion
const init = (event) => {
  event.preventDefault();

  if (!ui.validarFormulario()) {
    ui.mostrarAlerta('Todos los campos son obligatorios', false);
    return;
  };

  ui.mostrarAlerta('Cita registrada correctamente');
}


// Carga de eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});