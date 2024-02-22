import React, { useState, createContext, useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, ActivityIndicator } from 'react-native';
import { initializeAuth, onAuthStateChanged, getReactNativePersistence } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from './firebaseConfig';
import Login from './src/views/Login.jsx';
import Register from './src/views/Register.jsx';
import Chat from './src/views/Chat.jsx';
import Home from './src/views/Home.jsx';
import { MyAccount } from './src/views/MyAccount.jsx';
import DrawerGroup from './src/views/Drawer.jsx';
import { setUser } from './src/store/slices/AccountSlice.jsx'
import { useDispatch, useSelector } from 'react-redux';

const Stack = createStackNavigator();
export const UserContext = createContext({});


// WebBrowser.maybeCompleteAuthSession();


// export const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

const UserProvider = ({ children }) => {

  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function ChatStack() {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Chat' component={Chat} />
      <Stack.Screen name='My Account' component={MyAccount} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
    </Stack.Navigator>
  );
}

function RootNavigator() {

  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async authenticatedUser => {
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setIsLoading(false);
    });
    // useDispatch(setUser(user));
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {/* <DrawerGroup /> */}
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  );
}


export default function App() {
  return (
    <UserProvider>
      <RootNavigator />
    </UserProvider>
  );
}