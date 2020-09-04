import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Card, Icon, Input, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

const Login = (props) => {

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
                    color='#512DA8'
                    />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60 
    }
});

export default Login;