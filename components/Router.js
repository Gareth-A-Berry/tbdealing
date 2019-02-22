import React, { Component } from 'react'
import { Scene, Router } from 'react-native-router-flux'
import LoginForm from './login/LoginForm'
import Home from './home/Home'

class RouterComponent extends Component {
  render() {
    return (
        <Router>
          <Scene key={'root'} hideNavBar>
            <Scene
                key={'auth'}
            >
              <Scene
                  key={'login'}
                  component={LoginForm}
                  title={'TradeBase Dealing'}
                  initial
              />
            </Scene>
            <Scene
                key={'main'}
                component={Home}
            >
            </Scene>
          </Scene>
        </Router>
    )
  }
}

export default RouterComponent