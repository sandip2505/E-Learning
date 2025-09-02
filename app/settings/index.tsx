import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Appearance,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const SettingsScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(Appearance.getColorScheme() === 'dark');
  const [downloadOverWifi, setDownloadOverWifi] = useState(true);
  const [biometricAuth, setBiometricAuth] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { 
          text: 'Cancel', 
          style: 'cancel',
          onPress: () => console.log('Cancel Pressed')
        },
        { 
          text: 'Logout', 
          style: 'destructive', 
          onPress: () => router.replace('/(auth)/login') 
        },
      ]
    );
  };

  const handleDarkModeToggle = (value: boolean) => {
    setDarkMode(value);
    // Here you would typically implement your theme switching logic
    console.log('Dark mode toggled:', value);
  };

  const SettingItem = ({
    icon,
    title,
    subtitle,
    onPress,
    rightComponent,
    isLast = false
  }: {
    icon: string;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    rightComponent?: React.ReactNode;
    isLast?: boolean;
  }) => (
    <TouchableOpacity 
      style={[styles.settingItem, isLast && styles.settingItemLast]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <Ionicons name={icon as any} size={22} color="#007AFF" />
        </View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>
      {rightComponent || <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      
      <View style={styles.container}>
        <Stack.Screen options={{ headerShown: false }} />

        <View style={styles.customHeader}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.customHeaderTitle}>Settings</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView 
          style={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#fff" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>John Doe</Text>
              <Text style={styles.profileEmail}>john.doe@example.com</Text>
            </View>
            <TouchableOpacity 
              style={styles.editProfileButton}
              onPress={() => router.push('/profile')}
            >
              <Ionicons name="create-outline" size={18} color="#007AFF" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            <SettingItem
              icon="person-outline"
              title="Profile"
              subtitle="Manage your profile information"
              onPress={() => router.push('/profile')}
            />
            <SettingItem
              icon="card-outline"
              title="Subscription"
              subtitle="Premium Plan · Active"
              onPress={() => router.push('/subscription')}
            />
            <SettingItem
              icon="key-outline"
              title="Security"
              subtitle="Password & 2FA"
              onPress={() => router.push('/security')}
              isLast={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            <SettingItem
              icon="notifications-outline"
              title="Push Notifications"
              subtitle="Receive course updates and reminders"
              rightComponent={
                <Switch
                  value={notifications}
                  onValueChange={setNotifications}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor={notifications ? '#fff' : '#f4f3f4'}
                />
              }
            />
            <SettingItem
              icon="moon-outline"
              title="Dark Mode"
              subtitle="Switch to dark theme"
              rightComponent={
                <Switch
                  value={darkMode}
                  onValueChange={handleDarkModeToggle}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor={darkMode ? '#fff' : '#f4f3f4'}
                />
              }
            />
            <SettingItem
              icon="wifi-outline"
              title="Download over Wi-Fi only"
              subtitle="Save mobile data"
              rightComponent={
                <Switch
                  value={downloadOverWifi}
                  onValueChange={setDownloadOverWifi}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor={downloadOverWifi ? '#fff' : '#f4f3f4'}
                />
              }
            />
            <SettingItem
              icon="finger-print-outline"
              title="Biometric Authentication"
              subtitle="Use fingerprint or face ID"
              rightComponent={
                <Switch
                  value={biometricAuth}
                  onValueChange={setBiometricAuth}
                  trackColor={{ false: '#E5E5EA', true: '#007AFF' }}
                  thumbColor={biometricAuth ? '#fff' : '#f4f3f4'}
                />
              }
              isLast={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learning</Text>
            <SettingItem
              icon="download-outline"
              title="Downloads"
              subtitle="Manage offline content"
              onPress={() => router.push('/downloads')}
            />
            <SettingItem
              icon="language-outline"
              title="Language"
              subtitle="English"
              onPress={() => router.push('/language')}
            />
            <SettingItem
              icon="play-outline"
              title="Video Quality"
              subtitle="Auto (HD recommended)"
              onPress={() => router.push('/video-quality')}
            />
            <SettingItem
              icon="time-outline"
              title="Playback Speed"
              subtitle="1.0x Normal"
              onPress={() => router.push('/playback-speed')}
              isLast={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            <SettingItem
              icon="help-circle-outline"
              title="Help Center"
              onPress={() => router.push('/help')}
            />
            <SettingItem
              icon="chatbubble-outline"
              title="Contact Support"
              onPress={() => router.push('/contact')}
            />
            <SettingItem
              icon="star-outline"
              title="Rate App"
              onPress={() => router.push('/rate')}
            />
            <SettingItem
              icon="share-outline"
              title="Share App"
              onPress={() => console.log('Share app')}
              isLast={true}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Legal</Text>
            <SettingItem
              icon="document-text-outline"
              title="Terms of Service"
              onPress={() => router.push('/terms')}
            />
            <SettingItem
              icon="shield-outline"
              title="Privacy Policy"
              onPress={() => router.push('/privacy')}
            />
            <SettingItem
              icon="information-circle-outline"
              title="About"
              subtitle="App version and information"
              onPress={() => router.push('/about')}
              isLast={true}
            />
          </View>

          <TouchableOpacity 
            style={styles.logoutButton} 
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.versionText}>Version 1.2.5 (Build 1025)</Text>
            <Text style={styles.copyrightText}>© 2023 LearnApp Inc.</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#007AFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
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
  scrollContent: {
    flex: 1,
  },
  profileSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    margin: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#8E8E93',
  },
  editProfileButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  settingItemLast: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2.22,
    elevation: 3,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  versionText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  copyrightText: {
    fontSize: 12,
    color: '#C7C7CC',
  },
});

export default SettingsScreen;