import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    navbar: {
        height: '54px',
        borderBottom: `1px solid ${theme.palette.grey['400']}`,
        backgroundColor: theme.palette.common.colorWhite,
    },
    container: {
        ...theme.share.container,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    logoContainer: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    logo: {
        display: 'inline-block',
        height: '60%',
        marginRight: '5px',
    },
    logoText: {
        fontSize: '24px',
        fontWeight: 700,
        color: theme.palette.common.colorBlack,
        letterSpacing: '2px',
    },
    logoTextSpec: {
        fontWeight: '900',
        color: theme.palette.primary.main,
    },
    actionIcons: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: '24px',
        marginRight: '32px',
        color: theme.palette.common.colorBlack,
    },
    avatarContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: '20px',
        borderRight: `1px solid ${theme.palette.common.colorGreyLight}`,
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.common.colorGreen,
        },
    },
    avatar: {
        width: theme.spacing(4),
        height: theme.spacing(4),
        fontSize: '18px',
        fontWeight: 'bold',
    },
    actionText: {
        marginLeft: '5px',
        fontSize: '14px',
        fontWeight: '500',
    },
    authContainer: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        '&:hover': {
            cursor: 'pointer',
            color: theme.palette.common.colorGreen,
        },
    },
}));
