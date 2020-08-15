import React, { useContext, useState } from 'react';
import { useStyles } from './LoginForm.style';
import { useFormik } from 'formik';
import { TextField, CircularProgress, Typography, Divider, Snackbar } from '@material-ui/core';

import gql from 'graphql-tag';
import { loginSchema } from '../../schemas';
import { useMutation } from '@apollo/react-hooks';

import errorParse from '../../utils/errorParse';
import { AuthContext } from '../../context/authContext';

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import FacebookIcon from '@material-ui/icons/Facebook';

import ReCAPTCHA from 'react-google-recaptcha';
import MyButton from '../shared/MyButton';

import Alert from '../shared/Alert';

const LoginForm = ({ handleAuthPageClose }) => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);
    const [alertOpen, setAlertOpen] = useState(true);

    const initialValues = {
        email: '',
        password: '',
        recaptcha: '',
    };

    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        setErrors,
        setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: loginSchema,
    });

    const [login, { loading }] = useMutation(LOGIN, {
        variables: values,
        onError(error) {
            console.log('LOGIN CLIENT ERROR', error.graphQLErrors[0]);
            setErrors(errorParse(error));
            setAlertOpen(true);
        },
        update(proxy, result) {
            console.log('RESULT', result);
            authContext.login(result.data.login);
            handleAuthPageClose();
        },
    });

    const [loginFacebook, { loadingLoginFacebook }] = useMutation(LOGIN_FACEBOOK, {
        variables: values,
        onError(error) {
            console.log('LOGIN FACEBOOK ERROR', error.graphQLErrors[0]);
            setErrors(errorParse(error));
            setAlertOpen(true);
        },
        update(proxy, result) {
            console.log(values);
            console.log('RESULT LOGIN FACEBOOK', result);
            authContext.login(result.data.loginFacebook);
            handleAuthPageClose();
        },
    });

    const [loginGoogle, { loadingLoginGoogle }] = useMutation(LOGIN_GOOGLE, {
        variables: values,
        onError(error) {
            console.log('LOGIN GOOGLE ERROR', error.graphQLErrors[0]);
            setErrors(errorParse(error));
            setAlertOpen(true);
        },
        update(proxy, result) {
            // console.log(values);
            console.log('RESULT', result);
            authContext.login(result.data.loginGoogle);
            handleAuthPageClose();
        },
    });

    function onSubmit(values) {
        // console.log('submit...', values);
        login();
        window.grecaptcha.reset();
    }

    // FACEBOOK
    const responseFacebook = (response) => {
        console.log(response);
        // delete values.email;
        // delete values.password;
        // delete values.recaptcha;
        values.facebookId = response.id;
        values.accessToken = response.accessToken;
        console.log(values);
        loginFacebook();
    };

    const clickedFacebook = (data) => {
        console.log('click on facebook', data);
    };

    // GOOGLE
    const responseGoogle = (response) => {
        console.log('GOOGLE', response);
        console.log(response);
        // delete values.email;
        // delete values.password;
        values.googleId = response.googleId;
        values.idToken = response.tokenObj.id_token;
        console.log(values);
        loginGoogle();
    };

    return (
        <div>
            {errors.global && (
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={6000}
                    onClose={() => setAlertOpen(false)}
                >
                    <Alert onClose={() => setAlertOpen(false)} severity="error">
                        {errors.global}
                    </Alert>
                </Snackbar>
            )}
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
                {(loading || loadingLoginFacebook || loadingLoginGoogle) && (
                    <CircularProgress style={{ marginBottom: '16px' }} />
                )}

                <TextField
                    type="email"
                    name="email"
                    error={errors.email}
                    label="Email"
                    placeholder="example@example.com"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.email}
                />

                <TextField
                    type="password"
                    name="password"
                    error={errors.password}
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password}
                />
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setFieldValue('recaptcha', value)}
                />
                {errors.recaptcha && (
                    <p
                        style={{
                            color: '#f44336',
                            fontSize: '12px',
                            marginLeft: '14px',
                            textAlign: 'left',
                        }}
                    >
                        {errors.recaptcha}
                    </p>
                )}
                <MyButton type="submit" title="Login" style={{ margin: '24px 0' }} fullWidth>
                    Login
                </MyButton>
                <Divider />
                <div className={classes.oauthContainer}>
                    <Typography variant="subtitle1">Or login with</Typography>
                    <div style={{ marginTop: 14 }}>
                        <FacebookLogin
                            appId={process.env.REACT_APP_FACEBOOK_APPID}
                            // autoLoad={true}
                            fields="name,email,picture"
                            onClick={clickedFacebook}
                            callback={responseFacebook}
                            cssClass={classes.facebookButton}
                            textButton="Facebook"
                            icon={<FacebookIcon style={{ marginRight: 20 }} />}
                        />

                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENTID}
                            buttonText="Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className={classes.googleButton}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

const LOGIN = gql`
    mutation login($email: String!, $password: String!, $recaptcha: String!) {
        login(email: $email, password: $password, recaptcha: $recaptcha) {
            name
            email
            avatarId
            avatarUrl
            token
            confirmed
        }
    }
`;

const LOGIN_FACEBOOK = gql`
    mutation loginFacebook($facebookId: String!, $accessToken: String!) {
        loginFacebook(facebookId: $facebookId, accessToken: $accessToken) {
            name
            email
            avatarUrl
            token
            confirmed
        }
    }
`;

const LOGIN_GOOGLE = gql`
    mutation loginGoogle($googleId: String!, $idToken: String!) {
        loginGoogle(googleId: $googleId, idToken: $idToken) {
            name
            email
            avatarUrl
            token
            confirmed
        }
    }
`;

export default LoginForm;
