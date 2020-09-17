import React, { useContext } from 'react';

import { TextField, CircularProgress } from '@material-ui/core';
import { useStyles } from './SignupForm.style';

import { useFormik } from 'formik';

import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import errorParse from '../../utils/errorParse';

import { signupSchema } from '../../schemas/userSchema';

import ReCAPTCHA from 'react-google-recaptcha';
import MyButton from '../shared/MyButton';

import { AuthContext } from '../../context/authContext';

const SignupForm = ({ handleAuthPageClose }) => {
    const classes = useStyles();
    const authContext = useContext(AuthContext);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        recaptcha: '',
    };

    const {
        values,
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        setErrors,
        // isValid,
        // setValues,
        // touched,
        setFieldValue,
    } = useFormik({
        initialValues,
        onSubmit,
        validationSchema: signupSchema,
    });

    const [signup, { loading }] = useMutation(SIGNUP, {
        update(proxy, result) {
            // console.log('RESULT', result);
            authContext.login(result.data.signup);
            handleAuthPageClose();
        },
        onError(error) {
            console.log('ABC', error.graphQLErrors[0]);
            setErrors(errorParse(error));
        },
        variables: values,
    });

    function onSubmit(values) {
        // console.log('submit...', values);
        signup();
        window.grecaptcha.reset();
    }

    return (
        <div>
            <form noValidate onSubmit={handleSubmit} className={classes.root}>
                {loading && <CircularProgress style={{ marginBottom: '16px' }} />}
                <TextField
                    type="text"
                    name="name"
                    error={errors.name ? true : false}
                    label="Name"
                    placeholder="Viet Tran"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.name}
                />

                <TextField
                    type="email"
                    name="email"
                    error={errors.email ? true : false}
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
                    error={errors.password ? true : false}
                    label="Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.password}
                />

                <TextField
                    type="password"
                    name="confirmPassword"
                    error={errors.confirmPassword ? true : false}
                    label="Confirm Password"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    helperText={errors.confirmPassword}
                />
                <ReCAPTCHA
                    sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                    onChange={(value) => setFieldValue('recaptcha', value)}
                    className={classes.recaptcha}
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
                <MyButton type="submit" title="Register" style={{ margin: '18px 0 0 0' }} fullWidth>
                    {loading && <CircularProgress />}
                    {!loading && 'Register'}
                </MyButton>
            </form>
        </div>
    );
};

const SIGNUP = gql`
    mutation signup(
        $name: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
        $recaptcha: String!
    ) {
        signup(
            name: $name
            email: $email
            password: $password
            confirmPassword: $confirmPassword
            recaptcha: $recaptcha
        ) {
            name
            email
            avatarId
            avatarUrl
            token
            confirmed
        }
    }
`;

export default SignupForm;
