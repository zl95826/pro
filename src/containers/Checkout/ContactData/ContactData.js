import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
class ContactData extends Component {
    state={
    	orderForm:{//orderForm property which should be a javascript object
    		//and in this javascript object, I now wanted to define all the form fields, 
    		//so all the inputs, how they should be configured and their values.
    		//In this object, I need some properties and each property represents one input
    		name:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Your Name'
    			},
				value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
    		},
    		street:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Street'
    			},
    			value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
    		},
    		zipCode:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Zip Code'
    			},
    			value:'',
				validation:{
					required:true,
					minLength:5,
					maxLength:5,
					isNumeric:true
				},
				valid:false,
				touched:false
    		},
    		country:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Country'
    			},
    			value:'',
				validation:{
					required:true
				},
				valid:false,
				touched:false
    		},
    		email:{
    			elementType:'input',
    			elementConfig:{
    				type:'email',
    				placeholder:'Your E-mail'
    			},
    			value:'',
				validation:{
					required:true,
					isEmail:true
				},
				valid:false,
				touched:false
    		},
    		deliveryMethod:{
    			elementType:'select',
    			elementConfig:{
    				options:[
    				{value:'fastest',displayValue:'Fastest'},
    				{value:'cheapest',displayValue:'Cheapest'},
    				]
    			},
				value:'fastest',
				validation:{},
				valid:true
    		}

		},
		formIsValid:false
    }
    orderHandler=(event)=>{
        
        //We are inside a form, so if you click the order button, the page will 
        //be reloaded which is the default behavior. We could use event.preventDefault
        //to prevent the default which would be to send a request and reload the page but I don't want.
        event.preventDefault();
		//this.setState({loading:true});
		const formData={};
		for(let i in this.state.orderForm) {
			formData[i]=this.state.orderForm[i].value;
		}
        const order={ingredients:this.props.ings,
					price:this.props.price,
					//...formData
					orderData:formData
		 }
		 this.props.onOrderBurger(order,this.props.token);
         
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
    inputChangedHandler=(event,inputIdentifier)=>{
    	const updatedOrderForm={
			...this.state.orderForm
			//because in the orderForm object it has nested object, so here just shallow copy ||27O
		}
		const updatedFormElement={...updatedOrderForm[inputIdentifier]};
		updatedFormElement.value=event.target.value;
		updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
		updatedFormElement.touched=true;
		updatedOrderForm[inputIdentifier]=updatedFormElement;
		let formIsValid=true;
		for (let inputIdentifier in updatedOrderForm) {
			formIsValid=updatedOrderForm[inputIdentifier].valid&&formIsValid;
			
		}
		console.log(formIsValid);
		this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid});
    }
    render() {
    	const formElementsArray=[];
    	for (let key in this.state.orderForm) {
    		//formElementsArray.push(this.state.orderForm[key]);
    		formElementsArray.push({
    			id:key,
    			config:this.state.orderForm[key]
    			//...this.state.orderForm[key]
    		});
    	}
        let form=(<form onSubmit={this.orderHandler}>
            {
            	//formElementsArray.map(cur=><Input key={cur.id} {...cur.config} invalid={!cur.config.valid}
            	//	changed={(event)=>this.inputChangedHandler(event,cur.id)} />)
            		formElementsArray.map(cur=><Input key={cur.id} 
            		elementType={cur.config.elementType}
					elementConfig={cur.config.elementConfig} 
					invalid={!cur.config.valid}
					shouldValidate={cur.config.validation} //for the dropbox, check if it has validation property
					value={cur.config.value} touched={cur.config.touched}
					changed={(event)=>this.inputChangedHandler(event,cur.id)} />)
			}
			<Button btnType='Success' disabled={!this.state.formIsValid}>Order</Button>
           {/*<Button btnType='Success' clicked={this.orderHandler}>Order</Button>*/}
        </form>);
        if(this.props.loading) form=<Spinner />
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=state=>{return {
	ings:state.burgerBuilder.ingredients,
	price:state.burgerBuilder.totalPrice,
	loading:state.order.loading,
	token:state.auth.token
}}

const mapDispatchToProps=dispatch=>{
	return {
		onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));