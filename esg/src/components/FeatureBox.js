import React from 'react'
import {useState} from 'react';
function FeatureBox(props) {
  return (

        <div data-testid="fctest" className = 'FeatureCard'>
            <div  data-testid="fcitest" className  ='FeatureImage'>
                <img    src={props.image}/>
            </div>
            <div data-testid="fcttest" className = 'FeatureText'>
                <h2> {props.title} </h2>
                <p> {props.body} </p>
            </div>
        </div>
   
  )
}

export default FeatureBox;