import React,{Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
class Checkout extends Component {
  /**  constructor(props) {
   *     super(props);
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for (let [key,value] of query) {
            if(key==='price') {price=+value;}
           else { ingredients[key]=+value;//convert string to number
            console.log(+value);}
        }
        this.state={
            ingredients:ingredients,
            totalPrice:price
        }
    }*/
   //how to do the above code without constructor?
    //   initState = () => {
    //     const queryInit = new URLSearchParams(
    //         this.props.location.search
    //     );
    //     const ingredientsInit = {};
    //     let priceInit = 0;
    //     for (let param of queryInit.entries()) {
    //         if (param[0] === 'price') {
    //             priceInit = param[1];
    //         } else {
    //             ingredientsInit[param[0]] = +param[1];
    //         }
    //     }
    //     return {
    //         ingredients: ingredientsInit,
    //         price: priceInit
    //     };
    // };
    // state = this.initState(); 
    checkoutCancelHandler=()=>{
        this.props.history.goBack();
    }
    checkoutContinueHandler=()=>{
        this.props.history.replace('checkout/contact-data');
    }
    /*componentDidMount() {
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
    }*/
    render() {
        return <div>
                    <CheckoutSummary 
                        ingredients={this.props.ings} 
                        checkoutCancelled={this.checkoutCancelHandler} 
                        checkoutContinued={this.checkoutContinueHandler} />
                    <Route path={this.props.match.path+'/contact-data'} component={ContactData} />
                    {/* <Route path={this.props.match.path+'/contact-data'} render={(props)=><ContactData 
                    ingredients={this.state.ingredients} price={this.state.price} {...props}/> } /> */}
                    {/* with the render method, we don't have the history object available in there.
                    Now there are two ways we can use to fix this, one is we can wrap the contact data 
                    component with this withRouter helper method.
                    the second way: The render prop function has access to all the same route props
                     (the argument props including match, location and history). Here use ...spread to make them available to your rendered
                     component
                    */}
                </div>
    }

}
    const mapStateToProps=state=>{return {
            ings:state.ingredients
        }
    }
export default connect(mapStateToProps)(Checkout);