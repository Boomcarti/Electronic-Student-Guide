import React, {useState} from 'react';

//Displays register form for new users
function RegisterForm({Register, error}){
    const [details, setDetails] = useState({name: '',username: '', password:''})

    //Passes details to App's register function
    const submitHandler = e => {
        e.preventDefault();
        Register(details);
    }

    return (
        <form  className = "loginpage" onSubmit={submitHandler}> {/**Bind submit handler to submit button */}
            <div className='form-inner'>
                <h2>Register</h2>
                    {(error !== '') ? (<div className='error'>{error}</div>) : ''}
                <div className='form-group'>
                    <label htmlFor='name'>Name:</label>
                    <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        onChange={e => setDetails({...details, name: e.target.value})}
                        value = {details.name}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='username'>Username:</label>
                    <input 
                        type='text' 
                        name='username' 
                        id='username'
                        onChange={e => setDetails({...details, username: e.target.value})}
                        value = {details.username}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='password'>Password:</label>
                    <input 
                        type='password' 
                        name='password' 
                        id='password'
                        onChange={e => setDetails({...details, password: e.target.value})}
                        value = {details.password}
                    />
                </div>
                <input id="register" type='submit' value='REGISTER'/>
            </div>
        </form>
    )
}

export default RegisterForm;