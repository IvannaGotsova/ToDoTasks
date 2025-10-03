const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const taskList = document.getElementById("taskList");

taskList.innerHTML = tasks.map(task => `
  <li>
    ${task.title} 
    <button onclick="openTask('${task.id}')">View</button>
  </li>
`).join("");


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
