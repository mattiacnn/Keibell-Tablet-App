import React, { useState, useRef } from 'react';
import CustomBtn from '../CustomBtn';
import CustomTextInput from '../CustomTextInput';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { LanguageContext } from '../../providers/LanguageProvider';
import { View, Text, Animated, StyleSheet, Dimensions, Keyboard } from "react-native";

const PhoneNumberForm = (props) => {
  const styles = useStyleSheet(themedStyles);
  const [disabled, setDisabled] = useState(true);
  const phoneFormOpacity = useRef(new Animated.Value(1)).current  // Initial value for opacity: 0
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;


  const { afterSubmit } = props;
 
  const _fadeOutAnimation = () => {
    Animated.timing(phoneFormOpacity, {
      toValue: 0,
      duration: 700,
      useNativeDriver: true,
    }).start(() => {
      afterSubmit()
    });
  }

  const handleTyping = (text) => {
    if (text.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }


  return (
    <Animated.View style={[styles.form, { height: width > height ? 500 : 600 }, animatedStyle.phoneFormContainer(phoneFormOpacity)]}>
      <Text style={styles.label}>Place your phone number</Text>
      <View style={styles.inputs}>
        <CustomTextInput type="numeric" placeholder={"Prefix"} width={width > height ? 200 : "auto"} />
        <CustomTextInput type="numeric" onType={(text) => handleTyping(text)} width={width > height ? 580 : 379} placeholder={"Place your phone number"} />
        <CustomBtn action={_fadeOutAnimation} disabled={false} text="Go" primary customWidth={width > height ? 350 : 200} />
      </View>
    </Animated.View>

  )
}

const animatedStyle = StyleSheet.create({
  
  phoneFormContainer: (opacity) => ({
    opacity: opacity,
    transform: [{
      translateY: opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [250, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }),
});

const themedStyles = StyleService.create({
  blur: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    zIndex: -1,
    opacity: 0.8,


  },
  hello: {
    color: 'white',
    fontSize: 90,
    marginTop: 120
  },
  label: {
    fontSize: 55,
    color: "black",
  },
  form: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'flex-start',
    zIndex: 99,
    paddingLeft: 50,
    paddingRight: 50,
  },
  inputs: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginTop: 60,
    width: "100%"
  },
  textHelper: {
    color: "color-info-500",
    opacity: 0.4,
    textDecorationLine: 'underline',
    marginLeft: 20,
    marginTop: 20
  },
  column: {
    flexDirection: 'column',
  }
});

export default PhoneNumberForm;