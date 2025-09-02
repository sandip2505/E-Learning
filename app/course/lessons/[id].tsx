import { Ionicons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { WebView } from 'react-native-webview';


const { width, height } = Dimensions.get('window');

interface LessonData {
id: string;
title: string;
description: string;
videoUrl?: string;
pdfUrl?: string;
notes: string;
duration: string;
}

export default function LessonPlayer() {
const { lessonId } = useLocalSearchParams();
const [activeTab, setActiveTab] = useState<'video' | 'pdf' | 'notes'>('video');
const [isPlaying, setIsPlaying] = useState(false);
const videoRef = useRef<Video>(null);

// Mock lesson data - replace with actual API call
const lessonData: LessonData = {
    id: lessonId as string,
    title: 'Introduction to React Native',
    description: 'Learn the fundamentals of React Native development',
    videoUrl: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    pdfUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    notes: `
# Lesson Notes

## Key Concepts
- React Native basics
- Component structure
- State management
- Navigation patterns

## Important Points
1. React Native uses native components
2. JavaScript bridge for communication
3. Hot reloading for faster development
4. Cross-platform compatibility

## Code Examples
\`\`\`javascript

const App = () => {
return (
    <View>
        <Text>Hello World!</Text>
    </View>
);
};
\`\`\`

## Resources
- Official documentation
- Community tutorials
- Best practices guide
    `,
    duration: '15:30',
};

const handleVideoPlayback = async () => {
    if (isPlaying) {
        await videoRef.current?.pauseAsync();
    } else {
        await videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
};

const renderContent = () => {
    switch (activeTab) {
        case 'video':
            return (
                <View style={styles.videoContainer}>
                    <Video
                        ref={videoRef}
                        style={styles.video}
                        source={{ uri: lessonData.videoUrl || '' }}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping={false}
                        onPlaybackStatusUpdate={(status) => {
                            if (status.isLoaded) {
                                setIsPlaying(status.isPlaying || false);
                            }
                        }}
                    />
                </View>
            );
        
        case 'pdf':
            return (
                <View style={styles.pdfContainer}>
                    {lessonData.pdfUrl ? (
                        <WebView
                            source={{ uri: `https://docs.google.com/gview?embedded=true&url=${lessonData.pdfUrl}` }}
                            style={styles.webview}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    ) : (
                        <View style={styles.emptyState}>
                            <Ionicons name="document-outline" size={48} color="#ccc" />
                            <Text style={styles.emptyText}>No PDF available</Text>
                        </View>
                    )}
                </View>
            );
        
        case 'notes':
            return (
                <ScrollView style={styles.notesContainer} showsVerticalScrollIndicator={false}>
                    <Text style={styles.notesText}>{lessonData.notes}</Text>
                </ScrollView>
            );
        
        default:
            return null;
    }
};

return (
    <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#1a1a1a" />
        
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <View style={styles.headerContent}>
                <Text style={styles.headerTitle} numberOfLines={1}>
                    {lessonData.title}
                </Text>
                <Text style={styles.headerSubtitle}>{lessonData.duration}</Text>
            </View>
        </View>

        {/* Content */}
        <View style={styles.content}>
            {renderContent()}
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[styles.tab, activeTab === 'video' && styles.activeTab]}
                onPress={() => setActiveTab('video')}
            >
                <Ionicons 
                    name="play-circle-outline" 
                    size={20} 
                    color={activeTab === 'video' ? '#007AFF' : '#666'} 
                />
                <Text style={[styles.tabText, activeTab === 'video' && styles.activeTabText]}>
                    Video
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'pdf' && styles.activeTab]}
                onPress={() => setActiveTab('pdf')}
            >
                <Ionicons 
                    name="document-text-outline" 
                    size={20} 
                    color={activeTab === 'pdf' ? '#007AFF' : '#666'} 
                />
                <Text style={[styles.tabText, activeTab === 'pdf' && styles.activeTabText]}>
                    PDF
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.tab, activeTab === 'notes' && styles.activeTab]}
                onPress={() => setActiveTab('notes')}
            >
                <Ionicons 
                    name="clipboard-outline" 
                    size={20} 
                    color={activeTab === 'notes' ? '#007AFF' : '#666'} 
                />
                <Text style={[styles.tabText, activeTab === 'notes' && styles.activeTabText]}>
                    Notes
                </Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#000',
},
header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
},
backButton: {
    marginRight: 12,
},
headerContent: {
    flex: 1,
},
headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 2,
},
headerSubtitle: {
    fontSize: 14,
    color: '#888',
},
content: {
    flex: 1,
    backgroundColor: '#111',
},
videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
video: {
    width: width,
    height: width * 9 / 16, // 16:9 aspect ratio
},
pdfContainer: {
    flex: 1,
},
webview: {
    flex: 1,
    backgroundColor: '#fff',
},
notesContainer: {
    flex: 1,
    padding: 20,
},
notesText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    fontFamily: 'monospace',
},
emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},
emptyText: {
    fontSize: 16,
    color: '#ccc',
    marginTop: 12,
},
tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
},
tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
},
activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#007AFF',
},
tabText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
},
activeTabText: {
    color: '#007AFF',
},
});