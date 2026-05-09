import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View , Image} from 'react-native';
import { SafeAreaView } from 'react-native';

const Header = () => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.headerContainer}>
                <Image
                    source={require('../assets/MyTax.png')}
                    style={styles.headerAppIcon}
                />

               <Text style={styles.headerTitle}>MiFactura</Text>
            </View>
        </SafeAreaView>        
    
    );
};

const styles= StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#2c3e50',
        paddingVertical: 6,
        paddingHorizontal: 10,       
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerAppIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain',
        marginRight: 8,
        marginTop: 35,
        borderRadius: 10,
        borderWidth: 0.5,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '600',
        color: '#bed4df',
        marginTop: 35,
        padding: 8,
        textAlign: 'center',
        }
    
    },
);

export default Header;