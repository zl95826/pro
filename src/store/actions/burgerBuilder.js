//create the action creators for building a burger. Here for synchronous action creators,
// it's not really necessary but it is a consistent approach through the app
import * as actionTypes from './actionTypes';
export const addIngredient=(name)=>{
    return {
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}
export const removeIngredient=(name)=>{
    return {
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}