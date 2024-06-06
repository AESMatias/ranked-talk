import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons';
{/* <FontAwesome name="intersex" size={24} color="black" /> */}
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { colors } from '../../generalColors.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import HeaderBackground from '../components/HeaderBackground';
import { playSound } from '../utils/tapSound.jsx';
import { useNavigation } from '@react-navigation/native';

export const LocationsPUCSJ = () => {

  const navigation = useNavigation();

  const [origin, setOrigin] = React.useState({
    latitude: -33.499015,
    longitude:  -70.615240,
  });

    const dictOfLocations = {
    '01': {
        location: { latitude: -33.499015, longitude: -70.615240 },
        title: 'Baño Universal',
        piso: 'Piso: -1',
        description: 'Edificio San Joaquín. En el subterráneo, -1.',
    },
    '02': {
        location: { latitude: -33.499433, longitude: -70.615036 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
    },
    //TODO: From here on, i need to add the rest of pisos and descriptions rightfully.
    '03': {
        location: { latitude: -33.499075, longitude: -70.614327 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '04': {
        location: { latitude: -33.498723, longitude: -70.613703 },
        title: 'Baño Universal',
        piso: 'Piso: -1',
        description: '.',
      },
      '05': {
        location: { latitude: -33.498841, longitude: -70.612925 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '06': {
        location: { latitude: -33.499605, longitude: -70.613233 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '07': {
        location: { latitude: -33.499967, longitude: -70.613250 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '08': {
        location: { latitude: -33.499993, longitude: -70.613972 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '09': {
        location: { latitude: -33.499723, longitude: -70.614284 },
        title: 'Baño Universal',
        piso: 'Piso: -1',
        description: '.',
      },
      '10': {
        location: { latitude: -33.500362, longitude: -70.612890 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '11': {
        location: { latitude: -33.500533, longitude: -70.613170 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '12': {
        location: { latitude: -33.500277, longitude: -70.612547 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '13': {
        location: { latitude: -33.499876, longitude: -70.611924 },
        title: 'Baño Universal',
        piso: 'Piso: 1,2,3,4,5,6 y 7',
        description: '.',
      },
      '14': {
        location: { latitude: -33.499187, longitude: -70.612196 },
        title: 'Baño Universal',
        piso: 'Piso: -1',
        description: '.',
      },
      '15': {
        location: { latitude: -33.500545, longitude: -70.611388 },
        title: 'Baño Universal',
        piso: 'Piso: 1, 2',
        description: '',
      },
      '16': {
        location: { latitude: -33.500599, longitude: -70.610687 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '17': {
        location: { latitude: -33.500538, longitude: -70.610418 },
        title: 'Baño Universal',
        piso: 'Piso: -1',
        description: '.',
      },
      '18': {
        location: { latitude: -33.500992, longitude: -70.607747 },
        title: 'Baño Universal',
        piso: 'Piso: 6',
        description: '.',
      },
      '19': {
        location: { latitude: -33.499000, longitude: -70.611091 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '20': {
        location: { latitude: -33.498720, longitude: -70.611663 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '21': {
        location: { latitude: -33.497400, longitude: -70.610329 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '22': {
        location: { latitude: -33.498068, longitude: -70.610270 },
        title: 'Baño Universal',
        piso: 'Piso: 2',
        description: '',
      },
      '23': {
        location: { latitude: -33.498626, longitude: -70.610193 },
        title: 'Baño Universal',
        piso: 'Piso: 1, 2',
        description: '',
      },
      '24': {
        location: { latitude: -33.499384, longitude: -70.610169 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
    '25': {
    location: { latitude: -33.498013, longitude: -70.609101 },
    title: 'Baño Universal',
    piso: 'Piso: 1',
    description: '',
    },
    '26': {
        location: { latitude: -33.498273, longitude: -70.607614 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
    },
    '27': {
    location: { latitude: -33.497038, longitude: -70.609532 },
    title: 'Baño Universal',
    piso: 'Piso: 1',
    description: '',
    },
    '28': {
        location: { latitude: -33.496704, longitude: -70.609380 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
    },
    '29': {
        location: { latitude: -33.497949, longitude: -70.611042 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
    '30': {
    location: { latitude: -33.497871, longitude: -70.610638 },
    title: 'Baño Universal',
    piso: 'Piso: 1',
    description: '',
    },
    '31': {
        location: { latitude: -33.497571, longitude: -70.610685 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '32': {
        location: { latitude: -33.496997, longitude: -70.611139 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '',
      },
      '33': {
        location: { latitude: -33.497073, longitude: -70.611870 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '34': {
        location: { latitude: -33.496673, longitude: -70.613969 },
        title: 'Baño Universal',
        piso: 'Piso: Zócalo',
        description: '.',
      },
      '35': {
        location: { latitude: -33.496797, longitude: -70.613257 },
        title: 'Baño Universal',
        piso: 'Piso: Zócalo',
        description: '.',
      },
      '36': {
        location: { latitude: -33.497294, longitude: -70.613237 },
        title: 'Baño Universal',
        piso: 'Piso: Zócalo',
        description: '.',
      },
      '37': {
        location: { latitude: -33.498148, longitude: -70.613555 },
        title: 'Baño Universal',
        piso: 'Piso: 1, 2',
        description: '.',
      },
      '38': {
        location: { latitude: -33.498133, longitude: -70.614282 },
        title: 'Baño Universal',
        piso: 'Piso: 1, 2',
        description: '.',
      },
      '39': {
        location: { latitude: -33.497279, longitude: -70.614456 },
        title: 'Baño Universal',
        piso: 'Piso: Zócalo',
        description: '.',
      },
      '40': {
        location: { latitude: -33.497521, longitude: -70.614660 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '41': {
        location: { latitude: -33.497872, longitude: -70.615215 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '42': {
        location: { latitude: -33.498183, longitude: -70.615042 },
        title: 'Baño Universal',
        piso: 'Piso: 1',
        description: '.',
      },
      '43': {
        location: { latitude: -33.496586, longitude: -70.611932 },
        title: 'Baño Universal',
        piso: 'Piso: -1, 1, 2',
        description: '.',
      },
      
    };
  useEffect(() => {
    playSound();
    navigation.setOptions({
        headerStyle: {
            backgroundColor: colors.primary,//
            borderBottomWidth: 1,
            borderBottomColor: 'white',
        },
        headerBackground: () => <HeaderBackground />,
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        headerTitle: `RateTalk - Mapa Baños PUC SJ`,
        headerTitleStyle: {
            fontWeight: 'bold', // Agrega negrita al título
          },
        headerRight: () => (
            <TouchableOpacity
                style={{
                    marginRight: 15,
                }}
                onPress={() => navigation.navigate('Home')}
            >
                <FontAwesome5 name="home" size={20} color='white' style={{ marginLeft: 20 }} />
            </TouchableOpacity>
        ),

    });
}, [navigation]);

  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        initialRegion={{
          latitude: -33.499015,
          longitude: -70.615240,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {Object.keys(dictOfLocations).map((key,index) => (
          <Marker key={key} coordinate={dictOfLocations[key].location}>
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>
                  {dictOfLocations[key].title}
                </Text>
                <Text style={styles.calloutDescription}>
                  {dictOfLocations[key].description}
                </Text>
                <Text style={styles.calloutDescription}>
                  {dictOfLocations[key].piso}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    calloutContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: 200,
    },
    calloutTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 5,
      
    },
    calloutDescription: {
      fontSize: 15,
    },
  });

export default LocationsPUCSJ;


// import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
// import React, { useState, useEffect, useContext } from 'react';
// import * as ImagePicker from 'expo-image-picker';
// // import RNImageToPdf from 'react-native-image-to-pdf';
// // import PDFLib from 'react-native-pdf-lib';
// import { colors } from '../../generalColors.js';
// import { UserContext } from '../../App.js';
// import { playSound } from '../utils/tapSound.jsx';


// export const ImagesToPDF = ({ navigation }) => {
//     const [images, setImages] = useState([]);
//     const { user } = useContext(UserContext);

//     useEffect(() => {
//         navigation.setOptions({
//             headerStyle: {
//                 backgroundColor: colors.background,
//                 borderBottomWidth: 0.5,
//                 borderBottomColor: 'white',
//             },
//             headerTintColor: 'white',
//             headerTitleAlign: 'center',
//             headerTitle: `RateTalk - PDF Generator`,
//         });
//         playSound();
//     }, []);

//     const selectImages = async () => {
//         const result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.Images,
//             allowsMultipleSelection: true,
//             quality: 0.5,
//         });

//         if (!result.canceled) {
//             const selectedImages = result.assets || [result]; // Compatibilidad con diferentes versiones de Expo (*not sure)
//             setImages(selectedImages);
//         }
//     };

//     // const generatePDF = async () => {
//     //     try {
//     //         const imagesPaths = images.map(img => img.uri);
//     //         const pagePromises = imagesPaths.map(async imagePath => {
//     //             const page = await PDFLib.createPDFPage(imagePath);
//     //             return page;
//     //         });
    
//     //         const pages = await Promise.all(pagePromises);
//     //         const outputPath = RNFS.ExternalDirectoryPath + '/RateTalkApp_MyPDF.pdf';
//     //         await PDFLib.addPDFPages(pages, outputPath);
    
//     //         console.log('PDF Path: ', outputPath);
//     //         Alert.alert('PDF Created', `PDF saved at: ${outputPath}`);
//     //         ToastAndroid.show(`PDF saved at: ${outputPath}`, ToastAndroid.SHORT);
//     //     } catch (e) {
//     //         console.log(e);
//     //         ToastAndroid.show('Failed to create PDF', ToastAndroid.SHORT);
//     //         Alert.alert('Error', 'Failed to create PDF');
//     //     }
//     // };

//     return (
//         <View style={styles.background}>
//             <Text style={styles.text}>{user?.username}</Text>
//             <TouchableOpacity style={styles.button} onPress={selectImages}>
//                 <Text style={styles.buttonText}>Select Images</Text>
//             </TouchableOpacity>
//             {/* <TouchableOpacity style={styles.button} onPress={generatePDF}>
//                 <Text style={styles.buttonText}>Generate PDF</Text>
//             </TouchableOpacity> */}
//             <View style={styles.imageContainer}>
//                 {images.map((image, index) => (
//                     <Image key={index} source={{ uri: image.uri }} style={styles.image} />
//                 ))}
//             </View>
//         </View>
//     );
// }

// const styles = StyleSheet.create({
//     background: {
//         flex: 1,
//         backgroundColor: colors.background,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     text: {
//         color: 'white',
//         fontSize: 30,
//         fontWeight: '900',
//         backgroundColor: 'rgba(100, 100, 100, 0)',
//         padding: 2,
//         borderRadius: 5,
//         textAlign: 'center',
//     },
//     button: {
//         width: 200,
//         height: 60,
//         borderRadius: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#1E90FF',
//         borderWidth: 0,
//         borderColor: '#4169E1',
//         shadowColor: '#000000',
//         shadowOpacity: 0.5,
//         shadowOffset: { width: 2, height: 2 },
//         shadowRadius: 5,
//         elevation: 5,
//         marginVertical: 10,
//     },
//     buttonText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#ffffff',
//         letterSpacing: 2,
//     },
//     imageContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         justifyContent: 'center',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         margin: 2,
//         borderRadius: 5,
//     },
// });

// export default ImagesToPDF;