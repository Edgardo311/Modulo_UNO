import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Leyes() {
  const [leyes, setLeyes] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const cargarLeyes = async (fromCache = false) => {
    try {
      if (fromCache) {
        const cache = await AsyncStorage.getItem('leyes');
        if (cache) {
          console.log('Leyendo del caché:', cache);
          setLeyes(JSON.parse(cache));
          return;
        }
      }

      const response = await fetch('http://10.0.2.2:3000/leyes');
      const data = await response.json();
      console.log('Datos recibidos del backend:', data);

      // ✅ fuerza a que siempre sea un array
      const lista = Array.isArray(data) ? data : [];

      // ✅ convierte cada campo a string seguro
      const listaSegura = lista.map((item, index) => ({
        id: item?.id ? String(item.id) : String(index), // clave única
        nombre: item?.nombre ? String(item.nombre) : 'Sin nombre',
        fechaReforma: item?.fechaReforma ? String(item.fechaReforma) : 'No disponible',
        pdf: item?.pdf ? String(item.pdf) : '',
      }));

      await AsyncStorage.setItem('leyes', JSON.stringify(listaSegura));
      setLeyes(listaSegura);
    } catch (error) {
      console.error('Error cargando leyes:', error);
      setLeyes([]); // evita que se quede con datos corruptos
    }
  };

  useEffect(() => {
    // Primero carga desde caché, luego refresca desde el backend
    cargarLeyes(true);
    cargarLeyes();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await cargarLeyes(); // fuerza consulta al backend
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={leyes}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
              {item.nombre}
            </Text>
            <Text style={{ color: 'gray' }}>
              Última reforma: {item.fechaReforma}
            </Text>
            <TouchableOpacity
              onPress={() => item.pdf && console.log('Abrir PDF:', item.pdf)}
            >
              <Text style={{ color: 'blue' }}>Ver PDF</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* ✅ Mensaje si no hay leyes */}
      {leyes.length === 0 && (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No hay leyes disponibles
        </Text>
      )}
    </View>
  );
}
