//this component is going to be a functional component. It doesn't have any state attached to it, 
//it just received some props and returned some jsx.

import React from 'react';
import classes from './Spinner.css';
const Spinner=()=>(
    <div className={classes.Loader}>Loading...</div>
)

export default Spinner;