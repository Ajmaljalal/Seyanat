import React, { Component } from 'react'


class AddClient extends Component {
  state = {
    name: null,
    caseNumber: null,
    Assignee: null,
    status: null,
    alert: null
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit = () => {
    const { name, caseNumber, Assignee, status } = this.state;
    const client = { name, caseNumber, Assignee, status }
    const inputCheck = name && caseNumber && Assignee && status
    if (!inputCheck) {
      this.setState({
        alert: 'Please first fill out all fields in the form.'
      })
      return;
    }

    this.props.onAddClient(client)
  }
  render() {
    const { name, caseNumber, Assignee, status, alert } = this.state;
    return (
      <div className='add-modal-w'>
        <div className='add-modal'>
          <div className='add-modal-header' onClick={this.props.onClose}>X</div>
          Add a new client
          <form className='add-modal-form' onChange={this.handleInputChange}>
            <input name='name' className='name' placeholder='Name' value={name} />
            <input name='caseNumber' className='caseNo' placeholder='Case Number' value={caseNumber} />
            <input name='Assignee' className='assignee' placeholder='Assignee' value={Assignee} />
            <input name='status' className='status' placeholder='Status' value={status} />
          </form>
          <div className='form-alert'>{alert}</div>
          <button onClick={this.handleFormSubmit}>Add</button>
        </div>
      </div>
    )
  }
}



export default AddClient