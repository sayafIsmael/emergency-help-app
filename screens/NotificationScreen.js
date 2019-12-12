import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator
} from 'react-native'

import FeatherIcon from 'react-native-vector-icons/Feather'

import { moderateScale } from 'react-native-size-matters'


const burgerIcon = (
  <FeatherIcon name='menu' size={moderateScale(30)} color={'white'} />
)

export default class NotificationScreen extends React.Component {
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
        {/* <View style={styles.header}>
          <Text style={styles.headerTxt}>NOTIFICATIONS</Text>
        </View> */}
        <Image style={styles.notfiyImage} source={require('./../public/images/notification.png')} />

        <View style={styles.noNotification}>
          <Text style={styles.noNotificationTxt}>NO NOTIFICATION</Text>
          <Text style={styles.noNotificationTxt}>AT THIS MOMENT</Text>
        </View>

        <View style={styles.willNotify}>
          <Text style={styles.willNotifyTxt}>We will notify you when nearby a</Text>
          <Text style={styles.willNotifyTxt}>situation happens around you and your</Text>
          <Text style={styles.willNotifyTxt}>inner circle. News and community</Text>
          <Text style={styles.willNotifyTxt}>updates will also be sent to you.</Text>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000'
  },
  header: {
    backgroundColor: '#262626',
    justifyContent: 'center',
    height: moderateScale(50),
    alignItems: 'center',
    width: '100%',
    marginBottom: 'auto'
  },
  headerTxt: {
    color: 'white'
  },
  notfiyImage: {
    height: moderateScale(200),
    width: moderateScale(200)
  },
  noNotification: {
    paddingTop: moderateScale(50)
  },
  noNotificationTxt: {
    color: 'white'
  },
  willNotify: {
    paddingVertical: moderateScale(50)
  },
  willNotifyTxt: {
    color: '#6F7074',
    textAlign: 'center'
  }

})
