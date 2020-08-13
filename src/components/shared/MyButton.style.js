import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    button: {
        textTransform: 'capitalize',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        border: '1px solid',
        borderColor: theme.palette.primary.main,
        fontSize: '16px',
        padding: '8px 16px',
        maxHeight: '35px',
        transition: 'all 0.2s ease',
        '&:hover': {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.common.white,
        },
        '&:active': {
            transform: 'translateY(2px)',
        },
    },
}));
