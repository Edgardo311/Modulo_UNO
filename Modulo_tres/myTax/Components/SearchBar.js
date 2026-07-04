import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function SearchBar({ resetKey }) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch('');
  }, [resetKey]);

  const opciones = [
    'CFDI',
    'Factura',
    'Ingresos',
    'Anticipo',
    'Egresos',
    'Complemento',
    'Carta porte',
    'Comercio exterior',
    'Compraventa de divisas',
    'Consumo de combustible',
    'Donatarias',
    'Fideicomisos',
    'Nóminas',
    'Notarios públicos',
    'Retenciones',
    'Expediente',
    'Constancia de situación fiscal',
    'Opinión de cumplimiento',
    'SAT',
  ];

  const filtrados = opciones.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Buscar..."
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />

      {search !== '' &&
        filtrados.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSearch(item)}
          >
            <Text style={styles.result}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: -20,
    backgroundColor: '#a6b07e',
    borderRadius: 7,
    padding: 1,
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    color: '#000',
  },
  result: {
    padding: 10,
    marginTop: 5,
    backgroundColor: '#c3dbbf',
    borderRadius: 5,
  },
});