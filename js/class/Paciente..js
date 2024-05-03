class Pacientes {
  constructor() {
    this.pacientes = [];
  }

  // Agrega un nuevo paciente al arreglo de pacientes
  agregarPaciente(paciente) {
    this.pacientes = [...this.pacientes, paciente];
  }
}