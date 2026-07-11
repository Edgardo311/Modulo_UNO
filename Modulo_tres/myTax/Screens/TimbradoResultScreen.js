import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function TimbradoResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const result = route.params?.result;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Resultado de Timbrado</Text>
      {result ? (
        <View>
          <Text style={styles.label}>UUID:</Text>
          <Text style={styles.value}>{result.uuid || 'No disponible'}</Text>
          <Text style={styles.label}>Fecha certificación:</Text>
          <Text style={styles.value}>{result.fechaCertificacion || 'No disponible'}</Text>
          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.value}>{result.status}</Text>
          <Text style={styles.label}>Total:</Text>
          <Text style={styles.value}>{result.total?.toFixed(2) || '0.00'}</Text>
          <Text style={styles.sectionTitle}>Emisor</Text>
          <Text style={styles.value}>{result.emisor?.nombre}</Text>
          <Text style={styles.sectionTitle}>Receptor</Text>
          <Text style={styles.value}>{result.receptor?.nombre}</Text>
        </View>
      ) : (
        <Text style={styles.emptyText}>No hay datos de timbrado disponibles</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Regresar</Text>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
  },
  value: {
    fontSize: 16,
    marginTop: 4,
    color: '#333',
  },
  sectionTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
  button: {
    marginTop: 24,
    backgroundColor: '#13710e',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
