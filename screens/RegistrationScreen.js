import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { moderateScale } from 'react-native-size-matters'


export default class RegistrationScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            location: null,
            email: null,
            password: null,
            confirmPassword: null
        }
    }

    static navigationOptions = {
        header: null
    }

    //Register User
    register = () => {
        this.props.navigation.navigate('Login')
    }

    render() {
        return (
            <View style={styles.container}>
                <Image
                    style={{
                        width: moderateScale(100),
                        height: moderateScale(100)
                    }}
                    source={require('./../public/images/logo.jpg')}
                />
                <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="name"
                    placeholderTextColor="white"
                    returnKeyType={'next'}
                    value={this.state.name}
                    onChangeText={txt => this.setState({ name: txt })}
                />
                <TextInput
                    style={styles.input}
                    keyboardType={'default'}
                    placeholder="location"
                    placeholderTextColor="white"
                    returnKeyType={'next'}
                    value={this.state.name}
                    onChangeText={txt => this.setState({ name: txt })}
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
                    returnKeyType={'next'}
                    value={this.state.password}
                    onChangeText={txt => this.setState({ password: txt })}
                    secureTextEntry={true}
                />
                <TextInput
                    style={styles.input}
                    placeholder="confirm password"
                    placeholderTextColor="white"
                    returnKeyType={'go'}
                    value={this.state.confirmPassword}
                    onChangeText={txt => this.setState({ confirmPassword: txt })}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.registerButton}
                    onPress={() => this.register()}
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
