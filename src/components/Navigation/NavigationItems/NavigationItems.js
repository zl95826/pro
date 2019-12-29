import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems=props=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        <NavigationItem link='/orders'>Orders</NavigationItem>
        {!props.isAuthenticated?<NavigationItem link='/auth'>Authenticate</NavigationItem>
        :<NavigationItem link='/logout'>Log Out</NavigationItem>}
    </ul>
);

export default NavigationItems;