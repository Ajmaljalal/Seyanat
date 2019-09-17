import React, { Component } from 'react'
import * as app from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig'

const firebaseApp = app.initializeApp(firebaseConfig)
const firebaseAuth = firebaseApp.auth();


class LoginRegister extends Component {
  state = {
    email: '',
    password: '',
    loggedIn: true,
    registering: false,
    logging: false,
    user: null
  }

  handleLoginRegister = () => {
    this.setState({
      loggedIn: !this.state.loggedIn,
    })
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  registerUser = () => {
    this.setState({
      registering: true
    })
    firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.setState({
          registering: false,
          user: data.user,
          email: '',
          password: ''
        })
        this.handleLoginRegister()
      })
  }

  loginUser = () => {
    this.setState({
      logging: true
    })
    firebaseAuth.signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(data => {
        this.setState({
          logging: false,
          user: data.user,
        })
        this.props.onLogIn(this.state.user)
      })
  }

  renderRegisterationScreen = () => {
    if (!this.state.registering) {
      return (
        <div className='login'>
          <div className='app-welcome'>Welcome to Seyanat's Legal Cases Portal</div>
          Please register with your email and a password to access the database.
        <input placeholder='Your email..' name='email' type='text' value={this.state.email} onChange={this.handleInputChange} />
          <input placeholder='Your password..' name='password' type='password' value={this.state.password} onChange={this.handleInputChange} />
          <button onClick={this.registerUser}>Register</button>
          <div style={{ marginTop: '20px', }}>Already have an account?
           <span
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={this.handleLoginRegister}
            > Login here!
           </span>
          </div>
        </div>
      )
    } else return <div style={{ margin: '50px auto' }}>One second please, Registering...</div>
  }


  renderLoginScreen = () => {
    return (
      <div className='login'>
        <div className='app-welcome'>Welcome to Seyanat's Legal Cases Portal</div>
        Please login with your email and password to access the database.
        <input placeholder='Your email..' name='email' type='text' value={this.state.email} onChange={this.handleInputChange} />
        <input placeholder='Your password..' name='password' type='password' value={this.state.password} onChange={this.handleInputChange} />
        <button
          onClick={this.loginUser}
        >Login
        </button>
        <div style={{ marginTop: '20px', }}>Do not have an account?
          <span
            style={{ color: 'blue', cursor: 'pointer' }}
            onClick={this.handleLoginRegister}
          > Register here!
           </span>
        </div>
      </div>
    )
  }



  renderLoginOrRegister = () => {
    if (this.state.loggedIn) {
      return (
        this.renderLoginScreen()
      )
    } else {
      return (
        this.renderRegisterationScreen()
      )
    }
  }


  render() {
    return (
      this.renderLoginOrRegister()
    )
  }
}



export default LoginRegister