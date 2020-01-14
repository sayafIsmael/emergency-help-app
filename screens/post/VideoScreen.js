import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput
} from 'react-native';
import { moderateScale } from 'react-native-size-matters'
import Video from './../../components/Video'
import Textarea from 'react-native-textarea';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { StackActions, NavigationActions } from 'react-navigation';

//Reset stack orders
const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'PostHome' }),
    ],
});

export default class App extends React.Component {
  constructor(p) {
    super(p);
    this.state = {
      description: null
    };
  }

  static navigationOptions = {
    header: null,
  }


  render = () => {
    const { currentTime, duration, paused, overlay, fullscreen } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}> 
          <TouchableOpacity
          onPress={() => this.props.navigation.navigate('PostHome')}
          >
            <Ionicons name={'md-arrow-back'} size={moderateScale(30)} color={'#35B852'} />
          </TouchableOpacity>
          <Text style={styles.headerTxt}> Go back </Text>
        </View>
        <Video
          uri={this.props.navigation.state.params.uri}
        />
        <TextInput
          placeholder={"Title"}
          placeholderTextColor='#4C4D51'
          style={styles.input}
          returnKeyType={'next'}
          value={this.state.title}
          onChangeText={txt => this.setState({ title: txt })}
        />

        <Textarea
          containerStyle={styles.textareaContainer}
          style={styles.textarea}
          onChangeText={txt => this.setState({ description: txt })}
          defaultValue={this.state.description}
          maxLength={120}
          returnKeyType={'submit'}
          placeholder={"Description"}
          placeholderTextColor={'#4C4D51'}
          underlineColorAndroid={'transparent'}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {this.props.navigation.dispatch(resetAction); this.props.navigation.navigate('Feed')}}
        >
          <Text style={styles.buttonTxt}>Submit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header:{
    height: moderateScale(50),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    backgroundColor: '#262626',
  },
  headerTxt:{
    color: 'white',
    fontSize: moderateScale(18),
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  input: {
    marginHorizontal: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    fontSize: moderateScale(18),
    backgroundColor: "#262626",
    marginTop: moderateScale(20),
    borderRadius: moderateScale(10),
    color: 'white',
  },
  textareaContainer: {
    height: 180,
    padding: 5,
    backgroundColor: '#262626',
    width: '90%',
    alignSelf: 'center',
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(20),
    marginVertical: moderateScale(20),
  },
  textarea: {
    textAlignVertical: 'top',  // hack android
    height: 170,
    fontSize: 14,
    color: 'white',
  },
  submitButton: {
    width: '90%',
    backgroundColor: '#15BA50',
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    alignSelf: 'center'
  },
  buttonTxt: {
    color: 'white',
    fontSize: moderateScale(18)
  },
  
});