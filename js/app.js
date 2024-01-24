const taskLists = document.querySelectorAll('.task-list')
const backlogTasks = document.querySelector('#backlog .task-list')
const titleInput = document.querySelector('#title')
const descriptionInput = document.querySelector('#description')
const submitButton = document.querySelector('#submit-button')
const errorContainer = document.querySelector('.error-container')

let tasks = [
  {
    id: 0,
    title: 'Find and contact caterers',
    description:
      'The list of caterers has to be looked at, need to decide on 3 to choose from.',
  },
  {
    id: 1,
    title: "Call Marge and arrange a meeting ",
    description:
      'Call Marge and decide when to visit the castle.',
  },
  {
    id: 2,
    title: 'Photographer/Videographer',
    description:
      'Need to find a photographer and videographer for the wedding.',
  },
]

taskLists.forEach((taskList) => {
  taskList.addEventListener('dragover', dragOver)
  taskList.addEventListener('drop', dragDrop)
})

// create tasks

function createTask(taskId, title, description)
{
  
  // building the task card
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

  //adding the task card content
  taskTitle.textContent = title
  taskDescription.textContent = description
  deleteIcon.textContent = '❌'

  //adding the task card attributes
  taskCard.setAttribute('draggable', true)
  taskCard.setAttribute('task-id', taskId)

  taskCard.addEventListener('dragstart', dragStart)
  deleteIcon.addEventListener('click', deleteTask)

  //appending the task card to the DOM
  taskHeader.append(taskTitle, deleteIcon)
  taskDescriptionContainer.append(taskDescription)
  taskCard.append(taskHeader, taskDescriptionContainer)
  backlogTasks.append(taskCard)
}

//add color to task card based on column
function addColor(column) {
  let color
  switch (column) {
    case 'backlog':
      color = 'rgb(255, 119, 51)'
      break
    case 'doing':
      color = 'rgb(255, 221, 51)'
      break
    case 'done':
      color = 'rgb(44, 103, 5)'
      break
    case 'discard':
      color = 'rgb(255, 51, 85)'
      break
    default:
      color = 'rgb(232, 232, 232)'
  }
  return color
}

function addTasks() {
  tasks.forEach((task) => createTask(task.id, task.title, task.description))
}

addTasks()

//drag and drop
let elementBeingDragged

function dragStart() {
  elementBeingDragged = this
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop() {
  const columnId = this.parentNode.id
  elementBeingDragged.firstChild.style.backgroundColor = addColor(columnId)
  this.append(elementBeingDragged)
}

// error handling
function showError(message) {
  const errorMessage = document.createElement('p')
  errorMessage.textContent = message
  errorMessage.classList.add('error-message')
  errorContainer.append(errorMessage)

  setTimeout(() => {
    errorContainer.textContent = ''
  }, 2000)
}

// add task
function addTask(e) {
  e.preventDefault()
  const filteredTitles = tasks.filter((task) => {
    return task.title === titleInput.value
  })

  if (!filteredTitles.length) {
    const newId = tasks.length
    tasks.push({
      id: newId,
      title: titleInput.value,
      description: descriptionInput.value,
    })
    createTask(newId, titleInput.value, descriptionInput.value)
    titleInput.value = ''
    descriptionInput.value = ''
  } else {
    showError('Title must be unique!')
  }
}
submitButton.addEventListener('click', addTask)

function deleteTask() {
  const headerTitle = this.parentNode.firstChild.textContent

  const filteredTasks = tasks.filter((task) => {
    return task.title === headerTitle
  })

  tasks = tasks.filter((task) => {
    return task !== filteredTasks[0]
  })
  
  this.parentNode.parentNode.remove()
}