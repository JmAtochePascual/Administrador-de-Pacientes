// importaciones
import { ui } from "./class/UI.js";
import { paciente } from "./class/Paciente..js";

// Variables
const formularioElement = document.querySelector('#nueva-cita');
export let db = {
  db: '',
};

// Crear la base de datos
const crearBaseDeDatos = () => {

  // Crear la base de datos y version 1
  const request = indexedDB.open('citas', 1);


  request.onsuccess = () => {
    // console.log('La base de datos se abrió correctamente');
  };

  request.onerror = () => {
    // console.log('La base de datos no se abrió correctamente');
  };

  // Crear el esquema de la base de datos
  request.onupgradeneeded = () => {
    db.db = request.result;

    // Creamos la tabla de citas
    const objectStore = db.db.createObjectStore('citas', {
      keyPath: 'id',
      autoIncrement: true
    });

    // Creamos los campos de la tabla
    objectStore.createIndex('nombreMascota', 'nombreMascota', { unique: false });
    objectStore.createIndex('propietario', 'propietario', { unique: false });
    objectStore.createIndex('telefono', 'telefono', { unique: false });
    objectStore.createIndex('fecha', 'fecha', { unique: true });
    objectStore.createIndex('hora', 'hora', { unique: false });
    objectStore.createIndex('sintomas', 'sintomas', { unique: false });
    objectStore.createIndex('id', 'id', { unique: true });
  };

};

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
  crearBaseDeDatos();
});