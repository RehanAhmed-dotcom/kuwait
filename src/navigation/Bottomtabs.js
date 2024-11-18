import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors, fonts, images} from '../contants/index';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Pillars from '../screen/main/Pillars';
import Home from '../screen/main/Home';

const Tab = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F4F4F4'}}>
      <Tab.Navigator
        initialRouteName="BMI"
        tabBarPosition="bottom"
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            height: wp(15),

            width: wp(90),
            alignSelf: 'center',
            borderRadius: wp(2),
            marginBottom: wp(2),

            elevation: 0.8,
          },
        }}
        tabBarOptions={{
          activeTintColor: colors.main,
          inactiveTintColor: '#D8D8D8',
          style: {
            backgroundColor: '#F6F7F9',
            elevation: 2,
            width: wp(100),

            marginTop: wp(3),
          },

          tabStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: wp(2.5),
          },
          labelStyle: {
            fontSize: 10,
            fontFamily: fonts.semibold,
            marginTop: wp(1),
          },
          iconStyle: {
            width: wp(6),
            height: wp(6),
            justifyContent: 'center',
            alignItems: 'center',
          },
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              // <Image
              //   source={images.ghr}
              //   resizeMode="contain"
              //   style={[
              //     {
              //       tintColor: focused ? colors.main : '#D8D8D8',
              //       width: wp(6),
              //       height: wp(6),
              //     },
              //   ]}
              // />
              <View
                style={{
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  height: 60,
                  width: 50,
                  // marginTop: Platform.OS == 'ios' ? 30 : 0,
                  justifyContent: 'center',
                  marginTop: Platform.OS == 'ios' ? 30 : 0,
                }}>
                <Image
                  source={images.ghr}
                  resizeMode="contain"
                  style={[
                    {
                      tintColor: focused ? colors.main : '#D8D8D8',
                      width: wp(6),
                      height: wp(6),
                    },
                  ]}
                />
                <Text
                  style={{
                    // position: 'absolute',
                    color: focused ? colors.main : '#D8D8D8',
                    // width: 100,
                    // bottom: 0,
                    // top: 0,

                    fontFamily: fonts.semibold,
                  }}>
                  Home
                </Text>
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Pillars"
          component={Pillars}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              // <Image
              //   source={images.ali}
              //   resizeMode="contain"
              //   style={[
              //     {
              //       tintColor: focused ? colors.main : '#D8D8D8',
              //       width: wp(6),

              //       height: wp(6),
              //     },
              //   ]}
              // />
              <View
                style={{
                  alignItems: 'center',
                  // backgroundColor: 'red',
                  height: 60,
                  width: 50,
                  justifyContent: 'center',
                  marginTop: Platform.OS == 'ios' ? 30 : 0,
                }}>
                <Image
                  source={images.ali}
                  resizeMode="contain"
                  style={[
                    {
                      tintColor: focused ? colors.main : '#D8D8D8',
                      width: wp(6),
                      height: wp(6),
                    },
                  ]}
                />
                <Text
                  style={{
                    // position: 'absolute',
                    color: focused ? colors.main : '#D8D8D8',
                    // width: 100,
                    // bottom: 0,
                    // top: 0,

                    fontFamily: fonts.semibold,
                  }}>
                  Pillars
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({});
