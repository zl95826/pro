import React, { Component,lazy,Suspense } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route, Switch,withRouter,Redirect} from 'react-router-dom';
//import Checkout from './containers/Checkout/Checkout';
//import Orders from './containers/Orders/Orders';
//import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
const asyncCheckout=lazy(()=>import('./containers/Checkout/Checkout'));
const asyncOrders=lazy(()=>import('./containers/Orders/Orders'));
const asyncAuth=lazy(()=>import('./containers/Auth/Auth'));


class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes=(
        <Switch>
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} /> 
            <Redirect to='/'  />{/*For unknown page we, I also want to go the frontpage */}
        </Switch>
    );
    if(this.props.isAuthenticated) {
      routes=(
        
        <Switch>
            <Route path='/checkout' component={asyncCheckout} />
            <Route path='/orders' component={asyncOrders} />
            <Route path='/logout' component={Logout} />
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'  />   
        </Switch>
        
     );
    }
    return (
      <div>
       <Layout>
       <Suspense fallback={<h2>loading...</h2>}>
         {routes}
      </Suspense>
       </Layout>
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return {
    isAuthenticated:state.auth.token!==null
  }
}
const mapDispatchToProps=dispatch=>{
  return {
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
