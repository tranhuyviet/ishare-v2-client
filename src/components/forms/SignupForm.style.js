import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(2),
            },
        },
        maxWidth: 303,
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            maxWidth: '250px',
        },
    },
    recaptcha: {
        [theme.breakpoints.down('xs')]: {
            transform: 'scale(0.82)',
            marginLeft: '-23px',
        },
    },
}));
