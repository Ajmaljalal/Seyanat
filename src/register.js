import React, { Component } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig'

const firebaseApp = firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth();


class Register extends Component {
 state = {
   email: '',
   password: ''
 }

 handleInputChange = (event) => {
  this.setState({
    [event.target.name]: event.target.value
  })
 }

 render() {
  return(
   <div className='login'>
     <div className='app-welcome'>Welcome to Seyanat's Legal Cases Portal</div>
       Please register with your email and a password to access the database.
       <input placeholder='Your email..' name='email' type='text'/>
       <input placeholder='Your password..' name='password'type='password'/>
       <button onClick={this.props.onLogIn}>Register</button>
    </div>
    )
   }
 }



export default Register