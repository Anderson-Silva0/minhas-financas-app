import React, { Component } from 'react'

import 'bootswatch/dist/flatly/bootstrap.css'
import Login from './views/login'
import './custom.css'

class App extends Component {

    render(){
      return (
        <div>
          <Login />
        </div>
      )
    }
}

export default App
