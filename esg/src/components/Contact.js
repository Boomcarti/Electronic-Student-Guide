import React from 'react'

function Contact() {
  return (
    <div data-testid="contactTest" id ='contact'>
    <h3> Send Us An Email</h3>
    <div data-testid="contactTestInner" className ='contact-input'>
    <input type ='email' placeholder='mgwtad001@myuct.ac.za'/>
    <a href ="#">Contact</a>

    </div>

    </div>
  )
}

export default Contact