import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { connect } from 'react-redux'
import {logout} from '../../actions'
import {Button} from '../common'
class Home extends Component{
  render() {
    return(
        <View style={styles.container}>
          <Text>
            Welcome to TradeBase!
          </Text>
          <Button
              onPress={() => this.props.logout() }
          >
            Logout
          </Button>
        </View>
        )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default connect(null, { logout })(Home)