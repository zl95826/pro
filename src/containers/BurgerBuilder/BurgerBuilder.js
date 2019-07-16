import React, {Component,Fragment} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
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
totalPrice:4};
    addIngredientHandler=(type)=>{const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1; const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];const oldPrice=this.state.totalPrice;const newPrice=oldPrice+priceAddition;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});}

    removeIngredientHandler=(type)=>{const oldCount=this.state.ingredients[type];
    if(oldCount>0) {
        const updatedCount=oldCount-1; const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount; const priceDeduction=INGREDIENT_PRICES[type];const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    }else {return;}

}
    render () {
        const disabledInfo={...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0;
        }
return (
<Fragment>
    <Burger ingredients={this.state.ingredients}/>
    <BuildControls ingredientAdded={this.addIngredientHandler} ingredientDeducted={this.removeIngredientHandler} disabled={disabledInfo} price={this.state.totalPrice}/>
</Fragment>
);
    }
}
export default BurgerBuilder;