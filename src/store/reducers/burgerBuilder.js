import * as actionTypes from '../actions/actionTypes';
const initialState={
    ingredients:null,
       /*{ delete these information because I fetch them from the web
        salad:0,
        bacon:0,
        cheese:0,
        meat:0 }*/
   
    totalPrice:4,
    error:false
}
const INGREDIENT_PRICES={
        salad:0.5,
        bacon:0.7,
        cheese:0.4,
        meat:1.3
}
const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,//copy the entire old state, using spread to distribute state, however it doesn't create deep clones of objects, ingredients which is object on its own would still point to that old object
                //ingredient should also be a new object, 
                //immutability, don't reuse the old one,
                //fix it, we need to spreading out the properties of that old object into a new object
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]+1
                    //the brackets means it's a computed property name: That allows you to put an expression in brackets [], that will be computed and used as the property name. 
                },
                totalPrice:state.totalPrice+INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                },
                totalPrice:state.totalPrice-INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat     
                },
                error:false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error:true
            }
        default: return state;
    }
}
export default reducer;