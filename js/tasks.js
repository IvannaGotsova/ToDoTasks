document.addEventListener("DOMContentLoaded", () => {
  fetch(`../db/tasks.json?ts=${Date.now()}`, { cache: "reload" })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("tasks-list");

      data.tasks.forEach((item, index) => {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `task-${index}`;

        const a = document.createElement("a");
        a.textContent = item.title;
        a.href = item.href || "#";
        a.target = "_blank";
        a.style.marginLeft = "8px";

        const doneButton = document.createElement("button");
        doneButton.type = "button";
        doneButton.id = `done-${index}`;
        doneButton.textContent = "Done";
        doneButton.classList.add("btn-done");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.id = `edit-${index}`;
        editButton.textContent = "Edit";
        editButton.classList.add("btn-edit");

        taskContainer.appendChild(checkbox);
        taskContainer.appendChild(a);
        taskContainer.appendChild(doneButton);
        taskContainer.appendChild(editButton);

        list.appendChild(taskContainer);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
