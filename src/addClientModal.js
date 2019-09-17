import React, { Component } from 'react'


class AddClient extends Component {
  state = {
    name: null,
    caseNumber: null,
    assignee: null,
    status: null,
    phone: null,
    email: null,
    service: null,
    date: null,
    supervisor: null,
    docs: '',
    remarks: null,


    alert: null
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleFormSubmit = () => {
    const { name, assignee, status, phone, email, service, date, supervisor, docs, remarks } = this.state;
    const client = { name, assignee, status, phone, email, service, date, supervisor, docs, remarks }
    const inputCheck = name && phone && assignee && status && email && service && date && supervisor
    if (!inputCheck) {
      this.setState({
        alert: 'Please first fill out all fields in the form.'
      })
      return;
    }

    this.props.onAddClient(client)
  }
  render() {
    const { name, assignee, status, phone, email, service, date, supervisor, docs, remarks, alert } = this.state;
    return (
      <div className='add-modal-w'>
        <div className='add-modal'>
          <div className='add-modal-header' onClick={this.props.onClose}>X</div>
          <span className='modal-title'>Add a new client</span>
          <form className='add-modal-form' onChange={this.handleInputChange}>
            <input name='name' className='name' placeholder='Name' value={name} />
            <input name='phone' className='phone' placeholder='Phone' value={phone} />
            <input name='email' className='email' placeholder='Email' value={email} />
            <input name='service' className='service' placeholder='Service Type' value={service} />
            <input name='date' className='date' placeholder='Entry date' value={date} />
            <input name='status' className='status' placeholder='Status' value={status} />
            <input name='assignee' className='assignee' placeholder='Assignee' value={assignee} />
            <input name='supervisor' className='supervisor' placeholder='Supervised By' value={supervisor} />
            <input name='docs' className='docs' placeholder='Related documents' value={docs} />
            <input name='remarks' className='remarks' placeholder='Any remarks' value={remarks} />
          </form>
          <div className='form-alert'>{alert}</div>
          <button onClick={this.handleFormSubmit}>Add</button>
        </div>
      </div>
    )
  }
}



export default AddClient