import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screen/Auth/Login';
import Bottomtabs from './Bottomtabs';
import Pillars1 from '../screen/main/Pillars1';
import Pillars2 from '../screen/main/Pillars2';
import Pillars3 from '../screen/main/Pillars3';
import Startquiz from '../screen/main/Startquiz';
import Question1 from '../screen/main/Question1';
import Congrulation from '../screen/main/Congrulation';
import Splash from '../screen/Auth/Splash';
import Selection from '../screen/Auth/Selection';
import Question2 from '../screen/main/Question2';
import Failed from '../screen/main/Failed';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const Roots = () => {
  const user = useSelector(state => state?.user?.user);
  console.log('user on rooooooot', user);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user === null ? (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Selection" component={Selection} />
          </>
        ) : (
          <>
            <Stack.Screen name="Bottomtabs" component={Bottomtabs} />
            <Stack.Screen name="Pillars1" component={Pillars1} />
            <Stack.Screen name="Pillars2" component={Pillars2} />
            <Stack.Screen name="Pillars3" component={Pillars3} />
            <Stack.Screen name="Startquiz" component={Startquiz} />
            <Stack.Screen name="Question1" component={Question1} />
            <Stack.Screen name="Question2" component={Question2} />

            <Stack.Screen name="Congrulation" component={Congrulation} />
            <Stack.Screen name="Failed" component={Failed} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Roots;

const styles = StyleSheet.create({});
