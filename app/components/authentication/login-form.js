'use strict';
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Button, Icon } from 'native-base';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import SpinKit from 'react-native-spinkit';
import { NavigationActions } from 'react-navigation';
import { generateAuthCookieSuccess } from '../../actions/actions-user';
import API, { DataStatus } from '../../services/API';
import I18n from '../../localizations/I18n';

const api = API.create();

const onSubmit = (values, dispatch) => {
  const { username, password } = values;
  console.log(values);
  return api
    .generateAuthCookie(username, password)
    .then(response => {
      if (response.data.status === DataStatus.OK) {
        alert('Login success');
        console.log(response);
        const { cookie, cookie_name, user } = response.data;
        dispatch(generateAuthCookieSuccess(cookie, cookie_name, user));
        setTimeout(() => dispatch(NavigationActions.back()), 400);
      } else if (response.data.status === DataStatus.ERROR) {
        console.log(response);
        throw new SubmissionError({ _error: 'Login failed!' });
      }
    })
    .catch(error => {
      console.log(error);
      throw new SubmissionError({ _error: 'Login failed!' });
    });
};

const usernameField = ({ input, placeholder, meta, ...inputProps }) => {
  const { invalid, touched } = meta;
  return (
    <View
      style={[
        styles.inputWrapper,
        invalid && touched ? styles.inputWrapperError : null,
      ]}
    >
      <Icon name="person" style={styles.icon} />
      <TextInput
        {...inputProps}
        name={'username'}
        onChangeText={input.onChange}
        value={input.value}
        onBlur={input.onBlur}
        autoCapitalize={'none'}
        selectionColor={'#ffefef'}
        placeholder={I18n.t('login_username_placeholder')}
        placeholderTextColor={[styles.placeholderTextColor]}
        underlineColorAndroid={'transparent'}
        style={styles.input}
      />
    </View>
  );
};

const passwordField = ({ input, placeholder, meta, ...inputProps }) => {
  const { invalid, touched } = meta;
  return (
    <View
      style={[
        styles.inputWrapper,
        invalid && touched ? styles.inputWrapperError : null,
      ]}
    >
      <Icon name="lock" style={styles.icon} />
      <TextInput
        {...inputProps}
        name={'password'}
        onChangeText={input.onChange}
        value={input.value}
        onBlur={input.onBlur}
        secureTextEntry
        placeholder={I18n.t('login_password_placeholder')}
        placeholderTextColor={[styles.placeholderTextColor]}
        underlineColorAndroid={'transparent'}
        style={styles.input}
      />
    </View>
  );
};

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
};

class LoginForm extends Component {
  static defaultProps = {
    isLoading: false,
  };

  render() {
    const { handleSubmit, submitting } = this.props;
    const loginLabel = (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon active name="ios-person" style={{ color: '#fff' }} />
        <Text style={{ color: '#fff' }}>
          {I18n.t('login_button_label')}
        </Text>
      </View>
    );

    return (
      <View style={[this.props.style, styles.formContainer]}>
        <Field name={'username'} component={usernameField} />
        <Field name={'password'} component={passwordField} />
        <Button
          block
          rounded
          bordered
          outline
          light
          title={''}
          onPress={handleSubmit(onSubmit)}
          disabled={submitting}
        >
          {submitting
            ? <SpinKit type="Wave" size={26} color={'#ffffff'} />
            : loginLabel}

        </Button>
        <Text
          style={{
            color: '#fff',
            fontSize: 12,
            textAlign: 'center',
            marginVertical: 16,
          }}
        >
          Wanna register? \N Shake the device or tap here
        </Text>
      </View>
    );
  }
}

const styles = {
  formContainer: {
    borderRadius: 10,
    borderWidth: 0,
    borderColor: '#fff',
    paddingTop: 26,
    paddingBottom: 18,
    marginHorizontal: 26,
    marginTop: 50,
    padding: 12,
    alignSelf: 'stretch',
  },
  inputWrapper: {
    alignItems: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 21,
    borderWidth: 0.6,
    borderColor: 'rgba(0,0,0,0.2)',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  inputWrapperError: {
    borderColor: '#EF5350',
  },
  input: {
    height: 42,
    flexGrow: 3,
    color: '#dbc5e0',
    fontSize: 14,
    marginLeft: 8,
    alignSelf: 'stretch',
    borderBottomWidth: 0,
    borderBottomColor: '#eee', // error: #ff4e4e
  },
  icon: {
    fontSize: 20,
    color: '#f2c9f9',
  },
  placeholderTextColor: 'rgba(255, 239, 239, 0.4)',
};

export default reduxForm({ form: 'login', validate })(LoginForm);
