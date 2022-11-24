import React, { useState, useRef, useEffect } from 'react';
import CustomBtn from '../CustomBtn';
import CustomTextInput from '../CustomTextInput';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { LanguageContext } from '../../providers/LanguageProvider';
import { View, Text, Animated, StyleSheet, Dimensions } from "react-native";

const OtpForm = (props) => {
  const styles = useStyleSheet(themedStyles);
  const [disabled, setDisabled] = useState(true);
  const phoneFormOpacity = useRef(new Animated.Value(0)).current  // Initial value for opacity: 0
  const width = Dimensions.get("screen").width;
  const height = Dimensions.get("screen").height;

  const { onSuccess } = props;

  useEffect(() => {
    _fadeInAnimation()
  }, [])

  const _fadeInAnimation = () => {
    Animated.timing(phoneFormOpacity, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
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
      <Text style={styles.label}>Place the confirmation code</Text>
      <View style={styles.inputs}>
        <CustomTextInput type="numeric" onType={(text) => handleTyping(text)} width={width > height ? 800 : 500} placeholder={"Place your phone number"} />
        <CustomBtn action={onSuccess} disabled={false} text="Go" primary customWidth={width > height ? 300 :200} />
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
        outputRange: [-250, 0]  // 0 : 150, 0.5 : 75, 1 : 0
      }),
    }],
  }),
});

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-primary-500',
    flex: 1,
    paddingLeft: 50,
    paddingRight: 50,
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

export default OtpForm;