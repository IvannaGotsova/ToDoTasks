
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
  checkbox.id = list.id;

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

document.getElementById("AppBottomPartSelectedButtonList").addEventListener("click", () => {
  localStorage.removeItem("lists");
  loadLists();
});

document.getElementById("AppBottomPartAllButtonList").addEventListener("click", () => {
  let lists = JSON.parse(localStorage.getItem("lists")) || [];
  const checked = Array.from(document.querySelectorAll("#listList input[type=checkbox]:checked"))
                       .map(cb => cb.value);
  lists = lists.filter(list => !checked.includes(list.id));
  localStorage.setItem("lists", JSON.stringify(lists));
  loadLists();
});

const lists = JSON.parse(localStorage.getItem("lists")) || [];
const listList = document.getElementById("listList");

function openList(listId) {
  const lists = JSON.parse(localStorage.getItem("lists")) || [];
  const list = lists.find(t => t.id === listId);

  if (!list) {
    alert("list not found!");
    return;
  }

  const newTab = window.open("", "_blank");

let html = `
  <html>
    <head>
      <title>List Details</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: rgb(33, 167, 167);
          text-shadow: 1px 1px 5px;
        }
        .completed {
          text-decoration: line-through;
          color: black;
        }
        .description-line {
          margin: 5px 0;
        }
        button {
          margin-left: 10px;
        }
      </style>
      <script>
        function lineDone(id) {
          const line = document.getElementById(id);
          line.classList.toggle('completed');
        }
      </script>
    </head>
    <body>
      <h1>List Details</h1>
      <p><strong>ID:</strong> ${list.id}</p>
      <p><strong>Title:</strong> <span class="${list.completed ? 'completed' : ''}">${list.title}</span></p>
      <p><strong>Description:</strong></p>
      <div id="description-container">
        ${
          list.description && list.description.trim() !== ''
            ? list.description.split(',').map((item, index) => {
                const lineId = `desc-${index}`;
                return `
                  <div>
                    <span id="${lineId}" class="description-line">${item.trim()}</span>
                    <button onclick="lineDone('${lineId}')">Ready</button>
                  </div>
                `;
              }).join('')
            : `<p>This list is empty!</p>`
        }
      </div>
      <p><strong>Status:</strong> ${list.completed ? "Completed" : "Pending"}</p>
    </body>
  </html>
`;


  newTab.document.write(html);
  newTab.document.close();
}




