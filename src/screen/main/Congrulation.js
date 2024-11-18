import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Button3 from '../../component/Button3';
import {useDispatch, useSelector} from 'react-redux';
import {setFirstQuiz, setSecondQuiz} from '../../reduxtolkit/MyAdminSlice';

const Congrulation = ({navigation}) => {
  const {FirstQuiz, SecondQuiz} = useSelector(state => state?.user);
  const dispatch = useDispatch();
  return (
    <ImageBackground style={styles.container} source={images.Cong}>
      <View style={{position: 'absolute', bottom: wp(70), alignSelf: 'center'}}>
        <Button3
          title={FirstQuiz ? 'Quiz Completed' : 'Go to Phase 2'}
          onPress={() => {
            FirstQuiz
              ? dispatch(setSecondQuiz(true))
              : dispatch(setFirstQuiz(true));
            navigation.navigate('Bottomtabs', {
              screen: 'Home',
              params: {
                listType: 'bloodProductManagementProtocol',
                status: 'success',
              },
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
