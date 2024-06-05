import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import * as ImagePicker from 'expo-image-picker';
// import RNImageToPdf from 'react-native-image-to-pdf';
// import PDFLib from 'react-native-pdf-lib';
import { colors } from '../../generalColors.js';
import { UserContext } from '../../App.js';
import { playSound } from '../utils/tapSound.jsx';


export const ImagesToPDF = ({ navigation }) => {
    const [images, setImages] = useState([]);
    const { user } = useContext(UserContext);

    useEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.background,
                borderBottomWidth: 0.5,
                borderBottomColor: 'white',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitle: `RateTalk - PDF Generator`,
        });
        playSound();
    }, []);

    const selectImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            const selectedImages = result.assets || [result]; // Compatibilidad con diferentes versiones de Expo (*not sure)
            setImages(selectedImages);
        }
    };

    // const generatePDF = async () => {
    //     try {
    //         const imagesPaths = images.map(img => img.uri);
    //         const pagePromises = imagesPaths.map(async imagePath => {
    //             const page = await PDFLib.createPDFPage(imagePath);
    //             return page;
    //         });
    
    //         const pages = await Promise.all(pagePromises);
    //         const outputPath = RNFS.ExternalDirectoryPath + '/RateTalkApp_MyPDF.pdf';
    //         await PDFLib.addPDFPages(pages, outputPath);
    
    //         console.log('PDF Path: ', outputPath);
    //         Alert.alert('PDF Created', `PDF saved at: ${outputPath}`);
    //         ToastAndroid.show(`PDF saved at: ${outputPath}`, ToastAndroid.SHORT);
    //     } catch (e) {
    //         console.log(e);
    //         ToastAndroid.show('Failed to create PDF', ToastAndroid.SHORT);
    //         Alert.alert('Error', 'Failed to create PDF');
    //     }
    // };

    return (
        <View style={styles.background}>
            <Text style={styles.text}>{user?.username}</Text>
            <TouchableOpacity style={styles.button} onPress={selectImages}>
                <Text style={styles.buttonText}>Select Images</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity style={styles.button} onPress={generatePDF}>
                <Text style={styles.buttonText}>Generate PDF</Text>
            </TouchableOpacity> */}
            <View style={styles.imageContainer}>
                {images.map((image, index) => (
                    <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
        backgroundColor: 'rgba(100, 100, 100, 0)',
        padding: 2,
        borderRadius: 5,
        textAlign: 'center',
    },
    button: {
        width: 200,
        height: 60,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1E90FF',
        borderWidth: 0,
        borderColor: '#4169E1',
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 5,
        elevation: 5,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 2,
    },
    imageContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        margin: 2,
        borderRadius: 5,
    },
});

export default ImagesToPDF;