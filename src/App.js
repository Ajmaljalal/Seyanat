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
    currentUser: null
  }

  handleLogin = (user) => {
    this.setState({
      loggedIn: true,
      currentUser: user
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false,
      currentUser: null
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
    }).then(client =>{
      // console.log(client)
    })
    this.openAddClientModal()
  }

  addUser = ({name, email}) => {
    db.collection('users').add({
      name: name,
      email: email,
    }).then((user) =>{
      // console.log(user)
    })
  }

  renderComponents =()=> {
    return (
      <div className='app-wrapper'>
        {this.state.loggedIn ? (
          <div className='app-content'>
            <RightMenu onLogOut={this.handleLogout} onOpenModal={this.openAddClientModal} user={this.state.currentUser} />
            <ListView db={db} user = {this.state.currentUser}/>
          </div>
        ): <LoginRegister onLogIn={this.handleLogin} db={db} onAddUser={this.addUser}/>}
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
