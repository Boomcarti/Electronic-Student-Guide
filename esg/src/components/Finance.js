import React, { useEffect, useRef, useState } from 'react'
import BudgetItemList from './BudgetItemList'
import addImage from '../images/add-budget-item.png' 
import Axios from 'axios'

const serverPort = 3010;


export default function Finance(props) {
    
    const [budgetList , setList] = useState([]) 
    const [totalBudget, setBudget] = useState(0) // the total of available spendable budget
    const [isAddingItem, isAddingI] = useState(false)    
    const [isEditBudget, isEditB] = useState(false) // 
    const [tempBudget, setTempBudget] = useState(totalBudget)
    const [budgetAnalytics, setBudgetAnalytics] = useState([])   
   
    
    
    const analyticsRef = useRef()
    const listRef = useRef()
    const nameRef = useRef()
    const amountRef = useRef()
    const totalRef = useRef()
    const budgetRef = useRef()

    //loads each budget item
    const loadItems = (username1) => {
         
        Axios.post("http://localhost:"+serverPort+"/api/budget/getBudget", {
            username : username1 }).then((response) => { 
                if (response){
                    
                    const list = response.data.result.map(prevItem => {
                        return{...prevItem, edit:false, editList:setList, update: {new: false, oldName: prevItem.budgetName}        
                    }})                
                    setList(list) 
                }          
        });
    }
    /*
    loads the analytics
    - date (day it updated)
    - amount (amount they spent on the day)
    - budget (the budget amount on that day)

   
    */
    const loadAnalytics = (username) => {
       
        Axios.post("http://localhost:"+serverPort+"/api/budget/getBudgetsAnalytics", {
            username : username }).then((response) => {  
                
            if (response){
              
                const analytics = response.data.result  
                analytics.forEach((item) => {
                
                    var date = item.budgetDate.toString().slice(0,10)
                    
                    const day = parseInt(date.slice(-2))
                
                    date = date.slice(0,-2) + (day+1)
                   
                    
                    item.budgetDate = new Date(date)
                })                 
                setBudgetAnalytics(analytics)
            
                if (totalBudget === 0){
                    
                    setBudget(analytics[analytics.length-1].budget)
                    setTempBudget(analytics[analytics.length-1].budget)
                } 
            }         
        });
    }

    
    //runs only on component mount
    useEffect(() => {
        
            loadItems(props.username)
            loadAnalytics(props.username)
        
    },[])

    
    useEffect(()=>{
        listRef.current = budgetList
    },[budgetList])

    useEffect(()=>{
        analyticsRef.current = budgetAnalytics
    },[budgetAnalytics])

    useEffect(() => {
        budgetRef.current = totalBudget
    }, [totalBudget])
   

    useEffect( () => () =>  {

       if (!(listRef.current.length === 0) || !(analyticsRef.current.length === 0)){
        exportData(props.username)
    }
    }
    , [] )
      

    
    //exports data to db
    function exportData(username){
       
       

        var thisDate = new Date()
        thisDate.setHours(0,0,0,0)        
        
        const analytics = analyticsRef.current

        const latestItem = analytics[analytics.length-1]
       
        const latestDate = latestItem.budgetDate
        latestDate.setHours(0,0,0,0)
        const latestTotal = latestItem.amount
        const thisTotal = getTotalActual(listRef.current)
        const latestBudget = latestItem.budget
        const thisBudget = budgetRef.current
       

        var date = thisDate.toISOString().slice(0,10)
        const day = parseInt(date.slice(-1))
        date = date.slice(0,-1) + (day+1)
       
      
        
        if (thisDate.toISOString() === latestDate.toISOString()){
            if (!(latestTotal === thisTotal) || !(latestBudget === thisBudget)){

                
                Axios.post("http://localhost:"+serverPort+"/api/budget/updateBudgetsAnalytics", 
                {
                    username: username,
                    newEntry : false,
                    analytic : {date: date, amount: thisTotal, budget: thisBudget}
                })

            }
        }else{

           
            Axios.post("http://localhost:"+serverPort+"/api/budget/updateBudgetsAnalytics", 
            {
                username: username,
                newEntry : true,
                analytic : {date: date, amount: thisTotal, budget: thisBudget}
            }) 

        }   
        
        Axios.post("http://localhost:"+serverPort+"/api/budget/updateBudget", 
        {
            username: username,
            budgetItems : listRef.current
        })
    }

    //changes display and total budget at the top of the feature
    function changeBudget(event=null){

        if (isEditBudget){
            
            if (!(event.key === "Enter")){
                return
            }
            if (totalRef.current.value){
            const amount = Math.round(totalRef.current.value)
            setBudget(amount)}
        }
        isEditB(!isEditBudget)     
        
    }

    //calculates the total value of all the actual money spent
    function getTotalActual(list){
        const actualList = list.map(prevItem => {
            return Math.round(prevItem.actual)
        })
        const totalActual = actualList.reduce(( prevAmount, a) => prevAmount + a, 0)
        return totalActual
    }
    
    //checks if totalAmount is bigger than the total budget
    function checkMax(item){
        const numList = budgetList.map(bItem => {
           
            if (bItem.unlocked){
                return (0)
            }else{
                return parseInt(bItem.amount)
            }
        })
        
        const totalAmount = numList.reduce(( prevAmount, a) => prevAmount + a, 0)
        
        if (totalAmount + parseInt(item) > totalBudget){
            return true
        } else{
            return false
        }
    }

    //adding a budget item to state budgetList
    function addingItem(){   
        
         
        if (isAddingItem){
            const itemName = nameRef.current.value
            const nameList = budgetList.map(item => item.budgetName)
            if (nameList.find(item => item === itemName)){
                alert("Budget item with the same name already exists. Please change the name.")
                return
            }    
            const amount = parseInt(amountRef.current.value)
            if (checkMax(amount)){
                alert("Item total exceeds your budget. Please lower/unlock another item..")
                return
            }
            
            const item = {budgetName:itemName , amount: amount, bloat: amount, actual: 0, unlocked:false , edit: false,
                editList:setList, update: {new: true, oldName: itemName} }
            setList((prevList) => [...prevList, item ])
           
        }
       isAddingI(!isAddingItem)               
    }
    return (
        <div className='budget-form'>
            <div className='budget-head'>
                <div className='budget-headers'>
                    {isEditBudget?                
                        <h1 className='budget-header'> Total Budget: R 
                            <input autoFocus className='budget-header-input' ref={totalRef} type='number' 
                                value={tempBudget}
                                onChange={(event) => setTempBudget(Math.round(event.target.value))} 
                                onKeyDown={event => changeBudget(event)}
                            >
                            </input> 
                        </h1>                
                    :                
                        <h1 className='budget-header'
                            onClick={() => changeBudget()}> 
                            Total Budget: R{totalBudget}
                        </h1>                    
                    }
                <h1 className='budget-header'>Total Spent: R{getTotalActual(budgetList)}</h1>            
    
                </div>
                <div className="budget-headings">
                    <h1>Expense</h1>
                    <h1>Budget</h1>
                    <h1>Actual</h1>
                </div>
            </div>
            
            {/* passing an array of budgetItems to the BudgetItemList class to be given unique keys*/}         
            <BudgetItemList list={budgetList} total={totalBudget} username={props.username}/>

            {isAddingItem ?
                <div className='budget-item-group'>
                    <input autoFocus
                    className='budget-name-input' type='text' placeholder='Name' ref={nameRef} ></input> {' '}
                    <input className='budget-price-input' type='number' placeholder='R' ref={amountRef}></input>{' '}
                    <button className='add-budget-item' onClick={() => addingItem()}><img src= {addImage}/></button>
                    
                </div>
                :
                <div className='budget-new-item-base'>
                    <button className= 'budget-new-item' onClick={() => addingItem()}>Add Item</button>
                </div>
                }
            
                
        </div>



    )
}
