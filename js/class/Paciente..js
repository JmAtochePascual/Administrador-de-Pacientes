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
}

export const paciente = new Paciente();