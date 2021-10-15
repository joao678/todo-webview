const todoList = JSON.parse(localStorage.getItem('todoList')) || [],
    ul = document.querySelector('ul'),
    textInput = document.querySelector('input[type="text"]'),
    root = document.querySelector(':root'),
    resizeObserver = new ResizeObserver(function() {
        root.style.setProperty('--list-item-right-margin', ul.scrollHeight > ul.clientHeight ? '5px' : '0px');
    }).observe(ul);


function updateLocalStorageList() {
    localStorage.setItem('todoList',JSON.stringify(todoList));
}

function renderList() {
    todoList.forEach(function(item,index) {
        const li = document.createElement('li'),
            checkbox = document.createElement('input'),
            removeButton = document.createElement('button'),
            text = document.createElement('span');
    
        text.innerHTML = item.description;

        removeButton.innerText = "-";
        removeButton.onclick = function() {
            todoList.splice(index,1);
            updateLocalStorageList();
            removeAllList();
            renderList();
        }

        checkbox.type = "checkbox";
        checkbox.onchange = function() {
            text.classList.toggle('done');
            todoList[index].done = !todoList[index].done;
            updateLocalStorageList();
        }
        if(item.done) {
            checkbox.setAttribute('checked','');
            text.classList.add('done');
        };
        
        li.appendChild(text);
        li.appendChild(checkbox);
        li.appendChild(removeButton);

        ul.appendChild(li);
    });
}

function removeAllList() {
    [...ul.children].forEach(function(li) { li.remove(); });
}

function onClickRemoveAll() {
    removeAllList();
    todoList.splice(0,todoList.length);
    localStorage.setItem('todoList',JSON.stringify([]));
}

function onClickAddTodo() {
    if(textInput.value) {
        removeAllList();
        todoList.push({ done: false, description: textInput.value });
        updateLocalStorageList();
        renderList();    
        textInput.value = '';
    }
}

renderList();