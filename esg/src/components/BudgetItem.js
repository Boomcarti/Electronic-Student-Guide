import React, { useState } from 'react'
import deleteImage from '../images/delete-item-button.png' 
import lockImage from '../images/lock.png'
import unlockImage from '../images/unlock.png'
import Axios  from 'axios'

//the main class/function for controlling a budget item inside of the budget item list
export default function BudgetItem({budgetName, amount, bloat, actual,
     list, unlocked, total, edit, editList, update, username}) {

    if (unlocked == 1){
        unlocked = true
    }else{
        unlocked = false
    }
    const serverPort = 3010;
        
    //the tempory name that is displayed while editing the name of the budget item
    const [newName, setNewName] = useState(budgetName)

    var checkImg = ''
    //image used
    if (unlocked){
        checkImg = unlockImage
    }else{
        checkImg = lockImage
    }
    
    const[lockedImg, setLocked] = useState(checkImg)
    
    //the tempory budget amount displayed while editing the budget amount of the item
    const [tempBloat, setTempBloat] = useState(parseInt(bloat)) 
    

    //boolean that switches the budget item group between view mode and edit mode
    const [tempActual, setTempActual] = useState(actual)

    //deletes a budget item
    const deleteItem = () => {

        Axios.post("http://localhost:"+serverPort+"/api/budget/deleteBudget", 
        {
            username: username,
            budgetName: budgetName
        }) 
        editList(prevList => {return(
            prevList.filter(item => {
                return (item.budgetName !== budgetName) 
            })
        )})
    }
    
    //called when the checkbox is used to change the texbox and update the amount to the unlocked value
    const checkedBox = () => {
             
                    
        updateList(true,null,!unlocked,true)

    }   
    const changeEdit = (value) =>{
        
        edit = value
        
        const newItem = {budgetName:newName , amount: amount, 
            bloat: tempBloat, actual: actual, unlocked: unlocked, edit: edit,
             editList: editList, update:update}
        
        editList(prevList => {
            return (

                prevList.map(item => {
                    if (item.budgetName === budgetName) {
                        return newItem
                    }else{
                        return item
                    }
                }
                )
            )
        }
        )
        
    }
    //updating the state value budgetList of the Finance class
    const updateList = (pressed, event=null,unlocked2=unlocked,checkPress=false) => {         
        
        if (event === "Enter"){
            edit = false
            pressed = true
        }

        if (!(pressed)){
            return
        }
        
      
        var checkDupeName = false
        //checking if a duplicate name exist only if the name was changed
        if (newName !== budgetName){
            checkDupeName = list.some(element => {return element.budgetName === newName}) 
        }
        var newActual = actual
        var newAmount = amount
        if (!checkDupeName){              
            
            if (event === "Enter"){
                
                if (unlocked2){
                    
                    if (!tempBloat === bloat){
                    unlocked2 =  false
                    }
                    
                    newAmount = tempBloat
                }else{
                    newAmount = tempBloat
                }               
                newActual = tempActual
                if (newActual > newAmount){
                    amount = newActual
                    newAmount = newActual
                }
                
            }
           
            if (checkPress){
                newAmount = tempBloat
                total = total + tempBloat
                edit = false
            }
            
            if (!unlocked2){
                total = total + amount
                if (newAmount > total){
                    alert("Item total exceeds your budget. Please lower/unlock another item.")
                    return
                }
            }else{
                
                
                if (tempBloat > total){
                    alert("Item total exceeds your budget. Please lower/unlock another item.")
                    return
                }
                
            }
            
            
            
            //creating the new item
            const newItem = {budgetName:newName , amount: newAmount, 
                bloat: tempBloat, actual: newActual, unlocked: unlocked2, edit: edit,
                 editList: editList, update:update}
            
            editList(prevList => {
                return (

                    prevList.map(item => {
                        if (item.budgetName === budgetName) {
                            return newItem
                        }else{
                            return item
                        }
                    }
                    )
                )
            }
            )

        }else{
           alert("Budget item with the same name already exists. Please change the name.")
        }   
    }    
    return (
        edit ? // displaying the editable budgetItem
                <div  className='budget-item-group'>

                    <input  //changing the name of the budget list item                    
                    autoFocus
                    className='budget-name-input'
                    type ='text' value={newName} onChange={(event) => setNewName(event.target.value)}
                    onKeyDown={event => updateList(false,event.key)}>
                    </input>                     
                    <p>R</p>
                    <input //changing the amount of the budget list item
                    className='budget-price-input'
                    type='number' value={Math.round(tempBloat*100)/100} 
                        onChange={(event) => setTempBloat(parseInt(event.target.value))} 
                        onKeyDown={event => updateList(false,event.key)}>                        
                    </input>
                    <p>R</p>
                    <input //changing the amount of the budget list item
                    className='budget-actual-input'
                    type='number' value={Math.round(tempActual*100)/100} 
                        onChange={(event) => setTempActual(event.target.value)} 
                        onKeyDown={event => updateList(false,event.key)}>                        
                    </input>
                    
                    
                    <button //allows to unlock and lock the value causing it to dynamicly update if unlocked
                    type="button" onClick={() => checkedBox()} 
                    className='budget-item-lock'>
                         <img src={lockedImg}/>                   
                    </button>
                   
                    <button //deletes the item from the budgetList                    
                    className='budget-item-delete'
                     onClick={() => deleteItem()}>
                    <img src= {deleteImage}/>
                    </button>                    
                </div> 
                : // display the budgetItem
                <div data-testid="existbudgetitem" className='existing-budget-item'>  
                                            
                    <div data-testid="existbudgetitemname" className='budget-item-name'
                        onClick={() => edit = changeEdit(true)}
                    >{budgetName}
                    </div>
                    
                    <div data-testid="testprice" className='budget-item-price'
                        onClick={() => changeEdit(true)}
                    >R{Math.round(bloat)}</div> 

                    <div  className='budget-item-actual'
                        onClick={() => changeEdit(true)}
                        >R{Math.round(actual)}</div>
                    
                    <button 
                    className='budget-item-lock'>
                        <img src={lockedImg}/>
                    </button>
                        
                                         
                </div>
            
        )
}
