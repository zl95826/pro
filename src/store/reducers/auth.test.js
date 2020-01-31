import * as actionTypes from '../actions/actionTypes';
import reducer from './auth';

describe('auth reducer',()=>{
    it('should return the initial state',()=>{
        expect(reducer(undefined,{})).toEqual(
            {
                token:null,
                userId:null,
                error:null,
                loading:false,
                authRedirectPath:'/'
            }
        );
    });
    it('should return the initial state',()=>{
        expect(reducer(undefined,{
            type:actionTypes.AUTH_SUCCESS,
            idToken:'some',
            userId:'A'
        })).toEqual(
            {
                token:'some',
                userId:'A',
                error:null,
                loading:false,
                authRedirectPath:'/',
                error:null,loading:false
            }
        );
    });
});