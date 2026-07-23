import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiBaseUrl } from '../config';
import { API_URL } from '../Libraries/config';

export default function Leyes() {
  const [leyes, setLeyes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const cargarLeyes = async (fromCache = false) => {
    try {
      setLoading(true);

      if (fromCache) {
        const cache = await AsyncStorage.getItem('leyes');
        if (cache) {
          const parsed = JSON.parse(cache);
          setLeyes(parsed);
          setLoading(false);
          return;
        }
      }

      const url = API_URL + '/api/leyes';

      console.log('URL:', url);

      const response = await fetch(url);

      console.log('URL:', url);
      console.log('STATUS:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      const lista = Array.isArray(data) ? data : [];

      const listaSegura = lista.map((item, index) => ({
        id: item?.id != null ? String(item.id) : `ley-${index}`,
        nombre: item?.nombre ? String(item.nombre) : 'Sin nombre',
        fechaReforma: item?.fechaReforma || 'No disponible',
        ref: item?.pdf ? String(item.pdf) : '',
      }));
      
      await AsyncStorage.setItem('leyes', JSON.stringify(listaSegura));
      setLeyes(listaSegura);
    } catch (error) {
      console.error('Error cargando leyes:', error);
      setLeyes([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    cargarLeyes();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarLeyes();
  };

    const abrirPdf = async (pdf) => {
      try {
        await Linking.openURL(pdf);
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <ActivityIndicator size="large" color="#13710e" />
      ) : null}

      <Text style={{ color: 'red', fontSize: 20 }}>
        Leyes: {leyes.length}
      </Text>

      <View>
        {!loading && leyes.length === 0 ? (
          <Text style={styles.emptyText}>
            No hay leyes disponibles
          </Text>
        ) : (
          leyes.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.title}>
                {item.nombre}
              </Text>

              <Text style={styles.subtitle}>
                Última reforma: {item.fechaReforma}
              </Text>

              <TouchableOpacity
                onPress={() => abrirPdf(item.ref)}
              >
                <Text style={styles.linkText}>
                  {item.ref
                    ? 'Ver PDF'
                    : 'Sin PDF disponible'}
                </Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    marginBottom: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f7f7f7',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  subtitle: {
    color: 'gray',
    marginBottom: 6,
  },
  linkText: {
    color: '#13710e',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
  },
});