// importaciones
import { ui } from "./class/UI.js";

// Variables
const formularioElement = document.querySelector('#nueva-cita');


// Funcion de inicializacion
const init = (event) => {
  event.preventDefault();

  console.log(ui.validarFormulario())
}


// Carga de eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});