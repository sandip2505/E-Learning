import { Ionicons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';

import {
    ActivityIndicator,
    Alert,
    ScrollView,
    Share,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export default function CertificateScreen() {
const { id } = useLocalSearchParams();
const [loading, setLoading] = useState(false);

// Mock certificate data - replace with actual API call
const certificate = {
    id: id,
    title: 'React Native Development',
    studentName: 'John Doe',
    completionDate: '2024-01-15',
    instructor: 'Jane Smith',
    courseHours: '40 hours',
    grade: 'A+',
    certificateNumber: 'RN-2024-001',
};

const handleDownload = async () => {
    try {
        setLoading(true);
        
        // Request media library permissions
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission needed', 'Please grant storage permission to download certificate');
            return;
        }

        // Simulate download - replace with actual download logic
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        Alert.alert('Success', 'Certificate downloaded successfully!');
    } catch (error) {
        Alert.alert('Error', 'Failed to download certificate');
    } finally {
        setLoading(false);
    }
};

const handleShare = async () => {
    try {
        await Share.share({
            message: `Check out my certificate for ${certificate.title}!`,
            title: 'My Certificate',
        });
    } catch (error) {
        console.error('Error sharing:', error);
    }
};

const handleView = () => {
    // Navigate to full screen certificate view
    router.push(`/certificates/view/${id}`);
};

return (
    <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity 
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Certificate</Text>
            <TouchableOpacity onPress={handleShare}>
                <Ionicons name="share-outline" size={24} color="#333" />
            </TouchableOpacity>
        </View>

        {/* Certificate Preview */}
        <View style={styles.certificatePreview}>
            <View style={styles.certificateCard}>
                <View style={styles.certificateBorder}>
                    <Text style={styles.certificateTitle}>CERTIFICATE</Text>
                    <Text style={styles.certificateSubtitle}>OF COMPLETION</Text>
                    
                    <View style={styles.divider} />
                    
                    <Text style={styles.presentedTo}>This is to certify that</Text>
                    <Text style={styles.studentName}>{certificate.studentName}</Text>
                    <Text style={styles.hasCompleted}>has successfully completed</Text>
                    <Text style={styles.courseTitle}>{certificate.title}</Text>
                    
                    <View style={styles.detailsContainer}>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Completion Date:</Text>
                            <Text style={styles.detailValue}>{certificate.completionDate}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Duration:</Text>
                            <Text style={styles.detailValue}>{certificate.courseHours}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.detailLabel}>Grade:</Text>
                            <Text style={styles.detailValue}>{certificate.grade}</Text>
                        </View>
                    </View>
                    
                    <View style={styles.signatureSection}>
                        <View style={styles.signatureLine} />
                        <Text style={styles.instructorName}>{certificate.instructor}</Text>
                        <Text style={styles.instructorTitle}>Course Instructor</Text>
                    </View>
                    
                    <Text style={styles.certificateNumber}>
                        Certificate No: {certificate.certificateNumber}
                    </Text>
                </View>
            </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionContainer}>
            <TouchableOpacity 
                style={styles.viewButton}
                onPress={handleView}
            >
                <Ionicons name="eye-outline" size={20} color="#007AFF" />
                <Text style={styles.viewButtonText}>View Full Size</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.downloadButton, loading && styles.disabledButton]}
                onPress={handleDownload}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Ionicons name="download-outline" size={20} color="#fff" />
                )}
                <Text style={styles.downloadButtonText}>
                    {loading ? 'Downloading...' : 'Download PDF'}
                </Text>
            </TouchableOpacity>
        </View>

        {/* Certificate Details */}
        <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Certificate Information</Text>
            
            <View style={styles.infoItem}>
                <Ionicons name="document-text-outline" size={20} color="#666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Course</Text>
                    <Text style={styles.infoValue}>{certificate.title}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="calendar-outline" size={20} color="#666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Completed</Text>
                    <Text style={styles.infoValue}>{certificate.completionDate}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="time-outline" size={20} color="#666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Duration</Text>
                    <Text style={styles.infoValue}>{certificate.courseHours}</Text>
                </View>
            </View>

            <View style={styles.infoItem}>
                <Ionicons name="star-outline" size={20} color="#666" />
                <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Grade</Text>
                    <Text style={styles.infoValue}>{certificate.grade}</Text>
                </View>
            </View>
        </View>
    </ScrollView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
},
backButton: {
    padding: 4,
},
headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
},
certificatePreview: {
    padding: 20,
},
certificateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
},
certificateBorder: {
    borderWidth: 3,
    borderColor: '#d4af37',
    padding: 24,
    borderRadius: 8,
},
certificateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#d4af37',
    letterSpacing: 2,
},
certificateSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    letterSpacing: 1,
},
divider: {
    height: 2,
    backgroundColor: '#d4af37',
    marginVertical: 20,
},
presentedTo: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
},
studentName: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
},
hasCompleted: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 8,
},
courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 20,
},
detailsContainer: {
    marginVertical: 20,
},
detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
},
detailLabel: {
    fontSize: 12,
    color: '#666',
},
detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
},
signatureSection: {
    alignItems: 'center',
    marginTop: 20,
},
signatureLine: {
    width: 120,
    height: 1,
    backgroundColor: '#333',
    marginBottom: 8,
},
instructorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
},
instructorTitle: {
    fontSize: 12,
    color: '#666',
},
certificateNumber: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
    marginTop: 16,
},
actionContainer: {
    paddingHorizontal: 20,
    gap: 12,
},
viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#007AFF',
    gap: 8,
},
viewButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
},
downloadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
},
disabledButton: {
    opacity: 0.6,
},
downloadButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
},
infoSection: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
},
infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
},
infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    gap: 12,
},
infoContent: {
    flex: 1,
},
infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
},
infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
},
});