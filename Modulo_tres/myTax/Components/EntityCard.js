import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EntityCard({ title, subtitle, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.actions}>
        {onEdit && (
          <TouchableOpacity onPress={onEdit} style={styles.actionButton}>
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
        )}
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.actionButton}>
            <Text style={[styles.actionText, styles.deleteText]}>Eliminar</Text>
          </TouchableOpacity>
        )}
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
    shadowRadius: 10,
    elevation: 2,
  },
  content: {
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 12,
  },
  actionText: {
    color: '#1d4267',
    fontWeight: 'bold',
  },
  deleteText: {
    color: '#d9534f',
  },
});
