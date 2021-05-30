import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Box from '@material-ui/core/Box';
import { purple } from '@material-ui/core/colors';
import { MainPanel } from '../../../components/panels/panel3';
import { AppContext } from '../../../state/appcntxt';
import { Calculator } from './calculators';
import theme from '../../../../theme';
import {useMediaProp} from '../../../lib/userhooks';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CustomizedMenus from './calcmenu';
import DenseTable, {SimpleTable} from './table';
import calculator from './calculator.jpg';



const useSideMenuStyles = makeStyles(theme => ({
    root: {
      
        display: 'flex',
        flexFlow: 'column wrap',
        width: '20%',
        maxWidth: '20%',
        height: '98%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        borderRadius: 20,
        margin: 'none',
        backgroundColor: purple[50],
        paddingTop: 30,
    }
}));

export const SideMenu = (props) => {
    const classes = useSideMenuStyles();

    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>
        </React.Fragment>
    );

}

const useContentStyles = makeStyles(() => ({
    root: {
        [theme.breakpoints.up('xs')]: {
            width: '100%',
            maxWidth: '100%',
            height: '80%',
            justifyContent: 'flex-start',
            alignItems:'flex-start',
        },
        [theme.breakpoints.up('sm')]: {
            width: '100%',
            maxWidth: '100%',
            height: '80%',
            justifyContent: 'space-around',
            alignItems:'flex-start',
            backgroundImage: `url(${calculator})`,
            backgroundSize: 'cover',
        },
        [theme.breakpoints.up('md')]: {
            width: props=>props.width,
            maxWidth: props=>props.width,
            height: '98%',
            justifyContent: 'space-around',
            alignItems:'flex-start',
            backgroundImage: `url(${calculator})`,
            backgroundSize: 'cover',
        },

        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',       
        flex: 'auto',      
        border: '1px solid purple[300]',
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: purple[300],
        borderRadius: 20,
        margin: 'none',
        padding: '10px 10px 10px 40px',
       


    }
}));

export const Content = (props) => {
    const classes = useContentStyles(props);

    return (
        <React.Fragment>
            <Box className={classes.root}>
                {props.children}
            </Box>

        </React.Fragment>
    );

}





export const CalculatorsDash = () => {
    const { appstate, dispatch } = useContext(AppContext);
    const theme = useTheme();

//    if(useMediaQuery(theme.breakpoints.up('md'))){
    if(useMediaProp('md')){
    
        return (

            <MainPanel elevation={0} height={500} justifyContent="space-around" alignItems="center">           
                <SideMenu>
                    <Button onClick={() => dispatch({ type: "LTR" })}>Land Transfer Tax</Button>
                    <Button onClick={() => dispatch({ type: "ML" })}>Monthly Payments</Button>
                    <Button onClick={() => dispatch({ type: "MAC" })}>Affordability-Calculator</Button>
                    <Button onClick={() => dispatch({ type: "CMHC" })}>CMHC-Calculator</Button>
                </SideMenu>            
            <Content width='78%'><Calculator /></Content>    
        

        </MainPanel>
        );
    }else{
        return(        
            <>
            <MobileMenu dispatch={dispatch}/>
            <Calculator />
            </>         
        );
    }
   
}

export const ResultsBox = (props) => {
    
    const mdbool = useMediaProp('md');
    const xsbool = useMediaProp('xs');
    let tablewidth = '60%';
    if(xsbool&&!mdbool){
        tablewidth='100%';
    }else{
        tablewidth='70%';
    }

    const createData=(name, value)=> {
        return { name, value };
      }
      
      const rows = [
        createData('Emi', props.calc.emi),
        createData('Land transfer tax', props.calc.landtransfertax),
        createData('CMHC Premium', props.calc.cmhcpremium),
        createData('Affordability', props.calc.affordability),
        createData('Other Costs', props.calc.othercosts),
        createData('Total Costs', props.calc.totalcosts),
        createData('Result', props.calc.results),
      ];

    return (
        <React.Fragment>          
            <SimpleTable rows={rows} width={tablewidth}/>
        </React.Fragment>
    );
}


const useMobileMenuStyles = makeStyles(theme => ({
    root: {}
}));

const MobileMenu = (props) => {
    const classes = useMobileMenuStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {       
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

   

    return (
        <React.Fragment>
            <Fab size="small" color="primary" aria-label="add" onClick={handleClick}>
                <AddIcon />
            </Fab>
            <CustomizedMenus anchorEl={anchorEl} handleClose={handleClose} dispatch={props.dispatch}/>
         
        </React.Fragment>
    );
}