import react, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AutoContext = createContext();

export const AutoProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadstoreAunth();

    }, []);

    const loadstoreAunth = async () => {
        try {
            const storeUser = await AsyncStorage.getItem("usar");
            if (storeUser) {
                setUser(JSON.parse(storeUser));
            }
         } catch (error) {
            console.error("Error al cargar el susrioo:", error);
         } finally {
            setLoading(false);
         }
    };

const signIn = async (username, password) => {
    if (username === "admin" && password === "password") {
            const userData = {
                id:1,
                username: "admin",
                name: "Administrador"
            };
            await AsyncStorage.setItem("usar", JSON.stringify(userData));
            setUser(userData);
            return { success: true };
        }
        return { success: false, message: "Credenciales inválidas" };
    };

    const signOut = async () => {
        setUser (null);
        await AsyncStorage.removeItem("usar");

    };

    return (
        <AutoContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AutoContext.Provider>
    )
};

    export const useAuto = () => userContext(AutoContext);
