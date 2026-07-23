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
import { SafeAreaView } from 'react-native-safe-area-context';

import EntityCard from '../Components/EntityCard';
import { API_URL } from '../Libraries/config';

export default function ReceptoresListScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [receptores, setReceptores] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      cargarReceptores();
    }, [])
  );

  const cargarReceptores = async () => {
    try {
      const response = await fetch(
        `${API_URL}/facturacion/receptores`
      );

      const data = await response.json();

      console.log('RECEPTORES:', data);

      setReceptores(data);
    } catch (error) {
      console.error(
        'Error cargando receptores:',
        error
      );
    }
  };

  const handleDelete = async (nombre) => {
    try {
      console.log('ELIMINANDO:', nombre);

      const response = await fetch(
        `${API_URL}/facturacion/receptores/${nombre}`,
        {
          method: 'DELETE',
        }
      );

      console.log(
        'DELETE STATUS:',
        response.status
      );

      cargarReceptores();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.header}>
          Receptores
        </Text>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() =>
            navigation.navigate(
              'ReceptorForm',
              {
                cfdiActual: route.params?.cfdiActual || {},
              }
            )
          }
        >
          <Text style={styles.addText}>
            Agregar Receptor
          </Text>
        </TouchableOpacity>

        <ScrollView style={styles.list}>
          {receptores.map(
            (receptor, index) => (
              <EntityCard
                key={index}
                title={receptor.nombre}
                subtitle={receptor.rfc}
                onSelect={() => {
                  console.log('SELECT:', receptor);

                  const cfdiState = {
                    ...(route.params?.cfdiActual || {}),
                    receptor,
                  };

                  navigation.navigate('CFDIForm', {
                    receptorSeleccionado: receptor,
                    cfdi: cfdiState,
                    cfdiActual: cfdiState,
                  });
                }}
                onEdit={() =>
                  navigation.navigate(
                    'ReceptorForm',
                    {
                      receptor,
                    }
                  )
                }
                onDelete={() => {
                  console.log('RECEPTOR:',
                    receptor);
                    console.log('NOMBRE:',
                      receptor.nombre);
                  handleDelete(
                    receptor.nombre);
                }}
              />
            )
          )}
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