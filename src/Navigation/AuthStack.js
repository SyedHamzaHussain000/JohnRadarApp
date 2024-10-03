import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import GoThrough from '../Screens/GoThrough';
import Login from '../Screens/LogIn';
import SignUp from '../Screens/SignUp';
import Otp from '../Screens/Otp';
import ForgetPassword from '../Screens/ForgetPassword';
import ResetPassword from '../Screens/Resetpassword';
import MainStack from './MainStack';

// import Chat1 from '../Screens/chat1';
// import Chat2 from '../Screens/chat2';


const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="GoThrough">
      <Stack.Screen name="GoThrough" component={GoThrough} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="MainStack" component={MainStack} />
      {/* <Stack.Screen name="chat1" component={Chat1} /> */}
      {/* <Stack.Screen name="chat2" component={Chat2} /> */}

    </Stack.Navigator>
  );
};

export default AuthStack;
