import { paciente } from './Paciente..js';

class UI {

  // Metodo para validar el formulario
  validarFormulario() {
    const nombreMascota = document.querySelector('#mascota').value;
    const propietario = document.querySelector('#propietario').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const sintomas = document.querySelector('#sintomas').value;

    if ([nombreMascota, propietario, telefono, fecha, hora, sintomas].includes("")) {
      return false;
    }

    return true;
  };

  // Metodo para mostrar alertas
  mostrarAlerta(mensaje, tipo = true) {
    const existeAlerta = document.querySelector('.alert');

    if (!existeAlerta) {
      const divMensaje = document.createElement('div');
      divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
      divMensaje.textContent = mensaje;

      tipo
        ? divMensaje.classList.add('alert-success')
        : divMensaje.classList.add('alert-danger');

      document.querySelector('.container').insertBefore(divMensaje, document.querySelector('#contenido'));

      setTimeout(() => {
        divMensaje.remove();
      }, 3000);
    };
  };

  // Obtener los valores del formulario
  obtenerDatos() {
    const nombreMascota = document.querySelector('#mascota').value;
    const propietario = document.querySelector('#propietario').value;
    const telefono = document.querySelector('#telefono').value;
    const fecha = document.querySelector('#fecha').value;
    const hora = document.querySelector('#hora').value;
    const sintomas = document.querySelector('#sintomas').value;
    const id = Date.now();

    return { nombreMascota, propietario, telefono, fecha, hora, sintomas, id };
  };

  // Metodo para mostrar pacientes
  mostrarPacientes(pacientes) {

    // Limpiar el html
    this.limpiarHTML();

    pacientes.forEach(pacienteElemen => {
      const { nombreMascota, propietario, telefono, fecha, hora, sintomas, id } = pacienteElemen;

      const divPaciente = document.createElement('div');
      divPaciente.classList.add('cita', 'p-3');
      divPaciente.dataset.id = id;

      const nombreMascotaParrafo = document.createElement('h2');
      nombreMascotaParrafo.classList.add('card-title', 'font-weight-bolder');
      nombreMascotaParrafo.textContent = nombreMascota;

      const propietarioParrafo = document.createElement('p');
      propietarioParrafo.innerHTML = `
        <span class="font-weight-bolder">Propietario: </span> ${propietario}
      `;

      const telefonoParrafo = document.createElement('p');
      telefonoParrafo.innerHTML = `
        <span class="font-weight-bolder">Telefono: </span> ${telefono}
      `;

      const fechaParrafo = document.createElement('p');
      fechaParrafo.innerHTML = `
        <span class="font-weight-bolder">Fecha: </span> ${fecha}
      `;

      const horaParrafo = document.createElement('p');
      horaParrafo.innerHTML = `
        <span class="font-weight-bolder">Hora: </span> ${hora}
      `;

      const sintomasParrafo = document.createElement('p');
      sintomasParrafo.innerHTML = `
        <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
      `;

      // Boton para eliminar paciente
      const btnEliminar = document.createElement('button');
      btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
      btnEliminar.innerHTML = 'Eliminar';
      btnEliminar.onclick = () => { paciente.eliminarPaciente(id) };

      // Boton para editar paciente
      const btnEditar = document.createElement('button');
      btnEditar.classList.add('btn', 'btn-info');
      btnEditar.innerHTML = 'Editar';
      // btnEditar.onclick = () => cargarEdicion(paciente);

      // Agregar los parrafos al divPaciente
      divPaciente.append(
        nombreMascotaParrafo,
        propietarioParrafo,
        telefonoParrafo,
        fechaParrafo,
        horaParrafo,
        sintomasParrafo,
        btnEliminar,
        btnEditar);

      // Agregar el divPaciente al contenedor
      document.querySelector('#citas').appendChild(divPaciente);
    });
  }

  // limpia el html previo
  limpiarHTML() {
    while (document.querySelector('#citas').firstChild) {
      document.querySelector('#citas').firstChild.remove();
    }
  }
}


export const ui = new UI();