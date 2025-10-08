document.addEventListener("DOMContentLoaded", () => {
  fetch(`../db/notes.json?ts=${Date.now()}`, { cache: "reload" })
    .then((response) => response.json())
    .then((data) => {
      const list = document.getElementById("notes-list");

      data.notes.forEach((item, index) => {
        const noteContainer = document.createElement("div");
        noteContainer.classList.add("note-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `note-${index}`;

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

        noteContainer.appendChild(checkbox);
        noteContainer.appendChild(a);
        noteContainer.appendChild(doneButton);
        noteContainer.appendChild(editButton);

        list.appendChild(noteContainer);
      });
    })
    .catch((error) => console.error("Error loading JSON:", error));
});
