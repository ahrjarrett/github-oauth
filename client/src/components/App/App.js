import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import axios from 'axios'

import Dashboard from '../Dashboard/Dashboard'
import Login from '../Login/Login'
import Auth from '../Auth/Auth'
import Student from '../Student/Student'

import './App.css'

class App extends Component {
  state = {
    code: '',
    state: '',
    token: '',
    user: {}
  }

  componentDidMount = () => {
    const { token } = window.localStorage
    const { user } = this.state
    if (token && !user.login) {
      this.setUserWithToken(token)
    }
  }

  componentDidUpdate = (nextProps) => {
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
	return token
      }).then(token => {
	this.setUserWithToken(token)
      })
    }

    else return
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
      this.setState((prevState) => {
	return this.state.token
	  ? { user }
	  : { user, token }
      })
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
	    <div>
	      <div className="Login button">
		<button onClick={this.handleLogin}>Login with Github</button>
              </div>
	      <div>
      		<Route path="/login" component={Login} />
		<Route path="/auth/callback" render={(props) => (
		  <Auth propogateCode={this.propogateCode}/>
		)} />
	      </div>
	      </div>
	  )

	 : (
	   <div>
	     <Route exact path="/" render={() => (
	       <div>
		 Welcome, { user.name || user.login }!
		 Go to your <Link to="/dashboard">Dashboard</Link>
	       </div>
	     )}/>
	     <Route path="/dashboard" render={() => (
	       <Dashboard
		 user={this.state.user}
		 token={this.state.token}
		 />
	     )} />
	     <Route path="/students/:student" component={Student}/>
	     </div>

	 )
	}

      </div>
    )
  }
}

export default App
