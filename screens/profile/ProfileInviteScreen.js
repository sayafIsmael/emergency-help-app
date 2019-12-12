import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'

import { moderateScale } from 'react-native-size-matters'
import { TextInput } from 'react-native-gesture-handler'


export default class ProfileEditScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <View style={styles.container}>
               
               
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

})
