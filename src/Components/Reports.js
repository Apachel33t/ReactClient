import React, { Component } from 'react'

const wasDeleted = false
const order = false

class MainPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            object: {},
            wasDeleted: false,
            order: false
        }

        this.delete = this.delete.bind(this)
        this.order = this.order.bind(this)
    }

    delete(e) {
        let object = this.state.items.find(function (obj) {
            if (obj["file_id"] === e.target.name) {
                return obj
            }
        })
        this.setState({object: object, wasDeleted: true})
    }

    componentDidUpdate() {
        if (this.state.wasDeleted !== wasDeleted) {
            let items = this.state.items
            let object = this.state.object
            let jsonOnject = JSON.stringify(this.state.object)
            jsonOnject = jsonOnject.replace(/\\\\/g, ";;")
            fetch('http://test.ru/deletereport/'+jsonOnject, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((res=>res.json()))
            .then((data) => {
                if (data === "file is delete") {
                    items = items.filter(function (obj) {
                        return obj.id !== object.id
                    })
                    this.setState({wasDeleted: false, items: items})
                } else {
                    console.log("Something is wrong")
                }
            })
        }
    }

    order() {
        this.setState({order: !this.state.order})
        let sessionData = {
            login: this.props.sessionData.login,
            order: this.state.order
        }
        fetch('http://test.ru/getreports/'+JSON.stringify(sessionData))
        .then((res => res.json()))
        .then((data) => {
            this.setState({items: data})
        })
    }

    componentDidMount() {
        const sessionData = {
            login: this.props.sessionData.login,
            order: this.state.order
        }
        fetch('http://test.ru/getreports/' + JSON.stringify(sessionData), {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res=>res.json()))
        .then((data) => {
            this.setState({items: data})
        })
    }    
    render() {
        return (
            <>
                <h2>Your Reports</h2>
                <li className="barside">
                    <div style={{width: '20%', fontSize: '14px'}}>Purpose</div>
                    <div style={{width: '38%', fontSize: '14px'}}>Comment</div>
                    <div style={{width: '10%', fontSize: '14px'}}>State</div>
                    <div onClick={this.order} style={{width: '20%', fontSize: '14px', cursor: 'pointer', backgroundColor: this.state.order ? 'limegreen' : 'lightgray'}}>Date&Time</div>
                    <div style={{width: '10%', border: 'none', fontSize: '14px'}}>Action</div>
                </li>
                <ul>
                    {this.state.items ?
                        this.state.items.map((item) => 
                        <li className="items" key={item.id}>
                            <div style={{width: '20%'}}>{item.purpose}</div>
                            <div style={{width: '38%'}}>{item.comment}</div>
                            <div style={{width: '10%'}}>{item.state}</div>
                            <div style={{width: '20%', fontSize: '12px'}}>{item.date + " " + item.time}</div>
                            <div style={{width: '10%'}}>
                                <a href={"http://test.ru/download/"+JSON.stringify(item.id)} name={item.id} style={{color: "greenyellow"}} download>&dArr;</a>
                                <button name={item.file_id} onClick={this.delete} style={{color: "red"}}>&#9746;</button>
                            </div>
                        </li>
                        )
                        : <li style={{listStyle: 'none', width: '100%', textAlign: 'center'}}><p>Nothing to show.</p></li>
                    }
                </ul>
            </>
        )
    }
}


export default MainPanel