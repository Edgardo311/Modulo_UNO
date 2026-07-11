import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EntityCard from '../Components/EntityCard';
import { getReceptores, deleteReceptor } from '../Services/storageService';

export default function ReceptoresListScreen() {
  const navigation = useNavigation();
  const [receptores, setReceptores] = useState([]);

  useEffect(() => {
    const load = async () => {
      setReceptores(await getReceptores());
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteReceptor(id);
    setReceptores(await getReceptores());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Receptores</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('ReceptorForm')}>
        <Text style={styles.addText}>Agregar Receptor</Text>
      </TouchableOpacity>
      <ScrollView style={styles.list}>
        {receptores.map((receptor) => (
          <EntityCard
            key={receptor.id}
            title={receptor.nombre}
            subtitle={receptor.rfc}
            onEdit={() => navigation.navigate('ReceptorForm', { receptor })}
            onDelete={() => handleDelete(receptor.id)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#13710e',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
});
