import React from 'react'
import qs from 'qs'

const REDIRECT_ROUTE = 'https://github.com/login/oauth/authorize?'
const CURRENT_ROUTE = window.location.origin

const queryString = qs.stringify({
  client_id: '68b204d5f66ea6dac2cd',
  client_secret: '823de4aea15aecb76ff8ca926abd1a3e9d63716b',
  redirect_uri: CURRENT_ROUTE + '/auth/callback',
  scope: 'user,repo'
})

const Login = props => {
  return (
    <div className="Login">
      Login route
      {window.location = `${REDIRECT_ROUTE}${queryString}`}
    </div>
  )
}

export default Login
