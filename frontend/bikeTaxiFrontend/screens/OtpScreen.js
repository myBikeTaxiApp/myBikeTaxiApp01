import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Import useRoute and useNavigation

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']); 
  const route = useRoute();
  const navigation = useNavigation(); // Initialize navigation
  const phoneNumber = route.params?.phoneNumber || ''; // Get phone number

  const handleChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);
    if (text && index < 3) inputs[index + 1]?.focus();
  };

  const handleNext = () => {
    // Navigate to EnableLocation screen after OTP verification
    navigation.navigate('EnableLocation');
  };
  
  

  const inputs = [];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>Code sent to:</Text>

      {/* Display Phone Number with +91 */}
      <Text style={styles.phoneNumber}>
        <Text>+91 </Text>
        <Text>{phoneNumber}</Text>
      </Text>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            ref={(input) => (inputs[index] = input)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next →</Text>
      </TouchableOpacity>

      <Text style={styles.termsText}>
        By clicking <Text style={styles.boldText}>"Next"</Text> you agree to the{' '}
        <Text style={styles.linkText}>Privacy Policy</Text> and{' '}
        <Text style={styles.linkText}>T&S</Text>.
      </Text>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 10,
  },
  phoneNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    fontSize: 18,
    color: '#374151',
  },
  nextButton: {
    backgroundColor: '#FFA500',
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  termsText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#6B7280',
  },
  boldText: {
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default OtpScreen;
