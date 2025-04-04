document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');
    let tasks = [];
    let idEditing = false;
    let editingId = null;

    taskForm.addEventListener('click', (e) => {
        const vti = taskInput.value.trim();
        if (vti !== '') {
            if (idEditing) {
                tasks = tasks.map(task => 
                    task.id === editingId ? {
                        ...task, text: vti
                    } : task);

                console.log("Se guarda la edición");
                idEditing = false;
                editingId = null;
                taskForm.innerText = "Agregar";
            }
            else {
                const task = {
                    id: Date.now(),
                    text: vti,
                    complete: false
                };
                tasks.push(task);
                console.log(tasks);
            }
            renderTasks();
            taskInput.value = '';
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(
            task => {
                const li = document.createElement('li');
                li.innerHTML =
                    '<span>' + task.text + '</span>' +
                    '<div>' +
                    '<button class="complete-btn" onclick= "completeTask(' + task.id + ')">' +
                    'Editar </button>&nbsp'+
                    '<button class="edit-btn" onclick= "editTask(' + task.id + ')">' +
                    'Editar </button>&nbsp'+
                    '<button class="delete-btn" onclick= "deleteTask(' + task.id + ')">' +
                    'Eliminar </button>' +
                    '</div>';
                taskList.appendChild(li);
                // Si la tarea está marcada como completada (task.complete es true)
                if (task.complete) {
                    // Cambiar el fondo del elemento <li> a verde claro para mostrar que está completada
                    li.style.backgroundColor = 'lightgreen';

                    // Buscar el contenedor <div> donde están los botones (Completar, Editar, Eliminar)
                    const buttons = li.querySelector('div');

                    // Si se encontró ese contenedor de botones, lo ocultamos
                    if (buttons) {
                        buttons.style.display = 'none';
                    }
                }
            }

        );
    }

    window.deleteTask = function (id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    window.editTask = function (id) {
        const et = tasks.find(t => t.id === id);
        if (et){
            taskInput.value = et.text;
            taskForm.innerText = "Guardar";
            idEditing = true;
            editingId = et.id;
        }
    }

    window.completeTask = function (id) {
        // Buscar la tarea en el array de tareas usando su id
        const et = tasks.find(t => t.id === id);
        if (et) {
            // Marcar la tarea como completada en el array
            et.complete = true;
    
            // Buscar el índice (posición) de la tarea en el array
            const index = tasks.findIndex(t => t.id === id);
    
            // Obtener el <li> correspondiente desde el DOM según su posición
            const li = taskList.children[index];
    
            // Cambiar el fondo a verde para indicar que está completada
            li.style.backgroundColor = 'lightgreen';
    
            // Ocultar el div que contiene los botones
            const buttons = li.querySelector('div');
            if (buttons) {
                buttons.style.display = 'none';
            }
        }
    }

});