import React, { useContext } from 'react';
import { useStyles } from './NavBar.style';

import { AuthContext } from '../../context/authContext';

import { Avatar, Paper, Typography, Grid, Divider, Button } from '@material-ui/core';

import logo from '../../assets/images/iShare-logo1.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const NavBar = () => {
    const classes = useStyles();
    const { user, login, logout } = useContext(AuthContext);

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
                    <Avatar
                        src="https://res.cloudinary.com/dzaxf70c4/image/upload/v1592381151/jqoyecsjkjtxxshaxhqt.jpg"
                        alt="user avatar"
                        className={classes.avatar}
                    />
                    <Typography className={classes.name}>Viet Tran</Typography>

                    <Divider
                        orientation="vertical"
                        flexItem
                        color="inherit"
                        style={{ margin: '0 16px' }}
                    />
                    <Button startIcon={<ExitToAppIcon />} className={classes.iconButton}>
                        Logout
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default NavBar;
