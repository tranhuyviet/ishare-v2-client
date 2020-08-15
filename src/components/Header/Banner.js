import React, { useContext } from 'react';
import { useStyles } from './Banner.style';
import { Grid, Avatar, Typography, Paper, CardActionArea } from '@material-ui/core';
import MyButton from '../shared/MyButton';

import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import { AuthContext } from '../../context/authContext';

const Banner = () => {
    const classes = useStyles();
    const { user } = useContext(AuthContext);

    return (
        <>
            {user && user.token && (
                <Paper className={classes.banner} elevation={0} square>
                    <Grid container className={classes.container} spacing={4}>
                        <Grid item xs={4} container justify="flex-end" alignItems="center">
                            <Avatar
                                src={user.avatarUrl}
                                alt="user avatar"
                                className={classes.avatar}
                            />
                        </Grid>
                        <Grid item xs={8} container direction="column" justify="center" spacing={4}>
                            <Grid item container alignItems="center">
                                <Typography variant="h5" className={classes.name}>
                                    {user.name}
                                </Typography>
                                <MyButton title="Profile" />
                            </Grid>
                            <Grid item container alignItems="center">
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
