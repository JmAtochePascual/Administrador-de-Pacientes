// importaciones
import { ui } from "./class/UI.js";

// Variables
const formularioElement = document.querySelector('#nueva-cita');


// Funcion de inicializacion
const init = (event) => {
  event.preventDefault();

  // Validar formulario
  if (!ui.validarFormulario()) {
    ui.mostrarAlerta('Todos los campos son obligatorios', false);
    return;
  };

  // Mostrar mensaje de exito
  ui.mostrarAlerta('Cita registrada correctamente');

  // Crear un nuevo paciente
  const objePaciente = ui.obtenerDatos();

  // Reiniciar el formulario
  formularioElement.reset();
}


// Carga de eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});