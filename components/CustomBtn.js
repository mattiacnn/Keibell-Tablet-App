import React, { useContext } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

const CustomBtn = (props) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { text, primary, icon, action, customWidth, disabled, fullWidth, marginTop } = props;

  return (
    <TouchableOpacity
      style={[styles.container, {
        backgroundColor: primary !== true ? "white" : theme["color-primary-500"],
        width: customWidth ? customWidth : fullWidth === true ? "100%" : 359,
        justifyContent: icon ? "flex-start" : "center",
        paddingLeft: icon ? 40 : 0,
        marginTop: marginTop,

      }]}
      onPress={disabled === false ? action : null}
    >
      <Text style={styles.btnText}>
        {text}
      </Text>
      {icon && <Image source={icon} style={styles.icon} />}
    </TouchableOpacity >
  );
}
const themedStyles = StyleService.create({
  container: {
    height: 75,
    borderRadius: 20,
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#000101",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5.84,

    marginRight: 20,
    position: "relative"

  },
  btnText: {
    fontSize: 26,
    color: "black"
  },
  icon: {
    position: "absolute",
    right: 40
  }
}
);

export default CustomBtn;