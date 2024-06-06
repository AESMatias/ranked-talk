import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Entypo from '@expo/vector-icons/Entypo';

export const LocationsPUCSJ = () => {

  const [origin, setOrigin] = React.useState({
    latitude: 33.640411,
    longitude:  -84.419853,
  });

  const [destination, setDestination] = React.useState({
    latitude: 33.753746,
    longitude: -84.386330,
  });

  React.useEffect(() => {
    getLocationPermission();
  }, [])

//   async function getLocationPermission() {
//     let { status } = await Location.requestForegroundPermissionsAsync();
//     if(status !== 'granted') {
//       alert('Permission denied');
//       return;
//     }
//     let location = await Location.getCurrentPositionAsync({});
//     const current = {
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude
//     }
//     setOrigin(current);
//   }

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.04
        }}
      >
        <Marker 
          coordinate={origin}
          image={<Entypo name="baidu" size={24} color="black" />}
          onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker 
          coordinate={destination}
          onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%'
  }
});

export default LocationsPUCSJ;