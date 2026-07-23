import React, { useEffect, useState } from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {
  useNavigation,
  useRoute,
} from '@react-navigation/native';

import { createEmptyEmisor } from '../Models/EmisorModel';
import { API_URL } from '../Libraries/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmisorFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [emisor, setEmisor] = useState(
    createEmptyEmisor()
  );

  useEffect(() => {
    if (route.params?.emisor) {
      setEmisor(route.params.emisor);
    }
  }, [route.params]);

  const handleChange = (field, value) => {
  setEmisor((prev) => ({
    ...prev,
    [field]: value,
  }));
};

const handleSave = async () => {
  try {
    const emisorData = {
      nombre: emisor.nombre,
      rfc: emisor.rfc,
      regimenFiscal: emisor.regimenFiscal,
    };

    console.log('API:', API_URL);
    console.log('Enviando:', emisorData);

    const response = await fetch(
      `${API_URL}/facturacion/emisores`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emisorData),
      }
    );

const text = await response.text();

console.log('STATUS:', response.status);
console.log('RESPUESTA:', text);

    navigation.goBack();
  } catch (error) {
    console.error(
      'Error enviando emisor al backend:',
      error
    );
  }
};

    
return (
  <SafeAreaView style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Emisor</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={emisor.nombre}
        onChangeText={(value) =>
          handleChange('nombre', value)
        }
      />

      <TextInput
        style={styles.input}
        placeholder="RFC"
        value={emisor.rfc}
        onChangeText={(value) =>
          handleChange('rfc', value)
        }
      />

      <TextInput
        style={styles.input}
        placeholder="Régimen fiscal"
        value={emisor.regimenFiscal}
        onChangeText={(value) =>
          handleChange('regimenFiscal', value)
        }
      />

      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>
          Guardar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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