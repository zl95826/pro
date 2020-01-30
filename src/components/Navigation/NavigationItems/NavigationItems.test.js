import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
configure({adapter:new Adapter()});
describe('<NavigationItems />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<NavigationItems />);
    });//We can do some general set up. beforeEach takes a function as an argument
                       //and this is the function which will get executed before each test.
    it('it should render two <NavigationItem /> elements if not authenticated.',()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('it should render three <NavigationItem /> elements if authenticated.',()=>{
        //wrapper=shallow(<NavigationItems isAuthenticated/>);
        wrapper.setProps({isAuthenticated:true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    
});