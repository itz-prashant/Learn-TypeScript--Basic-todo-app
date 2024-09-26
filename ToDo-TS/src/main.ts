import './style.css'

interface Todo{
  title: string;
  isCompleted:boolean;
  readonly id:string
}

const todos:Todo[] = []

const todosContainer = document.querySelector(".todo-container") as HTMLDivElement;

const todoInput = document.getElementsByName('title')[0] as HTMLInputElement;

const myForm = document.getElementById('myForm') as HTMLFormElement;

myForm.onsubmit = (e: SubmitEvent)=>{
  e.preventDefault();

  const todo:Todo={
    title: todoInput.value,
    isCompleted: false,
    id: String(Math.random()*1000)
  }

  todos.push(todo)
  todoInput.value = ''
  
  renderTodo(todos)
  
}

const generateToDoItem = (title:string, isCompleted:boolean, id:string)=>{

  const todo:HTMLDivElement = document.createElement("div")
  todo.className = 'todo';

  const checkBox:HTMLInputElement = document.createElement('input');
  checkBox.setAttribute("type", "checkbox")
  checkBox.className="isCompleted";
  checkBox.checked= isCompleted
  checkBox.onchange=()=>{
    todos.find((item)=>{
      if(item.id === id) item.isCompleted = checkBox.checked
    })
    paragraph.className = checkBox.checked? "textCut" : ""
  }

  const paragraph:HTMLParagraphElement = document.createElement('p');
  paragraph.innerText = title
  paragraph.className = isCompleted ? "textCut" : ""

  
  const button:HTMLButtonElement = document.createElement('button')
  button.innerText = 'X';

  button.className = 'deleteBtn';
  button.onclick = ()=>{
    deleteTodo(id)
  }

  todo.append(checkBox, paragraph, button)

  todosContainer.append(todo)
}

const renderTodo = (todos:Array<Todo>)=>{
  todosContainer.innerText = '';
    todos.forEach(item=> {
      generateToDoItem(item.title, item.isCompleted, item.id)
    })
}

const deleteTodo=(id:string)=>{
  const idx = todos.findIndex(item=> item.id === id)
  todos.splice(idx, 1)
  renderTodo(todos)
}