import React, {useRef} from 'react';
import {ActivityIndicator, Image, Modal, View} from 'react-native';
interface loaderProp {
  show: boolean;
}
const Loader: React.FC<loaderProp> = ({show}) => {
  //   console.log('show', show);
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View
        style={{
          flex: 1,
          // height: hp(100),
          backgroundColor: '#00000088',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 200,
          left: 0,
          top: 0,
          right: 0,
          bottom: 0,
          // position: 'absolute',
        }}>
        <View
          style={{
            height: 50,
            width: 50,

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 100,
            overflow: 'hidden',
          }}>
          <ActivityIndicator size="small" color={'#2D2D35'} />
        </View>
      </View>
      {/* <Image
            source={require('../../Assets/Images/job_finder.gif')}
            style={{width: 60, borderRadius: 30, height: 60}}
          /> */}
    </Modal>
  );
};

export default Loader;
