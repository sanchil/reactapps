import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Grid2 from '../../components/grids/grid2';
import Text from '../../components/test/text';
import LightBox from '../../components/test/lightbox';
import {Img3} from '../../components/test/svg/img';
// /import {useSpring, animated, config} from 'react-spring';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        height: 500,
    },
    header: {
        width: '100%',
        height: 100,
    },
    panel: {
        width: '100%',
        height: 500,
    }
}));

const Test = (props) => {
    const classes = useStyles();
    const pathname = useLocation();
   // const v = useSpring({number:10,from:{number:0},config:config.slow});

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <Grid2>
            <Box className={classes.header}>


            </Box>
            <Box className={classes.root}>
                <LightBox>
                </LightBox>
            </Box>
            <Box className={classes.panel}>
            {/* <animated.span>{v.number}</animated.span> */}
            <span>{number}</span>
            <Img3 />
            
            
            </Box>
            
            <Box className={classes.panel}>
            
          
            
            </Box>


        </Grid2>



    );
}

export default Test;

