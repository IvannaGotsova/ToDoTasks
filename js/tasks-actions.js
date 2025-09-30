
  document.addEventListener("DOMContentLoaded", loadTasks);
  
  document.getElementById("AppTopPartButton").addEventListener("click", function() {
    const taskInput = document.getElementById("AppTopPartInput");
    const taskTitle = taskInput.value.trim();
    if (taskTitle === "") return;
    const newTask = {
      id: Date.now().toString(),
      title: taskTitle, 
      description: "",
    };

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    addTaskToList(newTask);
    taskInput.value = "";
  });

  function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    document.getElementById("taskList").innerHTML = "";
    tasks.forEach(addTaskToList);
  }

  function addTaskToList(task) {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
 

    const link = document.createElement("a");
    link.href = "#"; 
    link.textContent = task.title;
    if (task.done) link.classList.add("done");
    link.addEventListener("click", () => openTask(task.id));





    const doneBtn = document.createElement("button");
    doneBtn.textContent = "Done";
    doneBtn.classList.add("task-item");
    
    doneBtn.addEventListener("click", () => {
    const newTitle = prompt("Done task:", task?.title);
    if (newTitle) {
      task.title = newTitle;
      doneTask(task);
      link.textContent = newTitle;
      disableLink(link, task.id);
      const isDone = localStorage.getItem(`task-${task.id}-done`) === "true";
      if (isDone) {
        disableLink(link, task.id);
      }

  function disableLink(link, taskId) {
    link.style.pointerEvents = "none";
    link.style.color = "gray";
    link.style.cursor = "default";
    link.removeAttribute("href");
    checkbox.checked = !checkbox.checked;
         }
    }});

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("task-item");
    editBtn.addEventListener("click", function() {
    const newTitle = prompt("Edit task title:", task.title);
    const newDescription = prompt("Edit task description:", task.description);
    if (newTitle) {
      task.title = newTitle;
      task.description = newDescription;
      editTask(task);
      link.textContent = newTitle;
    }
    });

    li.appendChild(checkbox);
    li.appendChild(link);
    li.appendChild(doneBtn);
    li.appendChild(editBtn);

    document.getElementById("taskList").appendChild(li);

  }

  function editTask(updatedTask) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
      if (task.id === updatedTask.id) {
        return {
          ...task, 
          title: updatedTask.title,
          description: updatedTask.description
        };
      }
      return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
function doneTask(task) {
    task.completed = true;
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(t => t.id === task.id ? { ...t, completed: true } : t);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem(`task-${task.id}-done`, "true");
  }




















const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

function openTask(taskId) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    alert("Task not found!");
    return;
  }

  const newTab = window.open("", "_blank");

  let html = `
    <html>
      <head>
        <title>Task Details</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .completed { text-decoration: line-through; color: gray; }
        </style>
      </head>
      <body>
        <h1>Task Details</h1>
        <p><strong>ID:</strong> ${task.id}</p>
        <p><strong>Title:</strong> <span class="${task.completed ? 'completed' : ''}">
          ${task.title}
        </span></p>
        <p><strong>Status:</strong> ${task.completed ? "Completed" : "Pending"}</p>
      </body>
    </html>
  `;

  newTab.document.write(html);
  newTab.document.close();
}




