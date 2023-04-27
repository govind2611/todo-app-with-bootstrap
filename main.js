let form = document.getElementById("form");
let textInput = document.getElementById("textInput")
let dateInput = document.getElementById("dateInput")
let errorMsg = document.getElementById("msg")
let description = document.getElementById("textarea")
let add = document.getElementById("add")
let taskContainer = document.getElementById("tasks")

let tasks = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        // show error msg below
        errorMsg.innerText = "Task cannot be blank."
    } else {
        console.log("success");
        errorMsg.innerText = "";
        // save the data in localstorage
        saveData()
        // close the modal
        add.setAttribute("data-bs-dismiss", "modal")
        add.click();
        (() => {
        add.setAttribute("data-bs-dismiss", "")
        })

    }
}

let saveData = () => {
    let task = {
        title: textInput.value,
        date: dateInput.value,
        description: description.value
    };

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    showTasks()
    console.log(tasks);
}

let showTasks = () => {
    taskContainer.innerHTML = "";
    tasks.map((task, idx) => {
        return ( taskContainer.innerHTML += ` <div id=${idx}>
            <span class="fw-bold">${task.title}</span>
            <span class="small text-secondary">${task.date}</span>
            <p>${task.description}</p>

            <span class="options">
                <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="bi bi-pencil-square"></i>
                <i onclick="deleteTask(this)" class="bi bi-trash"></i>
            </span>

        </div>` )
    })

    resetForm()
   
}

let resetForm = () => { 
    textInput.value = "";
    dateInput.value = "";
    description.value = ""
}

let deleteTask = (e) => { 
    console.log(e.parentElement.parentElement.id);
    // removes the element from the UI
    e.parentElement.parentElement.remove()
    // remove it from the tasks array
    tasks.splice(e.parentElement.parentElement.id, 1)
    // update localstorage
    localStorage.setItem("tasks", JSON.stringify(tasks))
    console.log(tasks);

}

let editTask = (e) => {
    console.log(e.parentElement.parentElement);
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask.children);
    // setting the value
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    description.value = selectedTask.children[2].innerHTML;

    console.log(e);
    deleteTask(e)
}

(() => {
    // whenever page loads this function is called
    // fetching the data from localstorage
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    console.log(tasks);

    // show the tasks
    showTasks()
})();
