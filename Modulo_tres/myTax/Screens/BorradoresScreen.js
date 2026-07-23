import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DraftItem from '../Components/DraftItem';
import { getDrafts, deleteDraft } from '../Services/storageService';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BorradoresScreen() {
  const navigation = useNavigation();
  const [drafts, setDrafts] = useState([]);

  useEffect(() => {
    const load = async () => {
      setDrafts(await getDrafts());
    };
    load();
  }, []);

  const handleDelete = async (id) => {
    await deleteDraft(id);
    setDrafts(await getDrafts());
  };

  const handleEdit = (draft) => {
    navigation.navigate('CFDIForm', { draft });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <Text style={styles.header}>Borradores</Text>
      <ScrollView style={styles.list}>
        {drafts.map((draft) => (
          <DraftItem
            key={draft.id}
            draft={draft}
            onEdit={() => handleEdit(draft)}
            onDelete={() => handleDelete(draft.id)}
          />
        ))}
        {drafts.length === 0 && <Text style={styles.emptyText}>No hay borradores guardados</Text>}
      </ScrollView>
    </View>
    </SafeAreaView>
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
  list: {
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#777',
  },
});
