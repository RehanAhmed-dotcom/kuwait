import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {colors, fonts, images} from '../../contants/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';

const Selection = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  return (
    <ImageBackground style={styles.container} source={images.Selection}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Bottomtabs', {
            screen: 'Home',
            params: {listType: 'patientBloodManagement', status: 'fail'},
          })
        }
        style={[
          styles.button,
          {backgroundColor: 'white', position: 'absolute', bottom: wp(33)},
        ]}>
        <Text style={styles.btntext}>Patient Blood Management</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Bottomtabs', {
            screen: 'Home',
            params: {
              listType: 'bloodProductManagementProtocol',
              status: 'fail',
            },
          })
        }
        style={[
          styles.button,
          {backgroundColor: 'white', position: 'absolute', bottom: wp(10)},
        ]}>
        <Text style={styles.btntext}>Blood Product Management Protocol</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Selection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    width: wp(90),
    height: wp(18),
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
  },
  btntext: {
    fontSize: 20,
    fontFamily: fonts.bold,
    color: colors.main,
    textAlign: 'center',
  },
});
