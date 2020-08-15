import React, { useState } from 'react';
import { useStyles } from './AuthenticationPage.style';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    IconButton,
    Grid,
    Divider,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import PersonIcon from '@material-ui/icons/Person';

import LoginForm from '../forms/LoginForm';
import SignupForm from '../forms/SignupForm';

const AuthenticationPage = ({ authPageOpen, handleAuthPageClose }) => {
    const classes = useStyles();
    const [isLogin, setIsLogin] = useState(false);

    const handleToggleLogin = () => {
        setIsLogin((isLogin) => !isLogin);
    };

    return (
        <Dialog open={authPageOpen} onClose={handleAuthPageClose}>
            <DialogTitle className={classes.dialogTitleContainer}>
                <div className={classes.dialogTitle}>
                    {isLogin ? 'Login' : 'Create New Account'}
                    <IconButton onClick={handleAuthPageClose} color="inherit">
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    className={classes.formContainer}
                >
                    <PersonIcon className={classes.personIcon} />
                    {isLogin ? (
                        <LoginForm />
                    ) : (
                        <SignupForm handleAuthPageClose={handleAuthPageClose} />
                    )}

                    <Typography
                        className={classes.toggleLoginRegister}
                        onClick={() => handleToggleLogin()}
                    >
                        {isLogin ? (
                            <span>
                                Create New Account <span>&#8594;</span>
                            </span>
                        ) : (
                            <span>&#8592; Back to Login</span>
                        )}
                    </Typography>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default AuthenticationPage;
