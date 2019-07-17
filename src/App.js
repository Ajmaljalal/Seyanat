import React from 'react';
import './styles/App.css';
import ListView from './listView';
import RightMenu from './rightMenu';
import Login from './login';
import AddClient from './addClientModal';


const clients = [
  {
      name: 'Jamil',
      caseNumber: '12345',
      date: new Date(),
      status: 'closed',
      Assignee: 'Hakim'    
  },
  {
      name: 'Khangul',
      caseNumber: '12345',
      date: new Date(),
      status: 'New',
      Assignee: 'Ajmal'    
  },
  {
      name: 'Yusuf',
      caseNumber: '12345',
      date: new Date(),
      status: 'New',
      Assignee: 'Aman'    
  },
  {
      name: 'Beheshta',
      caseNumber: '12345',
      date: new Date(),
      status: 'Ba khod ghalteeda',
      Assignee: 'Hakim'    
  },
]




class App extends React.Component {
  state = {
    loggedIn: false,
    clients: clients,
    openAddClient: false
  }

  handleLogin = () => {
    this.setState({
      loggedIn: true
    })
  }

  handleLogout = () => {
    this.setState({
      loggedIn: false
    })
  }

  openAddClientModal = () => {
    this.setState({
      openAddClient: !this.state.openAddClient
    })
  }

  addClient = (client) => {
    const newClients = this.state.clients
    newClients.push(client)
    this.setState({
      clients: newClients
    })
    this.openAddClientModal()

  }

  renderComponents =()=> {
    return (
      <React.Fragment>
        {this.state.loggedIn ? (
          <React.Fragment>
            <RightMenu onLogOut={this.handleLogout} onOpenModal={this.openAddClientModal} />
            <ListView clients={clients}/>
          </React.Fragment>
        ): <Login onLogIn={this.handleLogin}/>}
        {this.state.openAddClient ? <AddClient onClose={this.openAddClientModal} onAddClient={this.addClient}/> : null}
      </React.Fragment>
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
