import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth: 400,
    },
    dialogTitleContainer: {
        padding: 0,
        paddingLeft: theme.spacing(3),
        backgroundColor: theme.palette.primary.main,
    },
    dialogTitle: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: theme.palette.common.white,
        fontWeight: 'bold',
    },
    formContainer: {
        padding: '24px 8px',
    },
    personIcon: {
        fontSize: '70px',
        color: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: '50%',
        padding: '5px',
        marginBottom: theme.spacing(3),
    },
    toggleLoginRegister: {
        textAlign: 'center',
        marginTop: theme.spacing(3),
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    },
}));
