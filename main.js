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
    if (type === "delete"){
        const task = clickElement.closest("div")
        const id = task.id
        deleteTaskInLocalStorage(id)
    }
})





//  **** FUNCTIONS ****  //

// Agregar una tarea
function addTask(task, id){
    taskList.insertAdjacentHTML("afterbegin",
        "<div id='"+id+"' class='task'>"
            +"<p contenteditable = 'true'>"+task+"</p>"
            +"<section>"
                +"<button id='delete' class='btn'>Eliminar</button>"
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
