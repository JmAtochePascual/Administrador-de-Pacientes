import { ui } from './UI.js';

class Paciente {
  constructor() {
    this.pacientes = [];
  }

  // Agrega un nuevo paciente al arreglo de pacientes
  agregarPaciente(paciente) {
    this.pacientes = [...this.pacientes, paciente];

    ui.mostrarPacientes(this.pacientes);
  }

  // Elimina un paciente del arreglo de pacientes
  eliminarPaciente(id) {
    this.pacientes = this.pacientes.filter(paciente => paciente.id !== id);

    ui.mostrarPacientes(this.pacientes);
  }
}

export const paciente = new Paciente();