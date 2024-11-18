import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts} from '../contants/index';

const Button3 = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.btntext}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button3;

const styles = StyleSheet.create({
  button: {
    width: wp(90),
    height: wp(15),
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  btntext: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: 'black',
  },
});
