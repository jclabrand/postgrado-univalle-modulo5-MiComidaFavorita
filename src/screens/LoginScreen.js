import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function LoginScreen({ navigation }) {
    const [error, setError] = useState('');
    const handleLogin = async ({ email, password }) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al iniciar sesión: ' + error.message);
        }
    };
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
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                <View style={styles.container}>
                    <Text h3 style={styles.title}>Mi Comida Favorita</Text>
                    
                    <Input
                        placeholder="Email"
                        value={values.email}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        autoCapitalize="none"
                    />
                    {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                    
                    <Input
                        placeholder="Contraseña"
                        value={values.password}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        secureTextEntry
                    />
                    {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <Button
                        title="Iniciar Sesión"
                        onPress={handleSubmit}
                        containerStyle={styles.button}
                    />
                    <Button
                        title="Registrarse"
                        type="outline"
                        onPress={() => navigation.navigate('Register')}
                        containerStyle={styles.button}
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
});
