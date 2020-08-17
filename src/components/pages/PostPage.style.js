import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    dialog: {
        maxWidth: 303,
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
}));
