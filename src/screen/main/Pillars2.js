import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {useRoute} from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import {htmlstyles} from './htmlstyles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
const Pillars2 = ({navigation}) => {
  const route = useRoute();
  const {item} = route.params;
  const {top} = useSafeAreaInsets();
  console.log('listtttt', item);
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.iconview}>
        <TouchableOpacity
          style={{
            width: wp(9),
            height: wp(9),
            backgroundColor: colors.main,
            borderRadius: wp(5),
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: wp(4),
          }}
          onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" color="white" size={18} />
        </TouchableOpacity>
        <Text style={styles.pillartext1}>Pillar 2</Text>
      </View>
      <ScrollView>
        <View style={styles.imageWrapper}>
          <ImageBackground
            style={styles.Imgstyle}
            resizeMode="contain"
            source={images.pillarimg2}>
            {/* <View style={styles.pillarContainer}>
              <Text style={styles.pillartext}>Pillar 2</Text>
              <Text style={styles.mangetext}>Prevent bleeding</Text>
            </View> */}
          </ImageBackground>
          <View style={[styles.mainview, {paddingHorizontal: 15}]}>
            <HTMLView value={item} stylesheet={htmlstyles} />
          </View>
        </View>
        <View style={{marginBottom: wp(2)}}></View>
      </ScrollView>
    </View>
  );
};

export default Pillars2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconview: {
    width: wp(100),
    alignSelf: 'center',
    height: wp(18),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 0.8,

    paddingHorizontal: wp(5),
  },
  pillartext1: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.semibold,
    textAlign: 'center',
  },
  imageWrapper: {
    flex: 1,
    marginTop: wp(8),
    alignItems: 'center',
  },
  Imgstyle: {
    width: wp(75),
    height: wp(75),
    justifyContent: 'center',
    alignItems: 'center',
  },

  pillarContainer: {
    alignItems: 'center',
    marginLeft: wp(18),
    marginBottom: wp(18),
    // marginLeft: wp(2),
  },
  pillartext: {
    color: 'white',
    fontSize: 14,
    fontFamily: fonts.bold,
    textAlign: 'center',
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
  mainview: {
    width: wp(90),
    backgroundColor: 'white',
    borderRadius: wp(3),
    paddingVertical: wp(4),
    alignSelf: 'center',
    marginTop: wp(5),
    marginBottom: wp(3),
  },
  anaetext: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.semibold,
  },
  anaetext1: {
    color: '#252525',
    fontSize: 14,
    fontFamily: fonts.regular,

    width: wp(80),
  },
  salvagetext: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.semibold,
    marginLeft: wp(5),
    width: wp(60),
    lineHeight: 18,
  },
  cellview: {
    alignSelf: 'center',
  },
  imagecell: {
    width: wp(80),
    height: wp(75),
  },
});
