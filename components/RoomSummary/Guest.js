import React, { useContext } from 'react';
import { Image, View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

const Guest = (props) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { guest, index, progress, action, isSelected } = props;

  const primaryColor = theme['color-primary-500'];


  const width = Dimensions.get("screen").width
  const height = Dimensions.get("screen").height


  return (
    <TouchableOpacity onPress={action} style={[styles.card,
    {
      minWidth: width > height ? 350 : 240,
      marginLeft: width > height ? 0 : index > 1 ? 20 : 0,
      marginTop: width > height ? index > 1 ? 20 : 0 : 0,
      borderWidth: isSelected === true ? 2 : 0,
      borderColor: primaryColor
    }]}>
      <View style={styles.guestRow}>
        <Text style={styles.guestName}>{guest.firstName}</Text>
        {progress === 100 && <Image source={require('../../assets/check.png')} style={styles.check} />}
      </View>
      <Text style={styles.guestIndex}>Guest {index}</Text>

      <View style={styles.progressContainer}>
        <View style={styles.progressLabelContainer}>
          <Text style={styles.progressLabel}>{progress}%</Text>
          <Text style={styles.progressLabel}>Complete</Text>
        </View>
        <View style={animatedStyle.progressBar(progress, primaryColor)}>

        </View>
      </View>
    </TouchableOpacity>
  );
}

const animatedStyle = StyleSheet.create({
  progressBar: (progress, primaryColor) => ({
    width: progress + '%',
    height: 10,
    backgroundColor: primaryColor,
    borderRadius: 5,
    marginTop: 10
  }),
});

const themedStyles = StyleService.create({
  card: {
    backgroundColor: 'white',
    height: 170,
    borderRadius: 20,
    padding: 30,
  },
  guestRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  check: {
    width: 20,
    height: 20,
  },
  guestName: {
    fontSize: 26,
    fontFamily: "Kobe",
    color: "black"
  },
  guestIndex: {
    color: "color-info-500",
    fontSize: 22,
    fontFamily: "Kobe",
    opacity: 0.6
  },
  progressLabelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center"
  },
  progressLabel: {
    color: "color-info-500",
    fontSize: 18,
    fontFamily: "Kobe",
    opacity: 0.6
  },
  progressBar: (progress) => ({
    width: 100,
    height: 50,
    backgroundColor: "red",
    borderRadius: 10,
  }),

}
);

export default Guest;