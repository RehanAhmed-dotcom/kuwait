import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import Button1 from '../../component/Button1';
import SplashScreen from 'react-native-splash-screen';
import {PostAPiwithFrom} from '../../component/Api_Screen';
import {setUser} from '../../reduxtolkit/MyAdminSlice';
import {useDispatch} from 'react-redux';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [keyboardStatus, setKeyboardStatus] = useState('Keyboard Hidden');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus('Keyboard Shown');
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus('Keyboard Hidden');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);
  const dispatch = useDispatch();
  const _registerAPI = async () => {
    const formdata = new FormData();
    formdata.append('username', username);
    try {
      const res = await PostAPiwithFrom({url: 'register'}, formdata);
      console.log('Response data:', res);
      if (res.status === 'success') {
        dispatch(setUser(res));
        // navigation.navigate('Selection');
        navigation.navigate('Bottomtabs', {
          screen: 'Home',
          params: {listType: 'patientBloodManagement', status: 'fail'},
        });
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Your Account has been created!',
          topOffset: 80,
        });
        // ToastAndroid.show('Your Account has been created!', ToastAndroid.SHORT);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Error creating user account!',
          topOffset: 80,
        });
        // ToastAndroid.show('Error creating user account!', ToastAndroid.SHORT);
      }
    } catch (err) {
      console.log('API error:', err);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'API error! Please try again.',
        topOffset: 80,
      });
      // ToastAndroid.show('API error! Please try again.', ToastAndroid.SHORT);
    }
  };
  const {top} = useSafeAreaInsets();
  const Wrapper = Platform.OS == 'ios' ? KeyboardAvoidingView : View;
  return (
    <Wrapper
      style={{flex: 1}} // Added flex: 1 to ensure full-screen behavior adjustment
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <View
          style={[
            styles.mainview,
            {marginTop: Platform.OS == 'android' ? wp(10) : wp(20)},
          ]}>
          {/* <Wrapper behavior="padding"> */}
          <ScrollView>
            <Image
              source={images.user}
              resizeMode="contain"
              style={styles.image}
            />
            <View
              style={{
                marginTop: keyboardStatus == 'Keyboard Shown' ? wp(5) : wp(20),
              }}>
              <Text style={styles.Heading}>Enter username</Text>
              <View style={[styles.inputbox]}>
                <TextInput
                  placeholder="Enter name"
                  placeholderTextColor={'#93959E'}
                  style={[styles.textinput]}
                  onChangeText={text => setUsername(text)}
                  value={username}
                />
              </View>
            </View>

            <View style={{marginTop: wp(25)}}>
              <Button1
                title="Continue"
                onPress={() => {
                  if (username) {
                    _registerAPI(username);
                  } else {
                    Toast.show({
                      type: 'info',
                      text1: 'Warning',
                      text2: 'Please enter a username',
                      topOffset: 80,
                    });
                    // ToastAndroid.show(
                    //   'Please enter a username',
                    //   ToastAndroid.SHORT,
                    // );
                  }
                }}
              />
            </View>
          </ScrollView>
          {/* </Wrapper> */}
        </View>
      </View>
    </Wrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: wp(60),
    height: wp(60),
    alignSelf: 'center',
    marginTop: wp(10),
  },
  mainview: {
    width: wp(90),
    backgroundColor: 'white',
    borderRadius: wp(4),

    paddingTop: wp(4),
    alignSelf: 'center',
    paddingBottom: wp(10),
    marginTop: wp(10),
  },
  Heading: {
    color: colors.main,
    fontSize: 14,
    fontFamily: fonts.medium,
    marginLeft: wp(5),
  },
  inputbox: {
    width: wp(80),
    height: wp(13),
    backgroundColor: 'white',
    borderRadius: wp(2),
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(3),
    marginTop: wp(2),
    // elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  textinput: {
    fontFamily: fonts.regular,
    color: 'black',
    flex: 1,
    width: wp(70),
  },
});
