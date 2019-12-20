//create the action creators for building a burger. Here for synchronous action creators,
// it's not really necessary but it is a consistent approach through the app
//fetch ingredients async
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
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
export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENT,
        ingredients:ingredients
    }
}
export const fetchIngredientsFailed=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}
//load the ingredients that we can use in the burgerbuilder
//action creator returns a function instead of an object
export const initIngredients=()=>{
    //return a function where I receive the dispatch function as parameter which then I can use it in the function body
    // dispatch avaialbe due to redux-thunk syntax
    return dispatch=>{
        axios.get('https://burger-react-project-2019.firebaseio.com/ingredients.json')
             .then(response=>{dispatch(setIngredients(response.data));})
             .catch(err=>{dispatch(fetchIngredientsFailed())});
        
    }
};