import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';

let sound = null;
let muted = false;

export const playSound = async () => {

    if (muted === false) {
        try {
            if (!sound) {
                sound = new Audio.Sound();
                await sound.loadAsync(require('../../assets/sounds/tap_sound.wav'));
            }
            await sound.replayAsync();
            console.log('Tapping sound!');
        } catch (error) {
            console.log('Error loading the file at tapSound.jsx', error);
        }
    }
};