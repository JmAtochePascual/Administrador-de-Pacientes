import { paciente } from './Paciente..js';


class UI {

  constructor() {
    this.id = '';
    this.editar = false
    this.DB = '';
  }

  // Metodo para crear la base de datos
  crearBaseDeDatos() {
    // Crear la base de datos y version 1
    const request = indexedDB.open('citas', 1);

    // Crear el esquema de la base de datos
    request.onupgradeneeded = () => {
      this.DB = request.result;
      // Creamos la tabla de citas
      const objectStore = DB.createObjectStore('citas', {
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

    request.onsuccess = () => {
      // console.log('La base de datos se abrió correctamente');
      this.DB = request.result;
      ui.mostrarPacientes();
    };

    request.onerror = () => {
      // console.log('La base de datos no se abrió correctamente');
    };
  };

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
  mostrarPacientes() {

    // Limpiar el html
    this.limpiarHTML();

    const objectStore = this.DB.transaction('citas').objectStore('citas');

    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;

      if (cursor) {
        const { nombreMascota, propietario, telefono, fecha, hora, sintomas, id } = cursor.value;

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
        btnEliminar.onclick = () => paciente.eliminarPaciente(id);

        // Boton para editar paciente
        const btnEditar = document.createElement('button');
        btnEditar.classList.add('btn', 'btn-info');
        btnEditar.innerHTML = 'Editar';
        const paciente = cursor.value;
        btnEditar.onclick = () => this.cargarEdicion(paciente);

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
        cursor.continue();

      }
    }
  };

  // limpia el html previo
  limpiarHTML() {
    while (document.querySelector('#citas').firstChild) {
      document.querySelector('#citas').firstChild.remove();
    }
  }

  // Carga los datos y el modo edicion
  cargarEdicion(paciente) {
    const { nombreMascota, propietario, telefono, fecha, hora, sintomas, id } = paciente;

    // Llenar los inputs
    document.querySelector('#mascota').value = nombreMascota;
    document.querySelector('#propietario').value = propietario;
    document.querySelector('#telefono').value = telefono;
    document.querySelector('#fecha').value = fecha;
    document.querySelector('#hora').value = hora;
    document.querySelector('#sintomas').value = sintomas;

    // Cambiar el texto del boton
    document.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    this.editar = true;
    this.id = id;
  }


};


export const ui = new UI();