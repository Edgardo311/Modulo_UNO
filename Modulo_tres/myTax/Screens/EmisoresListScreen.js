import React, { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import EntityCard from '../Components/EntityCard';
import { getEmisores, deleteEmisor } from '../Services/storageService';

export default function EmisoresListScreen() {
  const navigation = useNavigation();
  const [emisores, setEmisores] = useState([]);

  useEffect(() => {
    const load = async () => {
      setEmisores(await getEmisores());
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteEmisor(id);
    setEmisores(await getEmisores());
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Emisores</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('EmisorForm')}>
        <Text style={styles.addText}>Agregar Emisor</Text>
      </TouchableOpacity>
      <ScrollView style={styles.list}>
        {emisores.map((emisor) => (
          <EntityCard
            key={emisor.id}
            title={emisor.nombre}
            subtitle={emisor.rfc}
            onEdit={() => navigation.navigate('EmisorForm', { emisor })}
            onDelete={() => handleDelete(emisor.id)}
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
