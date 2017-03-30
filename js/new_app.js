// Model or storage for the App. "single source of truth"
var items = [];

// Create direct references to the items in the DOM Tree.
var itemList = document.getElementById('todo-list');
var itemInput = document.getElementById('todo-input');

function addTodo() {
  //Set the text from the input value field.
  var todoText = itemInput.value;
  //Add to the storage array.
  items.push(todoText);
  //Clear the input box to the user.
  itemInput.value = '';
  //Render the TodoList.
  renderTodoList();

}

function removeTodo(index) {
  // Remove the todo from storage
  items.splice(index, 1);
  renderTodoList();
}

//Renders ToDo-List
function renderTodoList() {
  
  //Clear the list
  itemList.innerHTML = ''
  
  // Loop through the storage arary and add elements to the page.
  for (var i = 0; i < items.length; i++) {
    
    var newTodo = document.createElement('li');
    newTodo.id = 'item-'+ (i).toString();
    newTodo.innerText = items[i];

    appendOptionButtons(i, newTodo)
    itemList.appendChild(newTodo)

  }
  

  console.log('Storage array: ', items)

}

function appendOptionButtons(index, item) {
  
  //Functionality to delete the todo.
  var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'x';
    deleteButton.onclick = function() {
        removeTodo(index);
  }

  //Functionality to edit the todo.
  var editButton = document.createElement('button');

    editButton.id = 'edit-item-' + index; 
    editButton.innerHTML = 'edit';
    editButton.onclick = function() {
        addEditField('item-' + (index).toString());
  }
  
  //Append option buttons to the todo
  item.appendChild(deleteButton);
  item.appendChild(editButton)

}

function addEditField(id) {

  var itemToEdit = document.getElementById(id);
  
  //Disable the edit button so that you cant keep pressing it.
  document.getElementById('edit-' + id).disabled = true;

  // Create a new input where we can update the todo
  var editInput = document.createElement('input');
  editInput.type = "text";
  editInput.id = 'edit-input-' + id;
  editInput.className = 'edit-input';
  editInput.placeholder = "Edit the todo";

  // Create a new button to submit changes
  var editButton = document.createElement('button');
  editButton.innerHTML = "Update todo";
  editButton.onclick = function() {
    updateTodo(id);
  }

  // Add the input and button to the DOM
  itemToEdit.appendChild(editInput);
  itemToEdit.appendChild(editButton);
}

function updateTodo(id) {

  var index = id.split('-')[1]

  var editInput = document.getElementById('edit-input-' + id);
  
  items[index] = editInput.value

  renderTodoList();

}