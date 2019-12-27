//this file holds the action creator for submitting an order
//Purpose: use Redux to rewrite what happend after clicking the order button
import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    //use this action to set a loading state and potentially show a spinner if I want to.
    return {
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token,userId)=>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId
    }
}
export const authFail=(error)=>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}
export const logout=()=>{
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout());
        },expirationTime*1000//turn milliseconds to real seconds
        );
    }
}
export const auth=(email,password,isSignup)=>{
    return dispatch=>{
        dispatch(authStart());
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD5jGJ1FZR3HSnWakrVPppVMM23bSHp_OU';
        if(!isSignup) {url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD5jGJ1FZR3HSnWakrVPppVMM23bSHp_OU';}
        const authData={email,password,returnSecureToken:true}
        axios.post(url,authData)
        .then(resp=>{
            console.log(resp);
            dispatch(authSuccess(resp.data.idToken,resp.data.localId));
            dispatch(checkAuthTimeout(resp.data.expiresIn));
        })
        .catch(err=>{console.log(err.response);dispatch(authFail(err.response.data.error));});
    }
}

