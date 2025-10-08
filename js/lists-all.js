document
  .getElementById("AppBottomPartButtonAllLists")
  .addEventListener("click", function () {
    const lists = JSON.parse(localStorage.getItem("lists")) || [];

    const newTab = window.open("", "_blank");

    let html = `
    <html>
      <head>
        <title>All Lists</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background-color: rgb(33, 167, 167);
    text-shadow: 1px 1px 5px;}
          .completed { text-decoration: line-through; color: black; }
        </style>
      </head>
      <body>
        <h1>All Lists</h1>
        <ul>
          ${lists
            .map(
              (list) => `
            <li class="${list.completed ? "completed" : ""}">
              Title: ${list.title} -
              <strong>Description:</strong>
               ${list.description}
            </li>
          `
            )
            .join("")}
        </ul>
      </body>
    </html>
  `;

    newTab.document.write(html);
    newTab.document.close();
  });
