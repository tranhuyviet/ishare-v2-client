import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    dialogTitle: {
        padding: '0 0 0 24px',
        borderBottom: '1px solid',
        borderBottomColor: theme.palette.grey['200'],
        minWidth: '350px!important',
    },
    titleContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    cardHeader: {
        padding: '8px 8px 8px 0',
    },
    userName: {
        fontWeight: 'bold',
    },
}));
