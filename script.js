/* Get elements from the DOM */
const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const updateTask = document.getElementById('updateTask');
const addTaskForm = document.getElementById('addForm');
const modal = document.getElementById('modal');
const modalEdit = document.getElementById('modalEdit');
const confirmBtn = document.getElementById('confirmBtn');
const updateBtn = document.getElementById('updateBtn');
const cancelBtn = document.getElementById('cancelBtn');
const canceUpdatelBtn = document.getElementById('canceUpdatelBtn');

/* Initialize the task list array */
let tasks = [];

/* Load saved tasks from local storage */
if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	renderTasks();
}

/* Add event listener for adding new tasks */
addTaskForm.addEventListener('submit', addTask);

// for date
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // month is zero-indexed, so add 1
const day = currentDate.getDate();
const thedate = `${day}/${month}/${year}`
/* Function to add a new task to the list */
function addTask(event) {
	event.preventDefault();
	const newTaskText = newTaskInput.value.trim();
	if (!newTaskText) return;
	const newTask = {
		id: Date.now(),
		text: newTaskText,
        date:thedate
	};
	tasks.push(newTask);
	saveTasks();
	renderTasks();
	newTaskInput.value = '';
}

/* Function to save tasks to local storage */
function saveTasks() {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

/* Function to render the task list */
function renderTasks() {
	taskList.innerHTML = '';
	tasks.forEach(task => {
		const li = document.createElement('li');
		li.innerHTML = `
			<div class="taskfild">
            <span class="task-text">${task.text}</span>
            <span class="task-text date">${task.date}</span>
            </div>
			<div class="task-buttons">
				<button class="edit" onclick="showUpdateModal(${task.id})"><i class="fa fa-pencil"></i></button>
				<button class="delete" onclick="showModal(${task.id})"><i class="fa fa-trash"></i></button>
			</div>
		`;
		taskList.appendChild(li);
	});
}


/* Function to show the confirm delete modal */
function showModal(id) {
	const task = tasks.find(task => task.id === id);
 
	if (!task) return;
	modal.style.display = 'flex';
	confirmBtn.onclick = () => deleteTask(task);
	cancelBtn.onclick = () => hideModal();
}
/* Function to show the confirm delete modal */
function showUpdateModal(id) {
    const task = tasks.find(task => task.id === id);
    modalEdit.style.display = 'flex';
    updateTask.value=task.text
    updateBtn.onclick = () => {
        console.log(updateTask.value);
        if (!updateTask.value) return;
        task.text = updateTask.value;
        updateTask.value=""
        saveTasks();
        renderTasks();
        hideUpdateModal();
    };
    canceUpdatelBtn.onclick = () => hideUpdateModal();

}

/* Function to delete a task */
function deleteTask(task) {

	tasks = tasks.filter(t => t.id !== task.id);
	saveTasks();
	renderTasks();
	hideModal();
}

/* Function to hide the confirm delete modal */
function hideModal() {
	modal.style.display = 'none';
}
/* Function to hide the update modal */
function hideUpdateModal() {
	modalEdit.style.display = 'none';
}
