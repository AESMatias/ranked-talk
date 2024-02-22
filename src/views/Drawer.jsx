import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Home from './Home';

const Drawer = createDrawerNavigator();

export const DrawerGroup = () => {
    return (
        <Drawer.Navigator screenOptions={{
            drawerIcon: ({ focused, color, size }) => (
                <TouchableOpacity>
                    <AntDesign name="menu-fold" size={15} color={'white'} />
                </TouchableOpacity>
            ),
        }}>
            <Drawer.Screen name="Home" component={Home} options={drawer} />
            {/* <Drawer.Screen name="My Account" component={MyAccount} options={drawer} /> */}
            {/* <Drawer.Screen name="About" component={About} options={drawerStyle} /> */}
        </Drawer.Navigator>
    );
}

const drawer = {
    headerShown: true, // Show the header
    headerTitleAlign: 'center', // Align the header title to center
    headerTitleStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 15, // Change the font size if necessary
        fontWeight: 'bold',
    },
    headerTintColor: 'white', // Color of the button to open the Drawer
    headerStyle: {
        backgroundColor: '#141419',
        borderBottomWidth: 0.5, // Header bottom border width
        borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 80,
    },
    drawerStyle: {
        backgroundColor: 'rgba(5, 15, 25, 1)',
        width: 250,
        paddingTop: '80%', // Adjust space from the top of the screen

    },
    drawerType: 'front', // Type of Drawer (front)
    drawerWidth: 200, // Width of the Drawer
    drawerBackgroundColor: 'rgba(20, 20, 25, 0.8)', // Drawer background color
    overlayColor: 'rgba(0, 0, 0, 0.85)', // Color of overlay when opening the Drawer
    minSwipeDistance: 50, // Minimum swipe distance to open the Drawer
    drawerLockMode: 'unlocked', // Drawer lock mode ('locked-closed', 'locked-open', 'unlocked')
    hideStatusBar: false, // Hide status bar when opening the Drawer
    statusBarAnimation: 'fade', // Status bar animation when opening the Drawer
    swipeEdgeWidth: 50, // Width of the activation area of the Drawer when swiping from the edge
    drawerLabelStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 20, // Change the font size if necessary
        fontWeight: 'bold',
    },
};


const drawerStyle = {
    headerTitleAlign: 'center', // Align the header title to center
    headerTitleStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 15, // Change the font size if necessary
        fontWeight: 'bold',
    },
    headerTintColor: 'white', // Color of the button to open the Drawer
    headerShown: true, // Show the header
    headerStyle: {
        backgroundColor: '#141419',
        // borderBottomWidth: 0.5, // Header bottom border width
        // borderBottomColor: 'white', // Header bottom border color
        elevation: 0, // Header elevation in Android (to avoid shadow)
        height: 50,
    },

    drawerStyle: {
        backgroundColor: 'rgba(5, 15, 25, 1)',
        width: 250,
        paddingTop: '80%', // Adjust space from the top of the screen
    },
    drawerType: 'front', // Type of Drawer (front)
    drawerWidth: 200, // Width of the Drawer
    // drawerBackgroundColor: 'rgba(20, 20, 25, 0.8)', // Drawer background color
    overlayColor: 'rgba(0, 0, 0, 0.85)', // Color of overlay when opening the Drawer
    minSwipeDistance: 50, // Minimum swipe distance to open the Drawer
    drawerLockMode: 'unlocked', // Drawer lock mode ('locked-closed', 'locked-open', 'unlocked')
    hideStatusBar: false, // Hide status bar when opening the Drawer
    statusBarAnimation: 'fade', // Status bar animation when opening the Drawer
    swipeEdgeWidth: 50, // Width of the activation area of the Drawer when swiping from the edge
    drawerLabelStyle: {
        color: 'white', // Change the color of the letters
        fontSize: 20, // Change the font size if necessary
        fontWeight: 'bold',
    },
};
