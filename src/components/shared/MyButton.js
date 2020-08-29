import React from 'react';
import { Button } from '@material-ui/core';
import { useStyles } from './MyButton.style';

const MyButton = ({ title, type = 'button', style, fullWidth, onClick, reverse, redColor }) => {
    const classes = useStyles();
    return (
        <Button
            className={`${classes.button} ${reverse ? classes.reverse : ''} ${
                redColor ? classes.redColor : ''
            }`}
            type={type}
            style={style}
            fullWidth={fullWidth}
            onClick={onClick}
        >
            {title}
        </Button>
    );
};

export default MyButton;
