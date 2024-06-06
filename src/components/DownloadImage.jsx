import React from 'react';
import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

const DownloadImage = ({ userToSee }) => {
  const handleDownloadImage = async () => {
    const { uri } = userToSee.avatar;

    try {
      const { status } = await FileSystem.downloadAsync(
        uri,
        `${FileSystem.documentDirectory}avatar.jpg`
      );

      if (status === 200) {
        Alert.alert('Success', 'Image downloaded successfully.');
      } else {
        Alert.alert('Error', 'Failed to download image.');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleDownloadImage}>
        <Image
          source={{ uri: userToSee.avatar }}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <Text style={styles.text}>{userToSee.username}</Text>
    </View>
  );
};

export default DownloadImage;
