document.getElementById("AppMiddlePartAllTasksButton").addEventListener("click", function () {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const newTab = window.open("", "_blank");

  let html = `
    <html>
      <head>
        <title>All Tasks</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background-color: rgb(33, 167, 167);
    text-shadow: 1px 1px 5px;}
          .completed { text-decoration: line-through; color: black; }
        </style>
      </head>
      <body>
        <h1>All Tasks</h1>
        <ul>
          ${tasks.map(task => `
            <li class="${task.completed ? 'completed' : ''}">
              Title: ${task.title} -
              Description: ${task.description}
            </li>
          `).join("")}
        </ul>
      </body>
    </html>
  `;

  newTab.document.write(html);
  newTab.document.close();
});
