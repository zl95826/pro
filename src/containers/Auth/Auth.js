//this will be the page I want to load with the sign up or sign in form
import React,{Component} from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';
 class Auth extends Component {
     state={
         controls:{
            email:{
    			elementType:'input',
    			elementConfig:{
    				type:'email',
    				placeholder:'Your Email'
    			},
				value:'',
				validation:{
                    required:true,
                    isEmail:true
				},
				valid:false,
				touched:false
            },
            password:{
    			elementType:'input',
    			elementConfig:{
    				type:'password',
    				placeholder:'Passward'
    			},
				value:'',
				validation:{
                    required:true,
                    minLength:6
				},
				valid:false,
				touched:false
    		}
         },
         isSignup:true
     }
     checkValidity(value,rules) {
		let isValid=true;
		if(rules.required) {
			isValid=value.trim()!==''&&isValid;//trim method to remove any whitespaces at the beginning or end
		}
		if(rules.minLength) {
			isValid=value.length>=rules.minLength&&isValid;
		}
		if(rules.maxLength) {
			isValid=value.length<=rules.maxLength&&isValid;
		}
		if(rules.isEmail) {
			const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
		}
		if(rules.isNumeric) {
			const pattern=/^\d+$/;
			isValid=pattern.test(value)&&isValid;
		}
		return isValid;
	}
    inputChangedHandler = (event, controlName) => {
        const updatedControls={
            ...this.state.controls,
            [controlName]:{
                ...this.state.controls[controlName],
                value:event.target.value,
                valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched:true
            }
        };
        this.setState({controls:updatedControls});
    }
    submitHandler=(event)=>{
        event.preventDefault();
        //to prevent the reloading of the page
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
    }
    switchAuthModeHandler=()=>{
        this.setState(prevState=>{return {isSignup:!prevState.isSignup};})
    }
    render() {
        const formElementsArray=[];
        for(let key in this.state.controls) {
            formElementsArray.push({
                id:key,
                config:this.state.controls[key]
            });
        }
        let form=formElementsArray.map(cur=><Input 
            key={cur.id}
            elementType={cur.config.elementType}
			elementConfig={cur.config.elementConfig} 
			invalid={!cur.config.valid}
			shouldValidate={cur.config.validation} //for the dropbox, check if it has validation property
            value={cur.config.value} touched={cur.config.touched}
            changed={(event) => this.inputChangedHandler(event, cur.id)}
            />);
        
        if (this.props.loading) {form=<Spinner />}
        let errorMessage=null;
        if(this.props.error) {errorMessage=<p>{this.props.error.message}</p>}//JSX
        return (
                <div className={classes.Auth}>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                    {form}  
                        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>SWITCH TO {this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
                        <Button btnType="Success">SUBMIT</Button>
                    </form>
                </div>
    );
    }
 }
 const mapStateToProps=state=>{
     return {
         loading:state.auth.loading,
         error:state.auth.error

    }//because using combineReducer, so if you want to access the property in auth reducer you need to do it through state.auth
 }
 const mapDispatchToProps=dispatch=>{
     return {
         onAuth:(email,ps,isSignup)=>dispatch(actions.auth(email,ps,isSignup))
     }
 }
 export default connect(mapStateToProps,mapDispatchToProps)(Auth);