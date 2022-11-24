import React, { useContext, useRef } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';
import { TextInput } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text'

const CustomTextInput = (props) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();

  const styles = useStyleSheet(themedStyles);

  const { placeholder, icon, width, value, onChangeText, noMargin, marginTop, onFocus, keyboardType, fontSize, isMasked } = props;

  const maskedRef = isMasked === true ? useRef() : null;

  if (isMasked === true) {
    return (
      <TextInputMask
        refInput={(ref) => maskedRef.current = ref}
        type={'datetime'}
        options={{
          format: 'DD/MM/YYYY'
        }}
        value={value}
        placeholderTextColor={"rgba(0, 1, 1, 0.5)"}
        placeholder={"Check-out date"}
        keyboardType={keyboardType}
        onChangeText={onChangeText}
        style={[styles.container, { width: width, marginRight: noMargin ? 0 : 20, marginTop: marginTop, fontSize: fontSize ? fontSize : 26 }]}
      />
    )
  }
  else {
    return (
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"rgba(0, 1, 1, 0.5)"}
        style={[styles.container, { width: width, marginRight: noMargin ? 0 : 20, marginTop: marginTop, fontSize: fontSize ? fontSize : 26 }]}
        onChangeText={onChangeText}
        value={value}
        keyboardType={keyboardType}
      >

      </TextInput >
    );
  }

}
const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'white',
    minWidth: 80,
    borderRadius: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    height: 82,
    paddingLeft: 20,
    fontSize: 26,
    paddingRight: 20,
  },
}
);

export default CustomTextInput;