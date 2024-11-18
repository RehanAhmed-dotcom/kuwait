import React, {useState, useRef, useEffect} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors, fonts, images} from '../../contants/index';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 5000);
  }, []);
  return (
    <ImageBackground
      source={images.splash1}
      style={{flex: 1}}></ImageBackground>
  );
};

export default Splash;

const styles = StyleSheet.create({});
