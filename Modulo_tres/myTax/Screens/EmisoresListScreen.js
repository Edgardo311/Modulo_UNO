import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';

import EntityCard from '../Components/EntityCard';
import { API_URL } from '../Libraries/config';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EmisoresListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [emisores, setEmisores] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      cargarEmisores();
    }, [])
  );

  const cargarEmisores = async () => {
    try {
      const response = await fetch(
        `${API_URL}/facturacion/emisores`
      );

      const data = await response.json();

      console.log('EMISORES:', data);

      setEmisores(data);
    } catch (error) {
      console.error(
        'Error cargando emisores:',
        error
      );
    }
  };

  const handleDelete = async (nombre) => {
    try {
      await fetch(
        `${API_URL}/facturacion/emisores/${nombre}`,
        {
          method: 'DELETE',
        }
      );

      cargarEmisores();
    } catch (error) {
      console.error(error);
    }
  };    

return (
  <SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>

      <Text style={styles.header}>
        Emisores
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          navigation.push('EmisorForm')
        }
      >
        <Text style={styles.addText}>
          Agregar Emisor
        </Text>
      </TouchableOpacity>

      <ScrollView style={styles.list}>
        {emisores.map((emisor, index) => (
          <EntityCard
            key={index}
            title={emisor.nombre}
            subtitle={emisor.rfc}           
            onSelect={() =>
              navigation.navigate(
                'CFDIForm',
                {
                  emisorSeleccionado: emisor,
                  cfdiActual: {
                    ...(route.params?.cfdiActual || {}),
                    emisor,
                  },
                }
              )
            }
            onEdit={() =>
              navigation.push(
                'EmisorForm',
                { emisor }
              )
            }
            onDelete={() =>
              handleDelete(
                emisor.nombre
              )
            }
          />
        ))}
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

