document.addEventListener("DOMContentLoaded", () => {
  fetch(`../db/lists.json?ts=${Date.now()}`, { cache: "reload" })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("lists-list");

      data.lists.forEach((item, index) => {
        const listContainer = document.createElement("div");
        listContainer.classList.add("list-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `list-${index}`;

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

        listContainer.appendChild(checkbox);
        listContainer.appendChild(a);
        listContainer.appendChild(doneButton);
        listContainer.appendChild(editButton);

        list.appendChild(listContainer);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
