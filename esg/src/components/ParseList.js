import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import BudgetItem from './BudgetItem'

export default function ParseList(item, total, itemTotal, list, username) {
    
    var { budgetName, amount, bloat, actual, editList, unlocked, edit, update} = item
   //calculates the bloat value of an item
    if (unlocked){
        bloat = (amount / itemTotal) * parseInt(total)
    }else{
        bloat = amount
    }
    
    return <BudgetItem key={uuidv4()} budgetName={budgetName} amount={amount}
        bloat={bloat} actual ={actual} list={list} unlocked={unlocked}
        total={total} edit={edit} editList={editList} update={update} username={username}/>
  
}
