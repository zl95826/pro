import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
class Checkout extends Component {
    state={
        ingredients:null,/*{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1
        }*/
        totalPrice:0
    }
    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('checkout/contact-data');
    }
    componentDidMount() {
    //I won't use componentDidUpdate or anything like that, because it's not nested in some other
    //page or anything like that. Each time you load this component, it just mount again instead of updating. 
    //If you cancel it or enter another page, you remove/unmount the component, so next time you load into the component
    //you have to mount, that's the reason why using componentDidMount
        console.log('mount');
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for (let [key,value] of query) {
            if(key==='price') {price=+value;}
           else { ingredients[key]=+value;//convert string to number
            console.log(+value);}
        }
        this.setState({ingredients:ingredients,totalPrice:price});
    }
    render() {
        return <div>
                    <CheckoutSummary 
                        ingredients={this.state.ingredients} 
                        checkoutCancelled={this.checkoutCancelHandler} 
                        checkoutContinued={this.checkoutContinueHandler} />
                    {/*<Route path={this.props.match.path+'/contact-data'} component={ContactData} />*/}
                    <Route path={this.props.match.path+'/contact-data'} render={()=><ContactData ingredients={this.state.ingredients} price={this.state.totalPrice}/> } />
                </div>
    }

}
export default Checkout;