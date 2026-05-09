import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image, TouchableOpacity} from 'react-native';
import Header from './Components/header';
import BotonFacturacion from './Components/Buttons.js';
import React, { useState } from 'react';


export default function App() {

  
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
    
      <Header />
      <BotonFacturacion />


      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },


});