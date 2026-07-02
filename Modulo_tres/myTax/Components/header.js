import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';


const Header = () => {
  return (
      <View style={styles.headerTop}>
        <Image
          source={require('../assets/Iconsapp/MiFactura.png')}
          style={styles.icon}
        />

        <Text style={styles.title}>MiFactura</Text>
      </View>
  );
};

const styles = StyleSheet.create({


headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    width: "100%",
    paddingTop: 0,
    paddingHorizontal: 15,
    backgroundColor: '#1d4267',
     
},

icon: {
  width: 40,
  height: 40,
  marginRight: 10,
  borderRadius: 10,
},

title: {
  fontSize: 25,
  color: '#bed4df',
  fontWeight: 'bold',

},


});

export default Header;