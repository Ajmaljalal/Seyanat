import React from 'react';
import './styles/App.css';
import ListView from './listView';
import RightMenu from './rightMenu';
import LoginRegister from './login';
import AddClient from './addClientModal';
import firebaseInstance from 'firebase/app';
import 'firebase/firestore';
import firebaseConfigs from './firebaseConfig'

if (!firebaseInstance.apps.length) {
  firebaseInstance.initializeApp(firebaseConfigs)
}
const db = firebaseInstance.firestore();
db.settings({
  timestampsInSnapshots: true
});

class App extends React.Component {
  state = {
    loggedIn: false,
    clients: null,
    openAddClient: false,
    currenUser: null
  }

  handleLogin = (user) => {
    this.setState({
      loggedIn: true,
      currenUser: user
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      currenUser: null
    })
  }

  openAddClientModal = () => {
    this.setState({
      openAddClient: !this.state.openAddClient
    })
  }

  addClient = (client) => {
    db.collection('clients').add({
      ...client
    }).then(user =>{
      console.log(user)
    })
    this.openAddClientModal()

  }

  renderComponents =()=> {
    return (
      <div className='app-wrapper'>
        {this.state.loggedIn ? (
          <div className='app-content'>
            <RightMenu onLogOut={this.handleLogout} onOpenModal={this.openAddClientModal} user={this.state.currenUser} />
            <ListView db={db} user = {this.state.currenUser}/>
          </div>
        ): <LoginRegister onLogIn={this.handleLogin}/>}
        {this.state.openAddClient ? <AddClient onClose={this.openAddClientModal} onAddClient={this.addClient}/> : null}
      </div>
    )
  }
  
  render(){
    return (
      <div className="app">
        {this.renderComponents()}
      </div>
    );
  }
}

export default App;
