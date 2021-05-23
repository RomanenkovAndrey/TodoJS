const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
const addTodoButton = document.querySelector('#add-todo-button');

todoInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter' && todoInput.value?.trim()) {
        addTodoInList(todoInput.value.trim());
        todoInput.value = '';
    }
});

addTodoButton.addEventListener('click', () => {
    if (todoInput.value?.trim()) {
        addTodoInList(todoInput.value.trim());
        todoInput.value = '';
    }
});

const addTodoInList = (value) => {
    const timeId = Date.now();
    const newTodo = document.createElement('div');
    newTodo.className = `todo-list-elem element-${timeId}`;

    // Добавление текстового значения в элемент туду-листа
    const newTodoTextArea = document.createElement('input');
    newTodoTextArea.value = value;
    newTodoTextArea.disabled = true;
    newTodoTextArea.className = 'todo-text-area';
    newTodo.append(newTodoTextArea);

    const spanForIcons = document.createElement('span');

    // Добавление иконки редактирования в элемент туду-листа
    const newTodoEditIcon = document.createElement('span');
    newTodoEditIcon.innerHTML = '<i class="fa fa-edit" aria-hidden="true" height="30" width="30"></i>';
    newTodoEditIcon.addEventListener('click', () => {
        editTodoElement(`element-${timeId}`);
    });
    spanForIcons.append(newTodoEditIcon);

    // Добавление иконки удаления в элемент туду-листа
    const newTodoDeleteIcon = document.createElement('span');
    newTodoDeleteIcon.innerHTML = '<i class="fa fa-trash-alt" aria-hidden="true" height="30" width="30"></i>';
    newTodoDeleteIcon.addEventListener('click', () => {
        deleteTodoFromList(`element-${timeId}`);
    });
    spanForIcons.append(newTodoDeleteIcon);

    newTodo.append(spanForIcons);

    todoList.append(newTodo);
};

const editTodoElement = (elemClassName) => {
    const elem =  document.querySelector(`.${elemClassName}`);
    const elemIcons = Array.from(elem.querySelectorAll('i'));
    elemIcons.forEach(icon => icon.style.display = 'none');

    const spanForIcons = document.createElement('span');

    const elemSaveChangesButton = document.createElement('i');
    elemSaveChangesButton.innerHTML = '<i class="fa fa-check" aria-hidden="true" height="30" width="30"></i>';

    const elemCancelChangesButton = document.createElement('i');
    elemCancelChangesButton.innerHTML = '<i class="fa fa-times" aria-hidden="true" height="30" width="30"></i>';

    spanForIcons.append(elemSaveChangesButton, elemCancelChangesButton);
    elem.append(spanForIcons);

    const elemInput = elem.querySelector('.todo-text-area');
    const elemInputOldValue = elemInput.value; // Прежнее значение текста в инпуте
    elemInput.disabled = false;
    elemInput.focus();
    elemInput.classList.add('editing');

    // let wasTextEdited = false; // Был ли текст отредактирован. Нужно для модалки / клика мимо инпута.

    // // Если с input что-то делали, текст отредактирован, нужно сохранить новое значение
    // elemInput.addEventListener('input', () => { // а все ли события вызывают input? Вставка мышкой?
    //     wasTextEdited = true;
    // });

    elemSaveChangesButton.addEventListener('click', () => { // TODO: в обработчиках иконок общая часть
        elemInput.disabled = true;
        elemInput.classList.remove('editing');
        spanForIcons.remove();
        elemIcons.forEach(icon => icon.style.display = 'inline');
    });

    elemCancelChangesButton.addEventListener('click', () => { // TODO: в обработчиках иконок общая часть
        elemInput.value = elemInputOldValue;
        elemInput.disabled = true;
        elemInput.classList.remove('editing');
        spanForIcons.remove();
        elemIcons.forEach(icon => icon.style.display = 'inline');
    });
};

const deleteTodoFromList = (elemClassName) => {
    document.querySelector(`.${elemClassName}`).remove();
};
