import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function DraftItem({ draft, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{draft.serie || 'Borrador'}</Text>
        <Text style={styles.subtitle}>{draft.receptor?.nombre || 'Sin receptor'}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit} style={styles.button}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginVertical: 8,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    marginRight: 12,
  },
  buttonText: {
    color: '#1d4267',
    fontWeight: 'bold',
  },
  deleteButton: {},
  deleteText: {
    color: '#d9534f',
    fontWeight: 'bold',
  },
});
