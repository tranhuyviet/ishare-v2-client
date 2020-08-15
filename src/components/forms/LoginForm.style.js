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

    facebookButton: {
        textTransform: 'capitalize',
        height: 45,
        fontSize: '14px',
        background: '#3c5b98',
        padding: '0 16px',
        marginRight: theme.spacing(2),
        color: theme.palette.common.white,
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: 'none',
        borderRadius: '5px',
        letterSpacing: 1,
        fontSize: '16px',
        '&:hover': {
            boxShadow: theme.shadows['1'],
        },
    },

    googleButton: {
        maxWidth: 303,
        marginTop: theme.spacing(2),
        height: 45,
        paddingLeft: '10px!important',
        width: '100%',
        border: '1px solid!important',
        borderColor: theme.palette.grey['400'],
        boxShadow: 'none!important',
        borderRadius: '5px!important',
        letterSpacing: 1,
        fontSize: '16px!important',

        '&:hover': {
            boxShadow: `${theme.shadows['1']}!important`,
        },
    },
}));
