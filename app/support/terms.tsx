import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';

import {
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function TermsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.customHeaderTitle}>Terms of Service</Text>
                <View style={styles.headerSpacer} />
            </View>


            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.lastUpdated}>Last updated: December 2024</Text>

                <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
                <Text style={styles.text}>
                    By accessing and using this E-Learning application, you accept and agree to be bound by the terms and provision of this agreement.
                </Text>

                <Text style={styles.sectionTitle}>2. Use License</Text>
                <Text style={styles.text}>
                    Permission is granted to temporarily access the materials on our E-Learning app for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
                </Text>

                <Text style={styles.sectionTitle}>3. User Accounts</Text>
                <Text style={styles.text}>
                    You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
                </Text>

                <Text style={styles.sectionTitle}>4. Course Content</Text>
                <Text style={styles.text}>
                    All course materials, including videos, documents, and assessments, are proprietary and protected by copyright laws. Users may not reproduce, distribute, or modify content without explicit permission.
                </Text>

                <Text style={styles.sectionTitle}>5. Payment Terms</Text>
                <Text style={styles.text}>
                    Subscription fees are charged in advance on a monthly or annual basis. Refunds are available within 7 days of purchase for paid courses, subject to completion of less than 20% of the course content.
                </Text>

                <Text style={styles.sectionTitle}>6. Prohibited Uses</Text>
                <Text style={styles.text}>
                    Users may not use the service to: share login credentials, upload malicious content, engage in fraudulent activities, or violate any applicable laws or regulations.
                </Text>

                <Text style={styles.sectionTitle}>7. Privacy Policy</Text>
                <Text style={styles.text}>
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, to understand our practices.
                </Text>

                <Text style={styles.sectionTitle}>8. Termination</Text>
                <Text style={styles.text}>
                    We may terminate or suspend your account and bar access to the service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever.
                </Text>

                <Text style={styles.sectionTitle}>9. Disclaimer</Text>
                <Text style={styles.text}>
                    The information on this app is provided on an 'as is' basis. To the fullest extent permitted by law, we exclude all representations, warranties, and conditions relating to our service.
                </Text>

                <Text style={styles.sectionTitle}>10. Contact Information</Text>
                <Text style={styles.text}>
                    If you have any questions about these Terms of Service, please contact us at support@elearningapp.com
                </Text>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        By continuing to use our service, you acknowledge that you have read and understood these terms.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    customHeader: {
        backgroundColor: '#007AFF',
        paddingTop: Platform.OS === 'ios' ? 10 : StatusBar.currentHeight,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    customHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
    },
    headerSpacer: {
        width: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    lastUpdated: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
        marginTop: 25,
        marginBottom: 10,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
        color: '#555555',
        marginBottom: 15,
        textAlign: 'justify',
    },
    footer: {
        marginTop: 30,
        marginBottom: 20,
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderRadius: 8,
    },
    footerText: {
        fontSize: 14,
        color: '#666666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});