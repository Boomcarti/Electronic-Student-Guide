import React, {useState} from 'react';

export default function BlockContent(props){
    return(
        <div data-testid="blocktest" className="contentblock">
            <div data-testid="prompttest" className="prompt">
                <h2>Please Login or Create an account to use this feature</h2>
            </div>
            <div data-testid="btest" className="buttons">
                <ul>
                    <li><a id="LOG" className="navLogin"    href="#"   onClick={() => props.changePage("LOG")}>Login</a></li>
                    <li><a id="REG" className="navRegister" href="#"   onClick={() => props.changePage("REG")}>Register</a></li>
                </ul>
            </div>
        </div>
    )
}