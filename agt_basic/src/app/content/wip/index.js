import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import WipGrid from '../../components/grids/wipgrid';
import { Box } from '@material-ui/core';
import * as astyles from '../../components/styles';
import img from './damian-zaleski-RYyr-k3Ysqg-unsplash.jpg';
import _ from 'lodash';




const useStyles = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        width: '90%',
        maxWidth: '90%',
        height: 300,
        borderRadius: 15,
        margin: 20,
        padding: '20px 20px 20px 50px'

    },
   
    bannerpanel: {
        ...astyles.bannerpanel(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 0,
            padding: '5px 5px 5px 10px',
            height: 400,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 0,
            padding: '10px 10px 10px 25px',
            height: 450,
        },
        [theme.breakpoints.up('md')]: {
            margin: 0,
            padding: '100px 20px 20px 50px',
            height: 700,
        },
        backgroundImage: `url(${img})`,
        backgroundSize: 'cover',
    },

   
}));

const Wip = () => {
    const classes = useStyles();
    const { pathname } = useLocation();





     useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
 


   


    return (
        <WipGrid>

            <Box className={classes.bannerpanel} >
             
                <h1>Work in Progress. Coming Soon !!!</h1>
            </Box>





        </WipGrid >
    );

}

export default Wip;
