import React, {Fragment} from 'react';
import Button from '../../UI/Button/Button';
const orderSummary=(props)=>{
    const ingredientSummary=Object.keys(props.ingredients).map(val=><li key={val}><span style={{textTransform:'capitalize'}}>{val}</span>: {props.ingredients[val]}</li>);
  //  const ingredientSummary=Object.keys(props.ingredients).map(val=><li>val: {props.ingredients[val]}</li>); if you want to use variables in JSX, have to use {}
 return (<Fragment>
    <h3>Your Order</h3>
    <p>A delicious burger with the following ingredients:</p>
    <ul>{ingredientSummary}</ul>
    <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
    <p>Continue to Checkout?</p>
<Button btnType='Danger' clicked={props.purchaseCanceled}>Cancel</Button>
<Button btnType='Success' clicked={props.purchaseContinued}>Continue</Button>
</Fragment>);
}
export default orderSummary;