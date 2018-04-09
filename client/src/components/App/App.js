import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
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
      token: '',
      user: {}
    }
  }

  componentDidMount = () => {
    const { token } = window.localStorage
    const { user } = this.state
    if (token && !user.login) {
      this.setUserWithToken(token)
    }
  }

  componentDidUpdate = (nextProps) => {
    const { token } = window.localStorage
    const { user } = this.state

    if (user.login) return

    else if(this.state.state === window.localStorage.state) {
      axios({
	url: 'http://localhost:9999/authenticate/' + this.state.code,
	json: true
      }).then(({ data }) => {
	const { token } = data
	window.localStorage.clear()
	window.localStorage.setItem('token', token)
	this.setState({ token })
	return token
      }).then(token => {
	return this.setUserWithToken(token)
      })
    }

    else console.log('please login')
  }

  setUserWithToken = token => {
    let user
    axios({
      url: 'https://api.github.com/user',
      method: 'GET',
      headers: {
	Authorization: `token ${token}`
      }
    }).then(response => {
      user = response.data
      console.log('user from getUser:', user)
      this.setState({ user })
    })
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
    const { user } = this.state
    const { token } = window.localStorage
    return (
      <div className="App">
	{!token
	  ? (
	    <div className="Login button">
              <button onClick={this.handleLogin}>Login with Github</button>
             </div>
	    )
	 : (
	   <div>Welcome, { user.name || user.login }!</div>
	 )
	}

	<div>
      	  <Route path="/login" component={Login} />
	  <Route path="/auth/callback" render={(props) => (
	    <Auth propogateCode={this.propogateCode}/>
	  )} />
	  <Route path="/dashboard" render={() => (<Dashboard user={this.state.user}/>)} />
	</div>

      </div>
    )
  }
}

export default App
