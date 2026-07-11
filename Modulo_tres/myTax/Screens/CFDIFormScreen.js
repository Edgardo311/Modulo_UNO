import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { v4 as uuidv4 } from 'uuid';
import {
  getEmisores,
  getReceptores,
  saveDraft,
} from '../Services/storageService';
import {
  calculateTotals,
  validateCFDI,
} from '../Services/cfdiService';
import { generatePDF } from '../Services/pdfService';
import { createEmptyCFDI } from '../Models/CFDIModel';

export default function CFDIFormScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [cfdi, setCfdi] = useState(createEmptyCFDI());
  const [emisores, setEmisores] = useState([]);
  const [receptores, setReceptores] = useState([]);

  const loadData = async () => {
    setEmisores(await getEmisores());
    setReceptores(await getReceptores());
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [])
  );

  useEffect(() => {
    if (route.params?.draft) {
      setCfdi(route.params.draft);
    }
  }, [route.params]);

  const handleChange = (field, value) => {
    setCfdi((prev) => ({
      ...prev,
      [field]: value,
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleSelectEmisor = (id) => {
    const seleccionado = emisores.find((item) => item.id === id);
    if (seleccionado) {
      setCfdi((prev) => ({ ...prev, emisor: seleccionado }));
    }
  };

  const handleSelectReceptor = (id) => {
    const seleccionado = receptores.find((item) => item.id === id);
    if (seleccionado) {
      setCfdi((prev) => ({ ...prev, receptor: seleccionado }));
    }
  };

  const handleAddConcepto = () => {
    setCfdi((prev) => ({
      ...prev,
      conceptos: [
        ...prev.conceptos,
        { id: uuidv4(), descripcion: '', cantidad: '1', unidad: '', valor: '0' },
      ],
      updatedAt: new Date().toISOString(),
    }));
  };

  const handleConceptChange = (index, field, value) => {
    setCfdi((prev) => {
      const conceptos = [...prev.conceptos];
      conceptos[index] = { ...conceptos[index], [field]: value };
      return { ...prev, conceptos, updatedAt: new Date().toISOString() };
    });
  };

  const handleSaveDraft = async () => {
    const totals = calculateTotals(cfdi);
    const draft = {
      ...cfdi,
      ...totals,
      id: cfdi.id || String(Date.now()),
      status: 'draft',
      updatedAt: new Date().toISOString(),
      createdAt: cfdi.createdAt || new Date().toISOString(),
    };
    await saveDraft(draft);
    Alert.alert('Guardado', 'Borrador guardado con éxito');
    navigation.goBack();
  };

  const handleGeneratePDF = async () => {
    try {
      const totals = calculateTotals(cfdi);
      const draft = { ...cfdi, ...totals };
      const pdfUri = await generatePDF(draft);
      Alert.alert('PDF generado', `PDF creado en: ${pdfUri}`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const totals = calculateTotals(cfdi);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CFDI</Text>

      <Text style={styles.label}>Emisor</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorRow}>
        {emisores.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.selectorButton,
              cfdi.emisor?.id === item.id && styles.selectedButton,
            ]}
            onPress={() => handleSelectEmisor(item.id)}
          >
            <Text style={styles.selectorText}>{item.nombre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.label}>Receptor</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.selectorRow}>
        {receptores.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.selectorButton,
              cfdi.receptor?.id === item.id && styles.selectedButton,
            ]}
            onPress={() => handleSelectReceptor(item.id)}
          >
            <Text style={styles.selectorText}>{item.nombre}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.navigationRow}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('EmisoresList')}>
          <Text style={styles.navButtonText}>Abrir Emisores</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('ReceptoresList')}>
          <Text style={styles.navButtonText}>Abrir Receptores</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.input}
        placeholder="Clave del producto y/o servicio"
        value={cfdi.claveProductoServicio}
        onChangeText={(value) => handleChange('claveProductoServicio', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        value={cfdi.cantidad}
        onChangeText={(value) => handleChange('cantidad', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Uso CFDI"
        value={cfdi.usoCFDI}
        onChangeText={(value) => handleChange('usoCFDI', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Forma de pago"
        value={cfdi.formaPago}
        onChangeText={(value) => handleChange('formaPago', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Moneda"
        value={cfdi.moneda}
        onChangeText={(value) => handleChange('moneda', value)}
      />
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Observaciones"
        value={cfdi.observaciones}
        onChangeText={(value) => handleChange('observaciones', value)}
        multiline
      />

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Conceptos</Text>
        <TouchableOpacity onPress={handleAddConcepto}>
          <Text style={styles.addConceptText}>+ Agregar</Text>
        </TouchableOpacity>
      </View>

      {cfdi.conceptos.map((concepto, index) => (
        <View key={concepto.id || index} style={styles.conceptCard}>
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={concepto.descripcion}
            onChangeText={(value) => handleConceptChange(index, 'descripcion', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={String(concepto.cantidad)}
            onChangeText={(value) => handleConceptChange(index, 'cantidad', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Unidad"
            value={concepto.unidad}
            onChangeText={(value) => handleConceptChange(index, 'unidad', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Valor"
            keyboardType="numeric"
            value={String(concepto.valor)}
            onChangeText={(value) => handleConceptChange(index, 'valor', value)}
          />
        </View>
      ))}

      <View style={styles.totalsRow}>
        <Text style={styles.totalLabel}>Subtotal:</Text>
        <Text style={styles.totalValue}>{totals.subtotal.toFixed(2)}</Text>
      </View>
      <View style={styles.totalsRow}>
        <Text style={styles.totalLabel}>Impuestos:</Text>
        <Text style={styles.totalValue}>{totals.totalImpuestos.toFixed(2)}</Text>
      </View>
      <View style={styles.totalsRow}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{totals.total.toFixed(2)}</Text>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={handleSaveDraft}>
        <Text style={styles.primaryButtonText}>Guardar borrador</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={handleGeneratePDF}>
        <Text style={styles.secondaryButtonText}>Generar PDF</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  selectorRow: {
    marginBottom: 12,
  },
  selectorButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  selectedButton: {
    backgroundColor: '#bac85f',
  },
  selectorText: {
    color: '#333',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  multiline: {
    minHeight: 80,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addConceptText: {
    color: '#13710e',
    fontWeight: 'bold',
  },
  conceptCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalValue: {
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#13710e',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: '#1d4267',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  navButton: {
    flex: 1,
    backgroundColor: '#bac85f',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
