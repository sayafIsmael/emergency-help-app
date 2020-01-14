import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator
} from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import FeatherIcon from 'react-native-vector-icons/Feather'

import { moderateScale } from 'react-native-size-matters'

import * as mapStyle from './styles/customMapStyle';

const burgerIcon = (
  <FeatherIcon name='menu' size={moderateScale(30)} color={'white'} />
)

export default class HomeScreen extends React.Component {
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
        <View style={styles.header}>
          <Text style={styles.headerTxt}>AROUND YOU</Text>
          <Text style={styles.headerTxtLocation}>Dhaka - Last 24 hours</Text>
        </View>
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
            <Marker
            title="hello world"
            coordinate={
              {latitude: 37.78825,
              longitude: -122.4324,}
            }
            >
              
            </Marker>
          </MapView>
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
  },
  headerTxt: {
    color: 'white'
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTxtLocation: {
    color: '#6F7074',
    fontSize: moderateScale(12)
  }

})
