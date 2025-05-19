import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';

/**
 * Pantalla de registro de usuarios
 * Permite crear una nueva cuenta con email y contraseña
 * Incluye validaciones de seguridad para la contraseña
 */
export default function RegisterScreen({ navigation }) {
    // Estado para manejar errores de Firebase
    const [error, setError] = useState('');
    
    /**
     * Maneja el proceso de registro con Firebase
     * @param {Object} values - Valores del formulario (email, password)
     */
    const handleRegister = async ({ email, password }) => {
        try {
            // Intenta crear usuario con Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Navega a la pantalla principal al registrarse exitosamente
            navigation.replace('Home');
        } catch (error) {
            // Captura y muestra errores de Firebase
            setError('Error al registrarse: ' + error.message);
        }
    };

    /**
     * Esquema de validación para el formulario
     * Define las reglas para email, contraseña y confirmación
     */
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .email('Email inválido')
            .required('El campo email es requerido'),
        password: Yup.string()
            .min(8, 'La contraseña debe contener mínimo 8 caracteres')
            .matches(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
            .matches(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
            .matches(/[0-9]/, 'La contraseña debe contener al menos un número')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'La contraseña debe contener al menos un carácter especial (!@#$%^&*(),.?":{}|<>)')
            .required('La contraseña es requerida'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
            .required('La confirmación de contraseña es requerida')
    });

    return (
    <Formik
        initialValues={{ email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleRegister(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
                {/* Título de la pantalla */}
                <Text h3 style={styles.title}>Registro</Text>
                
                {/* Campo de email con validación */}
                <Input
                    placeholder="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    autoCapitalize="none"
                    />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                {/* Campo de contraseña con validación de seguridad */}
                <Input
                    placeholder="Contraseña"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    />
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                
                {/* Campo de confirmación de contraseña */}
                <Input
                    placeholder="Confirmar contraseña"
                    value={values.confirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry
                    />
                {touched.confirmPassword && errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

                {/* Botón de registro */}
                <Button
                    title="Registrarse"
                    onPress={handleSubmit}
                    containerStyle={styles.button}
                    />
                
                {/* Botón para regresar a la pantalla de login */}
                <Button
                    title="Volver al Login"
                    type="outline"
                    onPress={() => navigation.navigate('Login')}
                    containerStyle={styles.button}
                    />

                {/* Muestra errores generales (ej. errores de Firebase) */}
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        )}
    </Formik>
  )
}

/**
 * Estilos para los componentes de la pantalla
 */
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
