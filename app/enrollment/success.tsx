import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function EnrollmentSuccess() {
    const handleContinueLearning = () => {
        router.push('/course');
    };

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
                </View>
                
                <Text style={styles.title}>Enrollment Successful!</Text>
                <Text style={styles.subtitle}>
                    Congratulations! You have successfully enrolled in the course.
                </Text>
                <Text style={styles.description}>
                    You can now access all course materials, assignments, and start your learning journey.
                </Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity 
                        style={styles.primaryButton} 
                        onPress={handleContinueLearning}
                    >
                        <Text style={styles.primaryButtonText}>Start Learning</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                        style={styles.secondaryButton} 
                        onPress={handleGoHome}
                    >
                        <Text style={styles.secondaryButtonText}>Go to Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
        maxWidth: 350,
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1a1a1a',
        textAlign: 'center',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 18,
        color: '#4CAF50',
        textAlign: 'center',
        marginBottom: 16,
        fontWeight: '600',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 40,
    },
    buttonContainer: {
        width: '100%',
        gap: 12,
    },
    primaryButton: {
        backgroundColor: '#007bff',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        backgroundColor: 'transparent',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#007bff',
    },
    secondaryButtonText: {
        color: '#007bff',
        fontSize: 16,
        fontWeight: '600',
    },
});