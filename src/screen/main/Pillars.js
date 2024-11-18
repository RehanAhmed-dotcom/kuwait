import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {AllGetAPI} from '../../component/Api_Screen';
import {useFocusEffect} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Loader from '../../component/Loader';

const Pillars = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  const [showModal, setShowModal] = useState(false);
  console.log('useeeeeeeeeee', user);
  const [pilarData, setpillarData] = useState([]);

  const all_pillarapi = () => {
    setShowModal(true);
    AllGetAPI({url: 'allPillar', Token: user?.api_token})
      .then(res => {
        setpillarData(res.Pillars);
        setShowModal(false);
        console.log('res of categories', user?.api_token);
      })
      .catch(err => {
        setShowModal(false);
        console.log('api error', err);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      all_pillarapi();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>
          The clinical approaches of Patient Blood Management are underpinned by
          three pillars{' '}
        </Text>
      </View>
      {/* <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          marginTop: wp(10),
        }}> */}
      <ImageBackground
        style={styles.Imgstyle}
        resizeMode="contain"
        source={images.pillarimg}>
        <View style={styles.imageView}>
          <TouchableOpacity
            style={styles.pillarContainer}
            onPress={() =>
              pilarData.length > 0
                ? navigation.navigate('Pillars1', {item: pilarData[0]?.text})
                : console.log('hel')
            }>
            <Text style={styles.pillartext}>Pillar 1</Text>
            <Text style={styles.mangetext}>Manage Anemia</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pillarContainer}
            onPress={() =>
              pilarData.length > 0
                ? navigation.navigate('Pillars2', {item: pilarData[1]?.text})
                : console.log('first')
            }>
            <Text style={styles.pillartext}>Pillar 2</Text>
            <Text style={styles.mangetext}>Prevent Bleeding</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.pillarContainer, {marginLeft: wp(8)}]}>
          <TouchableOpacity
            onPress={() =>
              pilarData.length > 0
                ? navigation.navigate('Pillars3', {item: pilarData[2]?.text})
                : console.log('first')
            }>
            <Text style={styles.pillartext}>Pillar 3</Text>
            <Text style={styles.mangetext}>Avoid Unnecessary Transfusion</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {/* </View> */}
      {Loader({show: showModal})}
    </View>
  );
};

export default Pillars;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  Header: {
    alignSelf: 'center',
    // marginTop: wp(5),
    position: 'absolute',
    top: wp(10),
  },
  HeaderText: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.semibold,
    textAlign: 'center',
    width: wp(80),
    lineHeight: 22,
  },
  Imgstyle: {
    width: wp(100),
    height: wp(100),
    marginTop: wp(40),
  },
  imageView: {
    flex: 1, // Fill the ImageBackground
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: wp(18), // Adjusts space between text and image edges
  },
  pillarContainer: {
    alignItems: 'center',
    marginBottom: wp(3),
  },
  pillartext: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.bold,
    textAlign: 'center',
    marginBottom: wp(-0.5),
  },
  mangetext: {
    color: 'white',
    fontSize: 12,
    fontFamily: fonts.regular,
    marginTop: wp(1),
    textAlign: 'center',
    width: wp(20),
    lineHeight: 16,
  },
});
