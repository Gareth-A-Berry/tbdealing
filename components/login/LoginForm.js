import React, { Component } from 'react'
import { View , Text, ImageBackground, Image} from 'react-native'
import { Card, CardSection, Input, Button, Spinner} from '../common/index'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../../actions/index'
import background from '../../assets/loginPage.jpg'
import logo from '../../assets/logo.png'

class LoginForm extends Component {

  onEmailChange(text) {
      this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
  const { email, password } = this.props
    this.props.loginUser({email, password})
  }

  renderButton() {
    if (this.props.loading) {
      return (
          <Spinner size={1}/>
      )
    } else {
      return (
          <Button
              bordered
              onPress={this.onButtonPress.bind(this)}
          >
            Login
          </Button>
      )
    }
  }

  renderError() {
    if (this.props.error) {
      return (
          <View>
            <Text style={styles.error}>
              {this.props.error}
            </Text>
          </View>
      )
    }
  }
  render() {
    return (
        <ImageBackground style={styles.backgroundImage} source={background}>
          <View style={styles.logo}>
            <Image resizeMode={'contain'} source={logo} style={{height: 100, width: 100}} />
          </View>
          <View style={{flex: 1}}>
            <Input
                placeholder={'user@example.com'}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
                style={styles.input}
                placeholderColor={'#fff'}
            />
            <Input
                secureText
                placeholder={'password'}
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
                style={styles.input}
                placeholderColor={'#fff'}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={{flex: 0.2}}>
              {this.renderError()}
            </View>
            <View style={{flex: 0.8}}>
              {this.renderButton()}
            </View>
          </View>
        </ImageBackground>
    )
  }
}

const styles = {
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1},
  input: {
    borderBottomColor: '#000'
  },
  error: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = state => {
  return {
    email: state.authentication.email,
    password: state.authentication.password,
    error: state.authentication.error,
    loading: state.authentication.loading,
  }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)