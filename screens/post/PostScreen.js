import React, { Component } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator,
    TextInput
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { moderateScale } from 'react-native-size-matters'
import { RNCamera, FaceDetector } from 'react-native-camera';


export default class PostScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            sort: false,
            enabled: true,
            uri: null
        }
    }

    static navigationOptions = {
        header: null,
    }

    takePicture = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    async startRecording() {
        this.setState({ recording: true });
        // default to mp4 for android as codec is not set
        const { uri, codec = "mp4" } = await this.camera.recordAsync();
        this.setState({ recording: false, processing: true });
        const type = `video/${codec}`;

        const data = new FormData();
        data.append("video", {
            name: "mobile-video-upload",
            type,
            uri
        });

        console.log("Video ", data)

        this.setState({ processing: false });
        if (data) {
            this.props.navigation.navigate('Video', { uri: uri });
        }
    }
    stopRecording() {
        this.camera.stopRecording();
        this.setState({ recording: false });
    }

    render() {
        const { recording, processing } = this.state;

        let button = (
            <TouchableOpacity
                onPress={this.startRecording.bind(this)}
                style={styles.capture}
            >
                <Text style={{ fontSize: 14 }}> RECORD </Text>
            </TouchableOpacity>
        );

        if (recording) {
            button = (
                <TouchableOpacity
                    onPress={this.stopRecording.bind(this)}
                    style={styles.capture}
                >
                    <Text style={{ fontSize: 14 }}> STOP </Text>
                </TouchableOpacity>
            );
        }

        if (processing) {
            button = (
                <View style={styles.capture}>
                    <ActivityIndicator animating size={18} />
                </View>
            );
        }

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
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />
                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                    {button}
                </View>

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
    header: {
        height: moderateScale(50),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: moderateScale(20),
    },
    headerTxt: {
        color: 'white',
        fontSize: moderateScale(18),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
})
