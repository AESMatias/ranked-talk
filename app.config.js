import 'dotenv/config';

export default {
  "expo": {
    "name": "Rate Talk",
    "slug": "rate-talk-app",
    "version": "1.3.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#102339"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "bundleIdentifier": "com.aesmatias.rateralkapp",
      "versionCode": 4,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#102339"
      },
      "package": "com.aesmatias.ratetalkapp"
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "config": {
        "csp": "default-src 'self' *; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
      }

    },
    "scheme": "com.aesmatias.ratetalkapp",
    "plugins": [
      "expo-font", // Agrega "expo-font" a la lista de plugins
      "expo-router",
    ],
    "environmentVars": {
      // "apiKey": process.env.API_KEY,
      // "authDomain": process.env.AUTH_DOMAIN,
      // "projectId": process.env.PROJECT_ID,
      // "storageBucket": process.env.STORAGE_BUCKET,
      // "messagingSenderId": process.env.MESSAGING_SENDER_ID,
      // "appId": process.env.APP_ID,
      // "measurementId": process.env.MEASUREMENT_ID
    },
    "owner": "aesmatiash",
    "extra": {
      "eas": {
        "projectId": "9a9181af-4810-4ecc-8d3b-bb437f4db706"
      }
    },
    "eas": {
      "projectId": "9a9181af-4810-4ecc-8d3b-bb437f4db706"
    },
    "projectId": "9a9181af-4810-4ecc-8d3b-bb437f4db706"
  }
}
