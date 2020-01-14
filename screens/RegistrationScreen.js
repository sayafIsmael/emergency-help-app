import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    ScrollView,
    Alert
} from 'react-native'
import axios from 'axios'
import { apiPrefix } from './../helper'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { moderateScale } from 'react-native-size-matters'


export default class RegistrationScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            first_name: null,
            last_name: null,
            location: null,
            email: null,
            password: null,
            confirmPassword: null,
            phonenumber: null,
            error: null
        }
    }

    static navigationOptions = {
        header: null
    }

    //Register User
    register = async () => {
        try {
            let user = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone_number: this.state.phonenumber,
                location: this.state.location,
                email: this.state.email,
                password: this.state.password,
                password_confirmation: this.state.confirmPassword,
            }
            if (user.email
                && user.location
                && user.password
                && user.password_confirmation
                && user.first_name
                && user.last_name
                && user.phone_number) {
                let response = await axios.post(apiPrefix + "register", user,
                    headers = {
                        'Accept': 'application/json',
                        // 'Content-Type': 'application/json'
                    });
                console.log("Response jsoon: ", response)
                let data = response.data
                if (data.token) {
                    this.props.navigation.navigate('Login')
                    Alert.alert("Registration successfull", "Please login.")
                } else {
                    this.setState({ error: "Something wrong." })
                }
            }else{
                this.setState({error: "Please input all fields"})
            }

        } catch (error) {
            console.log(error)
            this.setState({ error: "Something wrong." })
        }

    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <Image
                        style={{
                            width: moderateScale(300),
                            height: moderateScale(100),
                            borderRadius: moderateScale(20),
                            backgroundColor: 'white',
                            marginBottom: moderateScale(30),
                            marginTop: moderateScale(30)
                        }}
                        source={require('./../public/images/logo.png')}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        placeholder="First Name"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.first_name}
                        onChangeText={txt => this.setState({ first_name: txt })}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        placeholder="Last Name"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.last_name}
                        onChangeText={txt => this.setState({ last_name: txt })}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        placeholder="Phone Number"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.phonenumber}
                        onChangeText={txt => this.setState({ phonenumber: txt })}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType={'default'}
                        placeholder="Location"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.location}
                        onChangeText={txt => this.setState({ name: txt })}
                    />
                    <TextInput
                        style={styles.input}
                        keyboardType={'email-address'}
                        placeholder="Email"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.email}
                        onChangeText={txt => this.setState({ email: txt })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="white"
                        returnKeyType={'next'}
                        value={this.state.password}
                        onChangeText={txt => this.setState({ password: txt })}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        placeholderTextColor="white"
                        returnKeyType={'go'}
                        value={this.state.confirmPassword}
                        onChangeText={txt => this.setState({ confirmPassword: txt })}
                        secureTextEntry={true}
                    />
                    {this.state.error && <Text style={{
                        color: 'red',
                        textAlign: 'center',
                        paddingBottom: moderateScale(20)
                    }}>{this.state.error}</Text>}

                    <TouchableOpacity style={styles.registerButton}
                        onPress={() => this.register()}
                    >
                        <Text style={styles.buttonTxt}>Register</Text>
                    </TouchableOpacity>
                </ScrollView>


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
        width: '100%',
        color: 'white',
        marginBottom: moderateScale(25),
        borderRadius: moderateScale(8)
    },
    registerButton: {
        width: '100%',
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
