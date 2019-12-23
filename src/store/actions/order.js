//this file holds the action creator for submitting an order
//Purpose: use Redux to rewrite what happend after clicking the order button
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBurgerSuccess=(id,orderData)=> {
    return {
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail=(error)=> {
    return {
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseInit=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}
//async function
export const purchaseBurger=(orderData)=> {
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/order.json',orderData)
        .then(resp=>{console.log(resp);dispatch(purchaseBurgerSuccess(resp.data.name,orderData))})
        .catch(error=>dispatch(purchaseBurgerFail(error)))
    }
}

export const fetchOrdersSuccess=(orders)=> {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrdersFail=(error)=> {
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrdersStart=()=> {
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}
export const fetchOrders=()=>{
    return dispatch=>{
        dispatch(fetchOrdersStart());
        axios.get("/order.json").then(response=>{
            const fetchedOrders=[];
            for (let i in response.data) {
              // sorders.push(response.data[i].ingredients);
              fetchedOrders.push({
                  ...response.data[i],
                  id:i //add one new property ID
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));})
        .catch(err=>dispatch(fetchOrdersFail(err)))
    }
}