
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

