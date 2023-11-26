import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {useLogin} from '../Providers/LoginProvider';
import DBService from '../Utils/dbService';

const Login = () => {
  const {login} = useLogin();
  const [email, setEmail] = useState('user1@gmail.com');
  const [password, setPassword] = useState('retailpulse');

  // const db = new DBService();

  const onSubmit = () => login(email, password);

  return (
    <View>
      <Text>Login</Text>
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" />
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />
      <Pressable onPress={onSubmit}>
        <Text>Login</Text>
      </Pressable>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
