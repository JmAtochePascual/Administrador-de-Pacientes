// importaciones
import { ui } from "./class/UI.js";
import { paciente } from "./class/Paciente..js";

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

  // Crear un nuevo paciente
  const objePaciente = ui.obtenerDatos();

  if (ui.editar) {
    paciente.editarPaciente(ui.id);
    document.querySelector('button[type="submit"]').textContent = 'Crear cita';

    // Mostrar mensaje de exito
    ui.mostrarAlerta('Cita actualizada correctamente');

    ui.editar = false;
    ui.id = '';
  } else {
    // Agregar nuevo paciente
    paciente.agregarPaciente(objePaciente);

    // Mostrar mensaje de exito
    ui.mostrarAlerta('Cita registrada correctamente');
  }

  // Reiniciar el formulario
  formularioElement.reset();
}


// Carga de eventos
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});