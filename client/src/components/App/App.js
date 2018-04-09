import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import Auth from '../Auth/Auth'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
  }

  handleLogin = e => {
    window.location = window.location.origin + '/login'
  }

  propogateCode = code => {
    console.log('code from App.js:', code)
    this.setState(() => {
      return { code: code }
    })
  }

  render() {
    return (
      <div className="App">
        <div className="Login button">
          <button onClick={this.handleLogin}>Login with Github</button>
        </div>

	<div>
      	  <Route path="/login" component={Login} />
	  <Route path="/auth/callback" render={(props) => (
	    <Auth propogateCode={this.propogateCode}/>
	  )} />
	  <Route path="/dashboard" component={Dashboard} />
	</div>

      </div>
    )
  }
}

export default App
