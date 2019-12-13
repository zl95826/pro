import * as actionTypes from './actions';
const initialState={
    ingredients:{
        salad:0,
        bacon:0,
        cheese:0,
        meat:0
    },
    totalPrice:4
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
                }

            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredientName]:state.ingredients[action.ingredientName]-1
                }
            }
        default: return state;
    }
}
export default reducer;