import React, { useEffect, useRef, useState } from 'react'
import TodoList from './TodoList'
import Axios from 'axios'

const serverPort = 3010;

function StudyFeature({username}) {

    const [todoList, setList] = useState([])
    const [newList, updateList] = useState(todoList) //newly added items that are not in the db
    const [addingTodo, setAdding] = useState(false)

    const nameRef = useRef()
    const dateRef = useRef()
    const listRef = useRef()

    //loads data from db
    const loadTodos = (username) => {

        Axios.post("http://localhost:"+serverPort+'/api/study/getTodo', {username: username}).then(
            (response) =>{
                var list = response.data.result
                
                list = list.filter((item) =>{
                    return(!item.complete)
                })
                
                setList(list)

            }
        )

    }

    //exports data to db
    const exportData = (username) => {
        Axios.post("http://localhost:"+serverPort+'/api/study/updateTodo', {username: username, todoList: listRef.current})
    }
        
        

    //on listupdate
    useEffect(() =>{

        listRef.current = newList

    },[newList])


    //on component mount
    useEffect(() => {            
        loadTodos(username)    
    },[])

    //on component dismount
    useEffect( () => () =>  {       
        exportData(username)
    }
    , [] )
    

    //adds a todo item
    function addTodo(){        
        if (addingTodo){
            const newName = nameRef.current.value
            const nameList = todoList.map(prevItem =>{
                return prevItem.todoName
            })
            if (nameList.find( item => item === newName)){
                alert("Please enter a non duplicate name.")
                return
            }
            if (!(newName)){
                alert("Please enter a name.")
                return
            }
            if (!(dateRef.current.value)){
                alert("Please enter a valid date")
                return
            }
            updateList(prevList => {
                return(
                    [{todoName:nameRef.current.value, dateExpired:dateRef.current.value,
                        dateCreated: new Date().toISOString().slice(0,10), complete:false,}
                        ,...prevList]
                )
            })
            setList(prevList => {
                return(
                    [{todoName:nameRef.current.value, dateExpired:dateRef.current.value,
                         complete:false, dateCreated: new Date().toISOString().slice(0,10)}
                        ,...prevList]
                )
            })
        }
        setAdding(prevAdding => !prevAdding)
    }
  return (
    <div data-testid ="studyftest" className='study-feature'>
        <h1>Todo List </h1>
        <TodoList list={todoList} editList={setList} username={username}></TodoList>
        <div data-testid ="studytodo" className='add-todo-item'>
        {addingTodo &&
            <div>
                <input placeHolder={'Name'} className='add-todo' type={'text'} ref={nameRef}></input>
                <input className ='add-todo' type={"date"} ref={dateRef}></input>
            </div>
        }
        <button className='add-todo-btn'onClick={() => addTodo()}>Add Todo</button>   
        </div>
        
       
    </div>
  )
}
export default StudyFeature