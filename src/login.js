import React, { Component } from 'react'


class Login extends Component {
 state = {}
 render() {
  return(
   <div className='login'>
     <div className='app-welcome'>Welcome to Seyanat's Legal Cases Portal</div>
       Please login with your email and password to access the database.
       <input placeholder='Your email..' type='text'/>
       <input placeholder='Your password..' type='password'/>
       <button onClick={this.props.onLogIn}>Login</button>
    </div>
    )
   }
 }



export default Login