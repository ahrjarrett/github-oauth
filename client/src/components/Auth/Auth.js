import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import qs from 'qs'

class Auth extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: 'magic'
    }
  }

  propogateCode = code => {
    this.props.propogateCode(code)
  }

  componentDidMount = () => {
    const { location } = this.props
    const search = qs.parse(location.search)
    const code = search['?code']
    this.setState(() => {
      return { code }
    })
    this.propogateCode(code)
  }

  render() {
    return (
      <div className="Auth">
	Redirected from Github. Code: {this.state.code}
      </div>
    )
  }
}

export default withRouter(Auth)
