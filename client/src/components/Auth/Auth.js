import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import qs from 'qs'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      state: ''
    }
  }

  propogateCode = (query) => {
    this.props.propogateCode(query)
  }

  componentDidMount = () => {
    const { location } = this.props
    // slice search to remove ? from beginning of query
    const query = qs.parse(location.search.slice(1))
    this.setState(() => {
      return { code: query.code, state: query.state }
    })
    this.propogateCode(query)

  }

  render() {
    return (
      <div className="Auth">
	Redirected from Github.
	<br/>
	Code: {this.state.code}
	<br/>
	State: {this.state.state}
	<Redirect to="/"/>
      </div>
    )
  }
}

export default withRouter(Auth)
