import { View, Text, Pressable, ScrollView, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
    import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SafeAreaProvider style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        style={styles.container}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
          <Text style={styles.headerSubtitle}>Manage your account</Text>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <Text style={styles.profileIcon}>👤</Text>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john@example.com</Text>
        </View>

        {/* Settings Sections */}
        {/* <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Account</Text>

          <Pressable
            style={styles.settingItem}
            android_ripple={{ color: 'rgba(255, 107, 107, 0.2)' }}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔒</Text>
              <View>
                <Text style={styles.settingLabel}>Password</Text>
                <Text style={styles.settingValue}>Change password</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>

          <Pressable
            style={styles.settingItem}
            android_ripple={{ color: 'rgba(255, 107, 107, 0.2)' }}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🔔</Text>
              <View>
                <Text style={styles.settingLabel}>Notifications</Text>
                <Text style={styles.settingValue}>Manage alerts</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>

          <Pressable
            style={styles.settingItem}
            android_ripple={{ color: 'rgba(255, 107, 107, 0.2)' }}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>🌙</Text>
              <View>
                <Text style={styles.settingLabel}>Appearance</Text>
                <Text style={styles.settingValue}>Dark mode settings</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>
        </View> */}

        {/* Support Section */}
        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Support</Text>

          <Pressable
            style={styles.settingItem}
            android_ripple={{ color: 'rgba(255, 107, 107, 0.2)' }}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>❓</Text>
              <View>
                <Text style={styles.settingLabel}>Help & FAQ</Text>
                <Text style={styles.settingValue}>Get help</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>

          <Pressable
            style={styles.settingItem}
            android_ripple={{ color: 'rgba(255, 107, 107, 0.2)' }}
          >
            <View style={styles.settingLeft}>
              <Text style={styles.settingIcon}>📧</Text>
              <View>
                <Text style={styles.settingLabel}>Contact Us</Text>
                <Text style={styles.settingValue}>Send feedback</Text>
              </View>
            </View>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          android_ripple={{ color: 'rgba(255, 255, 255, 0.2)' }}
          style={styles.logoutButton}
        >
          <Text style={styles.logoutButtonText}>🚪 Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  container: {
    backgroundColor: '#0F0F0F',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999999',
  },
  profileCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#333333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 40,
    elevation: 10,
  },
  profileIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#999999',
  },
  settingsSection: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E0E0E0',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  settingItem: {
    backgroundColor: '#1A1A1A',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  settingIcon: {
    fontSize: 24,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 12,
    color: '#999999',
    marginTop: 4,
  },
  settingArrow: {
    fontSize: 20,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    elevation: 5,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});