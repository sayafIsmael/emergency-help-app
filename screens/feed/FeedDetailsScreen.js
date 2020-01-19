import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  TextInput,
  AsyncStorage
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as mapStyle from './../styles/customMapStyle';
import Modal from "react-native-modal";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { moderateScale } from 'react-native-size-matters'
// import Video from 'react-native-af-video-player';
// import Video from 'react-native-video';
import feedDetails from './../../dummy/feedDetails';
import feedComments from './../../dummy/feedComments';
import moment from 'moment'
import { apiPrefix } from './../../helper'
import axios from 'axios'
import Spinner from 'react-native-loading-spinner-overlay';


export default class FeedDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      sort: false,
      fileType: 'location',
      tabSelected: 'details',
      enabled: true,
      comment: null,
      comments: null,
      details: null,
      userId: null,
      loadingAlert: null
    }
    this.fetchDetailsComments()
    this.getUser()
  }

  static navigationOptions = {
    header: null,
  }
  /**Get user details */
  getUser = async () => {
    try {
      let token = await AsyncStorage.getItem('token')

      let url = `${apiPrefix}me`
      let headers = {
        Accept: 'application / json',
        // 'Content-Type': 'application / json',
        Authorization: `Bearer ${token}`
      }
      let user = await axios({
        method: 'get',
        url: url,
        headers: headers,
      })

      console.log(`All user from response ${JSON.stringify(user.data)}`)
      this.setState({ userId: user.data.id })
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Show feed media and location
   */
  renderPreview = () => {
    let { alert } = this.props
    if (this.state.fileType === "location") {
      return (
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsMyLocationButton={true}
            region={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            customMapStyle={mapStyle.customStyle}
          >
          </MapView>
        </View>
      )
    }
    else if (this.state.fileType === "image") {
      return (
        <Image
          style={styles.feedImage}
          source={{ uri: "https://ux.princeton.edu/sites/ux2018/files/resize/styles/pwds_featured_image/public/media/what-kind-of-problem-591x358.jpg?itok=gC_NzQUX" }}
        />
      )

    } else if (this.state.fileType === "video") {
      // return(
      // <View style={styles.container}>
      //  {/* <Video source={{uri: "https://youtu.be/kXwA6wEUfQA"}}   // Can be a URL or a local file.
      //    /> */}
      //    <Video source={{uri: "https://youtu.be/kXwA6wEUfQA"}} 
      //    style={{
      //     position: 'absolute',
      //     top: 0,
      //     left: 0,
      //     bottom: 0,
      //     right: 0,
      //   }}
      //    />


      // </View>
      // )

    }
  }

  /**
   * Slide icon of preview
   */
  slideIcons = () => {
    return (
      <View style={styles.slideIconsContainer}>
        <TouchableOpacity style={styles.slideIcon} onPress={() => this.setState({ fileType: 'location' })}>
          <FontAwesome5Icon name={'map-marker-alt'} size={moderateScale(16)} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.slideIcon} onPress={() => this.setState({ fileType: 'image' })}>
          <FontAwesome5Icon name={'image'} size={moderateScale(16)} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.slideIcon}>
          <FontAwesome5Icon name={'file-video'} size={moderateScale(16)} color={'white'} />
        </TouchableOpacity>
      </View>
    )
  }

  fetchDetailsComments = async () => {
    try {
      let { alert } = this.props

      let token = await AsyncStorage.getItem('token')

      let url = `${apiPrefix}alerts/${alert.id}/comments`
      let detailsUrl = `${apiPrefix}alerts/${alert.id}/updates`
      let headers = {
        Accept: 'application / json',
        // 'Content-Type': 'application / json',
        Authorization: `Bearer ${token}`
      }
      let Comments = await axios({
        method: 'get',
        url: url,
        headers: headers,
      })
      let Details = await axios({
        method: 'get',
        url: detailsUrl,
        headers: headers,
      })

      console.log(`Comments from response ${JSON.stringify(Comments.data.data)}`)
      console.log(`Details from response ${JSON.stringify(Details.data.data)}`)
      let comments = Comments.data.data
      let details = Details.data.data


      if ( details) {
        this.setState({ details })
      }
      if (comments ) {
        this.setState({ comments})
      }

    } catch (error) {
      console.log(error)
    }
  }

  /**
   * Details of a post and commnets
   */

  detailsAndComments = () => {
    if (this.state.tabSelected === 'details' && this.state.details != null && this.state.details != []) {
      return this.state.details.map((feedDetail, index) => {
        return (
          <View key={index} style={styles.feedDetailRow}>
            <View style={styles.feedDetailIcon}>
              <FontAwesomeIcon name={'circle'} size={moderateScale(20)} color={'#62606A'} />
            </View>
            <View style={styles.feedDetailTxt}>
              <Text style={styles.postShortDetailsTxt}>
                {moment(feedDetail.updated_at).format('MMMM Do, h:mm a')}
              </Text>
              <Text style={styles.tabBtnTxtActive}>
                {feedDetail.description}
              </Text>
            </View>
          </View>
        )
      })
    }
    if (this.state.tabSelected === 'details' && this.state.details == null) {
      return (
        <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', paddingTop: moderateScale(60) }}>
          <Text style={styles.tabBtnTxtActive}>
            No data found ...
          </Text>
        </View>
      )
    }

    if (this.state.tabSelected != 'details' && this.state.comments != null && this.state.comments != []) {
      return this.state.comments.map((feedComment, index) => {
        return (
          <View key={index} style={styles.feedDetailRow}>
            <View style={styles.feedDetailIcon}>
              <Image style={styles.avatar} source={require('./../../public/images/profile.png')} />
            </View>
            <View style={styles.feedDetailTxt}>
              <Text style={styles.postShortDetailsTxt}>
                {moment(feedComment.updated_at).format('MMMM Do, h:mm a')} {/*feedComment.location*/}
              </Text>
              <Text style={styles.tabBtnTxtActive}>
                {feedComment.body}
              </Text>
            </View>
          </View>
        )
      })
    }
    if (this.state.tabSelected != 'details' && this.state.Comments == null) {
      return (
        <View style={{ justifyContent: 'center', width: '100%', alignItems: 'center', paddingTop: moderateScale(60) }}>
          <Text style={styles.tabBtnTxtActive}>
            No data found ...
          </Text>
        </View>
      )
    }
  }

  /**Post details or comment */
  postComment = async () => {
    try {
      this.setState({ loadingAlert: true })

      let { alert } = this.props

      let token = await AsyncStorage.getItem('token')
      let url = `${apiPrefix}alerts/${alert.id}/comments`
      console.log(url)
      let headers = {
        Authorization: `Bearer ${token}`
      }
      let Data = await axios({
        method: 'post',
        url: url,
        headers: headers,
        data: {
          comment: this.state.comment
        }
      })

      console.log(`Data from comment post response ${JSON.stringify(Data.data)}`)

      if (Data) {
        this.setState({ loadingAlert: false, comment: null })
        this.fetchDetailsComments()
      }

    } catch (error) {
      console.log(error)
    }
  }


  /**
   * Comment input for comment
   */
  commentBox = () => {
    if (this.state.tabSelected == "comments") {
      return (
        <View style={styles.commentBoxRow}>
          <FontAwesomeIcon name={'commenting'} style={styles.commentIcon} size={moderateScale(22)} color={'white'} />
          <TextInput
            placeholder={"Add a comment"}
            placeholderTextColor='#4C4D51'
            style={styles.input}
            returnKeyType={'done'}
            value={this.state.comment}
            onChangeText={txt => this.setState({ comment: txt })}
            onSubmitEditing={this.postComment}
          />
          <TouchableOpacity onPress={() => this.postComment()}>
            <MaterialCommunityIcons name={'arrow-left-bold-circle'} style={styles.commentIcon} size={moderateScale(25)} color={'white'} />
          </TouchableOpacity>
        </View>
      )
    }
  }

  render() {
    let { alert } = this.props;
    let emptyArray = [];
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loadingAlert}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
          animation={'fade'}
        />
        <ScrollView
          scrollEnabled={this.state.enabled}
        >
          <View style={styles.preview}>
            {this.renderPreview()}
          </View>
          {this.slideIcons()}
          <View style={styles.seconHalf}>
            <View style={styles.detailsTopbar}>
              <FontAwesome5Icon name={'minus'} size={moderateScale(40)} color={'#323133'} />
            </View>
            <View style={styles.postHeaders}>
              <View style={styles.postShortDetails}>
                <Text style={styles.postShortDetailsTxt}>{moment(alert.updated_at, "YYYYMMDD").fromNow()} {/**. 9013.9 mi */}</Text>
                <Text style={styles.postShortDetailsTxt}>From {alert.city.name}</Text>
              </View>
              <Text style={styles.postTitle}>{alert.title}</Text>
              {/* <Text style={styles.postLocation}>McHenry St & S monroe St . Carrolton Ridge</Text> */}
              <View style={styles.buttonRow}>
                <TouchableOpacity style={styles.buttonLikeComment} onPress={() => this.setState({tabSelected: 'details'})}>
                  <Fontisto name={'like'} size={moderateScale(22)} color={'#03a1fc'} />
                  <Text style={styles.buttonTxt}>{alert.likes_count}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonLikeComment} onPress={() => this.setState({tabSelected: 'comments'})}>
                  <FontAwesomeIcon name={'commenting'} style={styles.commentIcon} size={moderateScale(22)} color={'white'} />
                  <Text style={styles.buttonTxt}>{alert.comments_count}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonShare}>
                  <FontAwesomeIcon name={'share'} size={moderateScale(22)} color={'white'} />
                  <Text style={styles.buttonTxt}>SHARE</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.tabBar}>
              <TouchableOpacity style={this.state.tabSelected === 'details' ? styles.tabBtnActive : styles.tabBtnDeActive} onPress={() => this.setState({ tabSelected: 'details' })}>
                <Text style={this.state.tabSelected === 'details' ? styles.tabBtnTxtActive : styles.tabBtnTxtDeActive}>DETAILS</Text>
              </TouchableOpacity>
              <TouchableOpacity style={this.state.tabSelected === 'comments' ? styles.tabBtnActive : styles.tabBtnDeActive} onPress={() => this.setState({ tabSelected: 'comments' })}>
                <Text style={this.state.tabSelected === 'comments' ? styles.tabBtnTxtActive : styles.tabBtnTxtDeActive}>COMMENT</Text>
              </TouchableOpacity>
            </View>
            <ScrollView onTouchStart={(ev) => {
              this.setState({ enabled: false });
            }}
              onMomentumScrollEnd={(e) => { this.setState({ enabled: true }); }}
              onScrollEndDrag={(e) => { this.setState({ enabled: true }); }} >
              {this.detailsAndComments()}
            </ScrollView>
          </View>
          {this.commentBox()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#262426',
    // height: moderateScale(685),
    flex: 1
  },
  mapContainer: {
    width: '100%',
    alignItems: 'center',
    height: moderateScale(330),
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: moderateScale(330),
  },
  feedImage: {
    width: '100%',
    height: moderateScale(330),
  },
  slideIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    bottom: moderateScale(85)
  },
  slideIcon: {
    backgroundColor: '#4D494D',
    padding: moderateScale(12),
    borderRadius: moderateScale(12),
    marginRight: moderateScale(16)
  },
  preview: {
    zIndex: 5
  },
  seconHalf: {
    backgroundColor: 'red',
    bottom: moderateScale(65),
    zIndex: 15,
    borderTopRightRadius: moderateScale(25),
    borderTopLeftRadius: moderateScale(25),
    backgroundColor: '#262426',
    height: moderateScale(670),
  },
  postShortDetails: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: moderateScale(10),
    alignItems: 'center',

  },
  postShortDetailsTxt: {
    color: 'gray',
  },
  detailsTopbar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  postTitle: {
    fontSize: moderateScale(18),
    color: 'white'
  },
  postLocation: {
    color: '#8D8C8D',
    paddingTop: moderateScale(8)
  },
  buttonRow: {
    flexDirection: 'row',
    paddingVertical: moderateScale(25),
  },
  buttonTxt: {
    color: 'white',
    // alignSelf: 'flex-end'
  },
  commentIcon: {
    transform: [{ scaleX: -1 }]
  },
  postHeaders: {
    paddingHorizontal: moderateScale(20)
  },
  avatar: {
    height: moderateScale(40),
    width: moderateScale(40)
  },
  buttonLikeComment: {
    width: moderateScale(80),
    marginRight: moderateScale(15),
    backgroundColor: '#4a474a',
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    alignItems: 'center'
  },
  buttonShare: {
    width: moderateScale(100),
    backgroundColor: '#304357',
    borderColor: '#425d78',
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    marginLeft: 'auto'
  },
  tabBar: {
    flexDirection: 'row',
  },
  tabBtnActive: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderBottomWidth: moderateScale(2)
  },
  tabBtnDeActive: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#31363b',
    borderBottomWidth: moderateScale(2)
  },
  tabBtnTxtActive: {
    color: 'white',
    paddingBottom: moderateScale(22)
  },
  tabBtnTxtDeActive: {
    color: '#4c545c',
    paddingBottom: moderateScale(22)
  },
  detailsAndCommnetsContainer: {
    height: moderateScale(410)
  },
  feedDetailRow: {
    flexDirection: 'row',
    paddingTop: moderateScale(20),
    alignItems: 'center',
    borderBottomWidth: moderateScale(1),
    borderColor: '#43484d',
    paddingBottom: moderateScale(20)

  },
  feedDetailIcon: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feedDetailTxt: {
    width: '80%',
  },
  commentBoxRow: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: moderateScale(15),
    zIndex: 30,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(20),
    alignItems: 'center'
  },
  input: {
    fontSize: moderateScale(18),
    width: '80%',
    color: '#FFF'
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
})
