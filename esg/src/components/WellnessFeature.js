import well0 from '../images/well0.png'
import well1 from '../images/well1.png'
import well2 from '../images/well2.png'
import well3 from '../images/well3.png'
import well4 from '../images/well4.png'
import React, { useEffect, useRef, useState } from 'react'
import MoodList from './MoodList'
import Axios from 'axios'

const serverPort = 3010;

export default function WellnessFeature({username}) {

    const style = {
        backgroundColor: '#c08e70'
    }

    const [moodList, setList] = useState([])
    const [newList, setNewList] = useState([])
    const [imageStyles, setStyle] = useState([style,style,{backgroundColor:'#f8e8d4'},style,style])
    
    const sliderRef = useRef()
    const newListRef = useRef()

    //convert date formats
    const getStringNowDate = (date) =>{
      
        var hour = parseInt(date.slice(11,13))
        hour = hour+2
        if (hour < 10){
            hour = '0'+hour
        }
        var dateNow = date
        dateNow = dateNow.slice(0,10) + " "+ hour + dateNow.slice(13,-1)
        
        return dateNow
  
    }

    //Query backend for mood history
    const loadMoods = () => {
        
        Axios.post("http://localhost:"+serverPort+"/api/wellness/getMoods", 
        {
            username : username
        }

        ).then((response) => {
            if (response){

                setList(response.data.result)
            }
        })
    }

    //Upload reported mood to backend
    const exportData = () => {
        Axios.post("http://localhost:"+serverPort+"/api/wellness/updateMoods", 
        {
            username : username,
            list : newListRef.current.map(item => {
                return(
                    {
                        moodDate:getStringNowDate(item.moodDate),
                        mood: item.mood
                    }
                )
                
            })
        })
    }

    //runs on component mount to load data
    useEffect(() =>{
        loadMoods()
    }, [])

    //runs on component unmount to send data to db
    useEffect(() => () => {
            exportData()    
    }, [])

    useEffect(() =>{
    
        newListRef.current = newList
    },[newList])


    
    //adds items to mood history
    const addMoodItem = () =>
    {
        
        const dateNow = new Date()
        setList(prevList => {
            
            const mood = sliderRef.current.value 
           
            return (
                [...prevList, {moodDate: dateNow.toISOString(), mood: mood}]
            )
        })
        setNewList(prevList => {
            
            const mood = sliderRef.current.value 
            
            return (
                [...prevList, {moodDate: dateNow.toISOString(), mood: mood}]
            )
        })
    }

    //cchanges image highlighting of the smiley faces
    const changeImage = (index) =>{
        sliderRef.current.value = index
        

        setStyle(prevStyles => {
            return(
                prevStyles.map((item, itemIndex)=>{
                    
                   
                        if (itemIndex == index){
                            
                            return  {backgroundColor:'#f8e8d4'}
                        }
                        else{
                            return style
                        }                
                })
            )
        })
        
    }

    
    
    

  return (
    <div className='wellness-page' >
        <h1>How are you feeling right now?</h1>
        <div className='wellness-feature'>
            
            <div className='wellness-images'>
                <img src={well0} alt={'img0'} style={imageStyles[0]} onClick={() => changeImage(0)}></img>
                <img src={well1} alt={'img1'} style={imageStyles[1]} onClick={() => changeImage(1)}></img>
                <img src={well2} alt={'img2'} style={imageStyles[2]} onClick={() => changeImage(2)}></img>
                <img src={well3} alt={'img3'} style={imageStyles[3]} onClick={() => changeImage(3)}></img>
                <img src={well4} alt={'img4'} style={imageStyles[4]} onClick={() => changeImage(4)}></img>
            </div>
            
            <input  ref={sliderRef} className='wellness-slider' type='range' min={0} max={4}
                onChange={event => changeImage(event.target.value)}
                defaultValue={2}></input>
            <button className='wellness-submit-button' onClick={() => addMoodItem()}>Submit</button>
        </div>
        <div className='mood-list'>
            <MoodList list={moodList}/>
        </div>
    </div>
       
    
  )
}
