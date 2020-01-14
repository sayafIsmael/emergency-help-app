import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import { Switch } from 'react-native-switch';
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

import { moderateScale } from 'react-native-size-matters'


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      profilePrivate: false
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
            onPress={() => this.props.navigation.navigate('ProfileEdit')}
          >
            <Text style={styles.headerButton}>EDIT</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('ProfileEdit')}
            >
              <Image style={styles.avatar} source={require('./../../public/images/profile.png')} />
            </TouchableOpacity>
          </View>

          <View style={styles.accountWidget}>
            <TouchableOpacity style={styles.widgetContainer}>
              <Text style={styles.widgetName}>Communities</Text>
              <Text style={styles.widgetDetail}>PLACES</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.widgetContainer}>
              <Text style={styles.widgetName}>Contacts</Text>
              <Text style={styles.widgetDetail}>INNER CIRCLE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.privateSetting}>
            <View style={styles.privateSettingTxt}>
              <Text style={styles.widgetName}>Make my profile private</Text>
              <AntDesignIcon name='questioncircleo' size={moderateScale(20)} color={'#444444'} />
            </View>
            <Switch
              value={this.state.profilePrivate}
              onValueChange={(val) => this.setState({ profilePrivate: val })}
              disabled={false}
              activeText={'On'}
              inActiveText={'Off'}
              circleSize={moderateScale(30)}
              barHeight={moderateScale(20)}
              circleBorderWidth={moderateScale(3)}
              backgroundActive={'#1E1F21'}
              backgroundInactive={'#1E1F21'}
              circleActiveColor={'#BABABA'}
              circleInActiveColor={'#BABABA'}
              changeValueImmediately={true}
              changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
              innerCircleStyle={{ alignItems: "center", justifyContent: "center" }} // style for inner animated circle for what you (may) be rendering inside the circle
              outerCircleStyle={{}} // style for outer animated circle
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={moderateScale(2)} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
              switchRightPx={moderateScale(2)} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
              switchWidthMultiplier={moderateScale(2)} // multipled by the `circleSize` prop to calculate total width of the Switch
            />
          </View>

          <View style={styles.totalVerified}>
            <Text style={styles.totalVfTxt}>TOTAL</Text>
            <Text style={styles.totalVfTxt}>VERIFIED</Text>
            <Text style={styles.totalVfTxt}>VIEWS</Text>
          </View>
          <View style={styles.hr}></View>

          <View style={styles.bottomMidItem}>
            <TouchableOpacity style={styles.bottomMidbtn}>
              <MaterialIcon name={'person-add'} style={styles.bottomMidIcon1} size={moderateScale(30)} color={'#35B852'} />
              <Text style={styles.widgetName}>INVITE FRIENDS</Text>
              <MaterialIcon name={'keyboard-arrow-right'} style={styles.bottomMidArrowIcon} size={moderateScale(25)} color={'#5E5E5E'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomMidbtn}>
              <AntDesignIcon name={'setting'} style={styles.bottomMidIcon} size={moderateScale(30)} color={'#35B852'} />
              <Text style={styles.widgetName}>APP SEETINGS</Text>
              <MaterialIcon name={'keyboard-arrow-right'} style={styles.bottomMidArrowIcon} size={moderateScale(25)} color={'#5E5E5E'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomMidbtn}>
              <AntDesignIcon name='questioncircleo' style={styles.bottomMidIcon} size={moderateScale(30)} color={'#35B852'} />
              <Text style={styles.widgetName}>GET SUPPORT</Text>
              <MaterialIcon name={'keyboard-arrow-right'} style={styles.bottomMidArrowIcon} size={moderateScale(25)} color={'#5E5E5E'} />
            </TouchableOpacity>
          </View>
          <View style={styles.socialBtns}>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesomeIcon name={'facebook'} style={styles.bottomMidIcon} size={moderateScale(25)} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesignIcon name={'twitter'} style={styles.bottomMidIcon} size={moderateScale(25)} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <AntDesignIcon name={'instagram'} style={styles.bottomMidIcon} size={moderateScale(25)} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <FontAwesome5Icon name={'medium-m'} style={styles.bottomMidIcon} size={moderateScale(25)} color={'white'} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity>
              <Text style={styles.footerText}>TERMS AND CONDITION</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={styles.footerText}>PRIVACY POLICY</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={() => {AsyncStorage.removeItem("token"); this.props.navigation.navigate("Login")}}
            >
              <Text style={styles.footerText}>LOGOUT</Text>
            </TouchableOpacity>
            <Text style={styles.footerTextVrsn}>v0.1</Text>
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
    justifyContent: 'flex-end',
    height: moderateScale(50),
    alignItems: 'center',
    width: '100%'
  },
  headerButton: {
    color: 'white',
    paddingHorizontal: moderateScale(30)
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
  accountWidget: {
    backgroundColor: '#1A1A1A',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: moderateScale(70),
    width: moderateScale(280),
    marginVertical: moderateScale(10),
    borderRadius: moderateScale(20),
    alignSelf: 'center'
  },
  widgetContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  widgetName: {
    color: 'white',
    paddingRight: moderateScale(10)
  },
  widgetDetail: {
    color: '#3F3F3F',
    fontSize: moderateScale(10)
  },
  privateSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: moderateScale(25),
    alignItems: 'center',
    width: moderateScale(280),
    alignSelf: 'center'
  },
  privateSettingTxt: {
    flexDirection: 'row'
  },
  totalVerified: {
    justifyContent: 'space-between',
    marginVertical: moderateScale(10),
    alignItems: 'center',
    width: moderateScale(280),
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: moderateScale(20)
  },
  hr: {
    borderBottomColor: '#313236',
    borderBottomWidth: moderateScale(2),
    marginHorizontal: moderateScale(20)
  },
  totalVfTxt: {
    color: '#6F7074',
    fontSize: moderateScale(10),
    paddingVertical: moderateScale(30)
  },
  bottomMidbtn: {
    flexDirection: 'row',
    paddingTop: moderateScale(25),
    alignItems: 'center'
  },
  bottomMidIcon1: {
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(15),
    transform: [{ scaleX: -1 }],
    left: moderateScale(16)
  },
  bottomMidIcon: {
    paddingLeft: moderateScale(30),
    paddingRight: moderateScale(15),
  },
  bottomMidArrowIcon: {
    marginLeft: 'auto',
    paddingRight: moderateScale(30)
  },
  socialBtns: {
    borderColor: '#313236',
    borderBottomWidth: moderateScale(2),
    borderTopWidth: moderateScale(2),
    marginHorizontal: moderateScale(40),
    marginVertical: moderateScale(25),
    height: moderateScale(60),
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  socialIcon: {
    marginTop: 'auto',
    marginBottom: 'auto'
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  footerText: {
    color: '#6F7074',
    fontSize: moderateScale(10),
    paddingTop: moderateScale(30)
  },
  footerTextVrsn: {
    color: '#6F7074',
    fontSize: moderateScale(10),
    paddingTop: moderateScale(50)
  }

})
