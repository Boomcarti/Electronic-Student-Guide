import React, {useState} from 'react'
import Header from './Header.js'
import Feature from './Feature.js'
import Contact from './Contact.js'

function Homepage({changePage}) {

  return (
    <div className="App" >
      <Header
      />
      <Feature changePage={changePage}/>
      <Contact/>
    </div>    
  );
}

export default Homepage;