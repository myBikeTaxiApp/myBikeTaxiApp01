import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

const HomeScreen = ({ navigation }) => {
  const [selectedCountry, setSelectedCountry] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleNext = () => {
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      Alert.alert('Invalid Phone Number', 'Please enter a valid 10-digit phone number.');
      return;
    }
    navigation.navigate('Login'); // Navigate to the Login screen
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Get started!</Text>
          <Text style={styles.subHeaderText}>
            Please enter your mobile number to verify your account
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={selectedCountry}
              onValueChange={(itemValue) => setSelectedCountry(itemValue)}
              style={styles.picker}
              accessibilityLabel="Country Code Picker"
            >
              <Picker.Item label="🇺🇸 +1" value="+1" />
              <Picker.Item label="🇮🇳 +91" value="+91" />
              <Picker.Item label="🇺🇦 +38" value="+38" />
            </Picker>
          </View>
          <TextInput
            style={styles.phoneNumberInput}
            placeholder="123-456-7890"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            maxLength={10}
            accessibilityLabel="Phone Number Input"
          />
        </View>

        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
          accessibilityLabel="Next Button"
        >
          <Text style={styles.nextButtonText}>Next →</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By clicking "Next" you agree to the
          <Text style={styles.linkText}> privacy policy </Text>
          and
          <Text style={styles.linkText}> terms of service</Text>
        </Text>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 30,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555555',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 10,
  },
  pickerContainer: {
    width: 100,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  phoneNumberInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  nextButton: {
    backgroundColor: '#007BFF',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#555555',
    marginTop: 20,
  },
  linkText: {
    color: '#007BFF',
  },
});

export default HomeScreen;
