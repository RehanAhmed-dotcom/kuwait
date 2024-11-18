import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button3 from '../../component/Button3';

const Congrulation = ({navigation}) => {
  return (
    <ImageBackground style={styles.container} source={images.Failed}>
      <View style={{position: 'absolute', bottom: wp(70), alignSelf: 'center'}}>
        <Button3
          title="Go to Home"
          onPress={() => {
            navigation.navigate('Bottomtabs', {
              listType: 'Patient Blood Management',
            });
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default Congrulation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
