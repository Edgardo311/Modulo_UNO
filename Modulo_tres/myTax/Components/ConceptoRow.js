import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConceptoRow({ concepto }) {
  return (
    <View style={styles.row}>
      <Text style={styles.description}>{concepto.descripcion}</Text>
      <Text style={styles.detail}>{concepto.cantidad} x {concepto.valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 6,
  },
  description: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
