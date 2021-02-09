import { StatusBar } from 'expo-status-bar';
import { Camera } from 'expo-camera';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground
} from 'react-native';

let camera;

const App = () => {

  const [startCamera, setStartCamera] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [capturedImage, setCapturedImage] = useState(null)

  const __startCamera = async () => {
    const { status } = await Camera.requestPermissionsAsync()
    console.log(status)
    if (status == 'granted') {
      setStartCamera(true)
    } else {
      Alert.alert("Access denied!!")
    }
  }

  const __takePicture = async () => {
    if (!camera) return
    const photo = await camera.takePictureAsync()
    console.log(photo)
    setPreviewVisible(true)
    setCapturedImage(photo)
  }

  const __retakePicture = () => {
    setCapturedImage(null)
    setPreviewVisible(false)
    __startCamera()
  }

  return (
    startCamera ? (
      // startCamera 가 true 이면 카메라 시작
      // previewVisible == true && capturedImage == true =>
      previewVisible && capturedImage ? (
        <CameraPreview 
          photo={capturedImage} 
          retakePicture={__retakePicture}
        />
      ) : (
          <Camera
            style={styles.camera}
            ref={(r) => {
              camera = r
            }}
          >
            <View style={styles.cameraView}>
              <View style={styles.cameraView2}>
                <TouchableOpacity
                  style={styles.buttonTakePicture}
                  onPress={__takePicture}
                />
              </View>
            </View>
          </Camera>
        )
    ) : (
        // startCamera == false => default page
        <View style={styles.container}>
          <TouchableOpacity
            onPress={__startCamera}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Take Picture~!</Text>
          </TouchableOpacity>
          <StatusBar style='auto' />
        </View>
      )
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 130,
    borderRadius: 4,
    backgroundColor: '#14274e',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  cameraView: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  cameraView2: {
    alignSelf: 'center',
    flex: 1,
    alignItems: 'center',
  },
  buttonTakePicture: {
    width: 70,
    height: 70,
    bottom: 0,
    borderRadius: 20,
    backgroundColor: '#fff',
  }
})

const CameraPreview = ({photo, retakePicture}) => {
  console.log('sdsfds', photo)
  return (
    <View
      style={{
        backgroundColor: 'transparent',
        flex: 1,
        width: '100%',
        height: '100%',
      }}
    >
      <ImageBackground 
        source={{ uri: photo && photo.uri }}
        style={{ flex: 1 }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            padding: 15,
            justifyContent: 'flex-end',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <TouchableOpacity
              onPress={retakePicture}
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              >
                Re-take
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 130,
                height: 40,
                alignItems: 'center',
                borderRadius: 4,
              }}
            >
              <Text
                style={{
                  color: '#fff',
                  fontSize: 20,
                }}
              >
                hahaha
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>      
    </View>
  )
}

export default App;