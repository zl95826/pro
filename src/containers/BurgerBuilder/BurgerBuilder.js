import React, {Component,Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//name constants that you want to use as global constants in all capital characters.
const INGREDIENT_PRICES={
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3}
class BurgerBuilder extends Component {
    state={ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
totalPrice:4,
purchaseable:false,
purchasing:false};

updatePurchaseState=(obj)=> {
    const ingredients={...obj};
    const sum=Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,val)=>{return sum=sum+val}, 0);
   this.setState({purchaseable:sum>0});
}
//updatePurchaseState(obj) {
 //   const ingredients={...obj};
  //  const sum=Object.keys(ingredients).map(igKey=>ingredients[igKey]).reduce((sum,val)=>{return sum=sum+val}, 0);
 //  this.setState({purchaseable:sum>0});
//}
    addIngredientHandler=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1; 
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler=(type)=>{const oldCount=this.state.ingredients[type];
    if(oldCount>0) {
        const updatedCount=oldCount-1; const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount; const priceDeduction=INGREDIENT_PRICES[type];const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
        this.updatePurchaseState(updatedIngredients);
    }else {return;}

}

purchaseHandler=()=> {this.setState({purchasing:true});}
//purchaseHandler() {this.setState({purchasing:true});}
//it will be triggered by an event, this will not refer to the 
purchaseCancelHandler=()=> {this.setState({purchasing:false});}
purchaseContinueHandler=()=>{alert('Add it!');}
    render () {
        const disabledInfo={...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0;
        }
return (
<Fragment>
    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
        <OrderSummary ingredients={this.state.ingredients} purchaseCanceled={this.purchaseCancelHandler} 
        purchaseContinued={this.purchaseContinueHandler} price={this.state.totalPrice}/>
    </Modal>
    <Burger ingredients={this.state.ingredients}/>
    <BuildControls ingredientAdded={this.addIngredientHandler} 
    ingredientDeducted={this.removeIngredientHandler} 
    disabled={disabledInfo} 
    price={this.state.totalPrice}
    purchaseable={this.state.purchaseable}
    ordered={this.purchaseHandler}
    />
</Fragment>
);
    }
}
export default BurgerBuilder;