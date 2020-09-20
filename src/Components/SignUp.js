import React, {Component} from 'react'

class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login: '',
            username: '',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
    }

    handleEmailChange(e) {
        const name = e.target.name
        this.setState({[name]: e.target.value})
    }

    handleSubmit(e) {
        e.preventDefault()
        this.props.send({login: this.state.login, username: this.state.username, password: this.state.password, type: "signup"})
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="registration">
                <h3>Sign Up</h3>
                <input  type="login" 
                        className="input-text" 
                        name="login"
                        placeholder="Login" 
                        style={{marginTop: '50px'}} 
                        value={this.state.login} 
                        onChange={this.handleEmailChange}
                        required />
                <input  type="text" 
                        className="input-text"
                        name="username"
                        placeholder="Username" 
                        value={this.state.username} 
                        onChange={this.handleEmailChange}
                        required />
                <input  type="password" 
                        className="input-text"
                        name="password"
                        placeholder="Password" 
                        value={this.state.password} 
                        onChange={this.handleEmailChange}
                        required />
                <div className="block-f-btn">
                    <input type="submit" className="input-btn" value="Send" onClick={this.props.send}/>
                    <input type="submit" className="input-btn sign" value="Sign In" onClick={this.props.toggle}/>
                </div>
            </form>
        )
    }
}

export default SignUp
