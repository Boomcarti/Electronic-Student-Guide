import React, {useState} from 'react';
import Axios from "axios"; //API handler
import NavBar from './components/NavBar';

import FeaturePage from './components/FeaturePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm.js';
import Homepage from './components/Homepage'


const serverPort = 3010;

function App() {
  const [user, setUser] = useState({name: "", username: ""});
  const [page, setPage] = useState({state: "HOM"});
  const [error, setError] = useState("");

  const Login = details =>{
    console.log(details.username);

    //comunicate with backend to get user info
    Axios.post("http://localhost:"+serverPort+"/api/login", {
      username: details.username,
      password: details.password,
    }).then((response)=> {
      if(response.data.userexists){
        if(response.data.access){
          console.log("logged in");
          setUser({
            name: response.data.name,
            username: details.username
          });
          changePage('HOM')
        }else{
          setError('Incorrect Password')
        }
      }else{
        setError('Username not found')
      }
    });
  };

  const Register = details =>{
    console.log(details.username);

    //comunicate with backend to get user info
    Axios.post("http://localhost:"+serverPort+"/api/register", {
      firstname : details.name,
      username: details.username,
      password: details.password,
    }).then((response)=> {
      if(response.data.free){
        Login(details)
      }else{
        setError('Username already exists')
      }
    });
  };

  const Logout = () =>{
    console.log("Logout");
    setUser({
      name:'',username:''
    });
    setError('');
  };

  /*Used for page navigation. 
  Pass this function to your component to allow it to controll navigation
  the argument specified in the function specifies where to go
  HOM - homepage
  LOG - login page
  REG - register page
  FIN - Financial
  STD - Study
  WEL - Wellness page
  */
  const changePage = dest => {
    setPage({
      state: dest
    });
  };
  
  return (
    <div className='App'>
      <div className='navbar'>
        <NavBar 
          changePage = {changePage} 
          currentPage = {page.state} 
          firstname = {user.name} /*use this to tell if someone is logged in (show login/logout prompt)*/
          Logout = {Logout}
    
        /> {/*Always render the nav bar*/}
      </div>
      <div>
        {page.state === "LOG" && /*Goto login page*/
          <LoginForm Login = {Login} error = {error}/>
        }
        {page.state === "REG" && /*Goto login page*/
          <RegisterForm Register = {Register} error = {error}/>
        }
        {page.state === "HOM" &&
          <Homepage changePage = {changePage}/>
        }
        {page.state === "FIN" &&
          <FeaturePage currentPage = {page.state} username={user.username} changePage = {changePage}/>
        }
        {page.state === "STD" &&
          <FeaturePage currentPage = {page.state} username={user.username} changePage = {changePage}/>
        }
        {page.state === "WEL" &&
          <FeaturePage currentPage = {page.state} username={user.username} changePage = {changePage}/>
        }
      </div>
    </div>
  );

}
export default App;
