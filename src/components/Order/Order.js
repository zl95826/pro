import React from 'react';
import classes from './Order.css';
const order=(props)=>{
    const ingredients=Object.entries(props.ingredients).map(([a,b])=><span style={{textTransform:'capitalize',
    display:'inline-block',margin:'0 8px',padding:'5px'}} key={a}>{`${a}: ${b}`}</span>);
   return (<div className={classes.Order}>
        <p>Ingredients: {ingredients}</p>
        <p>Price: <strong>$ {props.price.toFixed(2)}</strong></p>
    </div>);
}

export default order;