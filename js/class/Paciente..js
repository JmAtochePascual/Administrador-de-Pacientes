import { ui, } from './UI.js';

class Paciente {
  constructor() {
    this.pacientes = [];
  }

  // Agrega un nuevo paciente al arreglo de pacientes
  agregarPaciente(paciente) {
    this.pacientes = [...this.pacientes, paciente];


    const transaction = ui.DB.transaction(['citas'], 'readwrite');

    // Creamos el objeto de la transacción que nos permitirá agregar un registro
    const objectStore = transaction.objectStore('citas');

    // Agregamos el registro a la base de datos
    objectStore.add(paciente);

    ui.mostrarPacientes(this.pacientes);

  }

  // Elimina un paciente del arreglo de pacientes
  eliminarPaciente(id) {

    const transacción = ui.DB.transaction(['citas'], 'readwrite');
    const objectStore = transacción.objectStore('citas');
    objectStore.delete(id);
    ui.mostrarPacientes();
  }

  // Edita un paciente del arreglo de pacientes
  editarPaciente(id) {
    const { nombreMascota, propietario, telefono, fecha, hora, sintomas } = ui.obtenerDatos();

    const pacienteActualizado = {
      nombreMascota,
      propietario,
      telefono,
      fecha,
      hora,
      sintomas,
      id
    }

    const transaction = ui.DB.transaction(['citas'], 'readwrite');

    const objectStore = transaction.objectStore('citas');
    // editamos el registro
    objectStore.put(pacienteActualizado);

    ui.mostrarPacientes();
  }
}

export const paciente = new Paciente();