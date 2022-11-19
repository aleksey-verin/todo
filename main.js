// import { showArrayInConsole } from "./module_showArrayInConsole.js"

let listOfTasks = [
  { name: 'Сделать кофе', status: 'Todo', priority: 'high', numberId: '1668761297128' },
  { name: 'Помыть посуду', status: 'Todo', priority: 'low', numberId: '1668761297129' }, 
  { name: 'Сварить суп', status: 'Done', priority: 'high', numberId: '1668761297130' },
  { name: 'Сделать задание', status: 'Done', priority: 'low', numberId: '1668761297131' }, 
]

const STATUS = {
  TO_DO: "Todo",
  DONE: "Done",
}

const PRIORITY = {
  LOW: "low",
  HIGH: "high",
}

render('high')
render('low')

document.querySelectorAll(".new-item").forEach((item) => item.firstElementChild.addEventListener("submit", function (event) {
    
  let targetInput = event.target.firstElementChild
  let priorityForRender = event.target.dataset.priority
  if (targetInput.value !== '') {
    event.preventDefault();
    addChangesInArray(priorityForRender)
    render(priorityForRender)
    targetInput.value = ''
  } else {
    event.preventDefault();
  }
}));

document.querySelectorAll(".new-item_add").forEach((item) => item.addEventListener("click", function (event) {

  let targetInput = event.target.previousElementSibling.firstElementChild
  let priorityForRender = event.target.previousElementSibling.dataset.priority

  if (targetInput.value !== '') {
  addChangesInArray(priorityForRender)
  render(priorityForRender)
  targetInput.value = ''
  targetInput.focus()
  }
}));

function addChangesInArray(priorityForRender) {
  
  let targetInput = document.querySelector(`#input_${priorityForRender}`)

  listOfTasks = listOfTasks.concat({
    name: targetInput.value, 
    status: STATUS.TO_DO, 
    priority: targetInput.dataset.priority, 
    numberId: String(Date.now())
  })

  return listOfTasks
  
}

function removeItemsFromListWithPriorityWeNeed(priorityForRender) {
  if (priorityForRender === 'high') {
    document.querySelector('.list-high').textContent = ''
  } else if (priorityForRender === 'low') {
    document.querySelector('.list-low').textContent = ''
  }
}

function changeStatusInArray(listWithPriorityWeNeed, newItemInput, priorityForRender) {
  
  if (newItemInput.checked) {
    listWithPriorityWeNeed = listWithPriorityWeNeed.map((item) => {
      if (item.numberId === newItemInput.id) {
        item.status = STATUS.DONE
      }
      return item
    })
  }
  
  if (!newItemInput.checked) {
    listWithPriorityWeNeed = listWithPriorityWeNeed.map((item) => {
      if (item.numberId === newItemInput.id) {
        item.status = STATUS.TO_DO
      }
      return item
    })
  }

  render(priorityForRender)
}


function render(priorityForRender) {
  
  removeItemsFromListWithPriorityWeNeed(priorityForRender)

  let listWithPriorityWeNeed = listOfTasks.filter(item => item.priority === priorityForRender)
  
  listWithPriorityWeNeed.forEach((item) => {
    
    const newItemDiv = document.createElement("div");
    newItemDiv.className = "item";
    
    const newItemInput = document.createElement("input");
    newItemInput.className = "item-check";
    newItemInput.type = "checkbox";
    if (item.status === STATUS.DONE) {
      newItemInput.checked = true;
      newItemDiv.style.background = '#e0dada'
    }
    
    newItemInput.addEventListener("click", function () {
      changeStatusInArray(listWithPriorityWeNeed, newItemInput, priorityForRender) 
    });
      
    newItemInput.id = item.numberId;
    
    const newItemLabel = document.createElement("label");
    newItemLabel.className = "item-text";
    newItemLabel.setAttribute("for", newItemInput.id);
    newItemLabel.textContent = item.name;
    
    const newItemCloseBtn = document.createElement("div");
    newItemCloseBtn.className = "item-close";
    newItemCloseBtn.addEventListener("click", deleteTask);
    
    function deleteTask() {
      listOfTasks = listOfTasks.filter((item) => item.numberId !== this.previousElementSibling.previousElementSibling.id)
      render(priorityForRender)
    }
    
    newItemDiv.prepend(newItemCloseBtn);
    newItemDiv.prepend(newItemLabel);
    newItemDiv.prepend(newItemInput);
    
    if (newItemInput.checked === true) {
      document.querySelector(`.list-${priorityForRender}`).append(newItemDiv)
    } else {
      document.querySelector(`.list-${priorityForRender}`).prepend(newItemDiv)
    }
  })
  console.log(listOfTasks)
  showArrayInConsole()
}
  
function showArrayInConsole() {
  let checkList = []
  
  console.group(`${PRIORITY.HIGH}:`)
  checkList = listOfTasks.filter((item) => item.priority == PRIORITY.HIGH).reverse()
  if (checkList.length !== 0) {
      checkList.forEach((item) => console.log(`${item.name} (${item.status})`))
  } else {
      console.log('---')
  }
  console.groupEnd()

  console.group(`${PRIORITY.LOW}:`)
  checkList = listOfTasks.filter((item) => item.priority == PRIORITY.LOW).reverse()
  if (checkList.length !== 0) {
      checkList.forEach((item) => console.log(`${item.name} (${item.status})`))
  } else {
      console.log('---')
  }
  console.groupEnd()
}