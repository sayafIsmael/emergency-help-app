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
import Modal from "react-native-modal";
import feeds from './../../dummy/feeds';
import areas from './../../dummy/areas';
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { moderateScale } from 'react-native-size-matters'
import FeedDetailsScreen from './FeedDetailsScreen'
import { apiPrefix } from './../../helper'
import axios from 'axios'
import { Wave } from 'react-native-animated-spinkit'
import moment from 'moment'
import Spinner from 'react-native-loading-spinner-overlay';

export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: false,
      showDetails: false,
      allAlerts: [],
      alert: [],
      loadingAlert: false,
      selectedCity: null,
      cities: []
    }
    this.fetchAlert()
    this.renderAreas()
  }



  fetchAlert = async (cityId = null) => {
    try {
      console.log(cityId)
      this.setState({ loadingAlert: true })
      let token = await AsyncStorage.getItem('token')

      let url = cityId ? `${apiPrefix}alerts?city_id=${cityId}` : `${apiPrefix}alerts`
      let headers = {
        Accept: 'application / json',
        // 'Content-Type': 'application / json',
        Authorization: `Bearer ${token}`
      }
      let alerts = await axios({
        method: 'get',
        url: url,
        headers: headers,
      })

      console.log(`All alerts from response ${JSON.stringify(alerts.data.data)}`)
      this.setState({ allAlerts: alerts.data.data, loadingAlert: false })
    } catch (error) {
      console.log(error)
    }
  }

  static navigationOptions = {
    header: null
  }

  /*
  **Close Area Sorting Modal
  */
  closeSorting = () => {
    this.setState({ sort: false })
  }

  /*
  **Location sorting modal
  */
  locationSortingModal = () => {
    let active = <MaterialCommunityIcons name={'checkbox-marked-circle'} size={moderateScale(16)} color={'#13B948'} />;
    return (
      <Modal
        testID={'sortLocation'}
        isVisible={this.state.sort}
        swipeDirection={['down']}
        style={styles.sortModal}
        backdropColor={'transparent'}
        onBackdropPress={this.closeSorting}
        onBackButtonPress={this.closeSorting}
        onSwipeComplete={this.closeSorting}
      >
        <View style={styles.sortLocationsContainer}>
          <View style={styles.modalTopbar}>
            <FontAwesome5Icon name={'minus'} size={moderateScale(50)} color={'#323133'} />
          </View>
          <ScrollView>
            <TouchableOpacity style={styles.areaContainer} onPress={() => {this.closeSorting(); this.setState({ selectedCity: null }); this.fetchAlert(null)}}>
              <Text style={!this.state.selectedCity ? styles.areaSelectedTxt : styles.areaTxt}>Global</Text>
              {!this.state.selectedCity ? active : null}
            </TouchableOpacity>
            {this.state.cities.map((city, index) => {
              return (
                <TouchableOpacity key={index} style={styles.areaContainer} onPress={() => { this.closeSorting(); this.setState({ selectedCity: city.name }); this.fetchAlert(city.id) }}>
                  <Text style={city.name == this.state.selectedCity ? styles.areaSelectedTxt : styles.areaTxt}>{city.name}</Text>
                  {city.name == this.state.selectedCity ? active : null}
                </TouchableOpacity>
              )
            })}
          </ScrollView>
        </View>
      </Modal>
    )
  }

  /**
   * Areas for sorting
   */
  renderAreas = async () => {
    try {
      let token = await AsyncStorage.getItem('token')
      let url = `${apiPrefix}cities`
      let headers = {
        Accept: 'application / json',
        Authorization: `Bearer ${token}`
      }
      let response = await axios({
        method: 'get',
        url: url,
        headers: headers,
      })
      let cities = response.data.data
      if (cities.length > 0) {
        this.setState({ cities })

      }
    } catch (error) {
      console.log(error)
    }

  }

  /*
  **Close Feed Details Modal
  */
  closeFeedDetails = () => {
    this.setState({ showDetails: false })
  }

  /*
  **Feed Details Modal
  */
  feedDetailsModal = () => {
    return (
      <Modal
        testID={'showDetails'}
        isVisible={this.state.showDetails}
        // swipeDirection={['down']}
        style={styles.feedDetailsModal}
        backdropColor={'transparent'}
        onBackdropPress={this.closeFeedDetails}
        onBackButtonPress={this.closeFeedDetails}
        onSwipeComplete={this.closeFeedDetails}
        supportedOrientations={['portrait', 'landscape']}
      >
        <FeedDetailsScreen alert={this.state.alert} />
      </Modal>
    )
  }

  showDetails = async (id) => {
    try {
      this.setState({ loadingAlert: true })
      let token = await AsyncStorage.getItem('token')

      let url = `${apiPrefix}alerts/${id}`
      let headers = {
        Accept: 'application / json',
        // 'Content-Type': 'application / json',
        Authorization: `Bearer ${token}`
      }
      let alert = await axios({
        method: 'get',
        url: url,
        headers: headers,
      })

      console.log(`Alert from response ${JSON.stringify(alert.data.data)}`)

      if (alert.data.data) {
        this.setState({ alert: alert.data.data, showDetails: true, loadingAlert: false })
      }

    } catch (error) {
      console.log(error)
    }
  }
  /**
   * All posts
   */
  renderFeeds = () => {
    return this.state.allAlerts.map((feed, index) => {
      return (
        <TouchableOpacity key={index} style={styles.feedContainer} onPress={() => this.showDetails(feed.id)}>
          <Text style={styles.lightText}>{moment(feed.updated_at).format('MMMM Do, h:mm a')}</Text>
          <View>
            <Text style={styles.feedTitle}>{feed.title}</Text>
          </View>
          <Text style={styles.lightText}>{feed.location}</Text>
          <View>
            <Image
              style={styles.feedImage}
              source={{ uri: feed.thumb }}
            />
          </View>
          <Text style={styles.lightText}>{/*feed.details*/}</Text>
          <View style={styles.feedButtonsContainer}>
            <View style={styles.feedBtnsHalf}>
              <TouchableOpacity style={styles.feedBtn}>
                <Fontisto name={'like'} style={styles.headerArroow} size={moderateScale(20)} color={'#03a1fc'} />
                <Text style={styles.btnTxt}>{feed.likes_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.feedBtn}>
                <FontAwesomeIcon name={'commenting'} style={styles.commentIcon} size={moderateScale(20)} color={'white'} />
                <Text style={styles.btnTxt}>{feed.comments_count}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.feedBtn1}>
              <Fontisto name={'share-a'} size={moderateScale(20)} color={'white'} />
              <Text style={styles.btnTxt}>SHARE</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      )
    })
  }


  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator size="large" color={"white"} /> */}

        <TouchableOpacity style={styles.header} onPress={() => this.setState({ sort: !this.state.sort })}>
          <Text style={styles.headerTxt}>{this.state.selectedCity ? this.state.selectedCity : "Global"}</Text>
          <MaterialIcon name={'keyboard-arrow-down'} style={styles.headerArroow} size={moderateScale(25)} color={'#5E5E5E'} />
        </TouchableOpacity>
        <Spinner
          visible={this.state.loadingAlert}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animation={'fade'}
        />
        <ScrollView>
          {this.renderFeeds()}
          {!this.state.allAlerts.length && <View style={{ alignSelf: 'center', marginTop: moderateScale(250) }}>
            <Wave size={48} color="#FFF" />
          </View>}
        </ScrollView>
        {this.locationSortingModal()}
        {this.feedDetailsModal()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000'
  },
  header: {
    backgroundColor: '#262626',
    justifyContent: 'center',
    height: moderateScale(50),
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
  },
  headerTxt: {
    color: 'white'
  },
  headerArroow: {
  },
  feedContainer: {
    backgroundColor: '#1B191B',
    marginTop: moderateScale(20),
    padding: moderateScale(20),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(15)
  },
  lightText: {
    color: '#6F7074',
  },
  feedTitle: {
    color: 'white'
  },
  feedImage: {
    width: '100%',
    height: moderateScale(160),
    marginVertical: moderateScale(10)
  },
  feedButtonsContainer: {
    flexDirection: 'row',
    paddingTop: moderateScale(20),
    justifyContent: 'space-between',
  },
  feedBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feedBtn1: {
    flexDirection: 'row',
    alignItems: 'center',
    left: moderateScale(20)
  },
  btnTxt: {
    color: '#6F7074',
    fontSize: moderateScale(12),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(20)
  },
  feedBtnsHalf: {
    flexDirection: 'row'
  },
  commentIcon: {
    transform: [{ scaleX: -1 }]
  },
  sortModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  sortLocationsContainer: {
    backgroundColor: '#262526',
    height: moderateScale(685),
    borderTopRightRadius: moderateScale(35),
    borderTopLeftRadius: moderateScale(35)
  },
  modalTopbar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  areaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(25),
    paddingBottom: moderateScale(40)
  },
  areaSelectedTxt: {
    color: 'white',
    paddingRight: moderateScale(15)
  },
  areaTxt: {
    color: '#686768',
    paddingRight: moderateScale(15)
  },
  feedDetailsModal: {
    margin: 0,
    flex: 1
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})
