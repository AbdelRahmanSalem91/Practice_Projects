// Selectors

let container = document.querySelector(".container"),
  taskInput = document.getElementById("task-input"),
  addButton = document.querySelector(".add-butt"),
  doneAllButton = document.querySelector(".buttons .done-all"),
  undoButton = document.querySelector(".buttons .undo"),
  deleteAllButton = document.querySelector(".buttons .delete-all"),
  tasksCount = document.querySelector(".container .stats .tasksCount .tasks-count"),
  doneTasks = document.querySelector(".container .stats .done.tasks-done"),
  addedTask = document.querySelector(".displayed-tasks"),
  taskStatus = document.querySelector(".task-status");

// Events

window.addEventListener('DOMContentLoaded', getTasks);
window.onload = taskInput.focus();

window.onload = noTasksToShow();
window.onload = setInterval(backgroungLoop, 10000);
addButton.addEventListener("click", addTask);

doneAllButton.addEventListener("click", doneAllTasks);

deleteAllButton.addEventListener("click", deleteAllTasks);

undoButton.addEventListener("click", unDoButton);

addEventListener("click", function (e) {
  // for Done Task
  if (e.target.classList.contains("displayed-tasks")) {
    e.target.classList.toggle("done-task");
    tasksStats();
  }
  // for Done Task
  if (e.target.classList.contains("delete")) {
    e.target.parentNode.classList.add('fall');
    e.target.addEventListener("transitionend", function () {
    removeTaskFromLocalStorage(e.target);
    e.target.parentNode.remove();
    if (document.querySelectorAll(".displayed-tasks .added-task").length == 0) {
      noTasksToShow();
    }
    tasksStats();
    });
    
  }
  taskInput.focus();
});

// Functions

// Background
function backgroungLoop() {
  let backgroundArray = [
    "todo01",
    "todo02",
    "todo03",
    "todo04",
    "todo05",
    "todo06",
    "todo07",
  ];

  
    let randomNumber = Math.floor(Math.random() * backgroundArray.length + 1);
    document.body.style.backgroundImage =
      "url(/imgs/todo0" + randomNumber + ".jpg)";
  
}

// Adding a new Task
function addTask(e) {
  e.preventDefault();
  if (taskInput.value === "") {
    swal("Task can't be Empty, Please add a Task!");
  } else {
    let noTaskToShow = document.querySelector(".noTask-Msg");
    if (noTaskToShow) {
      noTaskToShow.remove();
    }
      
  let newTaskContainer = document.createElement("div");
  newTaskContainer.classList =
    "displayed-tasks padding-10px flex-elements width-65 border-Rad";

  let newAddedTask = document.createElement("div");
  newAddedTask.classList = "added-task borderRad wow slideInLeft";

  let newTaskText = document.createTextNode(taskInput.value);

  let taskDeleteButton = document.createElement("i");
  taskDeleteButton.classList = "fas fa-trash delete wow slideInRight";

  newAddedTask.appendChild(newTaskText);
  newTaskContainer.appendChild(newAddedTask);
  newTaskContainer.appendChild(taskDeleteButton);
  container.appendChild(newTaskContainer);
  saveToLocalStorage(taskInput.value);
  taskInput.value = "";
  taskInput.focus();

}
}

function doneAllTasks() {
  let tasksArray = document.querySelectorAll(".displayed-tasks");

  if (tasksArray.length > 0) {
    for (let i = 0; i < tasksArray.length; i++) {
      tasksArray[i].classList.add("done-task");
    }
    tasksStats();
  } else {
    swal("There are no Tasks to be Done!");
  }
}

function deleteAllTasks() {
  let tasksArray = document.querySelectorAll(".displayed-tasks");

  if (tasksArray.length > 0) {
    
    for (let i = 0; i < tasksArray.length; i++) {
     
        tasksArray[i].remove();
      
      
    }
    tasksStats();
    removeAllTasksFromLocalStorage();
  } else {
    swal("There are no Tasks to be Deleted!");
  }

  if (!document.querySelector(".task-status .noTask-Msg")) {
    noTasksToShow();
  }
}

function unDoButton() {
  let tasksArray = document.querySelectorAll(".displayed-tasks");

  if (tasksArray.length > 0) {
    for (let i = 0; i < tasksArray.length; i++) {
      tasksArray[i].classList.remove("done-task");
    }
  }
}

function tasksStats(){
  if(document.querySelectorAll(".displayed-tasks .added-task").length){
    tasksCount.innerHTML = document.querySelectorAll(".displayed-tasks .added-task").length;
  }

  if(document.querySelectorAll(".done-task").length){
    doneTasks.innerHTML = document.querySelectorAll(".displayed-tasks .done-task").length;
  }
  
}

// Creating No Tasks to Show Message
function noTasksToShow() {
  if (!addedTask) {
    let noTasksMsgContainer = document.createElement("div");
    noTasksMsgContainer.classList =
      "noTask-Msg text-center btn-info borderRad padding-10px border-Rad";

    let noTasksMsgSpan = document.createElement("span");

    let noTasksMsgText = document.createTextNode("No Tasks To Show");

    noTasksMsgSpan.appendChild(noTasksMsgText);
    noTasksMsgContainer.appendChild(noTasksMsgSpan);
    taskStatus.appendChild(noTasksMsgContainer);
  }
}

// Local Storage

//checking for Local Storage

function saveToLocalStorage(todo){

let todos;
if(localStorage.getItem("todos") === null ){
  todos = [];
}else{
  todos = JSON.parse(localStorage.getItem("todos"));
}
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}


function getTasks(todo){

  let todos;
  if(localStorage.getItem("todos") === null ){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.forEach(function(todo){
    let noTaskToShow = document.querySelector(".noTask-Msg");
    if (noTaskToShow) {
      noTaskToShow.remove();
    }

    let newTaskContainer = document.createElement("div");
    newTaskContainer.classList =
      "displayed-tasks padding-10px flex-elements width-65 border-Rad";

    let newAddedTask = document.createElement("div");
    newAddedTask.classList = "added-task borderRad";

    let newTaskText = document.createTextNode(todo);

    let taskDeleteButton = document.createElement("i");
    taskDeleteButton.classList = "fas fa-trash delete";

    newAddedTask.appendChild(newTaskText);
    newTaskContainer.appendChild(newAddedTask);
    newTaskContainer.appendChild(taskDeleteButton);
    container.appendChild(newTaskContainer);

  });

  }

  function removeTaskFromLocalStorage(todo){

    let todos;
    if(localStorage.getItem("todos") === null ){
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    let taskIndex = todo.parentNode.children[0].innerText;
    todos.splice(todos.indexOf(taskIndex), 1);
    
    localStorage.setItem("todos", JSON.stringify(todos));

  }

  function removeAllTasksFromLocalStorage(todo){

    let todos;
    if(localStorage.getItem("todos") === null ){
      todos = [];
    }else{
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    localStorage.clear();
    

  }




