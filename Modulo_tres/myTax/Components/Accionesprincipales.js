import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { useAuto } from '../AutoContext';
import Leyes from './Leyes';

export default function Accionesprincipales({ resetKey, cerrarMenusGlobal }) {
  const [openMenu, setOpenMenu] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const navigation = useNavigation();
  const { signOut } = useAuto();

  useEffect(() => {
    setOpenMenu(null);
    setActiveMenu(null);
    Keyboard.dismiss();
  }, [resetKey]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled">
        <View style={styles.horizontalContainer}>

          <View style={styles.ContainerCFDI}>
            <TouchableOpacity
              style={[styles.Button, openMenu === 'cfdi' && styles.ButtonActive]}
              onPress={() => {
                cerrarMenusGlobal();
                setTimeout(() => {
                  setOpenMenu(openMenu === 'cfdi' ? null : 'cfdi');
                  setActiveMenu(null);
                }, 0);
              }}
            >
              <View style={styles.icon}>
                <FontAwesome6 name="file-invoice" size={45} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>CFDI</Text>
            </TouchableOpacity>

            {openMenu === 'cfdi' && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={[styles.option, activeMenu === 'factura' && styles.optionActive]}
                  onPress={() => setActiveMenu(activeMenu === 'factura' ? null : 'factura')}
                >
                  <Text style={styles.optionTextsecundarios}>Factura</Text>
                </TouchableOpacity>

                {activeMenu === 'factura' && (
                  <View style={styles.submenu}>
                    {facturaOptions.map((item, index) => (
                      <TouchableOpacity key={index} style={styles.option}>
                        <Text>{String(item)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}

                <TouchableOpacity
                  style={[styles.option, activeMenu === 'complemento' && styles.optionActive]}
                  onPress={() => setActiveMenu(activeMenu === 'complemento' ? null : 'complemento')}
                >
                  <Text style={styles.optionTextsecundarios}>Complemento</Text>
                </TouchableOpacity>

                {activeMenu === 'complemento' && (
                  <View style={styles.submenu}>
                    {complementoOptions.map((item, index) => (
                      <TouchableOpacity key={index} style={styles.option}>
                        <Text style={styles.optionTextterciarios}>{String(item)}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>

          <View style={styles.ContainerExpediente}>
            <TouchableOpacity
              style={[styles.Button, openMenu === 'Expediente' && styles.ButtonActive]}
              onPress={() => {
                cerrarMenusGlobal();
                setTimeout(() => {
                  setOpenMenu(openMenu === 'Expediente' ? null : 'Expediente');
                  setActiveMenu(null);
                }, 0);
              }}
            >
              <View style={styles.icon}>
                <MaterialCommunityIcons name="folder-account-outline" size={45} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>Expediente</Text>
            </TouchableOpacity>

            {openMenu === 'Expediente' && (
              <View style={styles.dropdown}>
                <TouchableOpacity style={styles.option}>
                  <Text style={styles.optionTextsecundarios}>Constancia de situación fiscal</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option}>
                  <Text style={styles.optionTextsecundarios}>Opinión de cumplimiento</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.ContainerConsultas}>
            <TouchableOpacity
              style={[styles.Button, openMenu === 'Consultas' && styles.ButtonActive]}
              onPress={() => {
                cerrarMenusGlobal();
                setTimeout(() => {
                  setOpenMenu(openMenu === 'Consultas' ? null : 'Consultas');
                  setActiveMenu(null);
                }, 0);
              }}
            >
              <View style={styles.icon}>
                <AntDesign name="read" size={35} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>Consultas</Text>
            </TouchableOpacity>

            {openMenu === 'Consultas' && (
              <View style={styles.dropdown}>
                {categoriasLegislacion.map((item) => (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.option}
                    onPress={() => {
                      setOpenMenu(null);
                      setActiveMenu('legislacion');
                    }}
                  >
                    <Text style={styles.optionTextsecundarios}>{item.label}</Text>
                  </TouchableOpacity>
                ))}

                <TouchableOpacity style={styles.option}>
                  <Text style={styles.optionTextsecundarios}>Noticias</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.ContainerSAT}>
            <TouchableOpacity
              style={[styles.Button, openMenu === 'SAT' && styles.ButtonActive]}
              onPress={() => {
                cerrarMenusGlobal();
                setTimeout(() => {
                  setOpenMenu(openMenu === 'SAT' ? null : 'SAT');
                  setActiveMenu(null);
                }, 0);
              }}
            >
              <View style={styles.icon}>
                <FontAwesome6 name="building-columns" size={35} color="#fff" />
              </View>
              <Text style={styles.headerTitle}>SAT</Text>
            </TouchableOpacity>

            {openMenu === 'SAT' && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    setActiveMenu('satWeb');
                    setOpenMenu(null);
                  }}
                >
                  <Text style={styles.optionTextsecundarios}>Menú</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>

        {activeMenu === 'legislacion' && (
          <View style={{ flex: 1, marginTop: 20 }}>
            <Leyes />
          </View>
        )}

        {activeMenu === 'satWeb' && (
          <View style={{ height: 500 }}>
            <WebView source={{ uri: 'https://www.sat.gob.mx/' }} />
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => {
          signOut();
          navigation.replace('Login');
        }}
      >
        <Text style={styles.buttontext}>Salir</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const categoriasLegislacion = [{ key: 'leyes', label: 'Leyes' }];

const styles = StyleSheet.create({
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: -10,
    width: '100%',
  },
  ContainerCFDI: {
    alignItems: 'center',
    marginLeft: 27,
    marginRight: 27,
    paddingTop: 10,
    zIndex: 1000,
  },
  ContainerExpediente: {
    alignItems: 'center',
    marginRight: 17,
    paddingTop: 10,
    zIndex: 1000,
  },
  ContainerConsultas: {
    alignItems: 'center',
    marginRight: 27,
    paddingTop: 10,
    zIndex: 1000,
  },
  ContainerSAT: {
    alignItems: 'center',
    marginRight: 27,
    paddingTop: 10,
    zIndex: 1000,
  },
  Button: {
    alignItems: 'center',
  },
  ButtonActive: {
    backgroundColor: '#bac85f',
    borderRadius: 10,
    padding: 2,
  },
  icon: {
    width: 45,
    height: 53,
    borderRadius: 10,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#13710e',
  },
  headerTitle: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    zIndex: 1000,
    top: '100%',
    left: 0,
    marginTop: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    padding: 10,
    minWidth: 180,
    maxWidth: 250,
  },
  option: {
    paddingVertical: 7,
    paddingLeft: 0,
    paddingRight: 15,
    marginVertical: 2,
  },
  optionTextsecundarios: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 17,
  },
  optionActive: {
    backgroundColor: '#bac85f',
  },
  submenu: {
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  buttontext: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const facturaOptions = ['Ingresos', 'Anticipo', 'Egresos'];
const complementoOptions = [
  'Carta porte',
  'Comercio exterior',
  'Compraventa de divisas',
  'Consumo de combustible',
  'Donatarias',
  'Fideicomisos',
  'Nóminas',
  'Notarios públicos',
  'Retenciones',
];