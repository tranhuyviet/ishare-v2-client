import React from 'react';
import { useStyles } from './Banner.style';

const Banner = () => {
    const classes = useStyles();
    return (
        <div className={classes.banner}>
            {/* {userData && (
                <div className={classes.container}>
                    <div className={classes.imageContainer}>
                        <Avatar
                            src={'https://env-2591407.jelastic.metropolia.fi/' + userData.avatarUrl}
                            alt={userData.name}
                            className={classes.avatar}
                        />
                    </div>
                    <div className={classes.infoContainer}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
                            <h1
                                style={{
                                    margin: 0,
                                    marginRight: 20,
                                    fontSize: '24px',
                                    letterSpacing: '2px',
                                }}
                            >
                                {userData.name}
                            </h1>
                            <button
                                className={classes.button}
                                onClick={() => {
                                    setIsEditProfileOpen(true);
                                    setIsListSelected(0);
                                }}
                            >
                                Profile
                            </button>
                        </div>
                        <div className={classes.info}>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(2);
                                // }}
                            >
                                <AddAPhotoIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfPosts}
                                    </span>{' '}
                                    posts
                                </p>
                            </div>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(3);
                                // }}
                            >
                                <CommentIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfComments}
                                    </span>{' '}
                                    comments
                                </p>
                            </div>
                            <div
                                className={classes.infoItem}
                                // onClick={() => {
                                //     setIsEditProfileOpen(true);
                                //     setIsListSelected(4);
                                // }}
                            >
                                <FavoriteIcon />
                                <p className={classes.infoText}>
                                    <span className={classes.infoNumber}>
                                        {userData.numberOfLikes}
                                    </span>{' '}
                                    likes
                                </p>
                            </div>
                        </div>
                    </div>
                    <EditProfile
                        isEditProfileOpen={isEditProfileOpen}
                        handleEditProfileClose={handleEditProfileClose}
                        isListSelected={isListSelected}
                        setIsListSelected={setIsListSelected}
                        userData={userData}
                    />
                </div>
            )} */}
        </div>
    );
};

export default Banner;
