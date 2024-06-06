import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const HeaderBackground = () => {
  return (
    <LinearGradient
      colors={['hsl(210, 100%, 20%)', 'hsl(220, 90%, 15%)', 'hsl(230, 80%, 10%)']}
      style={{ flex: 0.995 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    />
  );
};

export default HeaderBackground;
