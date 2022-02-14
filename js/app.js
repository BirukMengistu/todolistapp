const form = document.querySelector('#todoForm');
const addBtn= document.querySelector('#btn-add');
const input = document.querySelector('#todoInput');
const output = document.querySelector('#output');
const inputFeedback = document.querySelector('#input-feedback');
const filterBtn = document.querySelector('#btn-filter');
const taskStatus = document.querySelector('#taskStatus')
let arr_todos = [];

const validateInput =()=> {
  if(input.value.trim() !== '') {
    createTodo(input.value);
    // input.value = '';
    inputFeedback.style.color ='green'
    inputFeedback.innerText = 'well done!'
    form.reset();
    input.focus();
  }
  else
  {
      inputFeedback.style.color ='red'
      inputFeedback.innerText = 'please add valid todo!'
         
  }
}

function deleteTodo(todo) {
    console.log('delete-fun')
    console.log(todo.completed)
    if(todo.completed)
     arr_todos = arr_todos.filter(_todo => _todo.id !== todo.id)
    listTodos();
  }
  
  
function filterTodo(status) {
  
  if(status!==null)
   arr_todos = arr_todos.filter(_todo => _todo.completed === status)
  listTodos();
}
  const createTodo = title => {
    fetch('http://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    })
    .then(res => res.json())
    .then(data => {
      data.id = Date.now()
      console.log(data);
      arr_todos.unshift(data);
      listTodos();
    })
  
  
  }
const newTodo = (todo) => {

    let card = document.createElement('div');
    card.classList.add('card', 'p-1', 'm-2');
  
    let innerCard = document.createElement('div');
    innerCard.classList.add('d-flex', 'justify-content-between', 'align-items-center');
  
    let title = document.createElement('h3');
    title.classList.add('mb-1' ,'title-font');
  
    title.innerText = todo.title;
    if(todo.completed)
      title.classList.add('complete');
  
    
    
    let buttons = document.createElement('div');
   
    let completeBtn = document.createElement('button');
    completeBtn.classList.add('btn', 'btn-info', 'btn-sm', 'm-2');
    completeBtn.innerHTML = '<i class="fa  fa-check fa-2x"></i>'
    
    completeBtn.addEventListener('click', () =>{
      console.log('complete')
      todo.completed = !todo.completed
      if(todo.completed)
        title.classList.add('complete');
      else
        title.classList.remove('complete');

  } );
  
    let deleteBtn = document.createElement('button');
    deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm');
    
    deleteBtn.innerHTML = '<i class="fa  fa-trash fa-2x"></i>'
    deleteBtn.addEventListener('click', () =>{
        console.log('delete')
        deleteTodo(todo)
    } );
    buttons.appendChild(completeBtn);
    buttons.appendChild(deleteBtn);
    innerCard.appendChild(title);
    innerCard.appendChild(buttons);
    card.appendChild(innerCard);
    output.appendChild(card);
  
  }
function listTodos(){
    output.innerHTML = '';
  
    arr_todos.forEach(todo => {
        newTodo(todo);
    })}
  
const fetchTodos = () => {
  fetch('http://jsonplaceholder.typicode.com/todos?_start=1&_limit=6')
  .then(res => res.json())
  .then(data => {
    arr_todos = data;
    listTodos();
  })
}
fetchTodos()
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateInput()
   
  })
  
  filterBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    let statusValue = null
    if(taskStatus.value==='complete')
    statusValue = true 
    else if(taskStatus.value==='uncomplete')
    statusValue = false
    else
    fetchTodos()
    
    filterTodo(statusValue)
       
  })
  
  