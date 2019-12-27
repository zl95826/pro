import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
class Orders extends Component {
    // state={
    //     orders:[],
    //     loading:true
    // }
    componentDidMount() {
            this.props.onFetchOrders(this.props.token);
                // axios.get('/order.json')
                // .then(response=>{
                //     //console.log(response);
                //     const fetchedOrders=[];
                //     for (let i in response.data) {
                //     // sorders.push(response.data[i].ingredients);
                //     fetchedOrders.push({
                //         ...response.data[i],
                //         id:i //add one new property ID
                //         });
                //     }
                //     this.setState({orders:fetchedOrders,loading:false});
                //     console.log(fetchedOrders)})
                //     .catch(response=>{this.setState({loading:false})});
    }
    render() {
        let orders=<Spinner />;
        if(!this.props.loading) {
            orders=this.props.orders.map(order=><Order key={order.id} ingredients={order.ingredients} 
                price={+order.price}/>);
                 //+ before order.price means to convert string to number
        }
        return (
        <div>
            {orders}   
        </div>);
      {/* let display=<Spinner />
        if (!this.state.loading) {
            if(this.state.orders.length>0) {display=this.state.orders.map(
              (cur,index)=>{let r=''; for(let [k,v] of Object.entries(cur)) {
                    r+=`${k}: ${v}`;
              }
              return <p key={index}>{r}</p>;
            }  
            )}
            else display=<p>There is no order</p>;
        }
        return <div>{display}</div>*/} 
    }
}
const mapStateToProps=state=>{
    return {
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token
    }
}
const mapDispatchToProps=dispatch=>{
    return {
        onFetchOrders:(token)=>dispatch(actions.fetchOrders(token))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));