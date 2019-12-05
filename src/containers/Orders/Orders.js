import React,{Component} from 'react';
import Order from '../../components/Order/Order';
import axios from 'axios';

class Orders extends Component {
    componentDidMount() {
        axios.get('https://burger-react-project-2019.firebaseio.com/orders.json').then(response=>console.log(response));
    }
    render() {
        return <div><Order /></div>
    }
}
export default Orders;