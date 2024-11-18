import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {colors, fonts, images} from '../../contants';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../../component/Button';

import Button1 from '../../component/Button1';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import {AllGetAPI} from '../../component/Api_Screen';
import {useDispatch, useSelector} from 'react-redux';
import RenderHTML from 'react-native-render-html';
import {Dimensions} from 'react-native';
import HTMLView from 'react-native-htmlview';
import {htmlstyles} from './htmlstyles';
import RNFetchBlob from 'rn-fetch-blob';
import {
  logoutUser,
  setFirstQuiz,
  setPdfDownloaded,
  setSecondQuiz,
} from '../../reduxtolkit/MyAdminSlice';

const Home = ({navigation}) => {
  const user = useSelector(state => state?.user?.user);
  const {FirstQuiz, SecondQuiz, PdfDownloaded} = useSelector(
    state => state?.user,
  );

  console.log('PdfDownloaded', PdfDownloaded);
  const route = useRoute();
  const {width} = useWindowDimensions();
  // const {width} = Dimensions.get('window');
  // console.log('listtttt', listType);
  // console.log('useeeeeeeeeee', user);
  const [faqsData, setFaqsData] = useState([]);
  // console.log('faqsDatafaqsDatafaqsData', faqsData);
  const [contantData, setcontantData] = useState([]);
  // console.log('content data', contantData);
  const all_faqsapi = () => {
    AllGetAPI({url: 'allQuestion', Token: user?.api_token})
      .then(res => {
        setFaqsData(res.Questions);
        // console.log('res of questioons', res);

        // console.log('res of categories', res);
      })
      .catch(err => {
        console.log('api error', err);
      });
  };
  useFocusEffect(
    React.useCallback(() => {
      all_faqsapi();
    }, []),
  );
  const all_contantapi = () => {
    AllGetAPI({url: 'allQuiz', Token: user?.api_token})
      .then(res => {
        setcontantData(res.Quiz);

        // console.log('res of categories--=--=-=-==', res);
      })
      .catch(err => {
        console.log('api error', err);
      });
  };
  const getLastSegment = url => {
    const segments = url.split('/');
    return segments.pop(); // returns the last segment
  };
  useFocusEffect(
    React.useCallback(() => {
      all_contantapi();
    }, []),
  );
  const dispatch = useDispatch();
  const downloadDoc = file => {
    const {config, fs} = RNFetchBlob;
    const FileName = getLastSegment(file);
    console.log('file', FileName);
    const downloads =
      Platform.OS == 'ios' ? fs.dirs.DocumentDir : fs.dirs.DownloadDir;
    const filePath = `${downloads}/${FileName}`;
    const options = Platform.select({
      ios: {
        fileCache: true,
        path: filePath,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading Document.',
        },
      },
    });
    config(options)
      .fetch('GET', file)
      .then(res => {
        if (Platform.OS === 'ios') {
          RNFetchBlob.ios.openDocument(res.data);
        }
        // do some magic here
        console.log('res of download', res);
        dispatch(setPdfDownloaded(true));
      })
      .catch(err => {
        console.log('err in download', err);
      });
  };
  const downloadIos = async fileUrl => {
    const {config, fs} = RNFetchBlob;
    const FileName = getLastSegment(fileUrl); // Assuming this function gets the file name from URL
    const downloads = fs.dirs.DownloadDir; // Path to the documents directory on iOS
    const localFilePath = `${downloads}`;
    try {
      // Download the file using RNFetchBlob
      const res = await config({
        fileCache: true,
      }).fetch('GET', fileUrl);

      // Retrieve the temporary path where the file is stored
      const tempFilePath = res.path();

      // Move the file from the temporary path to the desired path in DocumentDir
      await fs.mv(tempFilePath, localFilePath);

      console.log('File successfully saved to:', localFilePath);

      // Optional: Dispatch a state change or notify the user of completion
      dispatch(setPdfDownloaded(true));
    } catch (error) {
      console.error('File save error:', error);
    }
  };
  const all_getCertificateapi = () => {
    AllGetAPI({
      url: `getCertificateImage/${user?.userdata?.username}`,
      Token: user?.api_token,
    })
      .then(res => {
        // setcontantData(res.Quiz);
        console.log('certificate res come', res);
        Platform.OS == 'ios';
        downloadDoc(res.certificate_image);

        // console.log('res of categories--=--=-=-==', res);
      })
      .catch(err => {
        console.log('api error', err);
      });
  };

  const [show, setshow] = useState(false);
  const close = () => {
    setshow(false);
  };
  const downloadApi = () => {
    all_getCertificateapi();
  };
  const [show2, setshow2] = useState(false);
  const close2 = () => {
    setshow2(false);
  };

  const toggleExpand = id => {
    setFaqsData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {...item, expanded: !item.expanded}
          : {...item, expanded: false},
      ),
    );
  };

  const toggleExpand2 = id => {
    setcontantData(prevData =>
      prevData.map(item =>
        item.id === id
          ? {...item, expanded2: !item.expanded2}
          : {...item, expanded2: false},
      ),
    );
  };
  // console.log('user', user.userdata.username);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        // onPress={() => console.log('name', user?.username)}
        style={styles.textview}>
        {FirstQuiz ? (
          <Text style={styles.headerText}>
            Blood Product Management Protocol
          </Text>
        ) : (
          <Text style={styles.headerText}>Patient Blood Management</Text>
        )}
        {/* <Text style={styles.subHeaderText}>Protocol</Text> */}
      </TouchableOpacity>
      <ScrollView>
        {FirstQuiz ? (
          <FlatList
            data={contantData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <>
                <View>
                  <LinearGradient
                    colors={['#7C0000', '#C31D07']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.faqCard}>
                    <TouchableOpacity
                      style={styles.questionContainer}
                      onPress={() => {
                        console.log('item', item.text);
                        toggleExpand2(item.id);
                      }}>
                      <Text style={styles.questionText}>{item.question}</Text>
                      <View style={styles.iconContainer}>
                        <Entypo
                          name={
                            item.expanded2
                              ? 'chevron-small-up'
                              : 'chevron-small-down'
                          }
                          color={colors.main}
                          size={18}
                        />
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {item.expanded2 && (
                  <View style={styles.answerContainer}>
                    <RenderHTML
                      source={{
                        html: `
  ${item.text}`,
                      }}
                      contentWidth={width}
                    />
                    {/* <HTMLView value={item.text} stylesheet={htmlstyles} /> */}
                  </View>
                )}
              </>
            )}
          />
        ) : (
          <FlatList
            data={faqsData}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <>
                <View>
                  <LinearGradient
                    colors={['#7C0000', '#C31D07']}
                    start={{x: 0, y: 0.5}}
                    end={{x: 1, y: 0.5}}
                    style={styles.faqCard}>
                    <TouchableOpacity
                      style={styles.questionContainer}
                      onPress={() => toggleExpand(item.id)}>
                      <Text style={styles.questionText}>{item.question}</Text>

                      <View style={styles.iconContainer}>
                        <Entypo
                          name={
                            item.expanded
                              ? 'chevron-small-up'
                              : 'chevron-small-down'
                          }
                          color={colors.main}
                          size={18}
                        />
                      </View>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
                {item.expanded && (
                  <View style={styles.answerContainer}>
                    <RenderHTML
                      source={{
                        html: `
  ${item.text}`,
                      }}
                      contentWidth={width}
                    />
                  </View>
                )}
              </>
            )}
          />
        )}
        {PdfDownloaded ? (
          <View style={{marginTop: wp(15)}}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.main}]}
              onPress={() => {
                dispatch(logoutUser());
                dispatch(setPdfDownloaded(false));
                dispatch(setSecondQuiz(false));
                dispatch(setFirstQuiz(false));
              }}>
              <Text style={[styles.btntext, {color: 'white'}]}>Reset</Text>
            </TouchableOpacity>
            {/* <Button
            title="Start Quiz"
            onPress={() => {
              // navigation.navigate('Startquiz', {listType});
              navigation.navigate('Startquiz');
            }}
          /> */}
          </View>
        ) : (
          <>
            <View style={{marginTop: wp(15)}}>
              <TouchableOpacity
                disabled={SecondQuiz ? true : false}
                style={[
                  styles.button,
                  {backgroundColor: SecondQuiz ? 'white' : colors.main},
                ]}
                onPress={() => {
                  navigation.navigate('Startquiz');
                }}>
                <Text
                  style={[
                    styles.btntext,
                    {color: SecondQuiz ? colors.main : 'white'},
                  ]}>
                  Start Quiz
                </Text>
              </TouchableOpacity>
              {/* <Button
            title="Start Quiz"
            onPress={() => {
              // navigation.navigate('Startquiz', {listType});
              navigation.navigate('Startquiz');
            }}
          /> */}
            </View>
            <View style={{marginTop: wp(5)}}>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: SecondQuiz ? colors.main : 'white',
                    marginBottom: 20,
                  },
                ]}
                onPress={() => {
                  SecondQuiz ? setshow(!show) : setshow2(!show2);
                }}>
                <Text
                  style={[
                    styles.btntext,
                    {
                      color: SecondQuiz ? 'white' : colors.main,
                    },
                  ]}>
                  Claim Certificate
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        <View style={{marginBottom: wp(1)}}></View>
      </ScrollView>
      <Modal transparent={true} visible={show} onRequestClose={close}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setshow(!show);
          }}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp(90),
              paddingVertical: wp(4),

              backgroundColor: 'white',
              borderRadius: wp(2),
            }}>
            <Text style={styles.certificatetext}>Certificate</Text>
            <Image
              source={images.Certi}
              resizeMode="contain"
              style={styles.imagestyle}
            />
            <View>
              <Button1
                title="Claim It!"
                onPress={() => {
                  downloadApi();
                  close();
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <Modal transparent={true} visible={show2} onRequestClose={close2}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            setshow2(!show2);
          }}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,.7)',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: wp(90),
              paddingVertical: wp(4),

              backgroundColor: 'white',
              borderRadius: wp(2),
            }}>
            <Text style={styles.certificatetext}>Certificate</Text>
            <Image
              source={images.Claim}
              resizeMode="contain"
              style={styles.imagestyle}
            />
            <Text
              style={{
                color: 'black',
                width: wp(70),
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 14,
                fontFamily: fonts.medium,
              }}>
              Cannot claim the certificate, because the quiz is not completed
              yet...!
            </Text>

            <View style={{marginTop: wp(10)}}>
              <Button1 title="Ok" onPress={() => close2()} />
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  textview: {
    alignSelf: 'center',

    alignItems: 'center',

    height: wp(18),
    width: wp(100),
    elevation: 0.8,
    justifyContent: 'center',
    paddingHorizontal: wp(10),
    backgroundColor: 'white',
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.semibold,
    textAlign: 'center',
  },
  subHeaderText: {
    color: 'black',
    fontSize: 18,
    fontFamily: fonts.semibold,
  },
  faqCard: {
    width: wp(90),
    backgroundColor: colors.main,
    alignSelf: 'center',
    borderRadius: wp(2),
    marginTop: wp(5),
    padding: wp(3),
  },
  questionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp(2),
  },
  questionText: {
    color: 'white',
    fontSize: 16,
    fontFamily: fonts.semibold,
    width: wp(70),
  },
  iconContainer: {
    backgroundColor: 'white', // or a different color if desired
    borderRadius: 100, // makes it circular
    width: wp(5),
    height: wp(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  answerContainer: {
    width: wp(90),
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: wp(2),
    marginTop: wp(2),
    paddingHorizontal: wp(3),
    paddingVertical: wp(3),
  },
  answerText: {
    color: '#252525',
    fontSize: 14,
    fontFamily: fonts.regular,
  },
  certificatetext: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.semibold,
    alignSelf: 'center',
    marginTop: wp(1),
  },
  imagestyle: {
    width: wp(70),
    height: wp(70),
    alignSelf: 'center',
  },
  button: {
    width: wp(90),
    height: wp(15),
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(2),
    borderWidth: 1,
    borderColor: colors.main,
  },
  btntext: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.main,
  },
  imagetext: {
    width: wp(80),
    height: wp(55),
    alignSelf: 'center',
  },
  headingtext: {
    color: 'black',
    fontSize: 16,
    fontFamily: fonts.semibold,
    marginTop: 0,
  },
  textpara: {
    color: 'lightgey',
    fontSize: 14,
    fontFamily: fonts.regular,

    width: wp(80),
  },
  dotstyle: {
    color: 'black',
    marginRight: 3,
    marginTop: wp(-0.5),
    // fontSize: 12,
    fontFamily: fonts.medium,
  },
  contentstyle: {
    flexDirection: 'row',
  },
  span: {
    textAlign: 'center',
  },
  font: {
    color: '#212529',
  },
  b: {
    fontWeight: 'bold',
  },
  p: {
    marginBottom: 10,
  },
});
