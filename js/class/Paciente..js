import { ui } from './UI.js';
import { db } from '../app.js';

class Paciente {
  constructor() {
    this.pacientes = [];
  }

  // Agrega un nuevo paciente al arreglo de pacientes
  agregarPaciente(paciente) {
    this.pacientes = [...this.pacientes, paciente];

    ui.mostrarPacientes(this.pacientes);

    const transaction = db.db.transaction(['citas'], 'readwrite');

    // Creamos el objeto de la transacción que nos permitirá agregar un registro
    const objectStore = transaction.objectStore('citas');

    // Agregamos el registro a la base de datos
    objectStore.add(paciente);
  }

  // Elimina un paciente del arreglo de pacientes
  eliminarPaciente(id) {
    this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);

    ui.mostrarPacientes(this.pacientes);
  }

  // Edita un paciente del arreglo de pacientes
  editarPaciente(id) {
    const { nombreMascota, propietario, telefono, fecha, hora, sintomas } = ui.obtenerDatos();

    const pacientesActualizados = this.pacientes.map(paciente => {
      if (paciente.id === id) {
        paciente.nombreMascota = nombreMascota;
        paciente.propietario = propietario;
        paciente.telefono = telefono;
        paciente.fecha = fecha;
        paciente.hora = hora;
        paciente.sintomas = sintomas;
      }
      return paciente;
    });

    ui.mostrarPacientes(pacientesActualizados);
  }
}

export const paciente = new Paciente();