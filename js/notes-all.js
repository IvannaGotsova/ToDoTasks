document.getElementById("AppBottomPartButtonAllNotes").addEventListener("click", function () {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  const newTab = window.open("", "_blank");

  let html = `
    <html>
      <head>
        <title>All Notes</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background-color: rgb(33, 167, 167);
    text-shadow: 1px 1px 5px;}
          .completed { text-decoration: line-through; color: black; }
        </style>
      </head>
      <body>
        <h1>All Notes</h1>
        <ul>
          ${notes.map(note => `
            <li class="${note.completed ? 'completed' : ''}">
              Title: ${note.title} -
              Description: ${note.description}
            </li>
          `).join("")}
        </ul>
      </body>
    </html>
  `;

  newTab.document.write(html);
  newTab.document.close();
});
