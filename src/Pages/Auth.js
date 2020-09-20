import React, {Component} from 'react'
import SignUp from './../Components/SignUp'
import SignIn from './../Components/SignIn'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggle: false,
        }

        this.toggleState = this.toggleState.bind(this)
    }

    toggleState = () => {
        this.setState({toggle: !this.state.toggle})
    }

    
    render() {
        return (
            <div className="wrapper">
                {this.state.toggle ? 
                    <SignUp toggle={this.toggleState} send={this.props.send}/> : 
                    <SignIn toggle={this.toggleState} send={this.props.send}/>}
            </div>
        ) 
    }
}

export default App
