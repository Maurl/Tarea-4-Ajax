function storeTask() {
  console.log('Stores the tasks');
  // Javascript
  let taskDescription = document.getElementById('task_description').value;
  console.log('taskDescription', taskDescription);

  let payload = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description: taskDescription })
  };
  fetch('/tasks', payload)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw "Error en la llamada Ajax";
      }
    })
    .then(task => {
      document.getElementById('task_description').value = '';
      addTask(task);
    })
    .catch(error => {
      console.log('Error: ', error);
    })
}

function addTask(task) {
  let html =
  `
  <div id="{{id}}" class="card my-3">
    <div class="card-body">
      <p class="card-text">${task.description}</p>
      <form action="/tasks/${task.id}/done" method="POST">
        <input type="button" onclick="completeTask()" class="card-link" value="Done">
      </form>
    </div>
  </div>
  `;
  let node = document.createRange().createContextualFragment(html);
  document.getElementById('task_list').prepend(node);
}

function completeTask(id){
  var elem = document.getElementById(id);
  elem.style.backgroundColor = 'SpringGreen';
}

function deleteTask(id){
  let currentTask = document.getElementById(id);
  currentTask.remove();
}
