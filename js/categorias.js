document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('category-form');
  const submitBtn = document.getElementById('submit-btn');
  const categoryList = document.getElementById('category-list');
  const fields = ['name'];

  const loadCategories = async () => {
    const res = await fetch('server/category/index.php');
    const categories = await res.json();

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


  form.addEventListener('submit', async e => {
      e.preventDefault();
      const formData = new FormData(form);
      await fetch('server/category/create.php', {
          method: 'POST',
          body: formData
      });
      form.reset();
      document.getElementById('category-id').value = ''; // Reinicia el campo oculto
      submitBtn.textContent = 'Enviar';
      loadCategories();
  });

  categoryList.addEventListener('click', async e => {
    const li = e.target.closest('li');
    const id = li.dataset.id;

    if (e.target.classList.contains('edit-btn')) {
        const res = await fetch('server/category/index.php');
        const categories = await res.json();
        const current = categories.find(c => c.id == id);

        categoryNameInput.value = current.name;
        categoryIdInput.value = current.id;
        categoryHiddenIdInput.value = current.id;
        submitCategoryBtn.textContent = 'Guardar';
    }

    if (e.target.classList.contains('delete-btn')) {
        await fetch('server/category/delete.php', {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: `id=${id}`
        });
        loadCategories();
    }
});


  loadCategories();
});
