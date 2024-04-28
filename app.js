const form = document.querySelector("#todolist__form")
const tasks = document.querySelector("#todolist-tasks")
const input = document.querySelector("#input")
const emptyInpBtn = document.querySelector("#empty-task__btn")
const deletAllBtn = document.querySelector("#delete_all-btn")

form.addEventListener("submit", createTask)

const TASKLIST = [];

function createTask(e) {
    e.preventDefault();


    if (input.value.trim() !== "") {
        const taskData = {
            taskName: input.value,
            taskHours: new Date().getHours(),
            taskMinutes: new Date().getMinutes(),
            taskComplited: false
        };

        TASKLIST.unshift(taskData);
        emptyInputBtnFunction(input)
        RenderTaks()
        // console.log(TASKLIST)
    }
}

function RenderTaks() {
    tasks.innerHTML = ""
    TASKLIST.map((i, index) => {
        const div = document.createElement("div");
        div.className = "task";
        div.setAttribute("data-order-number", index)

        // <p class=${i.classList.add("cheacked")}>${i.taskName}</p>

        div.innerHTML = `
        <p style="${i.taskComplited ? 'text-decoration: line-through' : 'text-decoration: none'}">${i.taskName}</p>

        <div class="buttons-wrapper">
            <button class="todolist-btn complete"> <i class="fas fa-check-circle"></i> Complete</button>
            <button class="todolist-btn delete"> <i class="fas fa-trash"></i> Delete</button>
            <button class="todolist-btn time"> <i class="fas fa-clock"></i> ${addZero(i.taskHours)}:${addZero(i.taskMinutes)}</button>
            <button class="todolist-btn edit"> <i class="fas fa-edit"></i> Edit</button>
         </div>
        `
        tasks.appendChild(div)
    })
}

function emptyInputBtnFunction(inp) {
    inp.value = "";
}

emptyInpBtn.addEventListener("click", () => {
    emptyInputBtnFunction(input)
})

function addZero(time) {
    return String(time).padStart(2, "0");
}


tasks.addEventListener("click", (e) => { // console.log(e)

    let taskIndex = +e.target.parentElement.parentElement.dataset.orderNumber
    //data set is sioly for getting an atribute "order-number" wich you set earlyer
    // after writing dataset which you write insted of "data-" simply write the continuation of an attribute (order-number) but without "-" using camelCase 

    if (e.target.classList.contains("complete")) {
        console.log(TASKLIST[taskIndex]);
        TASKLIST[taskIndex].taskComplited = !TASKLIST[taskIndex].taskComplited
        RenderTaks()
        // if you just set true or false here , it wont change after so what you do is = ! which means "opposite" 
    }

    else if (e.target.classList.contains("delete")) {
        e.target.parentElement.parentElement.classList.add("deleted")
        setTimeout(() => {
            TASKLIST.splice(taskIndex, 1);
            RenderTaks()
        }, 500)
    }

    else if (e.target.classList.contains("edit")) {
        e.target.parentElement.previousElementSibling.style = "border : 3px solid blue; border-radius: 5px;"
        e.target.parentElement.previousElementSibling.setAttribute("contenteditable", true);
        e.target.innerHTML = '<i class="fas fa-check-double"> </i> Done';
        e.target.classList.add("done");
        e.target.classList.remove("edit");
    }

    else if (e.target.classList.contains("done")) {
        e.target.parentElement.previousElementSibling.removeAttribute("contenteditable");
        e.target.innerHTML = '<i class="fas fa-edit"> </i> Edit';
        e.target.classList.remove("done");
        e.target.classList.add("edit");
        if (e.target.parentElement.previousElementSibling.textContent != TASKLIST[taskIndex].taskName) {
            TASKLIST[taskIndex].taskName = e.target.parentElement.previousElementSibling.textContent
        }
        // else {

        // }
        RenderTaks()
    }

    else {
        console.log("nothing")
    }
})

deletAllBtn.addEventListener("click", () => {
    while (TASKLIST[0]) {
        TASKLIST.splice(0, 1);
    }
    RenderTaks()
})