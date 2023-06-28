function highlightElements(element) {
  element.parentNode.classList.add("highlight");
  element.classList.add("input-highlight");
}

function unhighlightElements(element) {
  element.parentNode.classList.remove("highlight");
  element.classList.remove("input-highlight");
}

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const jsonData = {};
  for (const [key, value] of formData.entries()) {
    jsonData[key] = value;
  }
  fetch("http://localhost:5000/add-task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => {
      response.json();
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  form.reset();
});

var deletingTask = [];
function selectTasks(e, id) {
  if (e.checked && !deletingTask.includes(id)) {
    deletingTask.push(id);
  }
  if (!e.checked && deletingTask.includes(id)) {
    let index = deletingTask.indexOf(id);
    deletingTask.splice(index, 1);
  }
}

function deleteTasks() {
  const filteredTasks = { _id: { $in: deletingTask } };
  if (deletingTask.length > 0) {
    fetch("http://localhost:5000/delete-task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filteredTasks),
    })
      .then((response) => {
        response.json();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
}
