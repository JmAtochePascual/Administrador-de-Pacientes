const petInput = document.querySelector('#petName');
const ownerInput = document.querySelector('#ownerName');
const phoneInput = document.querySelector('#phone');
const dateInput = document.querySelector('#date');
const hourInput = document.querySelector('#hour');
const symptomInput = document.querySelector('#symptom');
const datesContent = document.querySelector('#citas');
const formElement = document.querySelector('#nueva-cita')
let DB;
let isEditMode = false;

const dateObj = {
  petName: '',
  ownerName: '',
  phone: '',
  date: '',
  hour: '',
  symptom: '',
};

const init = (event) => {
  event.preventDefault();

  if (Object.values(dateObj).includes('')) {
    showAlert('Todos los campos son obligatorios', false);
    return;
  };

  if (isEditMode) {
    updateDate(dateObj);
    showAlert('La cita se actualizó correctamente');
  } else {
    addDate({ ...dateObj, id: generarId() });
    showAlert('Cita agregada correctamente');
  };

  resetApp();
  showDates();
  console.log(isEditMode);
};

const createDataBase = () => {
  const crearDB = window.indexedDB.open('citas', 1);

  crearDB.onerror = () => {
    console.log('Hubo un error');
  };

  crearDB.onsuccess = () => {
    DB = crearDB.result;
    showDates();
  };

  crearDB.onupgradeneeded = function (event) {
    const db = event.target.result;

    const objectStore = db.createObjectStore('citas', { keyPath: 'id', autoIncrement: true });

    objectStore.createIndex('petName', 'petName', { unique: false });
    objectStore.createIndex('ownerName', 'ownerName', { unique: false });
    objectStore.createIndex('phone', 'phone', { unique: false });
    objectStore.createIndex('date', 'date', { unique: false });
    objectStore.createIndex('hour', 'hour', { unique: false });
    objectStore.createIndex('symptom', 'symptom', { unique: false });
    objectStore.createIndex('id', 'id', { unique: true });
  };
};

const showDates = () => {
  clearHtml();

  const objectStore = DB.transaction('citas').objectStore('citas');

  objectStore.openCursor().onsuccess = function (event) {
    const cursor = event.target.result;

    if (cursor) {
      const { petName, ownerName, phone, date, hour, symptom, id } = cursor.value;

      const divDate = document.createElement('div');
      divDate.classList.add('cita', 'p-3');
      divDate.dataset.id = id;

      const petNameText = document.createElement('h2');
      petNameText.classList.add('card-title', 'font-weight-bolder');
      petNameText.innerHTML = `${petName}`;

      const ownerNameText = document.createElement('p');
      ownerNameText.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${ownerName}`;

      const phoneText = document.createElement('p');
      phoneText.innerHTML = `<span class="font-weight-bolder">Teléfono: </span> ${phone}`;

      const dateText = document.createElement('p');
      dateText.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${date}`;

      const hourText = document.createElement('p');
      hourText.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hour}`;

      const symptomText = document.createElement('p');
      symptomText.innerHTML = `<span class="font-weight-bolder">Síntomas: </span> ${symptom}`;

      const deleteButton = document.createElement('button');
      deleteButton.onclick = () => deleteDate(id);
      deleteButton.classList.add('btn', 'btn-danger', 'mr-2');
      deleteButton.innerHTML = 'Eliminar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>'

      const editButton = document.createElement('button');
      const patient = cursor.value;
      editButton.onclick = () => loadPatientEdid(patient);

      editButton.classList.add('btn', 'btn-info');
      editButton.innerHTML = 'Editar <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'

      // Agregar al HTML
      divDate.appendChild(petNameText);
      divDate.appendChild(ownerNameText);
      divDate.appendChild(phoneText);
      divDate.appendChild(dateText);
      divDate.appendChild(hourText);
      divDate.appendChild(symptomText);
      divDate.appendChild(deleteButton)
      divDate.appendChild(editButton)

      datesContent.appendChild(divDate);
      cursor.continue();
    };
  };
};

const clearHtml = () => {
  while (datesContent.firstChild) {
    datesContent.removeChild(datesContent.firstChild);
  };
};

const updateDateObj = (event) => {
  dateObj[event.target.name] = event.target.value.trim();
};

const showAlert = (message, tipo = true) => {
  const hasAlert = document.querySelector('.alert');

  if (!hasAlert) {
    const divMessage = document.createElement('div');
    divMessage.classList.add('text-center', 'alert', 'd-block', 'col-12');
    divMessage.textContent = message;

    tipo
      ? divMessage.classList.add('alert-success')
      : divMessage.classList.add('alert-danger');

    document.querySelector('.container').insertBefore(divMessage, document.querySelector('#contenido'));

    setTimeout(() => {
      divMessage.remove();
    }, 3000);
  };
};

const addDate = (patient) => {
  const transaction = DB.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');
  objectStore.add(patient);
};

const updateDate = (patient) => {

  const transaction = DB.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');
  objectStore.put(patient);

  transaction.oncomplete = () => {
    showAlert('La cita se actualizó correctamente');
  };

  transaction.onerror = () => {
    showAlert('Hubo un error al actualizar la cita', false);
  };
};

const deleteDate = (id) => {
  const transaction = DB.transaction(['citas'], 'readwrite');
  const objectStore = transaction.objectStore('citas');
  objectStore.delete(id);

  transaction.oncomplete = () => {
    showAlert('La cita se eliminó correctamente');
    showDates();
  };

  transaction.onerror = () => {
    showAlert('Hubo un error al eliminar la cita', false);
  };
};

const loadPatientEdid = (patient) => {
  const { petName, ownerName, phone, date, hour, symptom, id } = patient;

  petInput.value = petName;
  ownerInput.value = ownerName;
  phoneInput.value = phone;
  dateInput.value = date;
  hourInput.value = hour;
  symptomInput.value = symptom;

  dateObj.petName = petName;
  dateObj.ownerName = ownerName;
  dateObj.phone = phone;
  dateObj.date = date;
  dateObj.hour = hour;
  dateObj.symptom = symptom;
  dateObj.id = id;

  isEditMode = true;

  document.querySelector('button[type="submit"]').textContent = 'Guardar cambios';
};

const resetApp = () => {
  dateObj.petName = '';
  dateObj.ownerName = '';
  dateObj.phone = '';
  dateObj.date = '';
  dateObj.hour = '';
  dateObj.symptom = '';

  if (dateObj.id) {
    delete dateObj.id;
  }

  formElement.reset();
  isEditMode = false;
  document.querySelector('button[type="submit"]').textContent = 'Crear cita';
};

const generarId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);


document.addEventListener("DOMContentLoaded", () => {
  createDataBase();
  petInput.addEventListener('input', updateDateObj);
  ownerInput.addEventListener('input', updateDateObj);
  phoneInput.addEventListener('input', updateDateObj);
  dateInput.addEventListener('input', updateDateObj);
  hourInput.addEventListener('input', updateDateObj);
  symptomInput.addEventListener('input', updateDateObj);
  formElement.addEventListener('submit', init);
});