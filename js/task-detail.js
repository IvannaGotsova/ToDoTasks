// Get query param from URL
const params = new URLSearchParams(window.location.search);
const taskId = params.get("id");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const task = tasks.find(t => t.id === taskId);

if (task) {
  document.getElementById("taskTitle").textContent = task.title;
  document.getElementById("taskDescription").textContent = task.description || "No description available.";
} else {
  document.body.innerHTML = "<p>Task not found.</p>";
}
