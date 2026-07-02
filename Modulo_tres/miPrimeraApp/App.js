import { StatusBar } from 'expo-status-bar';
import {useState} from 'react';
import { Pressable, Button, StyleSheet, Text, View } from 'react-native';
import ContadorBtn from './Components/ContadorBtn';

export default function App() {

const [contador, setContador] = useState(10);

  return (
    <View style={styles.container}>
      <Text style={styles.numeracion}> {contador} </Text>
      <ContadorBtn />

      <Pressable style={({ pressed }) => [
        styles.buttonFlotanteizquierdo, pressed && styles.buttomPressed]} 
      
        onPress = {() => setContador(contador + 1)}
        onLongPress ={() => setContador(0)}
      >

        <Text style={styles.buttonText}>+ 1 </Text>
      </Pressable> 

      <Pressable style={({ pressed }) => [
        styles.buttonFlotante, pressed && styles.buttomPressed]} 
      
        onPress = {() => setContador(contador - 1)}
        onLongPress ={() => setContador(0)}

      >
        <Text style={styles.buttonText}>- 1 </Text>
      </Pressable>    

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020202',
    alignItems: 'center',
    justifyContent: 'center',
  },

  numeracion:{
    fontSize: 80,
    color: '#ffffff',
    fontWeight: 'bold'
  },

  buttonText:{
    fontSize: 40,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  button: {
      backgroundColor: '#1e90ff',
      padding: 5,
      borderRadius: 20,
      margin: 10,
  },
  buttomPressed:{
    backgroundColor: '#454545',
    
  },

  buttonFlotante:{
   position:'absolute',
   bottom: 20,
   right: 20,
   backgroundColor: '#1e90ff',
   padding: 20,
   borderRadius: 15,
  },
  
  buttonFlotanteizquierdo:{
   position:'absolute',
   bottom: 20,
   left: 20,
   backgroundColor: '#1e90ff',
   padding: 20,
   borderRadius: 15,
  },


});
