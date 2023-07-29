import { StyleSheet, ScrollView, Text, TextInput, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { COLORS, FONTS, SIZES } from '../utils/theme'

const Profile = ({ navigation }) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [orderStatus, setOrderStatus] = useState('true');
    const [specialOffers, setSpecialOffers] = useState('true');
    const [newsletters, setNewsletters] = useState('true');


    const [originalData, setOriginalData] = useState([]);


    const getDetails = async () => {
        try {
            const firstName = await AsyncStorage.getItem('firstName');
            const lastName = await AsyncStorage.getItem('lastName');
            const email = await AsyncStorage.getItem('email');
            const phoneNumber = await AsyncStorage.getItem('phoneNumber');
            await AsyncStorage.getItem('orderStatus').then((value) => {
                if (value == null) {
                    AsyncStorage.setItem('orderStatus', orderStatus);
                } else {
                    setOrderStatus(value);
                }
            });
            await AsyncStorage.getItem('specialOffers').then((value) => {
                if (value == null) {
                    AsyncStorage.setItem('specialOffers', specialOffers);
                } else {
                    setSpecialOffers(value);
                }
            });
            await AsyncStorage.getItem('newsletters').then((value) => {
                if (value == null) {
                    AsyncStorage.setItem('newsletters', newsletters);
                } else {
                    setNewsletters(value);
                }
            });

            setFirstName(firstName);
            setLastName(lastName);
            setEmail(email);
            setPhoneNumber(phoneNumber);
            setOriginalData({ firstName, lastName, email, phoneNumber, orderStatus, specialOffers, newsletters });
            setIsLoaded(true);
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleSave = async () => {
        try {
            if (firstName.length == 0 || lastName.length == 0 || email.length == 0 || phoneNumber.length == 0) {
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
                console.log("All fields are filled", firstName, lastName, email, phoneNumber, orderStatus, specialOffers, newsletters);
                await AsyncStorage.setItem('firstName', firstName);
                await AsyncStorage.setItem('lastName', lastName);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('phoneNumber', phoneNumber);
                await AsyncStorage.setItem('orderStatus', orderStatus);
                await AsyncStorage.setItem('specialOffers', specialOffers);
                await AsyncStorage.setItem('newsletters', newsletters);
                setOriginalData({ firstName, lastName, email, phoneNumber, orderStatus, specialOffers, newsletters });
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleDiscard = async () => {
        try {
            setFirstName(originalData.firstName);
            setLastName(originalData.lastName);
            setEmail(originalData.email);
            setPhoneNumber(originalData.phoneNumber);
            setOrderStatus(originalData.orderStatus);
            setSpecialOffers(originalData.specialOffers);
            setNewsletters(originalData.newsletters);
        }
        catch (error) {
            console.log(error);
        }
    }


    const handleLogOut = async () => {
        try {
            await AsyncStorage.clear();
            navigation.replace('OnBoarding');
        }
        catch (error) {
            console.log(error);
        }
    }




    useEffect(() => {
        getDetails();
    }, [])


    if (!isLoaded) {
        return null;
    }


    return (
        <ScrollView style={styles.container}>
            <View style={styles.Header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backIconContainer}>
                    <Image source={require('../assets/back.png')} style={styles.backIcon} />
                </TouchableOpacity>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.profileImageContainer}>
                    <Image source={require('../assets/profile-pic.png')}
                        style={styles.profileImage} />
                </TouchableOpacity>
            </View>
            <View style={styles.bodySection}>
                <Text style={styles.sectionTitle}>Personal information</Text>
                <View style={styles.profileImageAndEditButtons}>
                    <Image source={require('../assets/profile-pic.png')}
                        style={styles.profileImageMain} />
                    <TouchableOpacity style={[styles.saveButton, { height: 45, width: "25%", marginHorizontal: 5 }]}>
                        <Text style={styles.saveButtonText}>Change</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.saveButtonDisabled, { height: 45, width: "25%", marginHorizontal: 5 }]}>
                        <Text style={[styles.saveButtonText, { color: COLORS.darkGreen }]}>Remove</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.inputLabel}>First Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={text => setFirstName(text)}
                    />
                </View>

                <Text style={styles.inputLabel}>Last Name</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={text => setLastName(text)}
                    />
                </View>

                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={text => setEmail(text)}
                    />

                </View>

                <Text style={styles.inputLabel}>Phone Number</Text>
                <View style={styles.inputContainer}>

                    <TextInput
                        style={styles.input}
                        value={phoneNumber}
                        onChangeText={text => setPhoneNumber(text)}
                    />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.sectionTitle}>Email Notifications</Text>
                    <TouchableOpacity style={styles.tickBoxContainer} onPress={() => {
                        if (orderStatus == 'true') {
                            setOrderStatus('false');
                        } else {
                            setOrderStatus('true');
                        }
                    }}>
                        {orderStatus === 'true' ? <Image source={require('../assets/tick.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            : <View style={styles.tickBox}></View>
                        }
                        <Text style={styles.tickBoxText}>Order Status</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.tickBoxContainer} onPress={() => {
                        if (specialOffers == 'true') {
                            setSpecialOffers('false');
                        } else {
                            setSpecialOffers('true');
                        }
                    }}>
                        {specialOffers === 'true' ? <Image source={require('../assets/tick.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            : <View style={styles.tickBox}></View>
                        }
                        <Text style={styles.tickBoxText}>Special Offers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tickBoxContainer} onPress={() => {
                        if (newsletters == 'true') {
                            setNewsletters('false');
                        } else {
                            setNewsletters('true');
                        }
                    }}>
                        {newsletters === 'true' ? <Image source={require('../assets/tick.png')} style={{ width: 20, height: 20, marginRight: 10 }} />
                            : <View style={styles.tickBox}></View>
                        }
                        <Text style={styles.tickBoxText}>Newsletters</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity style={styles.logOutButton} onPress={() => handleLogOut()}>
                    <Text style={styles.logOutButtonText}>Log out</Text>
                </TouchableOpacity>
            </View>

            {
                firstName !== originalData.firstName ||
                    lastName !== originalData.lastName ||
                    email !== originalData.email ||
                    phoneNumber !== originalData.phoneNumber ||
                    orderStatus !== originalData.orderStatus ||
                    specialOffers !== originalData.specialOffers ||
                    newsletters !== originalData.newsletters
                    ?
                    <View style={styles.buttonSection}>
                        <TouchableOpacity style={styles.saveButtonDisabled} onPress={() => handleDiscard()}>
                            <Text style={[styles.saveButtonText, { color: COLORS.darkGreen }]}>Discard Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.saveButton} onPress={() => handleSave()}>
                            <Text style={styles.saveButtonText}>Save Changes</Text>
                        </TouchableOpacity>
                    </View>
                    : null
            }


        </ScrollView >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    Header: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 20,
        borderColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        //   backgroundColor: COLORS.lightGreen,

    },
    backIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        tintColor: COLORS.darkGreen,
    },
    logo: {
        width: 150,
        height: 100,
        resizeMode: 'contain',
    },
    profileImageContainer: {
        width: 50,
        height: 50,
        borderRadius: 20,
        borderColor: COLORS.darkGreen,
        marginRight: 10,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 20,
        resizeMode: 'contain',
        marginRight: 10,
    },
    bodySection: {
        width: '100%',
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.sectionTitle,
        color: COLORS.darkGreen,
        marginBottom: 10,
    },
    profileImageAndEditButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 10,

    },
    profileImageMain: {
        width: 100,
        height: 100,
        borderRadius: 50,
        resizeMode: 'contain',
        marginRight: 10,
    },
    inputLabel: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONTS.cardTitle,
        color: COLORS.darkGreen,
        marginVertical: 5,
    },
    inputContainer: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: "#EDEFEE",
        borderRadius: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        marginBottom: 10,
    },
    input: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.paragraph,
        color: COLORS.black,
    },
    tickBoxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    tickBox: {
        width: 20,
        height: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.grey,
        marginRight: 10,
    },
    tickBoxText: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.paragraph,
        color: COLORS.darkGreen,

    },
    logOutButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.yellow,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    logOutButtonText: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.cardTitle,
        color: COLORS.black,
    },
    buttonSection: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    saveButton: {
        width: '40%',
        height: 50,
        backgroundColor: COLORS.darkGreen,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveButtonDisabled: {
        width: '40%',
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.darkGreen,
    },
    saveButtonText: {
        fontSize: SIZES.medium - 2,
        fontFamily: FONTS.cardTitle,
        color: COLORS.white,
    },

})