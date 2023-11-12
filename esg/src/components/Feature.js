import React from 'react'
import FeatureBox from './FeatureBox.js'
import featureimage from '../images/feature_1.png';
import featureimage1 from '../images/feature_2.png';
import featureimage2 from '../images/feature_3.png';

function Feature({changePage},props) {
  
  return (
            <div className ="FeatureContainer">
                <div onClick={()=>changePage("FIN")}>
                  <FeatureBox image = {featureimage} title ="Financial Guidance"/>
                </div>
                
                <div onClick={()=>changePage("WEL")}>
                  <FeatureBox image = {featureimage1} title ="Health and Wellness"/>
                </div>
                <div onClick={()=>changePage("STD")}>
                  <FeatureBox image = {featureimage2} title ="Study"/>
                </div>
            </div>
      
   
  )
}

export default Feature ;