import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            marginBottom: theme.spacing(3),
        },
        maxWidth: 303,
    },
    oauthContainer: {
        textAlign: 'center',
        marginTop: theme.spacing(1),
    },
    facebookButtonContainer: {
        background: '#3c5b98',
        padding: '0 16px',
        marginRight: theme.spacing(2),
        color: theme.palette.common.white,

        border: '1px solid #3c5b98',
        '&:hover': {
            color: '#3c5b98',
        },
    },
    facebookButton: {
        textTransform: 'capitalize',
        height: 42,

        border: 'none',
        outline: 'none',
        background: 'transparent',
        padding: 0,
        margin: 0,
        color: 'inherit',
        fontSize: '14px',
    },
    googleButtonContainer: {
        padding: 0,
        margin: 0,
        border: 'none',
    },
    googleButton: {
        maxWidth: 303,
        height: 42,

        border: 'none',
        background: 'transparent',
    },
}));
