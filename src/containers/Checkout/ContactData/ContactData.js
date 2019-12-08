import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

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
    			value:''
    		},
    		street:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Street'
    			},
    			value:''
    		},
    		zipCode:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Zip Code'
    			},
    			value:''
    		},
    		country:{
    			elementType:'input',
    			elementConfig:{
    				type:'text',
    				placeholder:'Country'
    			},
    			value:''
    		},
    		email:{
    			elementType:'input',
    			elementConfig:{
    				type:'email',
    				placeholder:'Your E-mail'
    			},
    			value:''
    		},
    		deliveryMethod:{
    			elementType:'select',
    			elementConfig:{
    				options:[
    				{value:'fastest',displayValue:'Fastest'},
    				{value:'cheapest',displayValue:'Cheapest'},
    				]
    			},
    			value:''
    		}

    	},
        loading:false
    }
    orderHandler=(event)=>{
        
        //We are inside a form, so if you click the order button, the page will 
        //be reloaded which is the default behavior. We could use event.preventDefault
        //to prevent the default which would be to send a request and reload the page but I don't want.
        event.preventDefault();
        console.log(this.props.ingredients);
        this.setState({loading:true});
        const order={ingredients:this.props.ingredients,
                    price:this.props.price,//The total price is only calculated and stored in the burger builder.
                    //So what we actually have to do is we have to pass the total price along with the ingredients from the  
                    //BurgerBuilder to the checkout component.
                    // customer:{
                    //     name:'Lily',
                    //     address:{
                    //          street:'1234 St',
                    //          zipCode:'97001',
                    //          state:'OR'
                    //      },
                    //      email:'test@hotmail.com'
                    //  },
                    //  deliveryMethod:'fastest'
         }
         axios.post('/orders.json',order)
             .then(response=>{this.setState({loading:false});this.props.history.push('/');/*push to the root page*/})
             .catch(error=>{this.setState({loading:false});});
    }
    inputChangedHandler=(event,inputIdentifier)=>{
    	const updatedOrderForm={
			...this.state.orderForm
			//because in the orderForm object it has nested object, so here just shallow copy ||27O
		}
		const updatedFormElement={...updatedOrderForm[inputIdentifier]};
		updatedFormElement.value=event.target.value;
		updatedOrderForm[inputIdentifier]=updatedFormElement;
		this.setState({orderForm:updatedOrderForm});
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
        let form=(<form>
            {
            	formElementsArray.map(cur=><Input key={cur.id} {...cur.config} 
            		changed={(event)=>this.inputChangedHandler(event,cur.id)} />)
            	//formElementsArray.map(cur=><Input key={cur.id} 
            	//	elementType={cur.config.elementType}
            	//	elementConfig={cur.config.elementConfig} 
            	//	value={cur.config.value} />)
            }
            <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
        </form>);
        if(this.state.loading) form=<Spinner />
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>
        )
    }
}
export default ContactData;