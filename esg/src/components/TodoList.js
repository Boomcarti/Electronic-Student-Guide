import React from 'react'
import TodoItem from './TodoItem'
import { v4 as uuidv4 } from 'uuid'

function TodoList({list, editList, username}) {
  //Creates an array of todo items and renders them.
  return (
      
      list.map(prevItem => {
        var {todoName, dateCreated, dateExpired, complete} = prevItem
        dateExpired = dateExpired.slice(0,10) 
        return(
        <TodoItem key={uuidv4()} todoName={todoName} dateExpired={dateExpired} dateCreated={dateCreated}
        complete={complete} editList={editList} username={username}/>)
      })  
   
  )
}

export default TodoList