import React, { Component } from 'react'


class ListView extends Component {
    
    state = {
        search: '',
        clients: null
    }

    handleSearchInputChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    componentDidMount () {
        const { db } = this.props;
        if(this.props.user) {
          db.collection('clients').onSnapshot(clients => {
            const newClients = []
            clients.forEach(client => {
              newClients.push(client.data())
            })
            this.setState({
              clients: newClients
            })
          })
        } else console.log('sign in first')
      }

    creatTableHeader = () => {
        return (
            <div className='table-header'>
                <span className='table-cell table-cell-no'>No</span>
                <span className ='table-cell table-cell-name'>Name</span>
                <span  className ='table-cell table-cell-case'>Phone</span>
                <span  className ='table-cell table-cell-email'>Email</span>
                <span  className ='table-cell table-cell-service'>Service Type</span>
                <span  className ='table-cell table-cell-date'>Entery Date</span>
                <span  className ='table-cell table-cell-status'>Status</span>
                <span  className ='table-cell table-cell-assignee'>Assigned To</span>
                <span  className ='table-cell table-cell-supervisor'>Supervisor</span>
                <span  className ='table-cell table-cell-docs'>Docs</span>
                <span  className ='table-cell table-cell-remarks'>Remarks</span>
            </div>
        )
    }

    createTableRow = (client, index) => {
        return(
            <div className='table-row'>
                <span className='table-cell table-cell-no'>{index}</span>
                <span className ='table-cell table-cell-name'>{client.name}</span>
                <span className ='table-cell table-cell-phone'>{client.phone}</span>
                <span className ='table-cell table-cell-email'>{client.email}</span>
                <span className ='table-cell table-cell-service'>{client.service}</span>
                <span className ='table-cell table-cell-date'>{client.date}</span>
                <span className ='table-cell table-cell-status'>{client.status}</span>
                <span className ='table-cell table-cell-assignee'>{client.assignee}</span>
                <span className ='table-cell table-cell-supervisor'>{client.supervisor}</span>
                <span className ='table-cell table-cell-docs'>{client.docs}</span>
                <span className ='table-cell table-cell-remarks'>{client.remarks}</span>
            </div>
        )
    }
    render() {
        const {search, clients} = this.state;
        let filtered = clients
        const searchedText = search.trim().toString().toLowerCase()
        if (searchedText) {
            filtered = this.state.clients.filter((client) => {
                return client.name.toLowerCase() == search || 
                    client.assignee.toLowerCase() == search || 
                    client.status.toLowerCase() == search;
            })
        }
        return (
            <div className='users__list'>
                <div className='list-search-w'><input placeholder='Search the database...' name='search' value={this.state.search} onChange={this.handleSearchInputChange}/></div>
                <div className='list-table'>
                    {this.creatTableHeader()}
                    {
                        filtered && filtered.map((client, index) =>{
                            return this.createTableRow(client, index)
                        })
                    }
                    
                </div>
            </div>
        )
    }
}


export default ListView;