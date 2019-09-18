import React from 'react';
import classes from './Burger.css';
import BurgerIngredient  from './BurgerIngredients/BurgerIngredient';


const burger=(props)=>{
  let transformedIngredients=Object.keys(props.ingredients).map(current=>{
       return [...new Array(props.ingredients[current])].map((_,index)=><BurgerIngredient key={current+index} type={current}/>);
    
    });
    transformedIngredients=transformedIngredients.reduce((acc,cur)=>{return acc.concat(cur)},[]);
  /*  */
 /*new Array(3) 生成了一个length为3的array，但是这个array没有value,所以直接使用map()不work,我们用...spread operator 使它变成了一个
 array，只不过每一个value是undefined， 
 With the spread operator you transform it into an array with three values: [undefined, undefined, undefined]
 但是这里我们并不care current value, 我们只想取它的index
 --------------------------------------------------------
 下面是另一种方法

 let transformedIngredients = [];
 
for (let key in props.ingredients) {
  for (let i = 0; i < props.ingredients[key]; i++) {
    transformedIngredients.push(<BurgerIngredient key={key + i} type={key} />);
  }
}
 */
if(transformedIngredients.length===0) {transformedIngredients=<p>Please start adding ingredients!</p>}
    return (<div className={classes.Burger}>
<BurgerIngredient type='bread-top'/>
{/*<BurgerIngredient type='cheese'/>
<BurgerIngredient type='meat'/>
<BurgerIngredient type='salad'/>
<BurgerIngredient type='bacon'/>
<BurgerIngredient type='bread-bottom'/>
    <hr />*/}
{transformedIngredients}
<BurgerIngredient type='bread-bottom'/>

</div>
);
};

export default burger;