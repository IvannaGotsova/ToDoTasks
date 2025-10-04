
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

