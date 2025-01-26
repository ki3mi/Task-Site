const taskForm = document.getElementById("taskForm")
const taskList = document.getElementById("taskList")

taskForm.addEventListener("submit", (event)=>{
    event.preventDefault()
    const taskInput = document.getElementById("input")    
    taskList.insertAdjacentHTML("afterbegin",
        "<div class='task'>"
            +"<p contenteditable = 'true'>"+taskInput.value+"</p>"
            +"<section>"
                +"<button id='delete' class='btn'>Eliminar</button>"
            +"</section>"                    
        +"</div>")
    taskInput.value = ""
})


// ELMINAR / EDITAR TAREAS
taskList.addEventListener("click", (event) =>{
    const clickElement = event.target
    const type = event.target.id
    if (type === "delete"){
        const task = clickElement.closest("div")
        task.remove()
    }
})