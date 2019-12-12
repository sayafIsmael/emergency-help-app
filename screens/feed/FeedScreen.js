import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
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


export default class FeedScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: false,
      showDetails: false
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
            {this.renderAreas()}
          </ScrollView>
        </View>
      </Modal>
    )
  }

  /**
   * Areas for sorting
   */
  renderAreas = () => {
    let active = <MaterialCommunityIcons name={'checkbox-marked-circle'} size={moderateScale(16)} color={'#13B948'} />;
    return areas.map((area, index) => {
      return (
        <TouchableOpacity style={styles.areaContainer} onPress={this.closeSorting}>
          <Text style={area.selected == "true" ? styles.areaSelectedTxt : styles.areaTxt}>{area.name}</Text>
          {area.selected == "true" ? active : null}
        </TouchableOpacity>
      )
    })
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
      >
        <FeedDetailsScreen/>
      </Modal>
    )
  }

  /**
   * All posts
   */
  renderFeeds = () => {
    return feeds.map((feed, index) => {
      return (
        <TouchableOpacity style={styles.feedContainer} onPress={() => this.setState({ showDetails: true })}>
          <Text style={styles.lightText}>{feed.time}</Text>
          <View>
            <Text style={styles.feedTitle}>{feed.title}</Text>
          </View>
          <Text style={styles.lightText}>{feed.location}</Text>
          <View>
            <Image
              style={styles.feedImage}
              source={{ uri: feed.file }}
            />
          </View>
          <Text style={styles.lightText}>{feed.details}</Text>
          <View style={styles.feedButtonsContainer}>
            <View style={styles.feedBtnsHalf}>
              <TouchableOpacity style={styles.feedBtn}>
                <FontAwesomeIcon name={'user'} style={styles.headerArroow} size={moderateScale(20)} color={'#3C84AE'} />
                <Text style={styles.btnTxt}>{feed.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.feedBtn}>
                <FontAwesomeIcon name={'commenting'} style={styles.commentIcon} size={moderateScale(20)} color={'white'} />
                <Text style={styles.btnTxt}>{feed.comments}</Text>
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
          <Text style={styles.headerTxt}>GLOBAL</Text>
          <MaterialIcon name={'keyboard-arrow-down'} style={styles.headerArroow} size={moderateScale(25)} color={'#5E5E5E'} />
        </TouchableOpacity>
        <ScrollView>
          {this.renderFeeds()}
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
    justifyContent: 'flex-end',
    margin: 0,
  },

})
