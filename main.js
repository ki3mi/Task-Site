const taskForm = document.getElementById("taskForm")
const taskList = document.getElementById("taskList")
mapTasksInLocalStorage()



// evento para Agregar tareas
taskForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const taskInput = document.getElementById("input")
    const text = taskInput.value
    if (taskInput.value.trim() === ""){
        alert("Es necesario agregar un texto")
    }else{
        // REVISAR SI ES MEJOR CON ESTE MÉTODO O LLAMANDO A LA FUNCIÓN DE MOSTRAR LAS TAREAS
        const tasks = getTaskInLocalStorage()
        addTask(text, tasks.length)
        storeTaskInLocalStorage(text)
    }
    taskInput.value = ""
})


// ELMINAR / EDITAR TAREAS
taskList.addEventListener("click", (event) =>{
    const clickElement = event.target 
    const type = event.target.id
    const task = clickElement.closest("div") // <div>
    const content = task.firstElementChild // <p>
    const text = content.textContent // <p> text </p>
    const btns = clickElement.closest("section")
    if (type === "delete"){
        const id = task.id
        deleteTaskInLocalStorage(id)
    }if(type === "edit"){
        const btnDelete = btns.children[0]
        btnDelete.id = "cancel"
        btnDelete.textContent = "Cancelar"
        clickElement.id = "save"
        clickElement.textContent ="Guardar"
        content.contentEditable = "true"
        content.focus()
    }if(type === "save"){
        const id = task.id
        editTaskInLocalStorage(text, id)
    }if(type === "cancel"){
        const btnSave = btns.children[1]
        const btnCancel = btns.children[0]
        btnSave.id = "edit"
        btnCancel.id = "delete"
        btnSave.textContent = "Editar"
        btnCancel.textContent = "Eliminar"
        content.contentEditable = "false"
        mapTasksInLocalStorage()
    }
})

//  **** CRUD ****  //

// Agregar una tarea
function addTask(task, id){
    taskList.insertAdjacentHTML("afterbegin",
        "<div id='"+id+"' class='task'>"
            +"<p contenteditable = 'false'>"+task+"</p>"
            +"<section>"
                +"<button id='delete' class='btn'>Eliminar</button>"
                +"<button id='edit' class='btn'>Editar</button>"
            +"</section>"                    
        +"</div>")
}

// Obtener las tareas del localStorage
function getTaskInLocalStorage(){
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
    return tasks
}

// Mostrar las tareas guardadas en el local storage
function mapTasksInLocalStorage(){
    taskList.innerHTML = ""
    const tasks = getTaskInLocalStorage()
    for (task in tasks){
        addTask(tasks[task], task)
    }
}

// Agregar las tareas al localStorage
function storeTaskInLocalStorage(task){
    const tasks = getTaskInLocalStorage()
    tasks.push(task)
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// Eliminar tarea del localStorage
function deleteTaskInLocalStorage(id){
    const tasks = getTaskInLocalStorage()
    tasks.splice(id, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    mapTasksInLocalStorage()
}

// Edit task
function editTaskInLocalStorage(task, id){
    const tasks = getTaskInLocalStorage()
    console.log(tasks)
    tasks[id] = task
    localStorage.setItem("tasks", JSON.stringify(tasks))
    mapTasksInLocalStorage()
}
