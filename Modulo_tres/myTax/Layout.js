  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, View, Pressable} from 'react-native';
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

      <Pressable
        style={{ flex: 1 }}
        onPress={cerrarMenusGlobal}
      >

        <SafeAreaView style={styles.container}>

          <Header />
                
          <SearchBar resetKey={resetKey} />
          <Accionesprincipales
            resetKey={resetKey}
            cerrarMenusGlobal={cerrarMenusGlobal} 
          />        
          <StatusBar style="auto" />
      
      </SafeAreaView>
      </Pressable>
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


