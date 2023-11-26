import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import React, {useState} from 'react';
import {useLogin} from '../Providers/LoginProvider';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Card, Icon, Input, Text} from '@ui-kitten/components';

const Login = () => {
  const {login} = useLogin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onSubmit = () => login(email, password);

  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text category="h4">Login</Text>
      </View>
    );
  };

  const renderIcon = (props): React.ReactElement => (
    <Pressable onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </Pressable>
  );

  const renderFooter = (props: ViewProps): React.ReactElement => (
    <View {...props} style={[props.style, styles.footerContainer]}>
      <Button style={styles.footerControl} size="medium" onPress={onSubmit}>
        ACCEPT
      </Button>
    </View>
  );

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <Card header={renderHeader} footer={renderFooter}>
          <Input
            label="Email"
            placeholder="email"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.divider} />
          <Input
            value={password}
            label="Password"
            placeholder="password"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
            onChangeText={setPassword}
          />
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    flex: 1,
  },
  container: {
    padding: 16,
  },
  headerContainer: {
    padding: 8,
  },
  divider: {
    marginTop: 16,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  footerControl: {
    marginHorizontal: 2,
  },
});
