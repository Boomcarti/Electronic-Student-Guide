import React from 'react'
import {useState} from 'react';
function CarouselCard(props) {
  return (

        <div data-testid="CardTest" className = 'CarouselCard'>
            <div data-testid="CardTestImage" className  ='CarouselCardImage'>
                <img src={props.image}/>
            </div>
            <div data-testid="CardTestText" className = 'CarouselCardText'>
                <h2> {props.title} </h2>
                
            </div>
        </div>
   
  )
}

export default CarouselCard;