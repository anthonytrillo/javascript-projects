let tasks = [];
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById("task-list");

/**
 * Función para crear objetos de tipo tarea, se llaman factories.
 * Usamos camelCase para nombrarlas y verbos como build o create.
 */
const createTask = (titleTask, descriptionTask) => ({
    title: titleTask,
    description: descriptionTask
});

const addTask = (task) => {
    const div = document.createElement("div");
    tasks.push(task);

    div.innerHTML += `
        <div class="card text-center mb-4">
            <div class="card-body">
                <strong>Título</strong>: ${task.title} -
                <strong>Descripción</strong>: ${task.description}
                <button href="#" class="btn btn-danger" id="${task.title}" name="delete" value="${task.title}">Delete</button>
            </div>
        </div>
    `;
    taskList.appendChild(div);

    // Vaciamos el formulario con el método reset()
    taskForm.reset();

    // Guardamos las tareas en el storage
    saveTaskStorage(tasks);
};

const deleteTask = (title) => {
    tasks.forEach((task, index) => {
        if (task.title === title) {
            tasks.splice(index, 1);
        }
    });
    showTasks(tasks);
    saveTaskStorage(tasks);
};

const showTasks = (tasks) => {
    const div = document.createElement("div");

    // Limpiamos el contenedor de las tareas
    taskList.innerHTML = '';

    tasks.forEach(task => {
        div.innerHTML += `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Título</strong>: ${task.title} -
                    <strong>Descripción</strong>: ${task.description}
                    <button href="#" class="btn btn-danger" id="${task.title}" name="delete" value="${task.title}">Delete</button>
                </div>
            </div>
        `;
        taskList.appendChild(div);
    });
};

const saveTaskStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskStorage = () => {
    const tasksStorage = JSON.parse(localStorage.getItem('tasks'));
    return tasksStorage;
};

const getTasks = () => {
    if (localStorage.getItem('tasks')) {
        tasks = getTaskStorage();
        showTasks(tasks);
    };
};

// Listeners
document.addEventListener('DOMContentLoaded', getTasks);
taskList.addEventListener('click', (e) => deleteTask(e.target.value));

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const form = new FormData(taskForm);
    const titleTask = form.get('title');
    const descriptionTask = form.get('description');

    if (titleTask.trim().length === 0 || descriptionTask.trim().length === 0) {
        Toastify({
            text: 'Debe completar todos los campos.',
            position: 'center',
            gravity: 'bottom',
            duration: 3000,
            style: {
                background: '#373a3c'
            }
        }).showToast()
    } else {
        const task = createTask(titleTask, descriptionTask);
        addTask(task);
    }
});