import React from 'react';
import { useStyles } from './NavBar.style';

import logo from '../../assets/images/iShare-logo1.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';

const NavBar = () => {
    const classes = useStyles();
    return (
        <div className={classes.navbar}>
            <div className={classes.container}>
                <div
                    className={classes.logoContainer}
                    // onClick={() => {
                    //     setTabValue(0);
                    // }}
                >
                    <img src={logo} alt="logo" className={classes.logo} />
                    <span className={classes.logoText}>i</span>
                    <span className={`${classes.logoText} ${classes.logoTextSpec}`}>S</span>
                    <span className={classes.logoText}>hare</span>
                </div>
                <div className={classes.actionIcons}>
                    {/* {token && userData && (
                        <React.Fragment>
                            <div className={classes.avatarContainer}>
                                <Avatar
                                    src={
                                        'https://env-2591407.jelastic.metropolia.fi/' +
                                        userData.avatarUrl
                                    }
                                    alt={userData.name}
                                    className={classes.avatar}
                                />
                                <p className={classes.actionText}>{userData.name}</p>
                            </div>
                            <div className={classes.authContainer} onClick={() => logout()}>
                                <ExitToAppIcon />
                                <p className={classes.actionText}>Logout</p>
                            </div>
                        </React.Fragment>
                    )}
                    {(!token || !userId) && (
                        <div className={classes.authContainer} onClick={() => setLoginOpen(true)}>
                            <LockOpenIcon />
                            <p className={classes.actionText}>Login</p>
                        </div>
                    )} */}
                </div>
            </div>
            {/* <LoginRegisterForm loginOpen={loginOpen} handleLoginClose={handleLoginClose} /> */}
        </div>
    );
};

export default NavBar;
