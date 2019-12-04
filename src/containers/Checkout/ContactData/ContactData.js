import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import styles from './ContactData.css';
import axios from '../../../axios-orders';
class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler=(event)=>{
        
        //We are inside a form, so if you click the order button, the page will 
        //be reloaded which is the default behavior. We could use event.preventDefault
        //to prevent the default which would be to send a request and reload the page but I don't want.
        event.preventDefault();
        console.log(this.props.ingredients+' hh');
        this.setState({loading:true});
        const order={ingredients:this.props.ingredients,
                    price:this.props.price,//The total price is only calculated and stored in the burger builder.
                    //So what we actually have to do is we have to pass the total price along with the ingredients from the  
                    //BurgerBuilder to the checkout component.
                    customer:{
                        name:'Lily',
                        address:{
                             street:'1234 St',
                             zipCode:'97001',
                             state:'OR'
                         },
                         email:'test@hotmail.com'
                     },
                     deliveryMethod:'fastest'
         }
         axios.post('/orders.json',order)
             .then(response=>{this.setState({loading:false});})
             .catch(error=>{this.setState({loading:false});});
    }
    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter Your Contact Data</h4>
                <form>
                    <input type='text' name='name' placeholder='Your Name' />
                    <input type='text' name='email' placeholder='Your Email' />
                    <input type='text' name='street' placeholder='Street' />
                    <input type='text' name='postal' placeholder='Postal Code' />
                    <Button btnType='Success' clicked={this.orderHandler}>Order</Button>
                </form>
            </div>
        )
    }
}
export default ContactData;