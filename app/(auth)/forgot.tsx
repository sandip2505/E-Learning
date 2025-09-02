import React, { useState } from 'react';

import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ForgotPasswordScreen = () => {
const [email, setEmail] = useState('');
const [isLoading, setIsLoading] = useState(false);

const handleResetPassword = async () => {
    if (!email.trim()) {
        Alert.alert('Error', 'Please enter your email address');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
    }

    setIsLoading(true);
    
    try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        Alert.alert(
            'Reset Link Sent',
            'We have sent a password reset link to your email address. Please check your inbox.',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    } catch (error) {
        Alert.alert('Error', 'Failed to send reset link. Please try again.');
    } finally {
        setIsLoading(false);
    }
};

return (
    <SafeAreaView style={styles.container}>
        <Stack.Screen
            options={{
                title: "Forgot Password",
                headerStyle: {
                    backgroundColor: "#4A90E2",
                },
                        headerTintColor: "#fff",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                />
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
              

                <View style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="lock-closed-outline" size={80} color="#4A90E2" />
                    </View>

                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.subtitle}>
                        Don't worry! Enter your email address and we'll send you a link to reset your password.
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            editable={!isLoading}
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.resetButton, isLoading && styles.buttonDisabled]}
                        onPress={handleResetPassword}
                        disabled={isLoading}
                    >
                        <Text style={styles.resetButtonText}>
                            {isLoading ? 'Sending...' : 'Send Reset Link'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.backToLoginButton}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.backToLoginText}>
                            Remember your password? Sign In
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
keyboardView: {
    flex: 1,
},
scrollContainer: {
    flexGrow: 1,
},
header: {
    paddingHorizontal: 20,
    paddingTop: 10,
},
backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
},
content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'center',
},
iconContainer: {
    alignItems: 'center',
    marginBottom: 30,
},
title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
},
subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
},
inputContainer: {
    marginBottom: 30,
},
label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
},
input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
},
resetButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
},
buttonDisabled: {
    backgroundColor: '#ccc',
},
resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
},
backToLoginButton: {
    alignItems: 'center',
    paddingVertical: 12,
},
backToLoginText: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: '500',
},
});

export default ForgotPasswordScreen;