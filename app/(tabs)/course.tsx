import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// const { width, height } = Dimensions.get('window');
const { width: width, height: height } = Dimensions.get('window');


export default function Browse() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = [
        'All', 'Programming', 'Design', 'Business',
        'Marketing', 'Data Science', 'AI & ML', 'Cloud Computing'
    ];

    const courses = [
        {
            id: 1,
            title: 'Advanced React Native Development',
            instructor: 'John Doe',
            rating: 4.8,
            students: 1250,
            price: '$49.99',
            originalPrice: '$89.99',
            image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'Programming',
            duration: '12 hours',
            level: 'Intermediate',
            isBestseller: true
        },
        {
            id: 2,
            title: 'UI/UX Design Masterclass',
            instructor: 'Jane Smith',
            rating: 4.9,
            students: 980,
            price: '$39.99',
            originalPrice: '$69.99',
            image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'Design',
            duration: '15 hours',
            level: 'Beginner',
            isBestseller: true
        },
        {
            id: 3,
            title: 'Digital Marketing Strategy 2023',
            instructor: 'Mike Johnson',
            rating: 4.7,
            students: 750,
            price: '$29.99',
            originalPrice: '$49.99',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'Marketing',
            duration: '10 hours',
            level: 'Advanced'
        },
        {
            id: 4,
            title: 'Python for Data Science',
            instructor: 'Sarah Wilson',
            rating: 4.8,
            students: 2100,
            price: '$59.99',
            originalPrice: '$99.99',
            image: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'Data Science',
            duration: '18 hours',
            level: 'Intermediate',
            isBestseller: true
        },
        {
            id: 5,
            title: 'AWS Cloud Practitioner',
            instructor: 'Robert Brown',
            rating: 4.6,
            students: 1650,
            price: '$69.99',
            originalPrice: '$119.99',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'Cloud Computing',
            duration: '14 hours',
            level: 'Beginner'
        },
        {
            id: 6,
            title: 'Machine Learning Fundamentals',
            instructor: 'Emily Chen',
            rating: 4.9,
            students: 3200,
            price: '$79.99',
            originalPrice: '$129.99',
            image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
            category: 'AI & ML',
            duration: '20 hours',
            level: 'Advanced',
            isBestseller: true
        },
    ];

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.category === selectedCategory);

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.greeting}>Hello, Learner!</Text>
                    <Text style={styles.title}>Find Your Perfect Course</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-outline" size={width * 0.06} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={width * 0.05} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search courses, instructors, or topics..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        placeholderTextColor="#999"
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={width * 0.05} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
                        {categories.map((category) => (
                            <TouchableOpacity
                                key={category}
                                style={[
                                    styles.categoryItem,
                                    selectedCategory === category && styles.selectedCategory
                                ]}
                                onPress={() => setSelectedCategory(category)}
                            >
                                <Text style={[
                                    styles.categoryText,
                                    selectedCategory === category && styles.selectedCategoryText
                                ]}>
                                    {category}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Featured Courses */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Featured Courses</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.courseList}>
                        {filteredCourses.map((course) => (
                            <TouchableOpacity key={course.id} style={styles.courseCard}>
                                <Image source={{ uri: course.image }} style={styles.courseImage} />
                                {course.isBestseller && (
                                    <View style={styles.bestsellerBadge}>
                                        <Text style={styles.bestsellerText}>Bestseller</Text>
                                    </View>
                                )}
                                <View style={styles.levelBadge}>
                                    <Text style={styles.levelText}>{course.level}</Text>
                                </View>
                                <View style={styles.courseInfo}>
                                    <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                                    <Text style={styles.instructor}>by {course.instructor}</Text>

                                    <View style={styles.courseMeta}>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="time-outline" size={width * 0.035} color="#666" />
                                            <Text style={styles.metaText}>{course.duration}</Text>
                                        </View>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="people-outline" size={width * 0.035} color="#666" />
                                            <Text style={styles.metaText}>{course.students.toLocaleString()}+ enrolled</Text>
                                        </View>
                                    </View>

                                    <View style={styles.courseDetails}>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={width * 0.035} color="#FFD700" />
                                            <Text style={styles.rating}>{course.rating}</Text>
                                        </View>
                                        <View style={styles.priceContainer}>
                                            <Text style={styles.originalPrice}>{course.originalPrice}</Text>
                                            <Text style={styles.price}>{course.price}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Popular Instructors */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Top Instructors</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.instructorsContainer}>
                        {[
                            { id: 1, name: 'John Doe', field: 'React Native', students: 12500, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                            { id: 2, name: 'Jane Smith', field: 'UI/UX Design', students: 9800, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                            { id: 3, name: 'Mike Johnson', field: 'Marketing', students: 15600, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                            { id: 4, name: 'Sarah Wilson', field: 'Data Science', students: 21000, image: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                        ].map((instructor) => (
                            <TouchableOpacity key={instructor.id} style={styles.instructorCard}>
                                <Image source={{ uri: instructor.image }} style={styles.instructorImage} />
                                <Text style={styles.instructorName} numberOfLines={2}>{instructor.name}</Text>
                                <Text style={styles.instructorField} numberOfLines={1}>{instructor.field}</Text>
                                <Text style={styles.instructorStudents}>{instructor.students.toLocaleString()}+ students</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Testimonials */}
                <View style={[styles.section, { marginBottom: height * 0.02 }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Student Testimonials</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAll}>See All</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.testimonialsContainer}>
                        {[
                            { id: 1, name: 'Alex Thompson', text: 'This platform transformed my career! The courses are comprehensive and practical.', rating: 5, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                            { id: 2, name: 'Maria Garcia', text: 'The instructors are industry experts who really know how to teach complex concepts.', rating: 5, avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                            { id: 3, name: 'James Wilson', text: 'I landed my dream job after completing the Data Science program. Highly recommended!', rating: 4, avatar: 'https://images.unsplash.com/photo-1508341591423-4347099e1f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80' },
                        ].map((testimonial) => (
                            <View key={testimonial.id} style={styles.testimonialCard}>
                                <View style={styles.testimonialHeader}>
                                    <Image source={{ uri: testimonial.avatar }} style={styles.testimonialAvatar} />
                                    <View style={styles.testimonialInfo}>
                                        <Text style={styles.testimonialName}>{testimonial.name}</Text>
                                        <View style={styles.ratingContainer}>
                                            {[...Array(5)].map((_, i) => (
                                                <Ionicons
                                                    key={i}
                                                    name="star"
                                                    size={width * 0.035}
                                                    color={i < testimonial.rating ? "#FFD700" : "#ccc"}
                                                />
                                            ))}
                                        </View>
                                    </View>
                                </View>
                                <Text style={styles.testimonialText}>"{testimonial.text}"</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: height * 0.02,
    },
     header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.07,
        paddingBottom: height * 0.02,
        backgroundColor: '#fff',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    headerText: {
        flex: 1,
    },
    greeting: {
        fontSize: width * 0.035,
        color: '#666',
    },
    title: {
        fontSize: width * 0.055,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 2,
    },
    profileButton: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: width * 0.05,
        marginVertical: height * 0.025,
        paddingHorizontal: width * 0.04,
        paddingVertical: height * 0.015,
        borderRadius: width * 0.03,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: width * 0.025,
    },
    searchInput: {
        flex: 1,
        fontSize: width * 0.04,
        color: '#333',
    },
    filterButton: {
        width: width * 0.09,
        height: width * 0.09,
        borderRadius: width * 0.025,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: height * 0.03,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: width * 0.05,
        marginBottom: height * 0.02,
    },
    sectionTitle: {
        fontSize: width * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: width * 0.035,
        color: '#4A90E2',
        fontWeight: '500',
    },
    categoriesContainer: {
        paddingHorizontal: width * 0.04,
        marginBottom: height * 0.015,
    },
    categoryItem: {
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.012,
        marginRight: width * 0.025,
        backgroundColor: '#fff',
        borderRadius: width * 0.05,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    selectedCategory: {
        backgroundColor: '#4A90E2',
    },
    categoryText: {
        fontSize: width * 0.035,
        color: '#666',
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    courseList: {
        paddingHorizontal: width * 0.04,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        marginBottom: height * 0.025,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: height * 0.2,
    },
    bestsellerBadge: {
        position: 'absolute',
        top: height * 0.015,
        left: width * 0.025,
        backgroundColor: '#FF6B6B',
        paddingHorizontal: width * 0.025,
        paddingVertical: height * 0.006,
        borderRadius: width * 0.01,
    },
    bestsellerText: {
        color: '#fff',
        fontSize: width * 0.03,
        fontWeight: 'bold',
    },
    levelBadge: {
        position: 'absolute',
        top: height * 0.015,
        right: width * 0.025,
        backgroundColor: 'rgba(0,0,0,0.7)',
        paddingHorizontal: width * 0.025,
        paddingVertical: height * 0.006,
        borderRadius: width * 0.03,
    },
    levelText: {
        color: '#fff',
        fontSize: width * 0.03,
        fontWeight: 'bold',
    },
    courseInfo: {
        padding: width * 0.04,
    },
    courseTitle: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: height * 0.006,
        lineHeight: width * 0.05,
    },
    instructor: {
        fontSize: width * 0.035,
        color: '#666',
        marginBottom: height * 0.012,
    },
    courseMeta: {
        flexDirection: 'row',
        marginBottom: height * 0.012,
        flexWrap: 'wrap',
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: width * 0.04,
        marginBottom: height * 0.005,
    },
    metaText: {
        fontSize: width * 0.03,
        color: '#666',
        marginLeft: width * 0.015,
    },
    courseDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: width * 0.035,
        fontWeight: '500',
        marginLeft: width * 0.01,
        color: '#333',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    originalPrice: {
        fontSize: width * 0.03,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    price: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    instructorsContainer: {
        paddingHorizontal: width * 0.04,
    },
    instructorCard: {
        width: width * 0.35,
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        padding: width * 0.04,
        marginRight: width * 0.04,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    instructorImage: {
        width: width * 0.18,
        height: width * 0.18,
        borderRadius: width * 0.09,
        marginBottom: height * 0.012,
    },
    instructorName: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: height * 0.003,
        textAlign: 'center',
        lineHeight: width * 0.042,
    },
    instructorField: {
        fontSize: width * 0.03,
        color: '#4A90E2',
        marginBottom: height * 0.006,
        textAlign: 'center',
    },
    instructorStudents: {
        fontSize: width * 0.028,
        color: '#666',
        textAlign: 'center',
    },
    testimonialsContainer: {
        paddingHorizontal: width * 0.04,
    },
    testimonialCard: {
        width: width * 0.8,
        backgroundColor: '#fff',
        borderRadius: width * 0.03,
        padding: width * 0.04,
        marginRight: width * 0.04,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    testimonialHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: height * 0.012,
    },
    testimonialAvatar: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 0.05,
        marginRight: width * 0.025,
    },
    testimonialInfo: {
        flex: 1,
    },
    testimonialName: {
        fontSize: width * 0.035,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: height * 0.003,
    },
    testimonialText: {
        fontSize: width * 0.035,
        color: '#666',
        fontStyle: 'italic',
        lineHeight: width * 0.045,
    },
});