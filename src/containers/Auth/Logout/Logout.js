import React,{Component} from 'react';
import * as actions from '../../../store/actions/index';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }
    render() {
        return <Redirect to="/" />; //whenever this container is loaded, it just redirects me
    }
}

const mapDispatchToProps=dispatch=>{
    return {
        onLogout:()=>dispatch(actions.logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);