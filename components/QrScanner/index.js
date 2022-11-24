import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, View,Image } from 'react-native';

const QrScanner = ({ scanned, handleBarCodeScanned, windowWidth }) => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/qrPlaceholder.png')}
        style={styles.qrPlaceholder}
      />

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        type={"front"}
        
        style={[styles.qr, { width: 600, height: 600 }]}
      />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrPlaceholder:{
    height: 600,
    width: 600,
    zIndex: 99,

  },

  qr: {
    alignSelf: "center",
    position: "absolute",
  },
});

export default QrScanner;
