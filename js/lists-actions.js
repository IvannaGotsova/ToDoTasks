
  document.addEventListener("DOMContentLoaded", loadLists);
  
  document.getElementById("AppBottomPartButtonList").addEventListener("click", function() {

  const listInput = document.getElementById("AppBottomPartInputList");
  const listTitle = listInput.value.trim();
  
  if (listTitle === "") return;
  
  const newList = {
    id: Date.now().toString(),
    title: listTitle, 
    description: "",
  };

  let lists = JSON.parse(localStorage.getItem("lists")) || [];
  lists.push(newList);
  localStorage.setItem("lists", JSON.stringify(lists));
  addListToList(newList);
  listInput.value = "";
});

function loadLists() {

  let lists = JSON.parse(localStorage.getItem("lists")) || [];
  document.getElementById("listList").innerHTML = "";
  lists.forEach(addListToList);
}

function addListToList(list) {
  const li = document.createElement("li");
  li.classList.add("list-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = list.id;

  const link = document.createElement("a");
  link.href = "#"; 
  link.textContent = list.title;
  if (list.done) link.classList.add("done");
  link.addEventListener("click", () => openList(list.id));

  const doneBtn = document.createElement("button");
  doneBtn.textContent = "Done";
  doneBtn.classList.add("list-item");

  doneBtn.addEventListener("click", () => {
  const newTitle = prompt("Done list:", list?.title);
  if (newTitle) {
    list.title = newTitle;
    doneList(list);
    link.textContent = newTitle;
    localStorage.setItem(`list-${list.id}-done`, "true");
    disableLink(link, list.id);
    checkbox.checked = !checkbox.checked;
  }
});
    
  const isDone = localStorage.getItem(`list-${list.id}-done`) === "true";
    if (isDone) {
      disableLink(link, list.id);
    }
  
  function disableLink(link, listId) {
    link.style.pointerEvents = "none";
    link.style.color = "gray";
    link.style.cursor = "default";
    link.removeAttribute("href");
  }

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.classList.add("list-item");

  editBtn.addEventListener("click", function() {
  const newTitle = prompt("Edit list title:", list.title);
  const newDescription = prompt("Edit list description:", list.description);
  if (newTitle) {
    list.title = newTitle;
    list.description = newDescription;
    editList(list);
    link.textContent = newTitle;
  }
});

  li.appendChild(checkbox);
  li.appendChild(link);
  li.appendChild(doneBtn);
  li.appendChild(editBtn);

  document.getElementById("listList").appendChild(li);
}

function editList(updatedList) {
  let lists = JSON.parse(localStorage.getItem("lists")) || [];
  lists = lists.map(list => {
    if (list.id === updatedList.id) {
      return {
        ...list, 
        title: updatedList.title,
        description: updatedList.description
      };
    }
    return list;
  });
  localStorage.setItem("lists", JSON.stringify(lists));
}
  
function doneList(list) {
  list.completed = true;
  let lists = JSON.parse(localStorage.getItem("lists")) || [];
  lists = lists.map(t => t.id === list.id ? { ...t, completed: true } : t);
  localStorage.setItem("lists", JSON.stringify(lists));
  localStorage.setItem(`list-${list.id}-done`, "true");
}

