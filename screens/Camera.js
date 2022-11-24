import { Camera, CameraType } from 'expo-camera';
import { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { Feather } from '@expo/vector-icons';
import { GuestsContext } from '../providers/GuestsProvider';

export default function CameraScreen({ navigation, route }) {
  const { guestId } = route.params;

  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const styles = useStyleSheet(themedStyles);

  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height

  const [pictures, setPictures] = useState([]);

  const guests = useContext(GuestsContext);

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }


  const handleScan = (result) => {
    if (result.message) {

    }
    else {
      const arr = guests.guests;
      const index = arr.findIndex(guest => guest.id === guestId);

      console.log("index is ", index)

      result.id = guestId
      arr[index] = result;



      guests.setGuests(arr);
      navigation.navigate("RoomSummary")
    }
  }

  const validate = (image) => {
    console.log("validating...");

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "base64DocId": image,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://192.168.178.40:3001/api/admin/verification", requestOptions)
      .then(response => response.json())
      .then(result => handleScan(result))
      .catch(error => console.log('error', error));
  }

  const takePicture = async () => {
    console.log("taking picture number ", pictures.length);

    const cameraOptions = {
      base64: true
    }
    const data = await camera.takePictureAsync(cameraOptions);

    validate(data.base64)

  }

  return (
    <View style={styles.container}>
      <Camera ratio='16:9' ref={ref => setCamera(ref)} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <Image
            source={require("../assets/doc_mask.png")}
            style={styles.mask}
          />
        </View>


        <TouchableOpacity
          style={[styles.button, {
            position: height > width ? "relative" : "absolute",
            right: height > width ? 0 : 50, top: height > width ? 50 : 0
          }]}
          onPress={takePicture}>
          <Feather name="camera" size={24} color="black" />
          <Text style={{ marginLeft: 20 }}>Scan</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const themedStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  camera: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    width: 200,
    height: 100,
    backgroundColor: 'color-primary-400',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "row",
    zIndex: 99,
    position: "absolute",
    right: 50
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    backgroundColor: "#F9C151",
    opacity: 0.5
  },
  mask: {
    resizeMode: "contain",

  }

}); 
