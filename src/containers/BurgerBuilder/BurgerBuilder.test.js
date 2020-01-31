import React from 'react';
import {configure,shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from '../../components/Burger/BurgerControls/BuildControls';
configure({adapter:new Adapter()});
describe('<BurgerBuilder />', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper=shallow(<BurgerBuilder onInitIngredients={()=>{}}/>);
    });//We can do some general set up. beforeEach takes a function as an argument
                       //and this is the function which will get executed before each test.
    it('it should render <BuildControls /> when receiving ingredients',()=>{
        wrapper.setProps({ings:{salad:0}});
        expect(wrapper.find(BuildControls)).toHaveLength(1);
    });
});