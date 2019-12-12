import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native'

import { moderateScale } from 'react-native-size-matters'
import { TextInput } from 'react-native-gesture-handler'


export default class ProfileEditScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            profilePrivate: false,
            email: null,
            username: null,
            location: null,
            mission: null
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('ProfileHome')}
                    >
                        <Text style={styles.headerButton}>CANCEL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={styles.headerButton1}>SAVE</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.inputsContainer}>
                    <View style={styles.avatarContainer}>
                        <TouchableOpacity>
                            <Image style={styles.avatar} source={require('./../../public/images/uploadAvatar.png')} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.inputlabel}>USERNAME</Text>
                        <TextInput
                            placeholder={"enter username"}
                            placeholderTextColor='#4C4D51'
                            style={styles.input}
                            returnKeyType={'next'}
                            value={this.state.username}
                            onChangeText={txt => this.setState({ username: txt })}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputlabel}>LOCATION</Text>
                        <TextInput
                            placeholder={"enter location"}
                            placeholderTextColor='#4C4D51'
                            style={styles.input}
                            returnKeyType={'next'}
                            value={this.state.location}
                            onChangeText={txt => this.setState({ location: txt })}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputlabel}>EMAIL</Text>
                        <TextInput
                            placeholder={"enter email"}
                            placeholderTextColor='#4C4D51'
                            style={styles.input}
                            returnKeyType={'next'}
                            value={this.state.email}
                            onChangeText={txt => this.setState({ email: txt })}
                        />
                    </View>
                    <View>
                        <Text style={styles.inputlabel}>MISSION</Text>
                        <TextInput
                            placeholder={"enter mission"}
                            placeholderTextColor='#4C4D51'
                            style={styles.input}
                            returnKeyType={'next'}
                            value={this.state.mission}
                            onChangeText={txt => this.setState({ mission: txt })}
                        />
                    </View>

                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#000000'
    },
    header: {
        backgroundColor: '#262626',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: moderateScale(50),
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: moderateScale(30)

    },
    headerButton: {
        color: 'white',
    },
    headerButton1: {
        color: '#4C4D51',
    },
    avatarContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: moderateScale(20),
    },
    avatar: {
        height: moderateScale(100),
        width: moderateScale(100)
    },
    inputlabel: {
        color: '#4C4D51',
    },
    inputsContainer: {
        width: '100%',
        paddingHorizontal: moderateScale(30)
    },
    input: {
        paddingHorizontal: moderateScale(20),
        marginBottom: moderateScale(40),
        fontSize: moderateScale(18),
        backgroundColor: "#262626",
        marginTop: moderateScale(10),
        borderRadius: moderateScale(10),
        color: 'white'
    }

})
