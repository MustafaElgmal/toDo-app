const getSaveTodos=()=>{
    const todosJson=localStorage.getItem('todos')
    try{
        return todosJson ? JSON.parse(todosJson):[]

    }catch(e){
        return []

    }

   
}

const saveTodos=(todos)=>{
    localStorage.setItem('todos',JSON.stringify(todos))
}
const removeTodo=(id)=>{
    const todoIndex=todos.findIndex((todo)=>todo.id===id)
    if(todoIndex>-1){
        todos.splice(todoIndex,1)
    }

}

const toggelCompleted=(id)=>{
    const todo=todos.find((todo)=>todo.id===id)
    if(todo){
        todo.completed=!todo.completed
    }
  

}

const generateTodoDom=(todo)=>{
    const containerEl=document.createElement('div')
    const todoEl=document.createElement('label')
    const checkBox=document.createElement('input')
    const todoText=document.createElement('span')
    const removeButton=document.createElement('button')

    checkBox.setAttribute('type','checkbox')
    checkBox.checked=todo.completed
    containerEl.appendChild(checkBox)
    checkBox.addEventListener('change',(e)=>{
        toggelCompleted(todo.id)
        saveTodos(todos) 
        renderTodos(todos,filters)
        
    })

    todoText.textContent=todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    

    removeButton.textContent='remove'
    removeButton.classList.add('button','button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',(e)=>{
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
        
    })


    return todoEl

}

const generateSummaryDom=(incompleted)=>{
    const summary=document.createElement('h2')

    if(incompleted.length<=1){
        summary.textContent=`You have ${incompleted.length} todo left`

    }else if(incompleted.length>1){
        summary.textContent=`You have ${incompleted.length} todos left`
       
    }
    summary.classList.add('list-title')
    
    return summary
}


const renderTodos=(todos,filters)=>{
    const todoEl= document.querySelector('#todos')
    const filterTodos=todos.filter((todo)=>{
        if(filters.hidecompleted){
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())&&!todo.completed
        }else{
            return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
        }
    })

   
     todoEl.innerHTML=''
     if(filterTodos.length>0){
        const incompleted=filterTodos.filter((todo)=>!todo.completed)
        document.querySelector('#todos').appendChild(generateSummaryDom(incompleted))
        
        filterTodos.forEach((todo)=>{

            todoEl.appendChild(generateTodoDom(todo))
        
        })

     }else{
         const El=document.createElement('p')
         El.textContent='No todo to show'
         El.classList.add('empty-message')
         todoEl.appendChild(El)

     }

    
    
   

}

