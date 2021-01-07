//TÜM ELEMENTLERİ SEÇME
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody=document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();

function eventListeners(){ //TÜM EVENT LİSTENERLAR
form.addEventListener("submit",addTodo);
document.addEventListener("DOMContentLoaded",LoadAllTodosToUI);
secondCardBody.addEventListener("click",deleteTodo);
filter.addEventListener("keyup",filterTodos);
clearButton.addEventListener("click",clearAllTodos);
}

function clearAllTodos(e){
 //arayüzden temizleme
  if(confirm("Tümünü Silmek İstediğinizden Emin misiniz?")){
      todoList.innerHTML="";
    //   while(todoList.firstChild !=null){
    //       todoList.removeChild(todoList.firstElementChild);
    //   }
  }
  localStorage.removeItem("todos");
 
}

function filterTodos(e){
    const filterValue=e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
      const text = listItem.textContent.toLowerCase();
      if(text.indexOf(filterValue)===-1){
          //BULAMADI
          listItem.setAttribute("style","display: none!important");
      }else{
          listItem.setAttribute("style", "display: block");
      }
    })
}
function deleteTodo(e){
if(e.target.className==="fa fa-remove"){
   e.target.parentElement.parentElement.remove();
   deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
   showAlert("success","Todo Başarı ile Silindi");
}
}

function deleteTodoFromStorage(deletetodo){
let todos=getTodosFromStorage();
todos.forEach(function(todo,index){
    if(todo===deletetodo){
todos.splice(index,1); // Arrayden değer silme
    }
})
localStorage.setItem("todos",JSON.stringify(todos));
}

function LoadAllTodosToUI(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
addTodoToUI(todo);
    })

}

function addTodo(e){
    const newTodo = todoInput.value.trim();
if(newTodo==""){

    showAlert("danger","Lütfen bir TODO girin..");
}else{
    addTodoToUI(newTodo);
    addTodoToStorage(newTodo);
    showAlert("success","Todo başarıyla eklendi.")
}




    e.preventDefault();
}


function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos")==null){
        todos=[];
    }else{
        todos=JSON.parse(localStorage.getItem("todos"));
     }
     return todos;
}
          function addTodoToStorage(newTodo){
               
           let todos = getTodosFromStorage();
            todos.push(newTodo);
            localStorage.setItem("todos",JSON.stringify(todos));
}
            


function showAlert(type,message)
{
    const alert = document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
   firstCardBody.appendChild(alert);
   //SET TIMEOUT

    setTimeout(function(){
      alert.remove();
    },2000)

}

function addTodoToUI(newTodo){

    // <li class="list-group-item d-flex justify-content-between">
    //                         Todo 1
    //                         <a href = "#" class ="delete-item">
    //                             <i class = "fa fa-remove"></i>
    //                         </a>

    //                     </li>

    //LİST İTEM OLUŞTURMA
    const listItem=document.createElement("li");
    //LİNK OLUŞTURMA
    console.log(listItem);
    const link= document.createElement("a");
    link.href="#";
    link.className="delete-item"
    link.innerHTML="<i class = 'fa fa-remove'></i>";
    listItem.className="list-group-item d-flex justify-content-between";

    // TEXT NODE EKLEME
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //TODO Liste List ITEMI Ekleme

    todoList.appendChild(listItem);
    todoInput.value="";

}













// console.log(form);