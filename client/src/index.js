import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import App from './components/App/App'

import registerServiceWorker from './registerServiceWorker'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <Router>
    <Route path="/" component={App} />
  </Router>
  , document.getElementById('root')
)
registerServiceWorker()

