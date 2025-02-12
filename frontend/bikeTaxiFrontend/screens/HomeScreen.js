import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  Animated,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('🇮🇳');
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (selectedCountry === '+91') setFlag('🇮🇳');
    else if (selectedCountry === '+1') setFlag('🇺🇸');
    else if (selectedCountry === '+38') setFlag('🇺🇦');
  }, [selectedCountry]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.5,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Animated.View style={[styles.halfCircle, { opacity: blinkAnim }]} />
      <View style={styles.logoContainer}>
        <Image source={{ uri: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgB6o6OL5Bl9QAGQJzbyFnnBX8ywkx2sznicst6vMXuo2sQrYRPeOpceVVk_jrWdOL5FbkXp-kpDsNwOM3XTvUhGPSY9ilxUAs3NR3yAuMldq-TmhpRrIBxBV69S7owDduJtk0qXuy-m5S0QXCAfecvDDp4Heg2mFfPVBkb_ajONwSgVpIbTQdEo9M248o/w540-h540/vgologoo...png' }} style={styles.logo} />
      </View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Get started!</Text>
      </View>
      
      <View style={styles.sectionSpacing} />
      <Text style={styles.inputLabel}>Please enter your Name</Text>
      <TextInput
        style={styles.nameInput}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      <View style={styles.sectionSpacing} />
      <Text style={styles.inputLabelSmall}>Please enter your Mobile Number</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.flagText}>{flag}</Text>
        <Text style={styles.countryCodeText}>{selectedCountry}</Text>
        <TextInput
          key={isPhoneFocused ? 'focused' : 'unfocused'}  // Force re-render
          style={styles.phoneNumberInput}
          value={isPhoneFocused ? phoneNumber : ''}
          placeholder="0000000000"
          keyboardType="phone-pad"
          onFocus={() => {
            setIsPhoneFocused(true);
            setPhoneNumber('');
          }}
          onBlur={() => {
            setIsPhoneFocused(phoneNumber.length > 0);
          }}
          onChangeText={(value) => setPhoneNumber(value.replace(/\D/g, '').slice(0, 10))}
          placeholderTextColor="#D1D1D1"
        />
      </View>

      <View style={styles.sectionSpacing} />
      <TouchableOpacity
  style={styles.nextButton}
  onPress={() => navigation.navigate('OtpScreen', { phoneNumber })} // Pass phoneNumber as a parameter
>
  <Text style={styles.nextButtonText}>Next →</Text>
</TouchableOpacity>


      <Text style={styles.termsText}>
        <Text style={{ fontSize: 8 }}>By clicking "Next" you agree to the</Text>
        <Text style={styles.linkTextBlue}> Privacy Policy </Text>
        <Text style={{ fontSize: 8 }}>and</Text>
        <Text style={styles.linkTextBlue}> T&S</Text>
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  halfCircle: {
    position: 'absolute',
    top: -150,
    left: -150,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFA500',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionSpacing: {
    height: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  nameInput: {
    height: 45,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    marginBottom: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    width: '90%',
    alignSelf: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 6,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  flagText: {
    fontSize: 20,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: 16,
    height: 45,
    paddingHorizontal: 5,
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#FFA500',
    borderRadius: 6,
    paddingVertical: 15,
    alignItems: 'center',
    width: '95%',
    alignSelf: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  termsText: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 10,
    alignSelf: 'center',
    width: '90%',
  },
  linkTextBlue: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 8,
  },
});

export default HomeScreen;
