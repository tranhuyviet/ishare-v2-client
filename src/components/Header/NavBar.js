import React, { useContext, useState } from 'react';
import { useStyles } from './NavBar.style';

import { AuthContext } from '../../context/authContext';

import {
    Avatar,
    Paper,
    Typography,
    Grid,
    Divider,
    Button,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';

import logo from '../../assets/images/iShare-logo1.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MenuIcon from '@material-ui/icons/Menu';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';

import AuthenticationPage from '../pages/AuthenticationPage';

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        // '&:focus': {
        //     backgroundColor: theme.palette.primary.main,
        //     '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        //         color: theme.palette.common.white,
        //     },
        // },
    },
}))(MenuItem);

const NavBar = () => {
    const classes = useStyles();
    const [authPageOpen, setAuthPageOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user, logout } = useContext(AuthContext);

    const handleAuthPageClose = () => {
        setAuthPageOpen(false);
    };

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
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
                        <div className={classes.actionContainer}>
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
                    {user && user.token && (
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
                                        <AssignmentIndIcon fontSize="medium" />
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
                                        <ExitToAppIcon fontSize="medium" />
                                    </ListItemIcon>
                                    <ListItemText primary="Logout" />
                                </StyledMenuItem>
                            </StyledMenu>
                        </>
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
