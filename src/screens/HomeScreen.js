import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text, Overlay } from 'react-native-elements';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { db } from '../config/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

/**
 * Pantalla principal que muestra y permite editar el perfil del usuario
 */
export default function HomeScreen({ navigation }) {
    // Estados para los datos del perfil y acciones de carga
    const [profile, setProfile] = useState({
        nombre: '', apellido: '', comidaFavorita: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [error, setError] = useState('');

    // Cargar datos del perfil al iniciar
    useEffect(() => {
        loadProfile();
    }, []);

    /**
     * Carga los datos del perfil del usuario desde Firestore
     */
    const loadProfile = async () => {
        setIsLoading(true);
        setError('');
        
        try {
            const docRef = doc(db, 'usuarios', auth.currentUser.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setProfile(docSnap.data());
            }
        } catch (error) {
            console.error('Error al cargar perfil:', error);
            setError('No se pudo cargar el perfil. Inténtalo de nuevo.');
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Actualiza los datos del perfil en Firestore
     */
    const handleUpdate = async () => {
        setIsSaving(true);
        setError('');
        
        try {
            await setDoc(doc(db, 'usuarios', auth.currentUser.uid), profile);
            alert('Perfil actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar perfil:', error);
            setError('Error al actualizar perfil');
        } finally {
            setIsSaving(false);
        }
    };

    /**
     * Cierra la sesión del usuario actual
     */
    const handleSignOut = async () => {
        setIsSigningOut(true);
        
        try {
            await signOut(auth);
            navigation.replace('Login');
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            setError('Error al cerrar sesión');
            setIsSigningOut(false);
        }
    };

    // Muestra un indicador de carga mientras se obtienen los datos
    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066cc" />
                <Text style={styles.loadingText}>Cargando datos del perfil...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text h4 style={styles.title}>Mi Perfil</Text>
            
            {/* Campos del formulario */}
            <Input
                placeholder="Nombre"
                value={profile.nombre}
                onChangeText={(text) => setProfile({...profile, nombre: text})}
                disabled={isSaving}
                />
            <Input
                placeholder="Apellido"
                value={profile.apellido}
                onChangeText={(text) => setProfile({...profile, apellido: text})}
                disabled={isSaving}
                />
            <Input
                placeholder="Comida Favorita"
                value={profile.comidaFavorita}
                onChangeText={(text) => setProfile({...profile, comidaFavorita: text})}
                disabled={isSaving}
                />
            
            {/* Mensaje de error */}
            {error ? <Text style={styles.error}>{error}</Text> : null}
            
            {/* Botones de acción */}
            <Button
                title={isSaving ? "Guardando..." : "Actualizar Perfil"}
                onPress={handleUpdate}
                containerStyle={styles.button}
                disabled={isSaving || isSigningOut}
                icon={isSaving ? 
                    <ActivityIndicator size="small" color="white" style={styles.loader} /> : 
                    null}
                />
            <Button
                title={isSigningOut ? "Cerrando sesión..." : "Cerrar Sesión"}
                type="outline"
                onPress={handleSignOut}
                containerStyle={styles.button}
                disabled={isSaving || isSigningOut}
                icon={isSigningOut ? 
                    <ActivityIndicator size="small" color="#0066cc" style={styles.loader} /> : 
                    null}
                />
                
            {/* Overlay para bloquear interacciones durante guardado */}
            <Overlay 
                isVisible={isSaving} 
                overlayStyle={styles.overlay}
                backdropStyle={styles.backdrop}
            >
                <ActivityIndicator size="large" color="#0066cc" />
                <Text style={styles.overlayText}>Guardando cambios...</Text>
            </Overlay>
        </View>
    );
}

/**
 * Estilos para los componentes de la pantalla
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 20,
        marginTop: -10,
    },
    loader: {
        marginRight: 10,
    },
    overlay: {
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    backdrop: {
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    overlayText: {
        marginTop: 10,
        fontSize: 16,
    }
});
