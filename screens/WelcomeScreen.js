import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Alert, Text, Image, TextInput, Pressable, StyleSheet, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { validateEmail } from '../utils/index';

import { COLORS, FONTS, SIZES } from '../utils/theme';


const WelcomeScreen = ({ navigation }) => {

  const [validEmail, setValidEmail] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  //ref
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const phoneNumberRef = useRef();
  const passwordRef = useRef();


  const handleLogin = async () => {
    try {
      if (firstName.length == 0 || lastName.length == 0 || email.length == 0 || phoneNumber.length == 0 || password.length == 0) {
        Alert.alert("Dear user",
          "Please fill in all the fields",
          [
            {
              text: "Ok",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
          ],
        );
        return;
      } else {
        console.log("All fields are filled", firstName, lastName, email, phoneNumber, password);
        await AsyncStorage.setItem('alreadyLaunched', 'true');
        await AsyncStorage.setItem('firstName', firstName);
        await AsyncStorage.setItem('lastName', lastName);
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('phoneNumber', phoneNumber);
        navigation.replace('Home');
      }



    }
    catch (error) {
      console.log(error);
    }

  }




  // Add welcome screen code here.
  return (
    <ScrollView style={styles.container}>
      <View style={styles.Header}>
        <Image source={require('../assets/Logo.png')} style={styles.logo} />
      </View>

      <View style={styles.heroSection}>
        <View>
          <Text style={styles.title}>Little Lemon</Text>
          <Text style={styles.location}>Chicago</Text>
        </View>

        <View style={styles.imageAndTextContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
          </View>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/hero-image.png')} style={styles.image} />
          </View>
        </View>

      </View>

      <View style={styles.contentContainer}>
        <View style={styles.textInputContainer}>
          <Text style={styles.text}>First Name *</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your first name"
            autoCorrect={false}
            importantForAutofill='no'
            placeholderTextColor="grey"
            onChangeText={(text) => {
              console.log(text);
              setFirstName(text);
            }}
            onSubmitEditing={() => lastNameRef.current.focus()}
            ref={firstNameRef}
            value={firstName}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Last Name *</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your last name"
            autoCorrect={false}
            placeholderTextColor="grey"
            importantForAutofill='no'
            onChangeText={(text) => { setLastName(text); }}
            onSubmitEditing={() => emailRef.current.focus()}
            ref={lastNameRef}
            value={lastName}
          />
        </View>


        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Email *</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter  your email address"
            autoCorrect={false}
            placeholderTextColor="grey"
            importantForAutofill='no'
            keyboardType='email-address'
            onChangeText={(text) => {
              setEmail(text);
              if (validateEmail(text)) {
                setValidEmail(true);
              }
              else {
                setValidEmail(false);
              }
            }}
            onSubmitEditing={() => phoneNumberRef.current.focus()}
            ref={emailRef}
            value={email}
          />
        </View>


        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Phone</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your phone number"
            autoCorrect={false}
            placeholderTextColor="grey"
            importantForAutofill='no'

            keyboardType='number-pad'
            onChangeText={(text) => setPhoneNumber(text)}
            onSubmitEditing={() => passwordRef.current.focus()}
            ref={phoneNumberRef}
          />
        </View>

        <View style={styles.textInputContainer}>
          <Text style={styles.text}>Password *</Text>
          <TextInput style={styles.textInput}
            placeholder="Enter your phone number"
            autoCorrect={false}
            placeholderTextColor="grey"
            importantForAutofill='no'
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => passwordRef.current.blur()}
            ref={passwordRef}
            value={password}
          />
        </View>
      </View>

      <Pressable style={styles.button(firstName.length == 0 || lastName.length == 0 || email.length == 0 || phoneNumber.length == 0 || password.length == 0 || validEmail == false ? false : true)}
        onPress={() => handleLogin()}      >
        <Text style={styles.buttonText}>Next</Text>
      </Pressable>

    </ScrollView>
  )
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Header: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
  },
  heroSection: {
    backgroundColor: '#495E57',
    width: '100%',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  title: {
    fontSize: SIZES.huge,
    color: COLORS.yellow,
    fontFamily: FONTS.heroHeading,
    marginHorizontal: 10,
  },
  location: {
    fontFamily: FONTS.heroSubHeading,
    fontSize: SIZES.extraLarge,
    marginHorizontal: 10,
    color: COLORS.white,
    marginTop: -20,
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
  },
  textContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    fontSize: SIZES.medium - 2,
    color: COLORS.white,
    fontFamily: FONTS.heroText,
    textAlign: 'left',
  },

  imageContainer: {
    width: '40%',
    justifyContent: 'center',
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: 'contain',

  },

  contentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textInputContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginVertical: 10,
  },
  text: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.heroText,
    color: COLORS.darkGreen,
    textAlign: 'left',
    marginBottom: 5,
  },
  textInput: {
    width: '100%',
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.grey,
    paddingHorizontal: 10,
    fontSize: SIZES.medium,
    fontFamily: FONTS.paragraph,
    color: COLORS.darkGreen,
  },


  button: (isValid) => ({
    marginVertical: 20,
    alignSelf: 'center',
    backgroundColor: isValid ? '#FFD700' : 'grey',
    borderRadius: 10,
    width: "80%",
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0
  }),
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

});




export default WelcomeScreen;
