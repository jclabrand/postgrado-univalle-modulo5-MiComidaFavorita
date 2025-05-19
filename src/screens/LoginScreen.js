import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';

/**
 * Pantalla de inicio de sesión
 * Permite a los usuarios acceder con sus credenciales
 */
export default function LoginScreen({ navigation }) {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    /**
     * Maneja el proceso de inicio de sesión con Firebase
     * @param {Object} values - Valores del formulario (email, password)
     */
    const handleLogin = async ({ email, password }) => {
        setError('');
        setIsLoading(true);
        
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    /**
     * Esquema de validación para el formulario de login
     */
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email inválido')
            .required('El campo email es requerido'),
        password: Yup.string()
            .required('La contraseña es requerida')
    });

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={values => handleLogin(values)}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
                <View style={styles.container}>
                    <Text h3 style={styles.title}>Mi Comida Favorita</Text>
                    
                    <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize="none"
                        editable={!isLoading}
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                    
                    <Input
                        placeholder="Contraseña"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                        editable={!isLoading}
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button
                        title={isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                        onPress={handleSubmit}
                        containerStyle={styles.button}
                        disabled={!isValid || !dirty || isLoading}
                        icon={isLoading ? 
                            <ActivityIndicator size="small" color="white" style={styles.loader} /> : 
                            null}
                    />
                    <Button
                        title="Registrarse"
                        type="outline"
                        onPress={() => navigation.navigate('Register')}
                        containerStyle={styles.button}
                        disabled={isLoading}
                    />

                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
            )}
        </Formik>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        marginBottom: 30,
    },
    button: {
        marginVertical: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    loader: {
        marginRight: 10
    }
});
