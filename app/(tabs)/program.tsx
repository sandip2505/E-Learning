import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Dimensions, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Programs() {
        const [searchQuery, setSearchQuery] = useState('');
        const [selectedCategory, setSelectedCategory] = useState('All');
        const [selectedProgramType, setSelectedProgramType] = useState('All');

        const categories = [
                'All', 'Technology', 'Business', 'Data Science',
                'AI & ML', 'Cloud Computing', 'Digital Marketing', 'Cybersecurity'
        ];

        const programTypes = [
                { id: 'All', name: 'All Programs' },
                { id: 'degree', name: 'Degree Programs' },
                { id: 'certificate', name: 'Professional Certificates' },
                { id: 'postgraduate', name: 'Postgraduate Programs' }
        ];

        const programs = [
                {
                        id: 1,
                        title: 'Master of Science in Data Science',
                        university: 'University of Texas Austin',
                        duration: '24 months',
                        learningFormat: 'Online',
                        price: '$15,000',
                        originalPrice: '$20,000',
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'Data Science',
                        programType: 'degree',
                        rating: 4.8,
                        students: 1250,
                        features: ['University Certificate', 'Career Support', '1:1 Mentorship']
                },
                {
                        id: 2,
                        title: 'Post Graduate Program in Cloud Computing',
                        university: 'Caltech CTME',
                        duration: '12 months',
                        learningFormat: 'Online',
                        price: '$4,999',
                        originalPrice: '$6,999',
                        image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'Cloud Computing',
                        programType: 'postgraduate',
                        rating: 4.7,
                        students: 980,
                        features: ['Caltech Certificate', 'Masterclasses', 'Job Assistance']
                },
                {
                        id: 3,
                        title: 'Professional Certificate in Digital Marketing',
                        university: 'Purdue University',
                        duration: '9 months',
                        learningFormat: 'Online',
                        price: '$3,999',
                        originalPrice: '$5,499',
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'Digital Marketing',
                        programType: 'certificate',
                        rating: 4.6,
                        students: 2100,
                        features: ['Purdue Certificate', 'Industry Projects', 'Resume Building']
                },
                {
                        id: 4,
                        title: 'Master of Business Administration',
                        university: 'Deakin Business School',
                        duration: '24 months',
                        learningFormat: 'Online',
                        price: '$18,000',
                        originalPrice: '$24,000',
                        image: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'Business',
                        programType: 'degree',
                        rating: 4.9,
                        students: 850,
                        features: ['Deakin Degree', 'Global Alumni Status', 'Leadership Training']
                },
                {
                        id: 5,
                        title: 'Advanced Certification in AI & Machine Learning',
                        university: 'University of Texas Austin',
                        duration: '12 months',
                        learningFormat: 'Online',
                        price: '$4,500',
                        originalPrice: '$6,200',
                        image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'AI & ML',
                        programType: 'certificate',
                        rating: 4.8,
                        students: 3200,
                        features: ['UT Austin Certificate', 'Capstone Project', 'Career Services']
                },
                {
                        id: 6,
                        title: 'Post Graduate Program in Cybersecurity',
                        university: 'MIT Schwarzman College',
                        duration: '8 months',
                        learningFormat: 'Online',
                        price: '$5,500',
                        originalPrice: '$7,800',
                        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=80',
                        category: 'Cybersecurity',
                        programType: 'postgraduate',
                        rating: 4.7,
                        students: 1450,
                        features: ['MIT Certificate', 'Hands-on Labs', 'Industry Mentors']
                },
        ];

        const filteredPrograms = programs.filter(program => {
                const categoryMatch = selectedCategory === 'All' || program.category === selectedCategory;
                const typeMatch = selectedProgramType === 'All' || program.programType === selectedProgramType;
                const searchMatch = searchQuery === '' ||
                        program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        program.university.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        program.category.toLowerCase().includes(searchQuery.toLowerCase());
                return categoryMatch && typeMatch && searchMatch;
        });

        return (
                <SafeAreaView style={styles.container}>
                        {/* Header */}
                        <View style={styles.header}>
                                <View style={styles.headerText}>
                                        <Text style={styles.greeting}>Hello, Future Graduate!</Text>
                                        <Text style={styles.title}>Advance Your Career with Top Programs</Text>
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
                                                placeholder="Search programs, universities, or categories..."
                                                value={searchQuery}
                                                onChangeText={setSearchQuery}
                                                placeholderTextColor="#999"
                                        />
                                        <TouchableOpacity style={styles.filterButton}>
                                                <Ionicons name="options-outline" size={screenWidth * 0.05} color="#fff" />
                                        </TouchableOpacity>
                                </View>

                                {/* Program Types */}
                                <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Program Types</Text>
                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.programTypesContainer}>
                                                {programTypes.map((type) => (
                                                        <TouchableOpacity
                                                                key={type.id}
                                                                style={[
                                                                        styles.programTypeItem,
                                                                        selectedProgramType === type.id && styles.selectedProgramType
                                                                ]}
                                                                onPress={() => setSelectedProgramType(type.id)}
                                                        >
                                                                <Text style={[
                                                                        styles.programTypeText,
                                                                        selectedProgramType === type.id && styles.selectedProgramTypeText
                                                                ]}>
                                                                        {type.name}
                                                                </Text>
                                                        </TouchableOpacity>
                                                ))}
                                        </ScrollView>
                                </View>

                                {/* Categories */}
                                <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Browse by Category</Text>
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

                                {/* Featured Programs */}
                                <View style={styles.section}>
                                        <View style={styles.sectionHeader}>
                                                <Text style={styles.sectionTitle}>Featured Programs</Text>
                                                <TouchableOpacity>
                                                        <Text style={styles.seeAll}>See All</Text>
                                                </TouchableOpacity>
                                        </View>

                                        <View style={styles.programList}>
                                                {filteredPrograms.map((program) => (
                                                        <TouchableOpacity key={program.id} style={styles.programCard}>
                                                                <Image source={{ uri: program.image }} style={styles.programImage} />
                                                                <View style={styles.universityBadge}>
                                                                        <Text style={styles.universityText}>{program.university.split(' ')[0]}</Text>
                                                                </View>
                                                                <View style={styles.programInfo}>
                                                                        <Text style={styles.programTitle} numberOfLines={2}>{program.title}</Text>
                                                                        <Text style={styles.university} numberOfLines={1}>by {program.university}</Text>

                                                                        <View style={styles.programMeta}>
                                                                                <View style={styles.metaItem}>
                                                                                        <Ionicons name="time-outline" size={screenWidth * 0.035} color="#666" />
                                                                                        <Text style={styles.metaText}>{program.duration}</Text>
                                                                                </View>
                                                                                <View style={styles.metaItem}>
                                                                                        <Ionicons name="desktop-outline" size={screenWidth * 0.035} color="#666" />
                                                                                        <Text style={styles.metaText}>{program.learningFormat}</Text>
                                                                                </View>
                                                                        </View>

                                                                        <View style={styles.featuresContainer}>
                                                                                {program.features.slice(0, 3).map((feature, index) => (
                                                                                        <View key={index} style={styles.featurePill}>
                                                                                                <Text style={styles.featureText}>{feature}</Text>
                                                                                        </View>
                                                                                ))}
                                                                        </View>

                                                                        <View style={styles.programDetails}>
                                                                                <View style={styles.ratingContainer}>
                                                                                        <Ionicons name="star" size={screenWidth * 0.035} color="#FFD700" />
                                                                                        <Text style={styles.rating}>{program.rating}</Text>
                                                                                        <Text style={styles.students}>({program.students.toLocaleString()}+)</Text>
                                                                                </View>
                                                                                <View style={styles.priceContainer}>
                                                                                        <Text style={styles.originalPrice}>{program.originalPrice}</Text>
                                                                                        <Text style={styles.price}>{program.price}</Text>
                                                                                </View>
                                                                        </View>
                                                                </View>
                                                        </TouchableOpacity>
                                                ))}
                                        </View>
                                </View>

                                {/* University Partners */}
                                <View style={styles.section}>
                                        <View style={styles.sectionHeader}>
                                                <Text style={styles.sectionTitle}>Our University Partners</Text>
                                                <TouchableOpacity>
                                                        <Text style={styles.seeAll}>See All</Text>
                                                </TouchableOpacity>
                                        </View>

                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.universitiesContainer}>
                                                {[
                                                        { id: 1, name: 'University of Texas', logo: 'https://via.placeholder.com/80x80/4A90E2/FFFFFF?text=UT', programs: 12 },
                                                        { id: 2, name: 'Purdue University', logo: 'https://via.placeholder.com/80x80/FF6B6B/FFFFFF?text=PU', programs: 8 },
                                                        { id: 3, name: 'Caltech', logo: 'https://via.placeholder.com/80x80/50C878/FFFFFF?text=CT', programs: 6 },
                                                        { id: 4, name: 'Deakin University', logo: 'https://via.placeholder.com/80x80/9C27B0/FFFFFF?text=DU', programs: 10 },
                                                        { id: 5, name: 'MIT', logo: 'https://via.placeholder.com/80x80/FF9800/FFFFFF?text=MIT', programs: 5 },
                                                ].map((university) => (
                                                        <View key={university.id} style={styles.universityCard}>
                                                                <Image source={{ uri: university.logo }} style={styles.universityLogo} />
                                                                <Text style={styles.universityName} numberOfLines={2}>{university.name}</Text>
                                                                <Text style={styles.universityPrograms}>{university.programs}+ Programs</Text>
                                                        </View>
                                                ))}
                                        </ScrollView>
                                </View>

                                {/* Success Stories */}
                                <View style={[styles.section, styles.lastSection]}>
                                        <View style={styles.sectionHeader}>
                                                <Text style={styles.sectionTitle}>Success Stories</Text>
                                                <TouchableOpacity>
                                                        <Text style={styles.seeAll}>See All</Text>
                                                </TouchableOpacity>
                                        </View>

                                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesContainer}>
                                                {[
                                                        {
                                                                id: 1,
                                                                name: 'Sarah Johnson',
                                                                role: 'Data Scientist at Google',
                                                                story: 'The MS in Data Science program completely transformed my career trajectory. Within 3 months of completion, I received multiple job offers.',
                                                                avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
                                                                program: 'MS in Data Science'
                                                        },
                                                        {
                                                                id: 2,
                                                                name: 'Michael Chen',
                                                                role: 'Cloud Architect at AWS',
                                                                story: 'The Caltech Cloud Computing program gave me the hands-on experience I needed to advance from sysadmin to cloud architect.',
                                                                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
                                                                program: 'PGP in Cloud Computing'
                                                        },
                                                        {
                                                                id: 3,
                                                                name: 'Emma Rodriguez',
                                                                role: 'Marketing Director',
                                                                story: 'The Digital Marketing certificate helped me transition from traditional marketing to digital. My salary increased by 65% after completion.',
                                                                avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&q=80',
                                                                program: 'Digital Marketing Certificate'
                                                        },
                                                ].map((story) => (
                                                        <View key={story.id} style={styles.storyCard}>
                                                                <View style={styles.storyContent}>
                                                                        <Text style={styles.storyText}>"{story.story}"</Text>
                                                                        <View style={styles.storyAuthor}>
                                                                                <Image source={{ uri: story.avatar }} style={styles.storyAvatar} />
                                                                                <View style={styles.storyAuthorInfo}>
                                                                                        <Text style={styles.storyName} numberOfLines={1}>{story.name}</Text>
                                                                                        <Text style={styles.storyRole} numberOfLines={1}>{story.role}</Text>
                                                                                        <Text style={styles.storyProgram} numberOfLines={1}>{story.program}</Text>
                                                                                </View>
                                                                        </View>
                                                                </View>
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
                paddingBottom: screenHeight * 0.03,
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
                marginVertical: screenHeight * 0.025,
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
                marginBottom: screenHeight * 0.03,
        },
        lastSection: {
                marginBottom: 0,
        },
        sectionHeader: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: screenWidth * 0.05,
                marginBottom: screenHeight * 0.02,
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
        programTypesContainer: {
                paddingHorizontal: screenWidth * 0.04,
                marginBottom: screenHeight * 0.01,
        },
        programTypeItem: {
                paddingHorizontal: screenWidth * 0.05,
                paddingVertical: screenHeight * 0.015,
                marginRight: screenWidth * 0.025,
                backgroundColor: '#fff',
                borderRadius: 8,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                minWidth: screenWidth * 0.35,
                alignItems: 'center',
        },
        selectedProgramType: {
                backgroundColor: '#4A90E2',
        },
        programTypeText: {
                fontSize: screenWidth * 0.035,
                color: '#666',
                fontWeight: '500',
                textAlign: 'center',
        },
        selectedProgramTypeText: {
                color: '#fff',
        },
        categoriesContainer: {
                paddingHorizontal: screenWidth * 0.04,
                marginBottom: screenHeight * 0.01,
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
        programList: {
                paddingHorizontal: screenWidth * 0.04,
        },
        programCard: {
                backgroundColor: '#fff',
                borderRadius: 12,
                marginBottom: screenHeight * 0.025,
                elevation: 3,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                overflow: 'hidden',
        },
        programImage: {
                width: '100%',
                height: screenHeight * 0.2,
        },
        universityBadge: {
                position: 'absolute',
                top: screenHeight * 0.015,
                left: screenWidth * 0.025,
                backgroundColor: 'rgba(0,0,0,0.7)',
                paddingHorizontal: screenWidth * 0.025,
                paddingVertical: screenHeight * 0.008,
                borderRadius: 4,
        },
        universityText: {
                color: '#fff',
                fontSize: screenWidth * 0.03,
                fontWeight: 'bold',
        },
        programInfo: {
                padding: screenWidth * 0.04,
        },
        programTitle: {
                fontSize: screenWidth * 0.04,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: screenHeight * 0.008,
                lineHeight: screenWidth * 0.05,
        },
        university: {
                fontSize: screenWidth * 0.035,
                color: '#666',
                marginBottom: screenHeight * 0.015,
        },
        programMeta: {
                flexDirection: 'row',
                marginBottom: screenHeight * 0.015,
        },
        metaItem: {
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: screenWidth * 0.04,
        },
        metaText: {
                fontSize: screenWidth * 0.03,
                color: '#666',
                marginLeft: screenWidth * 0.015,
        },
        featuresContainer: {
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginBottom: screenHeight * 0.015,
        },
        featurePill: {
                backgroundColor: '#f0f7ff',
                paddingHorizontal: screenWidth * 0.025,
                paddingVertical: screenHeight * 0.008,
                borderRadius: 12,
                marginRight: screenWidth * 0.02,
                marginBottom: screenHeight * 0.01,
        },
        featureText: {
                fontSize: screenWidth * 0.03,
                color: '#4A90E2',
        },
        programDetails: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
        },
        ratingContainer: {
                flexDirection: 'row',
                alignItems: 'center',
                flex: 1,
        },
        rating: {
                fontSize: screenWidth * 0.035,
                fontWeight: '500',
                marginLeft: screenWidth * 0.01,
                color: '#333',
        },
        students: {
                fontSize: screenWidth * 0.03,
                color: '#666',
                marginLeft: screenWidth * 0.01,
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
                fontSize: screenWidth * 0.045,
                fontWeight: 'bold',
                color: '#4A90E2',
        },
        universitiesContainer: {
                paddingHorizontal: screenWidth * 0.04,
        },
        universityCard: {
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
        universityLogo: {
                width: screenWidth * 0.2,
                height: screenWidth * 0.2,
                borderRadius: screenWidth * 0.1,
                marginBottom: screenHeight * 0.015,
        },
        universityName: {
                fontSize: screenWidth * 0.035,
                fontWeight: 'bold',
                color: '#333',
                marginBottom: screenHeight * 0.005,
                textAlign: 'center',
        },
        universityPrograms: {
                fontSize: screenWidth * 0.028,
                color: '#666',
                textAlign: 'center',
        },
        storiesContainer: {
                paddingHorizontal: screenWidth * 0.04,
        },
        storyCard: {
                width: screenWidth * 0.8,
                backgroundColor: '#fff',
                borderRadius: 12,
                padding: screenWidth * 0.04,
                marginRight: screenWidth * 0.04,
                elevation: 2,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                minHeight: screenHeight * 0.2,
        },
        storyContent: {
                flex: 1,
        },
        storyText: {
                fontSize: screenWidth * 0.035,
                color: '#666',
                fontStyle: 'italic',
                marginBottom: screenHeight * 0.02,
                lineHeight: screenWidth * 0.05,
        },
        storyAuthor: {
                flexDirection: 'row',
                alignItems: 'center',
        },
        storyAvatar: {
                width: screenWidth * 0.125,
                height: screenWidth * 0.125,
                borderRadius: screenWidth * 0.0625,
                marginRight: screenWidth * 0.025,
        },
        storyAuthorInfo: {
                flex: 1,
        },
        storyName: {
                fontSize: screenWidth * 0.035,
                fontWeight: 'bold',
                color: '#333',
        },
        storyRole: {
                fontSize: screenWidth * 0.03,
                color: '#666',
                marginTop: screenHeight * 0.002,
        },
        storyProgram: {
                fontSize: screenWidth * 0.03,
                color: '#4A90E2',
                marginTop: screenHeight * 0.002,
        },
});