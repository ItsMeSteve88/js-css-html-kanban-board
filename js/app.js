const taskLists = document.querySelectorAll('.task-list')
const backlogTasks = document.querySelector('#backlog .task-list')

let tasks = [
  {
    id: 0,
    title: "Fix submit button",
    description: "Submit button has not been working since the latest release!",
  },
  {
    id: 1,
    title: "Change the text on T and C's",
    description: "As per the last business meeting, the terms and conditions have changed, and the text should be updated to suit.",
  },
  {
    id: 2,
    title: "Change the banner picture",
    description: "Marketing has requested a new banner to be added to the website",
  },
];

tasks.forEach(taskList =>
    {
    taskList.addEventListener('dragover', dragOver)
    taskList.addEventListener('drop', dragDrop)
    })

// create tasks

function createTask(taskId, title, description)
{
    //building the task card
    const taskCard = document.createElement('div')
    const taskHeader = document.createElement('div')
    const taskTitle = document.createElement('p')
    const taskDescriptionContainer = document.createElement('div')
    const taskDescription = document.createElement('p')
    const deleteIcon = document.createElement('p')
    
    //adding the task card classes
    taskCard.classList.add('task-container')
    taskHeader.classList.add('task-header')
    taskDescriptionContainer.classList.add('task-description-container')

    //adding the task card text
    taskTitle.textContent = title
    taskDescription.textContent = description
    deleteIcon.textContent = '❌'

    //adding the task card attributes
    taskCard.setAttribute('draggable', true)
    taskCard.setAttribute('task-id', taskId)

    taskCard.addEventListener('dragstart', dragStart)

    //appending the task card to the DOM
    taskHeader.append(taskTitle, deleteIcon)
    taskDescriptionContainer.append(taskDescription)
    taskCard.append(taskHeader, taskDescriptionContainer)
    backlogTasks.append(taskCard)
}

// adding tasks using the createTask function

function addTasks()
{
    tasks.forEach(task => createTask(task.id, task.title, task.description))
}

addTasks()

// drag and drop

let elementBeingDragged

function dragStart()
{
    elementBeingDragged = this
}

function dragOver(e)
{
    e.preventDefault()
}

function dragDrop()
{
    this.append(elementBeingDragged)
}