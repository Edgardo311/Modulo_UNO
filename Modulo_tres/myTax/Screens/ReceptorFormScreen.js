import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { saveReceptor } from '../Services/storageService';
import { createEmptyReceptor } from '../Models/ReceptorModel';

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
    const id = receptor.id || String(Date.now());
    await saveReceptor({ ...receptor, id });
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Receptor</Text>
      <TextInput style={styles.input} placeholder="Nombre" value={receptor.nombre} onChangeText={(value) => handleChange('nombre', value)} />
      <TextInput style={styles.input} placeholder="RFC" value={receptor.rfc} onChangeText={(value) => handleChange('rfc', value)} />
      <TextInput style={styles.input} placeholder="Régimen fiscal" value={receptor.regimenFiscal} onChangeText={(value) => handleChange('regimenFiscal', value)} />
      <TextInput style={styles.input} placeholder="Código Postal" value={receptor.domicilio} onChangeText={(value) => handleChange('Código Postal', value)} />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
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
