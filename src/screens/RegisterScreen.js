import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function RegisterScreen({ navigation }) {
    const [error, setError] = useState('');
    const handleRegister = async ({ email, password }) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            navigation.replace('Home');
        } catch (error) {
            setError('Error al registrarse: ' + error.message);
        }
    };
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
    });

    return (
    <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={values => handleRegister(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.container}>
                <Text h3 style={styles.title}>Registro</Text>
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
                    title="Registrarse"
                    onPress={handleSubmit}
                    containerStyle={styles.button}
                    />
                <Button
                    title="Volver al Login"
                    type="outline"
                    onPress={() => navigation.navigate('Login')}
                    containerStyle={styles.button}
                    />

                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>
        )}
    </Formik>
  )
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
