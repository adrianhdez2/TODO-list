window.addEventListener("DOMContentLoaded", () => {
    cargarTareas();
});

let list = document.querySelector('.list');
let input = document.getElementById('add');
const btnAdd = document.querySelector('.btnAdd');


btnAdd.addEventListener("click", function guardarTarea() {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    let id = Math.floor(Math.random() * 1000000);
    tareas.push({ "id": id, "tarea": input.value, "status": 0 });
    localStorage.setItem('tareas', JSON.stringify(tareas));

    cargarTareas();
    input.value = "";
    btnAdd.setAttribute('disabled', true);
    btnAdd.innerHTML = `<span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                            `;
});


input.addEventListener('input', function validar(value) {
    if (this.value.trim().length <= 0) {
        btnAdd.setAttribute('disabled', true);
        btnAdd.innerHTML = `<span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                            `;
    } else {
        btnAdd.removeAttribute('disabled');
        btnAdd.innerHTML = `<p>Add</p>`;
    }
});

function eliminarTarea(id) {
    const listItem = document.querySelector('.listItem');
    listItem.classList.remove('verItem');
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    setTimeout(() => {
        tareas = tareas.filter(item => item.id !== id);
        localStorage.setItem('tareas', JSON.stringify(tareas));
        cargarTareas();
    }, 100)
}

function actualizarTarea(id) {
    let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    const indice = tareas.findIndex(tarea => tarea.id === id);
    if (indice !== -1) {
        tareas[indice] = { "id": id, "tarea": tareas[indice].tarea, "status": 1 };
        localStorage.setItem('tareas', JSON.stringify(tareas));
        cargarTareas();
    }
}

function cargarTareas() {
    const tareas = JSON.parse(localStorage.getItem('tareas')) || [];
    if (tareas.length <= 0) {
        list.innerHTML = `
                        <div class="item">
                            <h1>Aún no hay tareas :(</h1>
                        </div>
                        `
    } else {
        let inner = '';
        tareas.forEach((item) => {
            inner += `
                    <div class="listItem verItem ${(item.status !== 0) ? 'check' : ''}" data-id="${item.id}">
                        <div class="infoItem">
                            <p>${item.tarea}</p>
                        </div>
                        <div class="button">
                            <button type="button" data-id="${item.id}" class="btnDelete">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="14"
                                    viewBox="0 0 448 512">
                                    <path
                                        d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                `;
        })

        list.innerHTML = inner;

        const btnDelete = document.querySelectorAll('.btnDelete');
        btnDelete.forEach((item) => {
            item.addEventListener('click', function () {
                const taskId = parseInt(this.getAttribute('data-id'));
                eliminarTarea(taskId);
            });
        })
        const listItem = document.querySelectorAll('.listItem');
        listItem.forEach((item) => {
            item.addEventListener('dblclick', function () {
                const taskId = parseInt(this.getAttribute('data-id'));
                actualizarTarea(taskId);
            });
        })
    }


}
