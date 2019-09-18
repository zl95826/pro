import React, {Fragment,Component} from 'react';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer:false
    }
    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }; 
    sideDrawerToggleHandler=()=>{
      this.setState(pre=>{return {showSideDrawer:!pre.showSideDrawer}})
     }
    render () {
        return <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer open={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>{this.props.children}</main>
                </Fragment>
    }
}
export default Layout;