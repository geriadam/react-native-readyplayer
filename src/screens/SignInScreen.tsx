import React, { useState } from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import {styles} from './styles';
import {useAuth} from '../contexts/Auth';

export const SignInScreen = () => {
  const [loading, isLoading] = useState(false);
  const auth = useAuth();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors, isDirty, isValid},
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmitLogin = async (data: { email: string; password: string }) => {
    isLoading(true);
    await auth.signIn(data);
    isLoading(false);
  };

  return (
    <Background>
      <Logo />
      <Controller
        control={control}
        rules={{
          required: true,
          pattern:
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Email"
            returnKeyType="next"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            autoCapitalize="none"
            textContentType="emailAddress"
            keyboardType="email-address"
            defaultValue={value}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            label="Password"
            returnKeyType="done"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
        name="password"
      />
      <Button mode="contained" onPress={handleSubmit(onSubmitLogin)} disabled={!isDirty || !isValid}>
        {
          loading ? (
            <ActivityIndicator color={'#FFF'} animating={true} size="small" />
          ) : <Text>Sign In</Text>
        }
      </Button>
    </Background>
  );
};