import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function CourseDetails() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    // Mock course data - replace with actual data fetching
    const course = {
        id,
        title: 'Complete React Native Development',
        instructor: 'John Smith',
        rating: 4.8,
        students: 12450,
        duration: '24 hours',
        lessons: 156,
        price: '$99.99',
        originalPrice: '$199.99',
        thumbnail: 'https://www.visual-craft.com/strapi/uploads/React_Native_2_c5ab49be9b.png',
        description: 'Master React Native development from scratch. Build real-world mobile applications for both iOS and Android platforms.',
        features: [
            'Build cross-platform mobile apps',
            'Learn modern React hooks',
            'State management with Redux',
            'Navigation and routing',
            'API integration',
            'App deployment'
        ],
        curriculum: [
            { title: 'Introduction to React Native', duration: '2h 30m', lessons: 12 },
            { title: 'Components and Styling', duration: '3h 15m', lessons: 18 },
            { title: 'Navigation and Routing', duration: '2h 45m', lessons: 15 },
            { title: 'State Management', duration: '4h 20m', lessons: 22 }
        ]
    };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <Stack.Screen options={{ headerShown: false }} />
            <StatusBar barStyle="light-content" backgroundColor="#007AFF" />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.favoriteButton}>
                    <Ionicons name="heart-outline" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Course Image */}
            <Image source={{ uri: course.thumbnail }} style={styles.courseImage} />

            {/* Course Info */}
            <View style={styles.content}>
                <Text style={styles.title}>{course.title}</Text>
                <Text style={styles.instructor}>by {course.instructor}</Text>

                {/* Rating and Stats */}
                <View style={styles.statsRow}>
                    <View style={styles.rating}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{course.rating}</Text>
                    </View>
                    <Text style={styles.students}>{course.students.toLocaleString()} students</Text>
                    <Text style={styles.duration}>{course.duration}</Text>
                </View>

                {/* Price */}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>{course.price}</Text>
                    <Text style={styles.originalPrice}>{course.originalPrice}</Text>
                    <View style={styles.discountBadge}>
                        <Text style={styles.discountText}>50% OFF</Text>
                    </View>
                </View>

                {/* Description */}
                <Text style={styles.sectionTitle}>About this course</Text>
                <Text style={styles.description}>{course.description}</Text>

                {/* What you'll learn */}
                <Text style={styles.sectionTitle}>What you'll learn</Text>
                <View style={styles.featuresList}>
                    {course.features.map((feature, index) => (
                        <View key={index} style={styles.featureItem}>
                            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                {/* Curriculum */}
                <Text style={styles.sectionTitle}>Course curriculum</Text>
                <View style={styles.curriculum}>
                    {course.curriculum.map((section, index) => (
                        <View key={index} style={styles.curriculumItem}>
                            <View style={styles.curriculumHeader}>
                                <Text style={styles.curriculumTitle}>{section.title}</Text>
                                <Ionicons name="chevron-down" size={20} color="#666" />
                            </View>
                            <Text style={styles.curriculumInfo}>
                                {section.lessons} lessons • {section.duration}
                            </Text>
                        </View>
                    ))}
                </View>

                {/* Enroll Button */}
                <TouchableOpacity style={styles.enrollButton} onPress={() => router.push('/enrollment/checkout')}>
                    <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 50,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        zIndex: 1,
    },
    backButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    favoriteButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    courseImage: {
        width: width,
        height: 250,
        resizeMode: 'cover',
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    instructor: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    rating: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    ratingText: {
        marginLeft: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    students: {
        fontSize: 14,
        color: '#666',
        marginRight: 16,
    },
    duration: {
        fontSize: 14,
        color: '#666',
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    price: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2196F3',
        marginRight: 12,
    },
    originalPrice: {
        fontSize: 16,
        color: '#999',
        textDecorationLine: 'line-through',
        marginRight: 12,
    },
    discountBadge: {
        backgroundColor: '#FF5722',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
    },
    discountText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
        marginTop: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
        lineHeight: 24,
        marginBottom: 20,
    },
    featuresList: {
        marginBottom: 20,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    featureText: {
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    curriculum: {
        marginBottom: 30,
    },
    curriculumItem: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 8,
    },
    curriculumHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    curriculumTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    curriculumInfo: {
        fontSize: 14,
        color: '#666',
    },
    enrollButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    enrollButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});