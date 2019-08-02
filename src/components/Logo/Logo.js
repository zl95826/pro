import React, {Fragment} from 'react';
import classes from './Logo.css';
import burgerLogo from '../../assets/images/burger-logo.png';
//burgerLogo here will in the end just receive the path of the image where webpack will copy it to. This will be dynamically resolved.
const logo=(props)=>(
    <div className={classes.Logo}>
        <img src={burgerLogo} alt='logo'/>
        {/*<img src='../../assets/images/burger-logo.png' alt='logo' />
        this will not work as you would expect. Keep in mind, the source folder is only the folder we're working in. 
        In the end, webpack will take all these files, bundle them together and create a new output folder. We cannot see that
        because we're in development mode. But once we do publish our app, we will get a real different folder where all the optimized, 
        compiled and bundled assets are contained in. Therefore these assets folder here in the src/source folder will not be shipped to 
        any real server. We should also make webpack aware of the fact that we're using this image and we're actually doing that by 
        importing the image into our javascript file. This does not mean that webpack mixes the image with our javascript code. It just 
        means we make webpack aware of the fact that we're using this image and webpack will then handle this image with a special plug-in 
        or a special module that was added to webpack, actually to its config, will handle the image, will basically copy it over to the 
        destination directory it creates. {burgerLogo} refer to a string in the end to the path where webpack stored the optimized and copied image.*/}
    </div>

);

export default logo;