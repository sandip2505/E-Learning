import { Ionicons } from '@expo/vector-icons';
import React from 'react';

import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface PrivacyPolicyProps {
navigation?: any;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ navigation }) => {
const handleGoBack = () => {
    navigation?.goBack();
};

return (
    <SafeAreaView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.lastUpdated}>Last updated: {new Date().toLocaleDateString()}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>1. Information We Collect</Text>
                <Text style={styles.sectionText}>
                    We collect information you provide directly to us, such as when you create an account, 
                    enroll in courses, or contact us for support. This may include your name, email address, 
                    profile information, and learning progress data.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
                <Text style={styles.sectionText}>
                    We use the information we collect to provide, maintain, and improve our educational 
                    services, process transactions, send you technical notices and support messages, 
                    and personalize your learning experience.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>3. Information Sharing</Text>
                <Text style={styles.sectionText}>
                    We do not sell, trade, or otherwise transfer your personal information to third parties 
                    without your consent, except as described in this policy. We may share information 
                    with service providers who assist us in operating our platform.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>4. Data Security</Text>
                <Text style={styles.sectionText}>
                    We implement appropriate security measures to protect your personal information against 
                    unauthorized access, alteration, disclosure, or destruction. However, no method of 
                    transmission over the internet is 100% secure.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>5. Your Rights</Text>
                <Text style={styles.sectionText}>
                    You have the right to access, update, or delete your personal information. You may 
                    also opt out of certain communications from us. To exercise these rights, please 
                    contact us using the information provided below.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>6. Children's Privacy</Text>
                <Text style={styles.sectionText}>
                    Our service is not intended for children under 13 years of age. We do not knowingly 
                    collect personal information from children under 13.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
                <Text style={styles.sectionText}>
                    We may update this privacy policy from time to time. We will notify you of any 
                    changes by posting the new policy on this page and updating the "last updated" date.
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>8. Contact Us</Text>
                <Text style={styles.sectionText}>
                    If you have any questions about this privacy policy, please contact us at:
                    {'\n'}Email: privacy@elearning.com
                    {'\n'}Phone: +1 (555) 123-4567
                </Text>
            </View>
        </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
},
backButton: {
    padding: 8,
    marginRight: 8,
},
headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
},
content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
},
lastUpdated: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 24,
},
section: {
    marginBottom: 24,
},
sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
},
sectionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
    textAlign: 'justify',
},
});

export default PrivacyPolicy;