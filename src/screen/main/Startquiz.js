import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

import Button2 from '../../component/Boutton2';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {AllGetAPI} from '../../component/Api_Screen';
import {useSelector} from 'react-redux';
import Loader from '../../component/Loader';

const Startquiz = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  const {FirstQuiz, SecondQuiz} = useSelector(state => state?.user);
  // console.log('useeeeeeeeeee', user);
  const [showModal, setShowModal] = useState('');
  const [quizData, setquizData] = useState([]);
  const [quizData1, setquizData1] = useState([]);

  const all_quizapi = () => {
    AllGetAPI({url: 'allMcq', Token: user?.api_token})
      .then(res => {
        setquizData(res.Mcqs);

        // console.log('res of categories', JSON.stringify(res));
      })
      .catch(err => {
        console.log('api error', err);
      });
  };
  const all_quizapi1 = () => {
    AllGetAPI({url: 'allquizmcq', Token: user?.api_token})
      .then(res => {
        setquizData1(res.Mcqs);

        // console.log('res of categories', JSON.stringify(res));
      })
      .catch(err => {
        console.log('api error', err);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 3000);
      all_quizapi();
      all_quizapi1();
    }, []),
  );

  return (
    <ImageBackground style={styles.container} source={images.quiz}>
      <View
        style={{
          position: 'absolute',
          bottom: heightPercentageToDP(5),
          alignSelf: 'center',
        }}>
        <Button2
          title="Start Quiz"
          onPress={() => {
            if (FirstQuiz) {
              quizData1.length > 0
                ? navigation.navigate('Question2', {
                    questions: quizData1,
                  })
                : console.log('first');
            } else {
              quizData.length > 0
                ? navigation.navigate('Question1', {questions: quizData})
                : console.log('first');
            }
          }}
        />
      </View>
      {Loader({show: showModal})}
    </ImageBackground>
  );
};

export default Startquiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
