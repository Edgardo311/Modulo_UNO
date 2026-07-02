import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Header from './Components/Header';
import Accionesprincipales from './Components/Accionesprincipales';
import SearchBar from './Components/SearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MainApp() {
  const [resetKey, setResetKey] = useState(0);

  const cerrarMenusGlobal = () => {
    setResetKey(prev => prev + 1);
  };

  return (

    <SafeAreaView style={styles.container}>

      <Header />
      <SearchBar resetKey={resetKey} />
      <Accionesprincipales resetKey={resetKey} />
      <StatusBar style="auto" />
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});


