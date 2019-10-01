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
              newClients.push({
                  id:client.id, 
                  data: client.data()
                })
            })
            this.setState({
              clients: newClients
            })
          })
        } else console.log('sign in first')
      }

    deletClient = (id) => {
        const { db } = this.props;
        db.collection('clients').doc(id).delete()
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
            <div className='table-row' key={index}>
                <span className='table-cell table-cell-no'>{index}</span>
                <span className ='table-cell table-cell-name'>{client.data.name}</span>
                <span className ='table-cell table-cell-phone'>{client.data.phone}</span>
                <span className ='table-cell table-cell-email'>{client.data.email}</span>
                <span className ='table-cell table-cell-service'>{client.data.service}</span>
                <span className ='table-cell table-cell-date'>{client.data.date}</span>
                <span className ='table-cell table-cell-status'>{client.data.status}</span>
                <span className ='table-cell table-cell-assignee'>{client.data.assignee}</span>
                <span className ='table-cell table-cell-supervisor'>{client.data.supervisor}</span>
                <span className ='table-cell table-cell-docs'>{client.data.docs}</span>
                <span className ='table-cell table-cell-remarks'>{client.data.remarks}</span>
                <span
                onClick={()=>this.deletClient(client.id)}

                >X
                </span>
            </div>
        )
    }
    render() {
        const {search, clients} = this.state;
        let filtered = clients
        const searchedText = search.trim().toString().toLowerCase()
        if (searchedText) {
            filtered = this.state.clients.filter((client) => {
                return client.data.name.toLowerCase() == search || 
                    client.data.assignee.toLowerCase() == search || 
                    client.data.status.toLowerCase() == search;
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