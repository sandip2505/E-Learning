import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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
            image: 'https://via.placeholder.com/300x200/4A90E2/FFFFFF?text=React+Native',
            category: 'Programming',
            duration: '12 hours',
            level: 'Intermediate'
        },
        {
            id: 2,
            title: 'UI/UX Design Masterclass',
            instructor: 'Jane Smith',
            rating: 4.9,
            students: 980,
            price: '$39.99',
            originalPrice: '$69.99',
            image: 'https://via.placeholder.com/300x200/50C878/FFFFFF?text=UI/UX+Design',
            category: 'Design',
            duration: '15 hours',
            level: 'Beginner'
        },
        {
            id: 3,
            title: 'Digital Marketing Strategy 2023',
            instructor: 'Mike Johnson',
            rating: 4.7,
            students: 750,
            price: '$29.99',
            originalPrice: '$49.99',
            image: 'https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=Marketing',
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
            image: 'https://via.placeholder.com/300x200/9C27B0/FFFFFF?text=Data+Science',
            category: 'Data Science',
            duration: '18 hours',
            level: 'Intermediate'
        },
        {
            id: 5,
            title: 'AWS Cloud Practitioner',
            instructor: 'Robert Brown',
            rating: 4.6,
            students: 1650,
            price: '$69.99',
            originalPrice: '$119.99',
            image: 'https://via.placeholder.com/300x200/FF9800/FFFFFF?text=Cloud+Computing',
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
            image: 'https://via.placeholder.com/300x200/03A9F4/FFFFFF?text=AI+ML',
            category: 'AI & ML',
            duration: '20 hours',
            level: 'Advanced'
        },
    ];

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.category === selectedCategory);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerText}>
                    <Text style={styles.greeting}>Hello, Learner!</Text>
                    <Text style={styles.title}>Find Your Perfect Course</Text>
                </View>
                <TouchableOpacity style={styles.profileButton}>
                    <Ionicons name="person-outline" size={screenWidth * 0.06} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={screenWidth * 0.05} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search courses, instructors, or topics..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity style={styles.filterButton}>
                        <Ionicons name="options-outline" size={screenWidth * 0.05} color="#fff" />
                    </TouchableOpacity>
                </View>

                {/* Categories */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.categoriesContainer}
                        contentContainerStyle={styles.categoriesContent}
                    >
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
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{course.level}</Text>
                                </View>
                                <View style={styles.courseInfo}>
                                    <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                                    <Text style={styles.instructor}>by {course.instructor}</Text>

                                    <View style={styles.courseMeta}>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="time-outline" size={screenWidth * 0.035} color="#666" />
                                            <Text style={styles.metaText}>{course.duration}</Text>
                                        </View>
                                        <View style={styles.metaItem}>
                                            <Ionicons name="people-outline" size={screenWidth * 0.035} color="#666" />
                                            <Text style={styles.metaText}>{course.students.toLocaleString()}+</Text>
                                        </View>
                                    </View>

                                    <View style={styles.courseDetails}>
                                        <View style={styles.ratingContainer}>
                                            <Ionicons name="star" size={screenWidth * 0.035} color="#FFD700" />
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

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.instructorsContainer}
                        contentContainerStyle={styles.instructorsContent}
                    >
                        {[
                            { id: 1, name: 'John Doe', field: 'React Native', students: 12500, image: 'https://via.placeholder.com/100x100' },
                            { id: 2, name: 'Jane Smith', field: 'UI/UX Design', students: 9800, image: 'https://via.placeholder.com/100x100' },
                            { id: 3, name: 'Mike Johnson', field: 'Marketing', students: 15600, image: 'https://via.placeholder.com/100x100' },
                            { id: 4, name: 'Sarah Wilson', field: 'Data Science', students: 21000, image: 'https://via.placeholder.com/100x100' },
                        ].map((instructor) => (
                            <View key={instructor.id} style={styles.instructorCard}>
                                <Image source={{ uri: instructor.image }} style={styles.instructorImage} />
                                <Text style={styles.instructorName} numberOfLines={1}>{instructor.name}</Text>
                                <Text style={styles.instructorField} numberOfLines={1}>{instructor.field}</Text>
                                <Text style={styles.instructorStudents}>{instructor.students.toLocaleString()}+ students</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        paddingBottom: screenHeight * 0.02,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.05,
        paddingTop: screenHeight * 0.07,
        paddingBottom: screenHeight * 0.02,
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
        fontSize: screenWidth * 0.035,
        color: '#666',
    },
    title: {
        fontSize: screenWidth * 0.055,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 2,
    },
    profileButton: {
        width: screenWidth * 0.1,
        height: screenWidth * 0.1,
        borderRadius: screenWidth * 0.05,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: screenWidth * 0.05,
        marginVertical: screenHeight * 0.02,
        paddingHorizontal: screenWidth * 0.04,
        paddingVertical: screenHeight * 0.015,
        borderRadius: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    searchIcon: {
        marginRight: screenWidth * 0.025,
    },
    searchInput: {
        flex: 1,
        fontSize: screenWidth * 0.04,
        color: '#333',
    },
    filterButton: {
        width: screenWidth * 0.09,
        height: screenWidth * 0.09,
        borderRadius: 10,
        backgroundColor: '#4A90E2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: screenHeight * 0.02,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: screenWidth * 0.05,
        marginBottom: screenHeight * 0.015,
    },
    sectionTitle: {
        fontSize: screenWidth * 0.045,
        fontWeight: 'bold',
        color: '#333',
    },
    seeAll: {
        fontSize: screenWidth * 0.035,
        color: '#4A90E2',
        fontWeight: '500',
    },
    categoriesContainer: {
        marginBottom: screenHeight * 0.01,
    },
    categoriesContent: {
        paddingHorizontal: screenWidth * 0.04,
    },
    categoryItem: {
        paddingHorizontal: screenWidth * 0.05,
        paddingVertical: screenHeight * 0.012,
        marginRight: screenWidth * 0.025,
        backgroundColor: '#fff',
        borderRadius: 20,
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
        fontSize: screenWidth * 0.035,
        color: '#666',
        fontWeight: '500',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    courseList: {
        paddingHorizontal: screenWidth * 0.04,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: screenHeight * 0.015,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        overflow: 'hidden',
    },
    courseImage: {
        width: '100%',
        height: screenHeight * 0.2,
    },
    badge: {
        position: 'absolute',
        top: screenHeight * 0.012,
        right: screenWidth * 0.025,
        backgroundColor: '#FF6B6B',
        paddingHorizontal: screenWidth * 0.025,
        paddingVertical: screenHeight * 0.006,
        borderRadius: 12,
    },
    badgeText: {
        color: '#fff',
        fontSize: screenWidth * 0.03,
        fontWeight: 'bold',
    },
    courseInfo: {
        padding: screenWidth * 0.04,
    },
    courseTitle: {
        fontSize: screenWidth * 0.04,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: screenHeight * 0.005,
        lineHeight: screenWidth * 0.05,
    },
    instructor: {
        fontSize: screenWidth * 0.035,
        color: '#666',
        marginBottom: screenHeight * 0.01,
    },
    courseMeta: {
        flexDirection: 'row',
        marginBottom: screenHeight * 0.01,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: screenWidth * 0.04,
    },
    metaText: {
        fontSize: screenWidth * 0.03,
        color: '#666',
        marginLeft: screenWidth * 0.01,
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
        fontSize: screenWidth * 0.035,
        fontWeight: '500',
        marginLeft: screenWidth * 0.01,
        color: '#333',
    },
    priceContainer: {
        alignItems: 'flex-end',
    },
    originalPrice: {
        fontSize: screenWidth * 0.03,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    price: {
        fontSize: screenWidth * 0.04,
        fontWeight: 'bold',
        color: '#4A90E2',
    },
    instructorsContainer: {
        marginBottom: screenHeight * 0.01,
    },
    instructorsContent: {
        paddingHorizontal: screenWidth * 0.04,
    },
    instructorCard: {
        width: screenWidth * 0.35,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: screenWidth * 0.04,
        marginRight: screenWidth * 0.04,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    instructorImage: {
        width: screenWidth * 0.18,
        height: screenWidth * 0.18,
        borderRadius: screenWidth * 0.09,
        marginBottom: screenHeight * 0.01,
    },
    instructorName: {
        fontSize: screenWidth * 0.035,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: screenHeight * 0.002,
        textAlign: 'center',
    },
    instructorField: {
        fontSize: screenWidth * 0.03,
        color: '#4A90E2',
        marginBottom: screenHeight * 0.005,
        textAlign: 'center',
    },
    instructorStudents: {
        fontSize: screenWidth * 0.028,
        color: '#666',
        textAlign: 'center',
    },
});