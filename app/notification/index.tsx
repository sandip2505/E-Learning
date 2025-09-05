import { Ionicons } from '@expo/vector-icons';
import { router, Stack } from 'expo-router';
import React, { useState } from 'react';

import {
    FlatList,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface Notification {
    id: string;
    title: string;
    message: string;
    type: 'course' | 'assignment' | 'announcement' | 'achievement';
    timestamp: Date;
    isRead: boolean;
}

const NotificationScreen = () => {
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            id: '1',
            title: 'New Course Available',
            message: 'Advanced React Native Development course is now available',
            type: 'course',
            timestamp: new Date(Date.now() - 1000 * 60 * 30),
            isRead: false,
        },
        {
            id: '2',
            title: 'Assignment Due Soon',
            message: 'JavaScript Fundamentals assignment due in 2 days',
            type: 'assignment',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
            isRead: false,
        },
        {
            id: '3',
            title: 'Course Completed',
            message: 'Congratulations! You completed Web Development Basics',
            type: 'achievement',
            timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
            isRead: true,
        },
    ]);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'course': return 'book-outline';
            case 'assignment': return 'document-text-outline';
            case 'announcement': return 'megaphone-outline';
            case 'achievement': return 'trophy-outline';
            default: return 'notifications-outline';
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'course': return '#4A90E2';
            case 'assignment': return '#F5A623';
            case 'announcement': return '#7ED321';
            case 'achievement': return '#9013FE';
            default: return '#6C7B7F';
        }
    };

    const formatTime = (timestamp: Date) => {
        const now = new Date();
        const diff = now.getTime() - timestamp.getTime();
        const minutes = Math.floor(diff / (1000 * 60));
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const markAsRead = (id: string) => {
        setNotifications(prev =>
            prev.map(notif => notif.id === id ? { ...notif, isRead: true } : notif)
        );
    };

    const renderNotification = ({ item }: { item: Notification }) => (
        <TouchableOpacity
            style={[styles.notificationItem, !item.isRead && styles.unreadNotification]}
            onPress={() => markAsRead(item.id)}
        >
            <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) }]}>
                <Ionicons
                    name={getNotificationIcon(item.type) as any}
                    size={24}
                    color="#FFFFFF"
                />
            </View>
            <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.timestamp}>{formatTime(item.timestamp)}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
                {!item.isRead && <View style={styles.unreadDot} />}
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
                <Text style={styles.customHeaderTitle}>Notifications</Text>
                <View style={styles.headerSpacer} />
            </View>

            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={renderNotification}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '600',
        color: '#1A1A1A',
    },
    listContainer: {
        padding: 16,
    },
    notificationItem: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    unreadNotification: {
        borderLeftWidth: 4,
        borderLeftColor: '#4A90E2',
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contentContainer: {
        flex: 1,
        position: 'relative',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        flex: 1,
        marginRight: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#6C7B7F',
    },
    message: {
        fontSize: 14,
        color: '#4A4A4A',
        lineHeight: 20,
    },
    unreadDot: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4A90E2',
    },
});

export default NotificationScreen;