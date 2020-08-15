import React, { useContext, useState } from 'react';
import { useStyles } from './NavBar.style';

import { AuthContext } from '../../context/authContext';

import { Avatar, Paper, Typography, Grid, Divider, Button } from '@material-ui/core';

import logo from '../../assets/images/iShare-logo1.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';

import AuthenticationPage from '../pages/AuthenticationPage';

const NavBar = () => {
    const classes = useStyles();
    const [authPageOpen, setAuthPageOpen] = useState(false);
    const { user, logout } = useContext(AuthContext);

    const handleAuthPageClose = () => {
        setAuthPageOpen(false);
    };

    return (
        <Paper className={classes.navbar} elevation={0} square>
            <Grid container className={classes.container}>
                <Grid item xs={2} className={classes.logoContainer}>
                    <img src={logo} alt="logo" className={classes.logo} />
                    <span className={classes.logoText}>i</span>
                    <span className={`${classes.logoText} ${classes.logoTextSpec}`}>S</span>
                    <span className={classes.logoText}>hare</span>
                </Grid>
                <Grid
                    item
                    xs={10}
                    className={classes.actionContainer}
                    container
                    justify="flex-end"
                    alignItems="center"
                >
                    {user && user.token && (
                        <>
                            <Avatar
                                src={user.avatarUrl}
                                alt="user avatar"
                                className={classes.avatar}
                            />
                            <Typography className={classes.name}>{user.name}</Typography>

                            <Divider
                                orientation="vertical"
                                flexItem
                                color="inherit"
                                style={{ margin: '0 16px' }}
                            />
                            <Button
                                startIcon={<ExitToAppIcon />}
                                className={classes.iconButton}
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </>
                    )}
                    {(!user || !user.token) && (
                        <Button
                            startIcon={<LockOpenIcon />}
                            className={classes.iconButton}
                            onClick={() => setAuthPageOpen(true)}
                        >
                            Login
                        </Button>
                    )}
                </Grid>
            </Grid>
            <AuthenticationPage
                authPageOpen={authPageOpen}
                handleAuthPageClose={handleAuthPageClose}
            />
        </Paper>
    );
};

export default NavBar;
