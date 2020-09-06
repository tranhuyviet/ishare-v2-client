import React from 'react';
import { Paper, Typography, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        textAlign: 'center',
    },
    text: {
        ...theme.share.container,
        fontSize: '14px',
        fontWeight: 'bold',
        letterSpacing: 1,
        color: theme.palette.grey['600'],
        padding: '24px 0',
        borderTop: '1px solid',
        borderColor: theme.palette.grey['400'],
    },
}));

const Footer = () => {
    const classes = useStyles();
    return (
        <Paper component="footer" square elevation={0} className={classes.footer}>
            <Typography variant="h6" className={classes.text}>
                &copy; {new Date().getFullYear()} ISHARE V2.0 FROM{' '}
                <Link href="https://www.viet.fi" target="_blank" rel="noopener noreferrer">
                    WWW.VIET.FI
                </Link>
            </Typography>
        </Paper>
    );
};

export default Footer;
