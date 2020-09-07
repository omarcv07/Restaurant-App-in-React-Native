import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import { Icon, Input, CheckBox, Button } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { baseUrl } from '../shared/baseUrl';
import * as ImageManipulator from 'expo-image-manipulator'

const LoginTab = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    
    useEffect(() => {
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userinfo = JSON.parse(userdata);
                if (userinfo) {
                    setUsername(userinfo.username);
                    setPassword(userinfo.password);
                    setRemember(true);
                }
            })
    }, [])

    const handleLogin = () => {
        console.log(JSON.stringify(username, password, remember));
        if (remember === true) {
            SecureStore.setItemAsync(
                    'userinfo',
                    JSON.stringify({username: username, password: password })
                )
                .catch(error => console.log(`Could not save user info ${error}`));
        }
        else {
            SecureStore.deleteItemAsync('userinfo')
                .catch(error => console.log(`Could not save user info ${error}`));
        }
    }

    return (
        <ScrollView>
        <View style={styles.container}>
            <Input 
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                onChangeText={(username) => setUsername(username)}
                value={username}
                inputContainerStyle={styles.formInput}
                />
            <Input 
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'key' }}
                onChangeText={(password) => setPassword(password)}
                value={password}
                inputContainerStyle={styles.formInput}
                />
            <CheckBox
                title='Remember Me'
                center
                checked={remember}
                onPress={() => setRemember(!remember)}
                containerStyle={styles.formCheckbox}
                />
            <View style={styles.formButton}>
                <Button
                    onPress={() => handleLogin()}
                    title='Login'
                    icon={
                        <Icon 
                            name='sign-in' 
                            type='font-awesome' 
                            size={24}
                            color='white' 
                            /> 
                    }
                    buttonStyle={{ backgroundColor: '#512DA8' }}
                />
            </View>
            <View style={styles.formButton}>
                    <Button
                        onPress={() => props.navigation.navigate('Register')}
                        title='Register'
                        clear
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                size={24}
                                color='blue' 
                                /> 
                        }
                        titleStyle={{ color: 'blue' }}
                    />            
            </View>
        </View>
        </ScrollView>
    );
}

const RegisterTab = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [remember, setRemember] = useState(false);
    const [imageUrl, setImageUrl] = useState(baseUrl + 'images/logo.png')

    const getImageFromCamera = async () => {
        const cameraPermission = await Permissions.askAsync(Permissions.CAMERA);
        const cameraRollPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);

        if (cameraPermission.status === 'granted' && cameraRollPermission.status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });

            if (!capturedImage.cancelled) {
                processImage(capturedImage.uri)
            }
        }
    }

    const processImage = async (imageUri) => {
        let processedImage = await ImageManipulator.manipulateAsync(
            imageUri,
            [
                { resize: { width: 600 } }
            ],
            { format: 'png' }
        );
        setImageUrl(processedImage.uri)
    }

    const handleRegister = () => {
        console.log(JSON.stringify(`${username} \n ${password} \n ${firstname} \n ${lastname} \n ${email} \n ${remember} \n ${imageUrl}`));
        if (remember) {
            SecureStore.setItemAsync(
                    'userinfo',
                    JSON.stringify({username: username, password: password })
                )
                .catch(error => console.log(`Could not save user info ${error}`));
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image 
                        source={{ uri: imageUrl }}
                        loadingIndicatorSource={require('./images/logo.png')}
                        style={styles.image}
                        />
                    <Button
                        title='Camera'
                        onPress={getImageFromCamera}
                        />
                </View>
                <Input 
                    placeholder='Username'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='Password'
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='First Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(firstname) => setFirstname(firstname)}
                    value={firstname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='Last Name'
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(lastname) => setLastname(lastname)}
                    value={lastname}
                    inputContainerStyle={styles.formInput}
                    />
                <Input 
                    placeholder='Email'
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    inputContainerStyle={styles.formInput}
                    />
                <CheckBox
                    title='Remember Me'
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        icon={
                            <Icon 
                                name='user-plus' 
                                type='font-awesome' 
                                size={24}
                                color='white' 
                                /> 
                        }
                        buttonStyle={{ backgroundColor: '#512DA8' }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const Tab = createBottomTabNavigator()

const Login = () => {
    return (
        <Tab.Navigator
            initialRouteName='Login'
            tabBarOptions={{
                activeBackgroundColor: '#9575CD',
                inactiveBackgroundColor: '#D1C4E9',
                activeTintColor: '#ffffff',
                inactiveTintColor: 'gray'
            }}
            >
            <Tab.Screen
                name='Login'
                component={LoginTab}
                options={{
                    title: 'Login',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                            name='sign-in'
                            type='font-awesome'            
                            size={24}
                            iconStyle={{ color: tintColor }}
                        />
                        )
                }}
            />
            <Tab.Screen
                name='Register'
                component={RegisterTab}
                options={{
                    title: 'Register',
                    tabBarIcon:({ tintColor }) => (
                        <Icon
                            name='user-plus'
                            type='font-awesome'            
                            size={24}
                            iconStyle={{ color: tintColor }}
                        />
                        )
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },  
    image: {
        margin: 1,
        width: 80,
        height: 60
    },
    formInput: {
        margin: 20
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
        margin: 60 
    }
});

export default Login;