import logo from "../newimages/logo.webp";
import React, {useState} from 'react';

export default class NavBar extends React.Component{
    
    constructor(props){
        const login = <li><a onClick={() => props.changePage("LOG")}>Login</a></li>
        const register = <li><a onClick={() => props.changePage("REG")}>Register</a></li>



        const logout = <li><a onClick={() => props.Logout()}>{props.firstname}</a></li>

        super(props)
        this.state={
            nav:false,
            buttons: 'Loading...'
        }
        this.getButtons();
        window.addEventListener('scroll',this.changeBackground());
    }
    

    changeBackground(){
        if(window.scrollY >= 10){
            this.setState({
                nav: true
            });
        }
        else{
            this.setState({
                nav: false
            });
        }
    }
    //navigation hilgihitng
    func(){
      this.props.changePage("HOM")
     
    }
    func1(props){
        var dest = props;
        
        let list = document.getElementById("navmenu").getElementsByTagName("a")
        
        for(let i = 0; i < Object.keys(list).length;i++){
            list[i].className="active";
        }
        for(let i = 0; i < Object.keys(list).length;i++){
            if(props==list[i].id){
                document.getElementById("navmenu").getElementsByTagName("a")[i].className="unactive"
             
            }
            
        }
        
    

    }
   

    getButtons(){
       //solution 5 methods, each just 
        if(this.props.firstname ===''){
            return(
                    <ul id ="navmenu" className ='menu'>
                    <li><a id="HOM" className="unactive"    href="#"   onClick={() =>{this.func();this.func1()}}   >Home</a></li>
                    <li><a id="FIN" className="navFin"      href="#"   onClick={() => this.props.changePage("FIN")}>Financial Guide</a></li>
                    <li><a id="WEL" className="navHealth"   href="#"   onClick={() => this.props.changePage("WEL")}>Health and Wellness </a></li>
                    <li><a id="STD" className="navStudy"    href="#"   onClick={() => this.props.changePage("STD")}>Study</a></li>
                    <li><a id="LOG" className="navLogin"    href="#"   onClick={() => this.props.changePage("LOG")}>LOGIN</a></li>
                    <li><a id="REG" className="navRegister" href="#"   onClick={() => this.props.changePage("REG")}>Register</a></li>

                </ul>    
            ) 
        }else{
            return(
                <ul  id ="navmenu" className ='menu'>

                    <li><a id="HOM" className="navLink"  href="#" onClick={()=>{this.func();this.func1()}} >Home</a></li>
                    <li><a id="FIN" className="navLink"  href="#" onClick={() => this.props.changePage("FIN")}>Financial Guide</a></li>
                    <li><a id="WEL" className="navLink"  href="#" onClick={() => this.props.changePage("WEL")}>Health and Wellness</a></li>
                    <li><a id="STD" className="navLink"  href="#" onClick={() => this.props.changePage("STD")}>Study</a></li>
                    <li><a id="LOG" className="navLogin" href="#" onClick={() => this.props.Logout()}>{this.props.firstname.toUpperCase()}</a></li>             
                </ul>    
            )
        }     
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.currentPage !== this.props.currentPage){
            this.getButtons()
            this.func1(this.props.currentPage)
            
        }
    }

    render(){
        return(
            <nav className={this.state.nav ? 'nav active' : 'nav'}>
            <div className="navLeft">
            <div className="guidename">
                   Student Guide
                </div>
                <a href="#" className="logo">


                    <img className ="logoimage"src ={logo} alt =''/>
                </a>
                </div>
                <div className="navRight">
                
                <input type ='checkbox' className='menu-btn' id="menu-btn"/>
                <label className ="menu-icon " htmlFor='menu-btn'>
                    <span className ='nav-icon'></span>
                </label>

                {this.getButtons()}
</div>
            </nav>
        )
    }

}