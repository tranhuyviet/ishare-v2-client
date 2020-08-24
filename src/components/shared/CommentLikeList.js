import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
    CardHeader,
    Typography,
    Avatar,
} from '@material-ui/core';
import moment from 'moment';
import CloseIcon from '@material-ui/icons/Close';
import { useStyles } from './CommentLikeList.style';

export default ({ open, close, data, title, isLike }) => {
    const classes = useStyles();

    const ids = data.map((item, index) => {
        return item.user.id;
    });

    const userIdList = Array.from(new Set(ids));

    const userDataList = [];
    userIdList.forEach((item) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].user.id === item) {
                userDataList.push(data[i].user);
                break;
            }
        }
    });

    let userDatas = [];
    userDataList.forEach((item) => {
        let count = 0;
        ids.forEach((id) => {
            if (id === item.id) count++;
        });
        item.count = count;
        userDatas.push(item);
    });
    // console.log(userDatas);

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle className={classes.dialogTitle}>
                <div className={classes.titleContainer}>
                    <Typography style={{ fontWeight: 'bold' }}>{title}</Typography>
                    <IconButton onClick={close}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                {userDatas &&
                    userDatas.map((userData) => (
                        <CardHeader
                            key={userData.id}
                            avatar={<Avatar src={userData.avatarUrl} alt={userData.name} />}
                            title={
                                <>
                                    <span className={classes.userName}>{userData.name}</span>
                                    {!isLike && (
                                        <span>
                                            {' '}
                                            {`(${userData.count} ${
                                                userData.count > 1 ? 'comments' : 'comment'
                                            })`}
                                        </span>
                                    )}
                                </>
                            }
                            // subheader={
                            //     <>
                            //         {userData.count}
                            //         <span> comments</span>
                            //     </>
                            // }
                            className={classes.cardHeader}
                        />
                    ))}
                {data.length === 0 && <Typography>Have no any user</Typography>}
            </DialogContent>
        </Dialog>
    );
};
