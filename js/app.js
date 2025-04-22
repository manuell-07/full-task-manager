document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('task-form');
    const submitBtn = document.getElementById('submit-btn');
    const taskList = document.getElementById('task-list');
    const fields = ['title', 'description', 'due_date', 'completed', 'category_id'];

    const loadTasks = async () => {
        const res = await fetch('server/task/index.php');
        const tasks = await res.json();

        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.dataset.id = task.id;
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">
                    <strong>${task.title}</strong>
                </span>
                <div class="div-btn">
                    ${!task.completed ? `
                    <button class="complete-btn">Completar</button>
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>` : ''}
                </div>
            `;

            if (task.completed) li.style.backgroundColor = '#b2f2bb';
            taskList.appendChild(li);
        });
    };

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const formData = new FormData(form);
        await fetch('server/task/create.php', {
            method: 'POST',
            body: formData
        });
        form.reset();
        document.getElementById('task-id').value = ''; // Reinicia el campo oculto
        submitBtn.textContent = 'Enviar';
        loadTasks();
    });

    taskList.addEventListener('click', async e => {
        const li = e.target.closest('li');
        const id = li.dataset.id;

        if (e.target.classList.contains('complete-btn')) {
            console.log("ID a completar:", id); // <- ✅ agrega esto para depurar
            const res = await fetch('server/task/update.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `id=${id}`
            });

            const result = await res.json();
            if (result.success) {
                loadTasks();
            } else {
                console.error("Error al completar tarea:", result.error);
            }
        }
        
        

        if (e.target.classList.contains('edit-btn')) {
            const task = await fetch('server/task/index.php');
            const tasks = await task.json();
            const current = tasks.find(t => t.id == id);

            fields.forEach(field => {
                if (field === 'completed') {
                    document.getElementById(field).checked = current[field];
                } else {
                    document.getElementById(field).value = current[field];
                }
            });
            document.getElementById('task-id').value = current.id; // ✅ Setea ID en campo oculto
            submitBtn.textContent = 'Guardar';
        }

        if (e.target.classList.contains('delete-btn')) {
            await fetch('server/task/delete.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `id=${id}`
            });
            loadTasks();
        }
    });

    loadTasks();
});
