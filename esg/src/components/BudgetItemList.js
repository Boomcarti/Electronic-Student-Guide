import ParseList from './ParseList'

export default function BudgetItemList({list, total, username}) {
  
  //calculating the amount available to grow or shrink the unlocked budgetItmes
  var itemTotal = list.map(item => {
    
    if (item.unlocked){
      return (parseInt(item.amount))
    }else{
      total = total - item.amount
      return 0
    }
  
  })
  itemTotal = itemTotal.reduce(( prevAmount, a) => prevAmount + a, 0)



  return (

    list.map(item => ParseList(item, total, itemTotal, list, username ))

  )
}
