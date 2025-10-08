document.addEventListener("DOMContentLoaded", loadNotes);

document
  .getElementById("AppBottomPartButtonNote")
  .addEventListener("click", function () {
    const noteInput = document.getElementById("AppBottomPartInputNote");
    const noteTitle = noteInput.value.trim();

    if (noteTitle === "") return;

    const newNote = {
      id: Date.now().toString(),
      title: noteTitle,
      description: "",
    };

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(newNote);
    localStorage.setItem("notes", JSON.stringify(notes));
    addNoteToList(newNote);
    noteInput.value = "";
  });

function loadNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  document.getElementById("noteList").innerHTML = "";
  notes.forEach(addNoteToList);
}

function addNoteToList(note) {
  const li = document.createElement("li");
  li.classList.add("note-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = note.id;
  checkbox.id = note.id;

  const link = document.createElement("a");
  link.href = "#";
  link.textContent = note.title;
  if (note.done) link.classList.add("done");
  link.addEventListener("click", () => openNote(note.id));

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.classList.add("note-item");

  doneBtn.addEventListener("click", () => {
    if (isDone) {
      undoneNote(note);
      enableLink(link, note.id);
      localStorage.setItem(`note-${note.id}-done`, "false");
      doneBtn.textContent = "Done";
      checkbox.checked = false;
    } else {
      const newTitle = prompt("Done note:", note?.title);
      if (newTitle) {
        note.title = newTitle;
        doneNote(note);
        link.textContent = newTitle;
        localStorage.setItem(`note-${note.id}-done`, "true");
        disableLink(link, note.id);
        doneBtn.textContent = "Undone";
        checkbox.checked = false;
      }
    }
    isDone = !isDone;
  });

  let isDone = localStorage.getItem(`note-${note.id}-done`) === "true";
  if (isDone) {
    disableLink(link, note.id);
    doneBtn.textContent = "Undone";
  }

  function disableLink(link, noteId) {
    link.style.pointerEvents = "none";
    link.style.color = "gray";
    link.style.cursor = "default";
    link.removeAttribute("href");
  }

  function enableLink(link, noteId) {
    link.style.pointerEvents = "auto";
    link.style.color = "";
    link.style.cursor = "pointer";
    link.setAttribute("href", `/note/${noteId}`);
  }
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("note-item");

  editBtn.addEventListener("click", function () {
    const newTitle = prompt("Edit note title:", note.title);
    const newDescription = prompt("Add note description:", note.description);
    if (newTitle) {
      note.title = newTitle;
      note.description = newDescription;
      editNote(note);
      link.textContent = newTitle;
    }
  });

  li.appendChild(checkbox);
  li.appendChild(link);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);

  document.getElementById("noteList").appendChild(li);
}

function editNote(updatedNote) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.map((note) => {
    if (note.id === updatedNote.id) {
      return {
        ...note,
        title: updatedNote.title,
        description: updatedNote.description,
      };
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}

function doneNote(note) {
  note.completed = true;
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.map((t) => (t.id === note.id ? { ...t, completed: true } : t));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem(`note-${note.id}-done`, "true");
}

function undoneNote(note) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.map((n) => (n.id === note.id ? { ...n, completed: false } : n));
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem(`note-${note.id}-done`, "false");
}

document
  .getElementById("AppBottomPartAllButtonNote")
  .addEventListener("click", () => {
    localStorage.removeItem("notes");
    loadNotes();
  });

document
  .getElementById("AppBottomPartSelectedButtonNote")
  .addEventListener("click", () => {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    const checked = Array.from(
      document.querySelectorAll("#noteList input[type=checkbox]:checked")
    ).map((cb) => cb.value);
    notes = notes.filter((note) => !checked.includes(note.id));
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  });

const notes = JSON.parse(localStorage.getItem("notes")) || [];
const noteList = document.getElementById("noteList");

function openNote(noteId) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const note = notes.find((t) => t.id === noteId);

  if (!note) {
    alert("Note not found!");
    return;
  }

  const newTab = window.open("", "_blank");

  let html = `
    <html>
      <head>
        <title>Note Details</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; background-color: rgb(33, 167, 167);
    text-shadow: 1px 1px 5px;}
          .completed { text-decoration: line-through; color: black; }
        </style>
      </head>
      <body>
        <h1>Note Details</h1>
        <p><strong>ID:</strong> ${note.id}</p>
        <p><strong>Title:</strong> <span class="${
          note.completed ? "completed" : ""
        }">
          ${note.title}
          <p><strong>Description:</strong> <span class="${
            note.completed ? "completed" : ""
          }">
          ${note.description}
        </span></p>
        <p><strong>Status:</strong> ${
          note.completed ? "Completed" : "Pending"
        }</p>
      </body>
    </html>
  `;

  newTab.document.write(html);
  newTab.document.close();
}
