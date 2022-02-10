
const todos=getSaveTodos()

const filters={
    searchText:'',
    hidecompleted:false
}

renderTodos(todos,filters)

document.querySelector('#search-text').addEventListener('input',(e)=>{
    filters.searchText=e.target.value
    renderTodos(todos,filters)

})

document.querySelector('#todo-form').addEventListener('submit',(e)=>{
    e.preventDefault()
    const todo=e.target.elements.todotext.value.trim()
    if(todo.length>0){
        todos.push({
            id:uuidv4(),
            text:todo,
            completed:false
        })
        saveTodos(todos)
        renderTodos(todos,filters)
    }
   
   
   
   
    
    e.target.elements.todotext.value=''

})

document.querySelector('#hide-compelted').addEventListener('change',(e)=>{

    filters.hidecompleted=e.target.checked
    renderTodos(todos,filters)

})