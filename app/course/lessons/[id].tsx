import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Dimensions,
    Platform,
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
    const [isLoading, setIsLoading] = useState(false);

 // Mock lesson data - replace with actual API call
const lessonData: LessonData = {
  id: lessonId as string,
  title: "Introduction to React Native",
  description: "Learn the fundamentals of React Native development",
  videoUrl:
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  pdfUrl:
    "https://www.adobe.com/support/products/enterprise/knowledgecenter/media/c4611_sample_explain.pdf",
  notes: `# Lesson Notes

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

---

## Additional Notes
- React Native apps can access device APIs (camera, GPS, etc.)
- Expo provides an easy development workflow
- Use FlatList instead of ScrollView for long lists
- Always test on both Android and iOS

## Common Pitfalls
- Forgetting to wrap content in a SafeAreaView on iOS
- Not optimizing images (causes app size to increase)
- Mixing inline styles and StyleSheet (leads to messy code)
- Not handling different screen sizes properly

## Practice Task
- Create a simple Todo app with React Native
- Add navigation between "Home" and "Details" screens
- Store tasks in local state
- Bonus: Try integrating AsyncStorage for persistence
`,
  duration: "15:30",
};


    // Initialize video player
    const player = useVideoPlayer(lessonData.videoUrl || '', (player) => {
        player.loop = false;
        player.play();
    });

    useEffect(() => {
        return () => {
            player?.release();
        };
    }, [player]);

    const renderContent = () => {
        switch (activeTab) {
            case 'video':
                return (
                    <View style={styles.videoContainer}>
                        <View style={styles.videoWrapper}>
                            <VideoView
                                style={styles.video}
                                player={player}
                                allowsFullscreen
                                allowsPictureInPicture
                                contentFit="contain"
                            />
                            <LinearGradient
                                colors={['rgba(0,0,0,0.3)', 'transparent']}
                                style={styles.videoOverlay}
                                pointerEvents="none"
                            />
                        </View>
                        <View style={styles.videoInfo}>
                            <Text style={styles.videoTitle}>{lessonData.title}</Text>
                            <Text style={styles.videoDescription}>{lessonData.description}</Text>
                            <View style={styles.videoDuration}>
                                <Ionicons name="time-outline" size={16} color="#888" />
                                <Text style={styles.durationText}>{lessonData.duration}</Text>
                            </View>
                        </View>
                    </View>
                );

            case 'pdf':
                return (
                    <View style={styles.pdfContainer}>
                        {lessonData.pdfUrl ? (
                            <>
                                {isLoading && (
                                    <View style={styles.loadingContainer}>
                                        <ActivityIndicator size="large" color="#007AFF" />
                                        <Text style={styles.loadingText}>Loading PDF...</Text>
                                    </View>
                                )}
                                <WebView
                                    source={{ uri: `https://docs.google.com/gview?embedded=true&url=${lessonData.pdfUrl}` }}
                                    style={[styles.webview, isLoading && { opacity: 0 }]}
                                    javaScriptEnabled={true}
                                    domStorageEnabled={true}
                                    onLoadStart={() => setIsLoading(true)}
                                    onLoadEnd={() => setIsLoading(false)}
                                    onError={() => setIsLoading(false)}
                                />
                            </>
                        ) : (
                            <View style={styles.emptyState}>
                                <View style={styles.emptyIconContainer}>
                                    <Ionicons name="document-outline" size={64} color="#444" />
                                </View>
                                <Text style={styles.emptyTitle}>No PDF Available</Text>
                                <Text style={styles.emptySubtitle}>
                                    PDF content will be available once uploaded
                                </Text>
                            </View>
                        )}
                    </View>
                );

            case 'notes':
                return (
                    <ScrollView 
                        style={styles.notesContainer} 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.notesContent}
                    >
                        <View style={styles.notesHeader}>
                            <Ionicons name="clipboard" size={24} color="#007AFF" />
                            <Text style={styles.notesHeaderTitle}>Lesson Notes</Text>
                        </View>
                        <View style={styles.notesCard}>
                            <Text style={styles.notesText}>{lessonData.notes}</Text>
                        </View>
                    </ScrollView>
                );

            default:
                return null;
        }
    };

    const TabButton = ({ 
        icon, 
        label, 
        tabKey, 
        isActive 
    }: { 
        icon: string; 
        label: string; 
        tabKey: 'video' | 'pdf' | 'notes'; 
        isActive: boolean;
    }) => (
        <TouchableOpacity
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => setActiveTab(tabKey)}
            activeOpacity={0.7}
        >
            <View style={[styles.tabIconContainer, isActive && styles.activeTabIconContainer]}>
                <Ionicons
                    name={icon as any}
                    size={22}
                    color={isActive ? '#fff' : '#888'}
                />
            </View>
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.customHeader}>
                <TouchableOpacity 
                    onPress={() => router.back()}
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.customHeaderTitle}>{lessonData.title}</Text>
                <View style={styles.headerSpacer} />
            </View>
       
            {/* Content */}
            <View style={styles.content}>
                {renderContent()}
            </View>

            {/* Enhanced Tab Navigation */}
            <View style={styles.tabContainer}>
                <LinearGradient
                    colors={['rgba(26,26,26,0.95)', '#1a1a1a']}
                    style={styles.tabGradient}
                >
                    <View style={styles.tabWrapper}>
                        <TabButton
                            icon="play-circle"
                            label="Video"
                            tabKey="video"
                            isActive={activeTab === 'video'}
                        />
                        <TabButton
                            icon="document-text"
                            label="PDF"
                            tabKey="pdf"
                            isActive={activeTab === 'pdf'}
                        />
                        <TabButton
                            icon="clipboard"
                            label="Notes"
                            tabKey="notes"
                            isActive={activeTab === 'notes'}
                        />
                    </View>
                </LinearGradient>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
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
    content: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    videoContainer: {
        flex: 1,
    },
    videoWrapper: {
        position: 'relative',
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        height: width * 9 / 16, // 16:9 aspect ratio
    },
    video: {
        width: width,
        height: width * 9 / 16,
    },
    videoOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
    },
    videoInfo: {
        padding: 20,
        backgroundColor: '#111',
    },
    videoTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 8,
    },
    videoDescription: {
        fontSize: 16,
        color: '#ccc',
        lineHeight: 24,
        marginBottom: 12,
    },
    videoDuration: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    durationText: {
        fontSize: 14,
        color: '#888',
        marginLeft: 6,
        fontWeight: '500',
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    webview: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        zIndex: 1000,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 12,
        fontWeight: '500',
    },
    notesContainer: {
        flex: 1,
        backgroundColor: '#0a0a0a',
    },
    notesContent: {
        padding: 20,
    },
    notesHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#222',
    },
    notesHeaderTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginLeft: 12,
    },
    notesCard: {
        backgroundColor: '#111',
        borderRadius: 12,
        padding: 20,
        borderWidth: 1,
        borderColor: '#222',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    notesText: {
        fontSize: 16,
        lineHeight: 26,
        color: '#e0e0e0',
        fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyIconContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#1a1a1a',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#333',
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 8,
    },
    emptySubtitle: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
        lineHeight: 24,
    },
    tabContainer: {
        borderTopWidth: 1,
        borderTopColor: '#333',
    },
    tabGradient: {
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
    },
    tabWrapper: {
        flexDirection: 'row',
        paddingTop: 8,
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
    },
    activeTab: {
        borderTopWidth: 3,
        borderTopColor: '#007AFF',
    },
    tabIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
    },
    activeTabIconContainer: {
        backgroundColor: '#007AFF',
    },
    tabText: {
        fontSize: 12,
        color: '#888',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    activeTabText: {
        color: '#007AFF',
    },
});