
  document.addEventListener("DOMContentLoaded", loadNotes);
  
  document.getElementById("AppBottomPartButtonNote").addEventListener("click", function() {

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
  const newTitle = prompt("Done note:", note?.title);
  if (newTitle) {
    note.title = newTitle;
    doneNote(note);
    link.textContent = newTitle;
    localStorage.setItem(`note-${note.id}-done`, "true");
    disableLink(link, note.id);
    checkbox.checked = !checkbox.checked;
  }
});
    
  const isDone = localStorage.getItem(`note-${note.id}-done`) === "true";
    if (isDone) {
      disableLink(link, note.id);
    }
  
  function disableLink(link, noteId) {
    link.style.pointerEvents = "none";
    link.style.color = "gray";
    link.style.cursor = "default";
    link.removeAttribute("href");
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("note-item");

  editBtn.addEventListener("click", function() {
  const newTitle = prompt("Edit note title:", note.title);
  const newDescription = prompt("Edit note description:", note.description);
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
  notes = notes.map(note => {
    if (note.id === updatedNote.id) {
      return {
        ...note, 
        title: updatedNote.title,
        description: updatedNote.description
      };
    }
    return note;
  });
  localStorage.setItem("notes", JSON.stringify(notes));
}
  
function doneNote(note) {
  note.completed = true;
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes = notes.map(t => t.id === note.id ? { ...t, completed: true } : t);
  localStorage.setItem("notes", JSON.stringify(notes));
  localStorage.setItem(`note-${note.id}-done`, "true");
}

document.getElementById("AppBottomPartSelectedButtonNote").addEventListener("click", () => {
  localStorage.removeItem("notes");
  loadNotes();
});

