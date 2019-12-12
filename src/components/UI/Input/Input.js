import React from 'react';
import classes from './Input.css';
const input=(props)=>{
    let inputElement=null;
    let validationError=null;
    if(props.invalid && props.touched) {validationError=<p>Please enter a valid {props.elementConfig.placeholder}</p>}
    const inputClasses=[classes.InputElement];
    if(props.invalid&&props.shouldValidate&&props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch(props.elementType) {
        case 'input':
        inputElement=<input 
        className={inputClasses.join(' ')} 
        {...props.elementConfig} value={props.value} 
        onChange={props.changed} />; 
        //use spread to set the attributes, 
        //spread allows us to distribute them on the input element
        break;
        case 'textarea':
        inputElement=<textarea className={inputClasses.join(' ')} 
        {...props.elementConfig} value={props.value} 
        onChange={props.changed} />;
        break;
        case 'select':
        inputElement=<select className={inputClasses.join(' ')} value={props.value}
        onChange={props.changed} >
        {props.elementConfig.options.map(cur=><option key={cur.value} value={cur.value}>{cur.displayValue}</option>)}
        </select>;
        //React, instead of using this selected attribute, uses a value attribute on the root select tag. 
        //This is more convenient in a controlled component because you only need to update it in one place.
        break;
        default:
        inputElement=<input className={inputClasses.join(' ')}
        {...props.elementConfig} value={props.value} /> 
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
    
}

export default input;