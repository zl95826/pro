import React from 'react';
import BuildControl from './BuilderControl/BuildControl';
import classes from './BuildControls.css';

const controls=[{label:'Salad',type:'salad'},{label:'Bacon',type:'bacon'},{label:'Cheese',type:'cheese'},{label:'Meat',type:'meat'}];
const buildControls=(props)=><div className={classes.BuildControls}>
<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
{controls.map(val=><BuildControl disabled={props.disabled[val.type]} 
        added={()=>props.ingredientAdded(val.type)} 
        key={val.label} label={val.label} 
        deducted={()=>props.ingredientDeducted(val.type)}/>)}
        <button className={classes.OrderButton} disabled={!props.purchaseable} onClick={props.ordered}>Order Now</button>
        </div>;
//const buildControls=(props)=><div className={classes.BuildControls}>{controls.map(val=><BuildControl added={props.ingredientAdded} key={val.label} label={val.label} type={val.type}/>)}</div>;
export default buildControls;