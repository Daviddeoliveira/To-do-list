let ul = document.querySelector("ul");
let input = document.querySelector(".input");
let btnAdd = document.querySelector(".add-btn");
let todoLis = [...document.querySelectorAll("li")];

let alertInfo = document.querySelector(".alert-info");
let filterOption = document.querySelector("#filter-todo");

let popup = document.querySelector(".popup");
let popupInput = document.querySelector(".popup-input");
let popupSubmitBtn = document.querySelector(".popup-btn.accept");
let popupCancelBtn = document.querySelector(".popup-btn.cancel");
let editedTodo;

//Ajouter une tâche 
function createNewTodo() {
  if (input.value.length) {
    let liText = input.value.trim();
    let liHTML = `
         ${liText}
         <div class="tools">
          <button class="complete"><i class="fas fa-check"></i></button><button class="edit">EDIT</button><button class="delete"><i class="fas fa-times"></i></button>
        </div>
      `;
    let id = Date.now();
    let li = document.createElement("li");
    let attr = document.createAttribute('draggable');
    li.setAttribute("id", id);
    li.innerHTML = liHTML;
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    ul.appendChild(li);
    todoLis.push(li);
    input.value = "";
    handleEmptyListMessage();
    addEventsDragAndDrop(li);
  }
}

//Supprimer une tâche
function deleteTodoAndChangeArrayOfTodos(todo) {
  let indexOfTodoToDelete = todoLis.indexOf(todo);
  todoLis.splice(indexOfTodoToDelete, 1);
  todo.remove();
}

function deleteTodo(e) {
  let todoToDelete = e.target.closest("li");
  deleteTodoAndChangeArrayOfTodos(todoToDelete);
  handleEmptyListMessage();
  console.log(todoLis.length);
}

function completedTodo(e) {
  e.target.closest("li").classList.toggle("completed");
}

//Editer
function handleEdit(e) {
  popup.style.display = "flex";
  editedTodo = e.target.closest("li");
  let text = editedTodo.firstChild.textContent;
  let popupInputValue = text.trim();
  popupInput.value = popupInputValue;
  popupSubmitBtn.addEventListener("click", () => submitEdition(editedTodo));
}

//Envoyer la modif
function submitEdition(editedTodo) {
  if (popupInput.value.length) {
    let popupInputValue = popupInput.value.trim();
    console.log(popupInputValue);
    editedTodo.innerHTML = `
         ${popupInputValue}
         <div class="tools editedLi">
          <button class="complete"><i class="fa-solid fa-check"></i></button>
          <button class="edit">EDIT</button>
          <button class="delete"><i class="fas fa-times"></i></button>
        </div>
      `;

    closePopup();
  }
}

//Ferme la modif de tâche
function closePopup() {
  return (popup.style.display = "none");
}
//Gestion des tâches
function handleTodoTools(e) {
  if (e.target.classList.contains("delete") ||
    e.target.classList.contains("fa-times")) {
    deleteTodo(e);
  } else if (e.target.classList.contains("complete") ||
    e.target.classList.contains("fa-check")) {
    completedTodo(e);
  } else if (e.target.classList.contains("edit")) {
    handleEdit(e);
  }
}

//Check si la liste est vide
function handleEmptyListMessage() {
  if (!todoLis.length)
    alertInfo.style.display = "block";
  else
    alertInfo.style.display = "none";
}

handleEmptyListMessage();

function filterTodo(e){
  let todos = todoLis;
  console.log(todos);
  todos.forEach(todo => {
    switch(e.target.value){
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        }else{
          todo.style.display = "none";
        }
        break;
        case "uncompleted":
          if (!todo.classList.contains("completed")) {
            todo.style.display = "flex";
          }else{
            todo.style.display = "none";
          }
          break;
    }
  });
}

btnAdd.addEventListener("click", createNewTodo);
ul.addEventListener("click", handleTodoTools);
popupCancelBtn.addEventListener("click", closePopup);
filterOption.addEventListener("input", filterTodo);
