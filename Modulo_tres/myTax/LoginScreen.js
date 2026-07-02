import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuto } from './AutoContext';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const navigation = useNavigation();
  const { signIn, user, loading } = useAuto();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  useEffect(() => {
    if (user) {
      navigation.replace('MainApp');
    }
  }, [user]);

  if (loading) {
    return <Text>Cargando...</Text>;
  }

  if (user) {
    return null; 
  }

  const handleLogin = async () => {
    const result = await signIn(username, password);
    if (!result.success) {
      alert(result.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.Button} onPress={handleLogin}>
        <Text style={styles.buttontext}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

//-----------------Estilos----------------//
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#d1d1e1',
    padding: 20,
  },
  title: {
    fontSize: width * 0.1,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#080101',
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderColor: '#513d3d',
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 10,
  },
  Button: {
    backgroundColor: '#19967b',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    textAlign: 'center',
  },
  buttontext: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
