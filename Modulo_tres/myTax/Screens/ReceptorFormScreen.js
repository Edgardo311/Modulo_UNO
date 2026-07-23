import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { createEmptyReceptor } from '../Models/ReceptorModel';
import { API_URL } from '../Libraries/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReceptorFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [receptor, setReceptor] = useState(createEmptyReceptor());

  useEffect(() => {
    if (route.params?.receptor) {
      setReceptor(route.params.receptor);
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setReceptor((prev) => ({ ...prev, [field]: value }));
  };

const handleSave = async () => {
  try {
    const payload = {
      nombre: receptor.nombre || '',
      rfc: receptor.rfc || '',
      regimenFiscal: receptor.regimenFiscal || '',
      codigoPostal: receptor.codigoPostal || '',
    };

console.log('API_URL:', API_URL);
console.log('Payload:', payload);

    const response = await fetch(
      `${API_URL}/facturacion/receptores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    );

    console.log('Status:', response.status);

    let data = null;

    try {
      data = await response.json();
      console.log('Respuesta backend:', data);
    } catch (parseError) {
      data = null;
    }

    if (!response.ok) {
      throw new Error(
        data?.message || 'No se pudo guardar el receptor'
      );
    }

    const savedReceptor =
      data && typeof data === 'object'
        ? data
        : payload;

    console.log(
      'Receptor guardado:',
      savedReceptor
    );

    navigation.goBack();

  } catch (error) {
    console.error(
      'Error enviando receptor al backend:',
      error
    );

    Alert.alert(
      'Error',
      'No se pudo guardar el receptor'
    );
  }
};

  return (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Receptor</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={receptor.nombre} onChangeText={(value) => handleChange('nombre', value)} />
      <TextInput style={styles.input} placeholder="RFC" value={receptor.rfc} onChangeText={(value) => handleChange('rfc', value)} />
      <TextInput style={styles.input} placeholder="Régimen fiscal" value={receptor.regimenFiscal} onChangeText={(value) => handleChange('regimenFiscal', value)} />
      <TextInput style={styles.input} placeholder="Código Postal" value={receptor.codigoPostal} onChangeText={(value) => handleChange('codigoPostal', value)} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>      
  );
}

const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
  paddingTop: 20,
  paddingHorizontal: 16,
  paddingBottom: 16,
  backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#13710e',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 12,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
