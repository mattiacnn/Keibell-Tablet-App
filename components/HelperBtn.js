import React, { useContext } from 'react';
import { TouchableOpacity, Text, Image, View } from 'react-native';
import { LanguageContext } from '../providers/LanguageProvider';
import { useTheme, useStyleSheet, StyleService } from '@ui-kitten/components';

const HelperBtn = (props) => {
  const language = useContext(LanguageContext);
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { text, icon, action } = props;

  return (
    <TouchableOpacity onPress={action} style={styles.container}>
      <Text style={styles.text}>{text}</Text>
      {icon && <Image source={icon} style={[styles.icon, { marginLeft: text ? 20 : 0 }]} />}
    </TouchableOpacity>
  );
}
const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'color-primary-400',
    borderRadius: 28,
    height: 82,
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingLeft: 30,
    paddingRight: 30,
    flexDirection: "row",
    zIndex:99
  },
  text: {
    color: 'black',
    fontSize: 26,
    textAlign: 'center'
  },
}
);

export default HelperBtn;