import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Course {
    id: string;
    title: string;
    price: number;
    image: string;
}

interface PaymentMethod {
    id: string;
    type: 'card' | 'paypal' | 'apple' | 'google';
    label: string;
    icon: string;
}

const CheckoutScreen = () => {
    const [selectedPayment, setSelectedPayment] = useState<string>('card');
    const [loading, setLoading] = useState(false);

    const course: Course = {
        id: '1',
        title: 'Complete React Native Development Course',
        price: 99.99,
        image: 'https://example.com/course-image.jpg'
    };

    const paymentMethods: PaymentMethod[] = [
        { id: 'card', type: 'card', label: 'Credit/Debit Card', icon: 'card' },
        { id: 'paypal', type: 'paypal', label: 'PayPal', icon: 'logo-paypal' },
        { id: 'apple', type: 'apple', label: 'Apple Pay', icon: 'logo-apple' },
        { id: 'google', type: 'google', label: 'Google Pay', icon: 'logo-google' }
    ];

    const handlePayment = async () => {
        setLoading(true);
        try {
            // Simulate payment processing
            await new Promise(resolve => setTimeout(resolve, 2000));
            router.push('/enrollment/success');
            Alert.alert('Success', 'Payment completed successfully!');
        } catch (error) {
            Alert.alert('Error', 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Checkout</Text>
                </View>

                {/* Course Summary */}
                <View style={styles.courseCard}>
                    <View style={styles.courseInfo}>
                        <Text style={styles.courseTitle}>{course.title}</Text>
                        <Text style={styles.coursePrice}>${course.price}</Text>
                    </View>
                </View>

                {/* Order Summary */}
                <View style={styles.summaryCard}>
                    <Text style={styles.sectionTitle}>Order Summary</Text>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Course Price</Text>
                        <Text style={styles.summaryValue}>${course.price}</Text>
                    </View>
                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Tax</Text>
                        <Text style={styles.summaryValue}>$0.00</Text>
                    </View>
                    <View style={[styles.summaryRow, styles.totalRow]}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>${course.price}</Text>
                    </View>
                </View>

                {/* Payment Methods */}
                <View style={styles.paymentCard}>
                    <Text style={styles.sectionTitle}>Payment Method</Text>
                    {paymentMethods.map((method) => (
                        <TouchableOpacity
                            key={method.id}
                            style={[
                                styles.paymentMethod,
                                selectedPayment === method.id && styles.selectedPayment
                            ]}
                            onPress={() => setSelectedPayment(method.id)}
                        >
                            <View style={styles.paymentInfo}>
                                <Ionicons 
                                    name={method.icon as any} 
                                    size={24} 
                                    color={selectedPayment === method.id ? '#007AFF' : '#666'} 
                                />
                                <Text style={[
                                    styles.paymentLabel,
                                    selectedPayment === method.id && styles.selectedPaymentLabel
                                ]}>
                                    {method.label}
                                </Text>
                            </View>
                            <View style={[
                                styles.radioButton,
                                selectedPayment === method.id && styles.selectedRadio
                            ]} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Security Notice */}
                <View style={styles.securityNotice}>
                    <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                    <Text style={styles.securityText}>
                        Your payment information is encrypted and secure
                    </Text>
                </View>
            </ScrollView>

            {/* Payment Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.payButton, loading && styles.payButtonDisabled]}
                    onPress={handlePayment}
                    disabled={loading}
                >
                    <Text style={styles.payButtonText}>
                        {loading ? 'Processing...' : `Pay $${course.price}`}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    courseInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    courseTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        flex: 1,
        marginRight: 16,
    },
    coursePrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    summaryCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#666',
    },
    summaryValue: {
        fontSize: 16,
        color: '#333',
    },
    totalRow: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        marginTop: 8,
        paddingTop: 16,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007AFF',
    },
    paymentCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#eee',
    },
    selectedPayment: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f8ff',
    },
    paymentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentLabel: {
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
    },
    selectedPaymentLabel: {
        color: '#007AFF',
        fontWeight: '500',
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
    },
    selectedRadio: {
        borderColor: '#007AFF',
        backgroundColor: '#007AFF',
    },
    securityNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f8f0',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    securityText: {
        fontSize: 14,
        color: '#4CAF50',
        marginLeft: 8,
    },
    footer: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    payButton: {
        backgroundColor: '#007AFF',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
    },
    payButtonDisabled: {
        backgroundColor: '#ccc',
    },
    payButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default CheckoutScreen;