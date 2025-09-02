import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';

import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

interface Lesson {
id: string;
title: string;
duration: string;
isCompleted: boolean;
isLocked: boolean;
thumbnail?: string;
description: string;
}

const LessonsList: React.FC = () => {
const lessons: Lesson[] = [
    {
        id: '1',
        title: 'Introduction to React Native',
        duration: '15 min',
        isCompleted: true,
        isLocked: false,
        description: 'Learn the basics of React Native development',
    },
    {
        id: '2',
        title: 'Setting up Development Environment',
        duration: '20 min',
        isCompleted: true,
        isLocked: false,
        description: 'Configure your development tools and environment',
    },
    {
        id: '3',
        title: 'Components and Props',
        duration: '25 min',
        isCompleted: false,
        isLocked: false,
        description: 'Understanding React components and props',
    },
    {
        id: '4',
        title: 'State Management',
        duration: '30 min',
        isCompleted: false,
        isLocked: true,
        description: 'Managing application state effectively',
    },
];
// [lessonId]
const renderLesson = ({ item }: { item: Lesson }) => (
    <TouchableOpacity
        style={[
            styles.lessonCard,
            item.isLocked && styles.lockedCard,
        ]}
        disabled={item.isLocked}
        activeOpacity={0.7} onPress={() => router.push(`/course/lessons/${item.id}`)}
    >
        <View style={styles.lessonContent}>
            <View style={styles.lessonHeader}>
                <View style={styles.statusContainer}>
                    {item.isCompleted ? (
                        <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                    ) : item.isLocked ? (
                        <Ionicons name="lock-closed" size={24} color="#9E9E9E" />
                    ) : (
                        <Ionicons name="play-circle" size={24} color="#2196F3" />
                    )}
                </View>
                <View style={styles.lessonInfo}>
                    <Text style={[
                        styles.lessonTitle,
                        item.isLocked && styles.lockedText,
                    ]}>
                        {item.title}
                    </Text>
                    <Text style={styles.lessonDescription}>
                        {item.description}
                    </Text>
                    <View style={styles.durationContainer}>
                        <Ionicons name="time-outline" size={16} color="#757575" />
                        <Text style={styles.duration}>{item.duration}</Text>
                    </View>
                </View>
            </View>
        </View>
        <Ionicons
            name="chevron-forward"
            size={20}
            color={item.isLocked ? "#BDBDBD" : "#757575"}
        />
    </TouchableOpacity>
);

return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headerTitle}>Course Lessons</Text>
            <Text style={styles.progressText}>3 of 4 completed</Text>
        </View>
        
        <FlatList
            data={lessons}
            renderItem={renderLesson}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
        />
    </View>
);
};

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
},
header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
},
headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
},
progressText: {
    fontSize: 14,
    color: '#757575',
},
listContainer: {
    padding: 16,
},
lessonCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
},
lockedCard: {
    backgroundColor: '#FAFAFA',
    opacity: 0.7,
},
lessonContent: {
    flex: 1,
},
lessonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
},
statusContainer: {
    marginRight: 12,
},
lessonInfo: {
    flex: 1,
},
lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    marginBottom: 4,
},
lockedText: {
    color: '#9E9E9E',
},
lessonDescription: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    lineHeight: 20,
},
durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
},
duration: {
    fontSize: 12,
    color: '#757575',
    marginLeft: 4,
},
});

export default LessonsList;