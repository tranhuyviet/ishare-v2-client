import React, { useContext, useState } from 'react';
import { useStyles } from './NavBar.style';

import { AuthContext } from '../../context/authContext';

import { Paper, Grid, Button } from '@material-ui/core';

// import { withStyles } from '@material-ui/core/styles';

import logo from '../../assets/images/iShare-logo1.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
// import MenuIcon from '@material-ui/icons/Menu';
// import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
// import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
// import CameraAltOutlinedIcon from '@material-ui/icons/CameraAltOutlined';

import AuthenticationPage from '../pages/AuthenticationPage';
// import { StyledMenu, StyledMenuItem } from '../shared/StyledMenu';
// import { Link } from 'react-router-dom';
import { UIContext } from '../../context/uiContext';
const NavBar = () => {
    const classes = useStyles();
    const { setPostsOfUserId } = useContext(UIContext);
    const [authPageOpen, setAuthPageOpen] = useState(false);
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, logout } = useContext(AuthContext);

    const handleAuthPageClose = () => {
        setAuthPageOpen(false);
    };

    // const handleMenuClick = (event) => {
    //     setAnchorEl(event.currentTarget);
    // };

    // const handleMenuClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <Paper className={classes.navbar} elevation={0} square>
            <Grid container className={classes.container} onClick={() => setPostsOfUserId(null)}>
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
                        <div className={classes.actionContainer}>
                            {/* <HomeOutlinedIcon
                                fontSize="large"
                                className={classes.actionIcon}
                                onClick={() => setPostsOfUserId(null)}
                            />
                            <CameraAltOutlinedIcon
                                fontSize="large"
                                className={classes.actionIcon}
                            /> */}
                            {/* <Avatar
                                src={user.avatarUrl}
                                alt="user avatar"
                                className={classes.avatar}
                                // style={{ width: 27, height: 27 }}
                            />
                            <Typography className={classes.name}>{user.name}</Typography> */}

                            {/* <Divider
                                orientation="vertical"
                                flexItem
                                color="inherit"
                                style={{ margin: '0 16px' }}
                            /> */}
                            <Button
                                startIcon={<ExitToAppIcon />}
                                className={classes.iconButton}
                                onClick={() => logout()}
                            >
                                Logout
                            </Button>
                        </div>
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
                    {/* {user && user.token && (
                        <>
                            <IconButton className={classes.menuButton} onClick={handleMenuClick}>
                                <MenuIcon />
                            </IconButton>
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                            >
                                <StyledMenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                    }}
                                >
                                    <ListItemIcon>
                                        <AssignmentIndIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Profile" />
                                </StyledMenuItem>
                                <Divider />
                                <StyledMenuItem
                                    onClick={() => {
                                        handleMenuClose();
                                        logout();
                                    }}
                                >
                                    <ListItemIcon>
                                        <ExitToAppIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </>
                    )} */}
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
