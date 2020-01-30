import React, {Component,Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';
//name constants that you want to use as global constants in all capital characters.
// const INGREDIENT_PRICES={
//     salad:0.5,
//     bacon:0.7,
//     cheese:0.4,
//     meat:1.3}
class BurgerBuilder extends Component {
    state={
           //ingredients:null,
           // totalPrice:4,
           // purchaseable:false,
            purchasing:false
           // loading:false,
           // error:false};
    };
updatePurchaseState=(obj)=> {
    const ingredients={...obj};
    const sum=Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,val)=>{return sum=sum+val}, 0);
    return sum>0;
}
//updatePurchaseState(obj) {
 //   const ingredients={...obj};
  //  const sum=Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,val)=>{return sum=sum+val}, 0);
 //  this.setState({purchaseable:sum>0});
//}

//     addIngredientHandler=(type)=>{
//         const oldCount=this.state.ingredients[type];
//         const updatedCount=oldCount+1; 
//         const updatedIngredients={...this.state.ingredients};
//         updatedIngredients[type]=updatedCount;
//         const priceAddition=INGREDIENT_PRICES[type];
//         const oldPrice=this.state.totalPrice;
//         const newPrice=oldPrice+priceAddition;
//         this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
//         this.updatePurchaseState(updatedIngredients);
//     }

//     removeIngredientHandler=(type)=>{const oldCount=this.state.ingredients[type];
//     if(oldCount>0) {
//         const updatedCount=oldCount-1; const updatedIngredients={...this.state.ingredients};
//         updatedIngredients[type]=updatedCount; const priceDeduction=INGREDIENT_PRICES[type];const oldPrice=this.state.totalPrice;
//         const newPrice=oldPrice-priceDeduction;
//         this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
//         this.updatePurchaseState(updatedIngredients);
//     }else {return;}

// }

componentDidMount() {
    this.props.onInitIngredients();
    //axios.get('https://burger-react-project-2019.firebaseio.com/ingredients.json')
    //     .then(response=>this.setState({ingredients:response.data}))
    //     .catch(err=>this.setState({error:true}));
    //.then(res=>{console.log(res.data);this.props.onIngredientAdded('salad')}/comment:dispatch action here)
}
purchaseHandler=()=> {
    if(this.props.isAuthenticated) {
        this.setState({purchasing:true});
    }else {
        this.props.onSetAuthRedirectPath('/checkout');
        this.props.history.push('/auth');
    }
    
   }
//purchaseHandler() {this.setState({purchasing:true});}
//it will be triggered by an event, this will not refer to the 
purchaseCancelHandler=()=> {this.setState({purchasing:false});}
//purchaseContinueHandler=()=>{//alert('Add it!'); //one way without redux passing ingredients to checkout page
    // this.setState({loading:true});
    // const order={ingredients:this.state.ingredients,
    //             price:this.state.totalPrice,//recalculate on your server side in your real project
    //             customer:{
    //                 name:'Lily',
    //                 address:{
    //                     street:'1234 St',
    //                     zipCode:'97001',
    //                     state:'OR'
    //                 },
    //                 email:'test@hotmail.com'
    //             },
    //             deliveryMethod:'fastest'
    // }
    // axios.post('/orders.json',order)
    //     .then(response=>{this.setState({loading:false,purchasing:false});})
    //     .catch(error=>{this.setState({loading:false,purchasing:false});});
//if you send a request to something like this URL/(slash) orders, it's going to create our orders node and store our orders beneath that node
//and this is exactly what I want to do. Now for Firebase only, there is a special thing, you need to add .json here.
//For your next project, you may have your own backend or other service, and you need to choose the appropriate endpoint there.
//Now to use the post method, firebase is automatically creating and managing a list here and each list item simply get a unique ID 
//assigned and created by firebase automatically. If we expand this object we see the order data we actually passed.
   //test
    // axios.get('/orders.json').then(response=>{console.log(response.data);
    //     for (let v in response.data) {
    //     console.log(response.data[v].price);
    // }});
//     console.log(this.state.ingredients);
//     const queryParams=[];
//     for (let i in this.state.ingredients) {
//         queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]));
//     }
//     queryParams.push('price='+this.props.totalPrice);
//     const queryString=queryParams.join('&');//'and' sign
//     this.props.history.push({
//      pathname:'/checkout',
//      search:'?'+queryString
//     });
// }

    purchaseContinueHandler=()=>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    render () {
        //const disabledInfo={...this.state.ingredients};
        const disabledInfo={...this.props.ings};
        for (let key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        let burger=this.props.error?(<p>Ingredients can't be loaded!</p>):<Spinner />;
        if (this.props.ings) {
            burger= (<Fragment>
            <Burger ingredients={this.props.ings}/>
            <BuildControls ingredientAdded={this.props.onIngredientAdded} //{this.addIngredientHandler}
            ingredientDeducted={this.props.onIngredientRemoved} //{this.removeIngredientHandler} 
            disabled={disabledInfo} 
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ings)}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
            /></Fragment>);
            orderSummary=<OrderSummary ingredients={this.props.ings} 
            purchaseCanceled={this.purchaseCancelHandler} 
            purchaseContinued={this.purchaseContinueHandler} 
            price={this.props.totalPrice}/>;
        }
       // if (this.state.loading) {orderSummary=<Spinner />;}
       
return (
<Fragment>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        {orderSummary}
    </Modal>
   {burger}
</Fragment>
);
    }
}
const mapStateToProps=state=>{return {
    ings:state.burgerBuilder.ingredients,
    totalPrice:state.burgerBuilder.totalPrice,
    error:state.burgerBuilder.error,
    isAuthenticated:state.auth.token!==null
}}
const mapDispatchToProps=dispatch=>{return {
    onIngredientAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit()),
    onInitIngredients:()=>dispatch(burgerBuilderActions.initIngredients()),
    onSetAuthRedirectPath:(path)=>dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    //dispatch()后的括号里，应该是一个含有type property的object，但是这里我们使用了action creator function,
    //so let's call the function一般情况下，它返回的是一个含有type property的object,
    //但是这里它返回的是一个function，这个时候thunk开始发挥作用它让这个function运行，it will execute the function
    //接我们的例子，运行get，这个promise resolved，so automatically 运行then里的callback,发生了dispatch
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));