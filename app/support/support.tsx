import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React from 'react';

import {
    Alert,
    Linking,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Support = () => {
    const handleEmailSupport = () => {
        Linking.openURL('mailto:support@elearning.com?subject=Support Request');
    };

    const handlePhoneSupport = () => {
        Linking.openURL('tel:+1234567890');
    };

    const handleChatSupport = () => {
        Alert.alert('Chat Support', 'Live chat will be available soon!');
    };

    const handleFAQ = () => {
        Alert.alert('FAQ', 'Frequently Asked Questions section coming soon!');
    };

    return (
        <ScrollView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.customHeader}>
                <TouchableOpacity onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.customHeaderTitle}>Help & Support</Text>
                <View style={styles.headerSpacer} />
            </View>
            <View style={styles.header}>
                {/* <Text style={styles.title}>Help & Support</Text> */}
                <Text style={styles.subtitle}>We're here to help you learn better</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Contact Us</Text>

                <TouchableOpacity style={styles.contactItem} onPress={handleEmailSupport}>
                    <Ionicons name="mail-outline" size={24} color="#007AFF" />
                    <View style={styles.contactText}>
                        <Text style={styles.contactTitle}>Email Support</Text>
                        <Text style={styles.contactSubtitle}>support@elearning.com</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={handlePhoneSupport}>
                    <Ionicons name="call-outline" size={24} color="#007AFF" />
                    <View style={styles.contactText}>
                        <Text style={styles.contactTitle}>Phone Support</Text>
                        <Text style={styles.contactSubtitle}>+1 (234) 567-890</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.contactItem} onPress={handleChatSupport}>
                    <Ionicons name="chatbubble-outline" size={24} color="#007AFF" />
                    <View style={styles.contactText}>
                        <Text style={styles.contactTitle}>Live Chat</Text>
                        <Text style={styles.contactSubtitle}>Available 24/7</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Quick Help</Text>

                <TouchableOpacity style={styles.helpItem} onPress={handleFAQ}>
                    <Ionicons name="help-circle-outline" size={24} color="#007AFF" />
                    <View style={styles.helpText}>
                        <Text style={styles.helpTitle}>Frequently Asked Questions</Text>
                        <Text style={styles.helpSubtitle}>Find answers to common questions</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.helpItem}>
                    <Ionicons name="book-outline" size={24} color="#007AFF" />
                    <View style={styles.helpText}>
                        <Text style={styles.helpTitle}>User Guide</Text>
                        <Text style={styles.helpSubtitle}>Learn how to use the app</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.helpItem}>
                    <Ionicons name="settings-outline" size={24} color="#007AFF" />
                    <View style={styles.helpText}>
                        <Text style={styles.helpTitle}>Technical Issues</Text>
                        <Text style={styles.helpSubtitle}>Troubleshoot common problems</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.helpItem}>
                    <Ionicons name="document-text-outline" size={24} color="#007AFF" />
                    <View style={styles.helpText}>
                        <Text style={styles.helpTitle}>Privacy Policy</Text>
                        <Text style={styles.helpSubtitle}>Read our privacy policy</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.helpItem}>
                    <Ionicons name="shield-outline" size={24} color="#007AFF" />
                    <View style={styles.helpText}>
                        <Text style={styles.helpTitle}>Terms of Service</Text>
                        <Text style={styles.helpSubtitle}>View terms and conditions</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
                </TouchableOpacity>
            </View>

            <View style={styles.footer}>
                <Text style={styles.footerText}>
                    App Version 1.0.0{'\n'}
                    © 2024 E-Learning Platform
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F2F7',
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
        backgroundColor: '#FFFFFF',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#000000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#8E8E93',
        textAlign: 'center',
    },
    section: {
        marginTop: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 16,
        overflow: 'hidden',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#000000',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    contactText: {
        flex: 1,
        marginLeft: 12,
    },
    contactTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    contactSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
    },
    helpItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    helpText: {
        flex: 1,
        marginLeft: 12,
    },
    helpTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000000',
    },
    helpSubtitle: {
        fontSize: 14,
        color: '#8E8E93',
        marginTop: 2,
    },
    footer: {
        padding: 20,
        alignItems: 'center',
        marginTop: 20,
    },
    footerText: {
        fontSize: 14,
        color: '#8E8E93',
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default Support;