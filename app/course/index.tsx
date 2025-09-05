import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    FlatList,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width } = Dimensions.get('window');

interface Course {
    id: string;
    title: string;
    instructor: string;
    duration: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    rating: number;
    students: number;
    price: number;
    originalPrice?: number;
    thumbnail: string;
    category: string;
    description: string;
    isRecommended?: boolean;
}

interface Category {
    id: string;
    name: string;
    icon: string;
    count: number;
}

export default function BrowseCourses() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState('popular');

    // Mock data
    const categories: Category[] = [
        { id: '1', name: 'All', icon: 'apps', count: 150 },
        { id: '2', name: 'Programming', icon: 'code-slash', count: 45 },
        { id: '3', name: 'Design', icon: 'color-palette', count: 32 },
        { id: '4', name: 'Business', icon: 'briefcase', count: 28 },
        { id: '5', name: 'Marketing', icon: 'trending-up', count: 25 },
        { id: '6', name: 'Photography', icon: 'camera', count: 20 },
    ];

    const courses: Course[] = [
        {
            id: '1',
            title: 'Complete React Native Development Course',
            instructor: 'John Smith',
            duration: '12h 30m',
            level: 'Intermediate',
            rating: 4.8,
            students: 12500,
            price: 49.99,
            originalPrice: 99.99,
            thumbnail: 'https://picsum.photos/300/200?random=1',
            category: 'Programming',
            description: 'Master React Native and build amazing mobile apps',
            isRecommended: true,
        },
        {
            id: '2',
            title: 'UI/UX Design Fundamentals',
            instructor: 'Sarah Johnson',
            duration: '8h 45m',
            level: 'Beginner',
            rating: 4.9,
            students: 8750,
            price: 39.99,
            originalPrice: 79.99,
            thumbnail: 'https://picsum.photos/300/200?random=2',
            category: 'Design',
            description: 'Learn the principles of great user experience design',
            isRecommended: true,
        },
        {
            id: '3',
            title: 'Digital Marketing Mastery',
            instructor: 'Mike Davis',
            duration: '15h 20m',
            level: 'Advanced',
            rating: 4.7,
            students: 15200,
            price: 69.99,
            thumbnail: 'https://picsum.photos/300/200?random=3',
            category: 'Marketing',
            description: 'Complete guide to digital marketing strategies',
        },
        {
            id: '4',
            title: 'Python for Data Science',
            instructor: 'Emily Chen',
            duration: '20h 15m',
            level: 'Intermediate',
            rating: 4.6,
            students: 9300,
            price: 59.99,
            originalPrice: 119.99,
            thumbnail: 'https://picsum.photos/300/200?random=4',
            category: 'Programming',
            description: 'Learn Python programming for data analysis',
        },
        {
            id: '5',
            title: 'Business Strategy & Leadership',
            instructor: 'Robert Wilson',
            duration: '10h 30m',
            level: 'Advanced',
            rating: 4.5,
            students: 6800,
            price: 79.99,
            thumbnail: 'https://picsum.photos/300/200?random=5',
            category: 'Business',
            description: 'Develop strategic thinking and leadership skills',
            isRecommended: true,
        },
        {
            id: '6',
            title: 'Portrait Photography Techniques',
            instructor: 'Lisa Anderson',
            duration: '6h 45m',
            level: 'Beginner',
            rating: 4.4,
            students: 4200,
            price: 34.99,
            thumbnail: 'https://picsum.photos/300/200?random=6',
            category: 'Photography',
            description: 'Master the art of portrait photography',
        },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const recommendedCourses = courses.filter(course => course.isRecommended);

    const renderCategoryChip = ({ item }: { item: Category }) => (
        <TouchableOpacity
            style={[
                styles.categoryChip,
                selectedCategory === item.name && styles.activeCategoryChip
            ]}
            onPress={() => setSelectedCategory(item.name)}
            activeOpacity={0.7}
        >
            <View style={[
                styles.categoryIconContainer,
                selectedCategory === item.name && styles.activeCategoryIconContainer
            ]}>
                <Ionicons 
                    name={item.icon as any} 
                    size={18} 
                    color={selectedCategory === item.name ? '#fff' : '#007AFF'} 
                />
            </View>
            <Text style={[
                styles.categoryText,
                selectedCategory === item.name && styles.activeCategoryText
            ]}>
                {item.name}
            </Text>
            <View style={[
                styles.categoryBadge,
                selectedCategory === item.name && styles.activeCategoryBadge
            ]}>
                <Text style={[
                    styles.categoryCount,
                    selectedCategory === item.name && styles.activeCategoryCount
                ]}>
                    {item.count}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const renderCourseCard = ({ item }: { item: Course }) => (
        <TouchableOpacity 
            style={styles.courseCard}
            onPress={() => router.push(`/course/${item.id}`)}
            activeOpacity={0.9}
        >
            <View style={styles.courseImageContainer}>
                <Image source={{ uri: item.thumbnail }} style={styles.courseImage} />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.5)']}
                    style={styles.courseImageOverlay}
                />
                <View style={styles.courseBadges}>
                    <View style={[styles.levelBadge, styles[`${item.level.toLowerCase()}Badge`]]}>
                        <Text style={styles.levelText}>{item.level}</Text>
                    </View>
                    {item.originalPrice && (
                        <View style={styles.discountBadge}>
                            <Text style={styles.discountText}>
                                {Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
                            </Text>
                        </View>
                    )}
                </View>
                <View style={styles.courseDuration}>
                    <Ionicons name="time" size={12} color="#fff" />
                    <Text style={styles.durationText}>{item.duration}</Text>
                </View>
            </View>
            
            <View style={styles.courseInfo}>
                <Text style={styles.courseTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.courseInstructor}>by {item.instructor}</Text>
                <Text style={styles.courseDescription} numberOfLines={2}>{item.description}</Text>
                
                <View style={styles.courseStats}>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={14} color="#FFD700" />
                        <Text style={styles.ratingText}>{item.rating}</Text>
                        <Text style={styles.studentsText}>({item.students.toLocaleString()})</Text>
                    </View>
                    
                    <View style={styles.priceContainer}>
                        {item.originalPrice && (
                            <Text style={styles.originalPrice}>${item.originalPrice}</Text>
                        )}
                        <Text style={styles.currentPrice}>${item.price}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderRecommendedCard = ({ item }: { item: Course }) => (
        <TouchableOpacity 
            style={styles.recommendedCard}
            onPress={() => router.push(`/course/${item.id}`)}
            activeOpacity={0.9}
        >
            <Image source={{ uri: item.thumbnail }} style={styles.recommendedImage} />
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.5)']}
                style={styles.recommendedOverlay}
            />
            <View style={styles.recommendedContent}>
                <View style={styles.recommendedBadge}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.recommendedBadgeText}>Recommended</Text>
                </View>
                <Text style={styles.recommendedTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.recommendedInstructor}>{item.instructor}</Text>
                <View style={styles.recommendedStats}>
                    <Text style={styles.recommendedRating}>★ {item.rating}</Text>
                    <Text style={styles.recommendedPrice}>${item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderPagination = () => {
        const totalPages = Math.ceil(filteredCourses.length / 6);
        const pages = [];
        
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <TouchableOpacity
                    key={i}
                    style={[styles.pageButton, currentPage === i && styles.activePageButton]}
                    onPress={() => setCurrentPage(i)}
                >
                    <Text style={[styles.pageText, currentPage === i && styles.activePageText]}>
                        {i}
                    </Text>
                </TouchableOpacity>
            );
        }
        
        return (
            <View style={styles.paginationContainer}>
                <TouchableOpacity 
                    style={[styles.navButton, currentPage === 1 && styles.disabledButton]}
                    onPress={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Ionicons name="chevron-back" size={20} color={currentPage === 1 ? '#ccc' : '#007AFF'} />
                </TouchableOpacity>
                
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.pagesScroll}>
                    {pages}
                </ScrollView>
                
                <TouchableOpacity 
                    style={[styles.navButton, currentPage === totalPages && styles.disabledButton]}
                    onPress={() => currentPage < totalPages && setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <Ionicons name="chevron-forward" size={20} color={currentPage === totalPages ? '#ccc' : '#007AFF'} />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#007AFF" />
            <Stack.Screen options={{ headerShown: false }} />

            {/* Header */}
            <View style={styles.customHeader}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.customHeaderTitle}>Browse Courses</Text>
                <TouchableOpacity 
                    onPress={() => setShowFilters(!showFilters)}
                    style={styles.backButton}
                >
                    <Ionicons name="options" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color="#888" />
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search courses, instructors..."
                            placeholderTextColor="#888"
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')}>
                                <Ionicons name="close-circle" size={20} color="#888" />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {/* Categories */}
                <View style={styles.categoriesSection}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <FlatList
                        data={categories}
                        renderItem={renderCategoryChip}
                        keyExtractor={(item) => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.categoriesList}
                    />
                </View>

                {/* Recommended Section */}
                {recommendedCourses.length > 0 && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Recommended for You</Text>
                            <TouchableOpacity>
                                <Text style={styles.seeAllText}>See All</Text>
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            data={recommendedCourses}
                            renderItem={renderRecommendedCard}
                            keyExtractor={(item) => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.recommendedList}
                        />
                    </View>
                )}

                {/* All Courses */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {selectedCategory === 'All' ? 'All Courses' : selectedCategory}
                        </Text>
                        <Text style={styles.resultCount}>
                            {filteredCourses.length} courses
                        </Text>
                    </View>
                    
                    <View style={styles.coursesGrid}>
                        {filteredCourses.slice((currentPage - 1) * 6, currentPage * 6).map((course) => (
                            <View key={course.id}>
                                {renderCourseCard({ item: course })}
                            </View>
                        ))}
                    </View>

                    {/* Pagination */}
                    {filteredCourses.length > 6 && renderPagination()}
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
    content: {
        flex: 1,
    },
    searchContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f3f5',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 12,
        marginRight: 8,
    },
    categoriesSection: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#333',
        marginLeft: 16,
        marginBottom: 12,
    },
    categoriesList: {
        paddingHorizontal: 16,
        paddingRight: 32,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginRight: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    activeCategoryChip: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    categoryIconContainer: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: 'rgba(0, 122, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    activeCategoryIconContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    categoryText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
        marginRight: 6,
    },
    activeCategoryText: {
        color: '#fff',
    },
    categoryBadge: {
        backgroundColor: '#e9ecef',
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
    },
    activeCategoryBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
    categoryCount: {
        fontSize: 11,
        fontWeight: '600',
        color: '#6c757d',
    },
    activeCategoryCount: {
        color: '#fff',
    },
    section: {
        marginTop: 8,
        backgroundColor: '#fff',
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    seeAllText: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '600',
    },
    resultCount: {
        fontSize: 14,
        color: '#6c757d',
        fontWeight: '500',
    },
    recommendedList: {
        paddingHorizontal: 16,
        paddingRight: 32,
    },
    recommendedCard: {
        width: 200,
        height: 140,
        borderRadius: 12,
        marginRight: 12,
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 1,
        borderColor: '#e9ecef',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    recommendedImage: {
        width: '100%',
        height: '100%',
    },
    recommendedOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '70%',
    },
    recommendedContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 12,
    },
    recommendedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 215, 0, 0.9)',
        borderRadius: 12,
        paddingHorizontal: 6,
        paddingVertical: 2,
        alignSelf: 'flex-start',
        marginBottom: 6,
    },
    recommendedBadgeText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#000',
        marginLeft: 2,
    },
    recommendedTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 2,
    },
    recommendedInstructor: {
        fontSize: 12,
        color: '#f8f9fa',
        marginBottom: 4,
    },
    recommendedStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    recommendedRating: {
        fontSize: 12,
        color: '#FFD700',
        fontWeight: '600',
    },
    recommendedPrice: {
        fontSize: 14,
        color: '#fff',
        fontWeight: '700',
    },
    coursesGrid: {
        paddingHorizontal: 16,
    },
    courseCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
    },
    courseImageContainer: {
        height: 180,
        position: 'relative',
    },
    courseImage: {
        width: '100%',
        height: '100%',
    },
    courseImageOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '50%',
    },
    courseBadges: {
        position: 'absolute',
        top: 12,
        left: 12,
        right: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    levelBadge: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    beginnerBadge: {
        backgroundColor: 'rgba(76, 175, 80, 0.9)',
    },
    intermediateBadge: {
        backgroundColor: 'rgba(255, 152, 0, 0.9)',
    },
    advancedBadge: {
        backgroundColor: 'rgba(244, 67, 54, 0.9)',
    },
    levelText: {
        fontSize: 10,
        fontWeight: '600',
        color: '#fff',
    },
    discountBadge: {
        backgroundColor: 'rgba(255, 87, 34, 0.9)',
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    discountText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    courseDuration: {
        position: 'absolute',
        bottom: 12,
        right: 12,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 6,
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    durationText: {
        fontSize: 11,
        color: '#fff',
        fontWeight: '600',
        marginLeft: 3,
    },
    courseInfo: {
        padding: 16,
    },
    courseTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#333',
        marginBottom: 4,
    },
    courseInstructor: {
        fontSize: 14,
        color: '#007AFF',
        fontWeight: '500',
        marginBottom: 6,
    },
    courseDescription: {
        fontSize: 14,
        color: '#6c757d',
        lineHeight: 20,
        marginBottom: 12,
    },
    courseStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 14,
        color: '#495057',
        fontWeight: '600',
        marginLeft: 4,
    },
    studentsText: {
        fontSize: 12,
        color: '#6c757d',
        marginLeft: 4,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    originalPrice: {
        fontSize: 14,
        color: '#6c757d',
        textDecorationLine: 'line-through',
        marginRight: 6,
    },
    currentPrice: {
        fontSize: 18,
        fontWeight: '700',
        color: '#28a745',
    },
    paginationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    navButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#dee2e6',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    disabledButton: {
        opacity: 0.5,
    },
    pagesScroll: {
        maxWidth: width - 120,
        marginHorizontal: 8,
    },
    pageButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 4,
        borderWidth: 1,
        borderColor: '#dee2e6',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 1,
    },
    activePageButton: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    pageText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#495057',
    },
    activePageText: {
        color: '#fff',
    },
});