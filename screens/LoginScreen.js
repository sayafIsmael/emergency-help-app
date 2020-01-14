import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage
} from 'react-native'
import axios from 'axios'
import { moderateScale } from 'react-native-size-matters'
import { apiPrefix } from './../helper'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
      error: false
    }
    this.checkAuth()
  }

  static navigationOptions = {
    header: null
  }

  checkAuth = async () =>{
    let token = await AsyncStorage.getItem("token")
    if(token){
      this.props.navigation.navigate('App')
    }
  }

  //Login User to the app
  login = async () => {
    try {
      let user = {
        email: this.state.email,
        password: this.state.password
      }
      if (user.email && user.password) {
        let response = await axios.post(apiPrefix + "login", user,
          headers = {
            'Accept': 'application/json',
            // 'Content-Type': 'application/json'
          });
        console.log("Response jsoon: ", response)
        let data = response.data
        if (data.access_token) {
          AsyncStorage.setItem("token", data.access_token)
          this.props.navigation.navigate('App')
        } else {
          this.setState({ error: "Sorry something went wrong. Please try again." })
        }
      }
      this.setState({error: "Please input all fields"})
    } catch (error) {
      console.log(error)
      this.setState({ error: "Sorry something went wrong. Please try again." })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={{
            width: moderateScale(300),
            height: moderateScale(100),
            backgroundColor: 'white',
            marginBottom: moderateScale(30),
            borderRadius: moderateScale(20)
          }}
          source={require('./../public/images/logo.png')}
        />

        <TextInput
          style={styles.input}
          keyboardType={'email-address'}
          placeholder="email"
          placeholderTextColor="white"
          returnKeyType={'next'}
          value={this.state.email}
          onChangeText={txt => this.setState({ email: txt })}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          placeholderTextColor="white"
          returnKeyType={'go'}
          value={this.state.password}
          onChangeText={txt => this.setState({ password: txt })}
          secureTextEntry={true}
        />

        {this.state.error && <Text style={{ color: 'red', paddingBottom: moderateScale(20) }}>{this.state.error}</Text>}

        <TouchableOpacity style={styles.loginButton}
          onPress={() => this.login()}
        >
          <Text style={styles.buttonTxt}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => this.props.navigation.navigate('Registration')}
        >
          <Text style={styles.buttonTxt}>Register</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000'
  },
  input: {
    backgroundColor: '#262626',
    fontSize: moderateScale(17),
    paddingLeft: moderateScale(20),
    width: '80%',
    color: 'white',
    marginBottom: moderateScale(25),
    borderRadius: moderateScale(8)
  },
  loginButton: {
    width: '80%',
    backgroundColor: '#46A5FF',
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(20)
  },
  registerButton: {
    width: '80%',
    backgroundColor: '#15BA50',
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10)
  },
  buttonTxt: {
    color: 'white',
    fontSize: moderateScale(18)
  }

})
