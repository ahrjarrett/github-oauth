import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import Auth from '../Auth/Auth'
import './App.css'
import config from '../../config'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      state: '',
      token: ''
    }
  }

  componentDidUpdate = () => {
    if(this.state.state === window.localStorage.state) {
      axios({
	url: 'http://localhost:9999/authenticate/' + this.state.code,
	json: true
      }).then(({ data }) => {
	const token = data.token
	window.localStorage.clear()
	this.setState({ token })
      })
    }
    else console.log('no need to update!')
  }

  handleLogin = e => {
    window.location = window.location.origin + '/login'
  }

  propogateCode = query => {
    this.setState(() => {
      return {
	code: query.code,
	state: query.state
      }
    })
  }

  render() {
    return (
      <div className="App">
	{!this.state.token
	  ? <div className="Login button">
              <button onClick={this.handleLogin}>Login with Github</button>
            </div>
	  : `Hey user! Your token is: ${this.state.token}`
	}

	<div>
      	  <Route path="/login" component={Login} />
	  <Route path="/auth/callback" render={(props) => (
	    <Auth propogateCode={this.propogateCode}/>
	  )} />
	  <Route path="/dashboard" render={Dashboard} />
	</div>

      </div>
    )
  }
}

export default App
