import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import well0 from '../images/well0.png'
import well1 from '../images/well1.png'
import well2 from '../images/well2.png'
import well3 from '../images/well3.png'
import well4 from '../images/well4.png'

export default function MoodList({list}) {
    const imgList = [well0,well1,well2,well3,well4]


    //formats date to usable string
    const getStringNowDate = (date) =>{
      
      var hour = parseInt(date.slice(11,13))
      hour = hour+2
      if (hour < 10){
          hour = '0'+hour
      }
      var dateNow = date
      dateNow = dateNow.slice(0,10) + " "+ hour + dateNow.slice(13,-5)
      
      return dateNow

  }

  return (
    //maps each mood item to display a component 
    list.map(item => {
        
        const stringMoodDate = getStringNowDate(item.moodDate)
        return(

        
                <li key={uuidv4()} className='mood-list-item'> 

                    <div>{stringMoodDate.slice(11,16)} </div>
                    <div>{"  |  "}</div>
                    <div >{(parseInt(item.mood)+1) + '/' + 5} </div>
                    <div>{"   |   "}</div>
                    <div className='image-mood'>
                      <img src={imgList[item.mood]}></img>
                    </div>
                    
                </li>
            

        )
    }
        
    )
    
  )
}
