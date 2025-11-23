import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
    import { SafeAreaProvider } from 'react-native-safe-area-context';
type RootStackParamList = {
  Home: undefined;
  Scan: undefined;
  Profile: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: Props) {
  const handleCameraPress = () => {
    navigation.navigate('Scan');
  };

  return (
            <SafeAreaProvider>

    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Food Expose</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeIcon}>🍔</Text>
          <Text style={styles.welcomeTitle}>Welcome to Food Expose</Text>
          <Text style={styles.welcomeText}>
            Scan product barcodes to discover nutritional information instantly
          </Text>
        </View>

        {/* Camera Button */}
        <TouchableOpacity
          style={styles.cameraButton}
          onPress={handleCameraPress}
          activeOpacity={0.8}
        >
          <Text style={styles.cameraIcon}>📷</Text>
          <Text style={styles.cameraButtonText}>Start Scanning</Text>
        </TouchableOpacity>

        {/* Info Grid */}
        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>📊</Text>
            <Text style={styles.infoTitle}>Nutrition</Text>
            <Text style={styles.infoText}>Get complete nutritional data</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>⚡</Text>
            <Text style={styles.infoTitle}>Instant</Text>
            <Text style={styles.infoText}>Results in seconds</Text>
          </View>
        </View>

        <View style={styles.infoGrid}>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>🔍</Text>
            <Text style={styles.infoTitle}>Accurate</Text>
            <Text style={styles.infoText}>Powered by open food facts</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoIcon}>💾</Text>
            <Text style={styles.infoTitle}>Track</Text>
            <Text style={styles.infoText}>Keep your scan history</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Point your camera at any barcode to get started</Text>
      </View>
    </View>
            </SafeAreaProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeCard: {
    backgroundColor: '#1A1A1A',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#333',
  },
  welcomeIcon: {
    fontSize: 56,
    marginBottom: 16,
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
  },
  cameraButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 32,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  cameraIcon: {
    fontSize: 24,
  },
  cameraButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 12,
  },
  infoBox: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  infoIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    lineHeight: 14,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
});