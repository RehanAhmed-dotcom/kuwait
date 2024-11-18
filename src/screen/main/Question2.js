import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {colors, fonts} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Question2 = ({navigation}) => {
  const route = useRoute();
  const {questions} = route.params;
  const {top} = useSafeAreaInsets();
  const [fill, setFill] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState(
    Array(questions.length).fill(null),
  );
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  console.log('correctAnswerCount', correctAnswerCount);
  const handleNext = () => {
    setFill('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false); // Reset answer status for the new question
    } else {
      // Navigate based on the number of correct answers
      if (correctAnswerCount >= 4) {
        navigation.navigate('Congrulation');
      } else {
        navigation.navigate('Failed');
      }
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedOptions(null);
    }
  };

  const handleOptionSelect = option => {
    setFill('abc');
    if (!isAnswered) {
      const updatedOptions = [...selectedOptions];
      updatedOptions[currentQuestionIndex] = option;
      setSelectedOptions(updatedOptions);

      if (isCorrectAnswer(option)) {
        setCorrectAnswerCount(correctAnswerCount + 1);
      }

      setIsAnswered(true); // Lock answer selection for this question
    }
  };

  const isCorrectAnswer = option => {
    return option === questions[currentQuestionIndex].correct_ans;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const optionLabels = ['A', 'B', 'C', 'D'];
  return (
    <View style={[styles.container, {paddingTop: top}]}>
      <View style={styles.headerview}>
        <Text style={styles.headertext}>Blood Product Management </Text>
        <TouchableOpacity
          style={{
            left: wp(10),
            width: wp(10),
            height: wp(10),
            backgroundColor: colors.main,
            borderRadius: wp(5),
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            navigation.navigate('Bottomtabs', {
              screen: 'Home',
              params: {listType: 'patientBloodManagement'},
            })
          }
          // onPress={() => navigation.navigate('Home')}
        >
          <AntDesign name="close" color="white" size={20} />
        </TouchableOpacity>
      </View>

      <View style={styles.paginationContainer}>
        {questions.map((_, index) => (
          <View
            style={[
              styles.underLine,
              {
                borderBottomWidth: currentQuestionIndex === index ? 2 : 0.5,
                borderBottomColor:
                  currentQuestionIndex === index ? colors.main : 'gray',
              },
            ]}>
            <View
              key={index}
              style={[
                styles.circle,
                index === currentQuestionIndex && styles.activeCircle,
              ]}>
              <Text style={styles.circleText}>{index + 1}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.questionContainer}>
        <LinearGradient
          colors={['#7C0000', '#C31D07']}
          start={{x: 0, y: 0.5}}
          end={{x: 1, y: 0.5}}
          style={styles.questionView}>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </LinearGradient>

        {currentQuestion.answers.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.option]}
            disabled={isAnswered}
            onPress={() => handleOptionSelect(option)}>
            <View style={styles.optionLabelContainer}>
              <View
                style={[
                  styles.optionLabelCircle,
                  selectedOptions[currentQuestionIndex] === option &&
                    (isCorrectAnswer(option)
                      ? styles.correctOption
                      : styles.incorrectOption),
                ]}>
                <Text style={styles.optionLabelText}>
                  {optionLabels[index]}
                </Text>
              </View>
              <Text style={styles.optionText}>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View
        style={[styles.navigationButtons, {position: 'absolute', bottom: 20}]}>
        <TouchableOpacity
          disabled={currentQuestionIndex === 0}
          onPress={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
          style={[
            styles.arrowButton,
            {
              right: wp(10),
              backgroundColor:
                currentQuestionIndex === 0 ? 'gray' : colors.main,
            },
          ]}>
          <AntDesign name="left" color="white" size={20} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            fill ? handleNext() : console.log('hell');
            // if (currentQuestionIndex === questions.length - 1) {
            //   navigation.navigate('Congrulation');
            // }
          }}
          style={styles.navButton}>
          <Text style={styles.navButtonText}>
            {currentQuestionIndex === questions.length - 1
              ? 'Complete'
              : 'Next Question'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={currentQuestionIndex === questions.length - 1}
          onPress={() => {
            fill ? handleNext() : console.log('hello');
          }}
          style={[
            styles.arrowButton,
            {
              left: wp(10),
              backgroundColor:
                currentQuestionIndex < questions.length - 1
                  ? colors.main
                  : 'gray',
            },
          ]}>
          <AntDesign name="right" color="white" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Question2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerview: {
    flexDirection: 'row',
    marginTop: wp(10),
    alignSelf: 'center',
    alignItems: 'center',
  },
  headertext: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.bold,
  },

  title: {fontSize: 18, fontWeight: 'bold', textAlign: 'center'},
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: wp(10),
  },
  underLine: {
    padding: wp(1),
    // backgroundColor: 'yellow',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    margin: 1,
  },
  activeCircle: {backgroundColor: '#8B0000'},
  circleText: {color: '#fff'},
  questionContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: wp(10),
  },
  questionText: {
    fontSize: 16,

    color: 'white',

    fontFamily: fonts.regular,
  },
  option: {
    // padding: 10,
    borderRadius: 5,
    // borderWidth: 1,
    // borderColor: '#ddd',
    // marginVertical: 5,
    width: '90%',
    // backgroundColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: wp(8),
  },
  correctOption: {backgroundColor: '#28a745'},
  incorrectOption: {backgroundColor: '#dc3545'},
  optionLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabelCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionLabelText: {color: '#fff', fontWeight: 'bold'},
  optionText: {fontSize: 16, color: '#333', width: wp(70)},
  navigationButtons: {
    flexDirection: 'row',

    alignItems: 'center',

    alignSelf: 'center',
  },
  arrowButton: {
    // padding: 8,
    backgroundColor: '#8B0000',
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowText: {color: '#fff', fontSize: 24},
  navButton: {
    paddingVertical: 12,
    width: wp(45),
    borderWidth: 1,
    borderColor: '#8B0000',
    borderRadius: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  navButtonText: {color: '#8B0000', fontSize: 16},
  questionView: {
    width: wp(90),
    paddingVertical: wp(4),
    backgroundColor: colors.main,
    borderRadius: wp(2),

    paddingHorizontal: wp(5),
  },
});
