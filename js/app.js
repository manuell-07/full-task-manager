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

    // Aquí comenzamos con la parte de cambiar la vista de tareas y categorías
    const taskSection = document.getElementById("task-section");
    const categorySection = document.getElementById("category-section");
    const showTasksBtn = document.getElementById("show-tasks-btn");
    const showCategoriesBtn = document.getElementById("show-categories-btn");

    showTasksBtn.addEventListener("click", () => {
        taskSection.style.display = "block";
        categorySection.style.display = "none";
    });

    showCategoriesBtn.addEventListener("click", () => {
        taskSection.style.display = "none";
        categorySection.style.display = "block";
    });

    // Cargar categorías al inicio
    const loadCategories = async () => {
        const res = await fetch('server/category/index.php');
        const categories = await res.json();

        const categoryList = document.getElementById('category-list');
        categoryList.innerHTML = '';
        categories.forEach(category => {
            const li = document.createElement('li');
            li.dataset.id = category.id;
            li.innerHTML = `
                <span><strong>${category.name}</strong></span>
                <div class="div-btn">
                    <button class="edit-btn">Editar</button>
                    <button class="delete-btn">Eliminar</button>
                </div>
            `;
            categoryList.appendChild(li);
        });
    };

    // Cargar categorías al iniciar
    loadCategories();

    const categoryForm = document.getElementById("category-form");
    const submitCategoryBtn = document.getElementById("submit-category-btn");

    categoryForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(categoryForm);
        await fetch("server/category/create.php", {
            method: "POST",
            body: formData,
        });
        categoryForm.reset();
        submitCategoryBtn.textContent = "Enviar";
        loadCategories();
    });

    document.getElementById("category-list").addEventListener("click", async (e) => {
        const li = e.target.closest("li");
        const id = li.dataset.id;

        if (e.target.classList.contains("edit-btn")) {
            const res = await fetch("server/category/index.php");
            const categories = await res.json();
            const current = categories.find((c) => c.id == id);

            document.getElementById("category-name").value = current.name;
            document.getElementById("category-id").value = current.id;
            submitCategoryBtn.textContent = "Guardar";
        }

        if (e.target.classList.contains("delete-btn")) {
            await fetch("server/category/delete.php", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `id=${id}`,
            });
            loadCategories();
        }
    });
});
