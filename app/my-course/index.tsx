import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { router, Stack } from 'expo-router';
import {
    Dimensions,
    Image,
    Platform,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Course {
    id: string;
    title: string;
    instructor: string;
    thumbnail: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    category: string;
}

const MyCourseScreen: React.FC = () => {
    const courses: Course[] = [
        {
            id: '1',
            title: 'React Native Development',
            instructor: 'John Doe',
            thumbnail: 'https://via.placeholder.com/300x180',
            progress: 75,
            totalLessons: 24,
            completedLessons: 18,
            duration: '12h 30m',
            category: 'Mobile Development',
        },
        {
            id: '2',
            title: 'UI/UX Design Principles',
            instructor: 'Sarah Johnson',
            thumbnail: 'https://via.placeholder.com/300x180',
            progress: 45,
            totalLessons: 16,
            completedLessons: 7,
            duration: '8h 15m',
            category: 'Design',
        },
        {
            id: '3',
            title: 'JavaScript Fundamentals',
            instructor: 'Mike Wilson',
            thumbnail: 'https://via.placeholder.com/300x180',
            progress: 100,
            totalLessons: 20,
            completedLessons: 20,
            duration: '15h 45m',
            category: 'Programming',
        },
    ];

    const renderProgressBar = (progress: number) => (
        <View style={styles.progressContainer}>
            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${progress}%` }
                    ]}
                />
            </View>
            <Text style={styles.progressText}>{progress}%</Text>
        </View>
    );

    const renderCourseCard = (course: Course) => (
        <TouchableOpacity key={course.id} style={styles.courseCard}>
            <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
            <View style={styles.courseInfo}>
                <View style={styles.courseHeader}>
                    <Text style={styles.courseTitle} numberOfLines={2}>
                        {course.title}
                    </Text>
                    <Text style={styles.instructor}>by {course.instructor}</Text>
                </View>

                <View style={styles.categoryContainer}>
                    <Text style={styles.category}>{course.category}</Text>
                </View>

                {renderProgressBar(course.progress)}

                <View style={styles.courseStats}>
                    <View style={styles.statItem}>
                        <Ionicons name="play-circle-outline" size={16} color="#666" />
                        <Text style={styles.statText}>
                            {course.completedLessons}/{course.totalLessons} lessons
                        </Text>
                    </View>
                    <View style={styles.statItem}>
                        <Ionicons name="time-outline" size={16} color="#666" />
                        <Text style={styles.statText}>{course.duration}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.continueButton}>
                    <Text style={styles.continueButtonText}>
                        {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

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
                <Text style={styles.customHeaderTitle}>My Courses</Text>
                <View style={styles.headerSpacer} />
            </View>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>My Courses</Text>
                <Text style={styles.headerSubtitle}>
                    {courses.length} course{courses.length !== 1 ? 's' : ''} purchased
                </Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
            >
                {courses.map(renderCourseCard)}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
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
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 4,
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#6c757d',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 20,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    thumbnail: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    courseInfo: {
        padding: 16,
    },
    courseHeader: {
        marginBottom: 8,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#212529',
        marginBottom: 4,
    },
    instructor: {
        fontSize: 14,
        color: '#6c757d',
    },
    categoryContainer: {
        marginBottom: 12,
    },
    category: {
        fontSize: 12,
        color: '#007bff',
        backgroundColor: '#e7f3ff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    progressBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#e9ecef',
        borderRadius: 4,
        marginRight: 12,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#28a745',
        borderRadius: 4,
    },
    progressText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#28a745',
        minWidth: 35,
    },
    courseStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    statItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statText: {
        fontSize: 12,
        color: '#6c757d',
        marginLeft: 4,
    },
    continueButton: {
        backgroundColor: '#007bff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 8,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
});

export default MyCourseScreen;