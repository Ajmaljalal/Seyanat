import React, { Component } from 'react'


/**
* @author
* @class RightMenu
**/

class RightMenu extends Component {
    state = {}
    render() {
        return (
            <div className='right-menu'>
                <div className='user'>Welcome Name</div>
                <button onClick={this.props.onOpenModal} className='addClient'>Add a new case</button>
                <button>Print the list</button>
                <button onClick={this.props.onLogOut} className='logout'>Logout</button>
            </div>
        )
    }
}

export default RightMenu