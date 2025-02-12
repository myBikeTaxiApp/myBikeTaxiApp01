import React from 'react'; 
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import * as Location from 'expo-location'; // Import location services
import { useNavigation } from '@react-navigation/native';

const EnableLocationScreen = () => {
  const navigation = useNavigation();

  const handleEnableLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('HomeScreenWithMap'); // Navigate after enabling location
    } else {
      alert('Location permission is required to continue.');
    }
  };

  const handleNotNow = () => {
    alert('Location services are required for full functionality.');
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://i.imgur.com/QcxNZiI.png',
        }}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>
        <Text style={styles.title}>Enable Location</Text>
        <Text style={styles.description}>
          To provide you with the best ride experience and ensure accurate
          pickups, we need access to your device's location.
        </Text>
        <TouchableOpacity
          style={styles.enableButton}
          onPress={handleEnableLocation}
        >
          <Text style={styles.enableButtonText}>Enable Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.notNowButton} onPress={handleNotNow}>
          <Text style={styles.notNowButtonText}>Not Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    width: width,
    height: height,
    position: 'absolute',
    opacity: 0.7,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 30,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    position: 'absolute',
    top: height * 0.35,
    width: width * 0.85,
  },
  iconContainer: {
    backgroundColor: '#E5F4FF',
    borderRadius: 50,
    padding: 20,
    marginBottom: 15,
  },
  icon: {
    fontSize: 30,
    color: '#FFA500',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 20,
  },
  enableButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  enableButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  notNowButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  notNowButtonText: {
    color: '#FFA500',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default EnableLocationScreen;
