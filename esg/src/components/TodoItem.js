import  Axios from 'axios'
import React, { useState } from 'react'
import deleteImage from '../images/delete-item-button.png' 

const serverPort = 3010;

function TodoItem({todoName,dateExpired, dateCreated, complete, editList, username}) {

    const [tempChecked , setChecked] = useState(complete)
    
    //checks atodo in the db and in todolList / stores the date it was checked too
    const checkIt = () => {

        dateCreated = dateCreated.slice(0,10)
        const day = parseInt(dateCreated.slice(-1))
        dateCreated = dateCreated.slice(0,-1) + (day+1)

        var check = 0
        if (!tempChecked){
            check = 1
        }
        Axios.post("http://localhost:"+serverPort+'/api/study/checkTodo', 
        {
        check: check, 
        username: username, 
        todoName:todoName,
        dateCreated : dateCreated,
        dateCompleted: new Date().toISOString().slice(0,10)
        })
        setChecked((prevC) => !prevC)

    }
    //deletes an item from todolist and the db
    const deleteItem = () => {

        dateCreated = dateCreated.slice(0,10)
        const day = parseInt(dateCreated.slice(-1))
        dateCreated = dateCreated.slice(0,-1) + (day+1)


        Axios.post("http://localhost:"+serverPort+'/api/study/deleteTodo', 
        {username: username, todoName:todoName, dateCreated:dateCreated})
        editList(prevList => {return(
            prevList.filter(item => {
                return (item.todoName !== todoName) 
            })
        )})
}

  return (
    <div  data-testid="todotest" className='todo-item'>
        <li>
            <div>{todoName}</div>
            <div>{dateExpired}</div>
            
        </li>
        <input data-testid="todoinput" type={'checkbox'} checked={tempChecked} onClick={() => checkIt()}></input>
        <button //deletes the item from the todoList  
        data-testid="todobutton"                  
            className='budget-item-delete'
            onClick={() => deleteItem()}>
        <img src= {deleteImage}/>
        </button>   
    </div>
  )
}

export default TodoItem