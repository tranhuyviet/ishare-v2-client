import React from 'react';
import './Spinner.css';
import { Dialog } from '@material-ui/core';

const Spinner = ({ open }) => {
    return (
        <Dialog open={open}>
            <div className="spinner">
                <div className="lds-hourglass" />
            </div>
        </Dialog>
    );
};

export default Spinner;
