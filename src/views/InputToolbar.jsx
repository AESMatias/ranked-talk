/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Image } from 'react-native';
import { InputToolbar, Actions, Composer, Send } from 'react-native-gifted-chat';
import { colors } from '../../generalColors';

export const renderInputToolbar = (props) => (
  <InputToolbar
    {...props}
    containerStyle={{
      backgroundColor: colors.background,
      paddingTop: 6,
    }}
    primaryStyle={{ alignItems: 'center' }}
  />
);

export const renderActions = (props) => (
  <Actions
    {...props}
    containerStyle={{
      width: 0,
      height: 0,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 0,
      marginRight: 5,
      marginBottom: 0,
    }}
    // icon={() => (
    //   <Image
    //     style={{ width: 32, height: 32 }}
    //     source={{
    //       uri: 'https://avatars.githubusercontent.com/u/119653204?v=4',
    //     }}
    //   />
    // )}
    options={{
      'Choose From Library': () => {
        console.log('Choose From Library');
      },
      Cancel: () => {
        console.log('Cancel');
      },
    }}
    optionTintColor="#222B45"
  />
);

export const renderComposer = (props) => (
  <Composer
    {...props}
    textInputStyle={{
      color: '#ffffff',
      backgroundColor: colors.backgroundDense,
      borderWidth: 0.25,
      borderRadius: 5,
      borderColor: 'rgba(80,190,250,0.7)',
      paddingTop: 2,
      paddingHorizontal: 10,
      textAlign: 'left',
      marginLeft: 0,
      marginRight: 6,
    }}
  />
);

export const renderSend = (props) => (
  <Send
    {...props}
    disabled={!props.text}
    containerStyle={{
      width: 40,
      height: 40,
      marginRight: 5,
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <Image
      style={{ width: 60, height: 60 }}
      source={{
        uri: 'https://play-lh.googleusercontent.com/yrM52mTK5u6PgBL71MMBymzqy-HjrUUQejcGwI5GaL74u-yRtfn18tRDaWMMitS9dtpQ=w240-h480-rw',
      }}
    />
  </Send>
);