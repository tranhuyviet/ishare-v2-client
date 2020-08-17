import React, { useContext } from 'react';
import { useStyles } from './Banner.style';
import { Grid, Avatar, Typography, Paper, CardActionArea, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import MyButton from '../shared/MyButton';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { AuthContext } from '../../context/authContext';

const Banner = () => {
    const classes = useStyles();
    const theme = useTheme();
    const isXS = useMediaQuery(theme.breakpoints.down('xs'));
    const { user } = useContext(AuthContext);

    return (
        <>
            {user && user.token && (
                <Paper className={classes.banner} elevation={0} square>
                    <Grid container className={classes.container}>
                        <Grid item xs={12} sm={4} className={classes.avatarContainer}>
                            <Avatar
                                src={user.avatarUrl}
                                alt="user avatar"
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                            sm={8}
                            container
                            spacing={2}
                            className={classes.rightContainer}
                            alignItems="flex-start"
                            justify="center"
                            direction="column"
                        >
                            <Grid item className={classes.nameContainer}>
                                <Typography variant="h5" className={classes.name}>
                                    {user.name}
                                </Typography>
                                <MyButton
                                    title="Profile"
                                    style={{ display: isXS ? 'none' : 'inherit' }}
                                />
                            </Grid>
                            <Grid
                                item
                                container
                                alignItems="center"
                                className={classes.infosContainer}
                            >
                                <Grid item className={classes.infoContainer}>
                                    <CardActionArea className={classes.infoGroup}>
                                        <AddAPhotoIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>132</span> posts
                                        </Typography>
                                    </CardActionArea>
                                </Grid>
                                <Grid item className={classes.infoContainer}>
                                    <CardActionArea className={classes.infoGroup}>
                                        <CommentIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>145</span> comments
                                        </Typography>
                                    </CardActionArea>
                                </Grid>
                                <Grid item className={classes.infoContainer}>
                                    <CardActionArea className={classes.infoGroup}>
                                        <FavoriteIcon className={classes.icon} />
                                        <Typography variant="subtitle1">
                                            <span className={classes.number}>99</span> likes
                                        </Typography>
                                    </CardActionArea>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            )}
        </>
    );
};

export default Banner;
