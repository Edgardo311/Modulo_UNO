import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function EntityCard({
  title,
  subtitle,
  onSelect,
  onEdit,
  onDelete,
}) {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      <View style={styles.actions}>
        {onSelect && (
          <TouchableOpacity
            onPress={onSelect}
            style={styles.selectButton}
          >
            <Text style={styles.buttonText}>
              Seleccionar
            </Text>
          </TouchableOpacity>
        )}

        {onEdit && (
          <TouchableOpacity
            onPress={onEdit}
            style={styles.editButton}
          >
            <Text style={styles.buttonText}>
              Editar
            </Text>
          </TouchableOpacity>
        )}

        {onDelete && (
          <TouchableOpacity
            onPress={onDelete}
            style={styles.deleteButton}
          >
            <Text style={styles.buttonText}>
              Eliminar
            </Text>
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
    marginBottom: 12,
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
    alignItems: 'center',
  },

  selectButton: {
    backgroundColor: '#0e2371',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },

  editButton: {
    backgroundColor: '#414e41',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },

  deleteButton: {
    backgroundColor: '#d9534f',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});