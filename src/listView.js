import React, { Component } from 'react'


class ListView extends Component {
    // constructor(props) {
    //     super(props)
    // }
    state = {
        search: ''
    }

    handleSearchInputChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }

    creatTableHeader = () => {
        return (
            <div className='table-header'>
                <span className='table-cell table-cell-no'>No</span>
                <span className ='table-cell table-cell-name'>Name</span>
                <span  className ='table-cell table-cell-case'>Case No</span>
                <span  className ='table-cell table-cell-assignee'>Assignee</span>
                <span  className ='table-cell table-cell-status'>Status</span>
            </div>
        )
    }

    createTableRow = (client, index) => {
        return(
            <div className='table-row'>
                <span className='table-cell table-cell-no'>{index}</span>
                <span className ='table-cell table-cell-name'>{client.name}</span>
                <span  className ='table-cell table-cell-case'>{client.caseNumber}</span>
                <span  className ='table-cell table-cell-assignee'>{client.Assignee}</span>
                <span  className ='table-cell table-cell-status'>{client.status}</span>
            </div>
        )
    }
    render() {
        const {search} = this.state;
        let filtered = this.props.clients
        const searchedText = search.trim().toString().toLowerCase()
        if (searchedText) {
            filtered = this.props.clients.filter((client) => {
                return client.name.toLowerCase() == search || 
                    client.caseNumber.toString().toLowerCase() == search || 
                    client.Assignee.toLowerCase() == search || 
                    client.status.toLowerCase() == search;
            })
        }
        return (
            <div className='users__list'>
                <div className='list-search-w'><input placeholder='Search the database...' name='search' value={this.state.search} onChange={this.handleSearchInputChange}/></div>
                <div className='list-table'>
                    {this.creatTableHeader()}
                    {
                        filtered.map((client, index) =>{
                            return this.createTableRow(client, index)
                        })
                    }
                    
                </div>
            </div>
        )
    }
}


export default ListView;