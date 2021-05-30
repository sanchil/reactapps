import React, { useContext, createContext, createRef, useRef } from 'react';

import { Grid, Paper, Container, Box, Button, Typography, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import cyan from '@material-ui/core/colors/cyan'
import theme from '../../../../theme';
import {AppContext} from '../../../state/appcntxt';
import {useMediaProp} from '../../../lib/userhooks';
import { bool } from 'prop-types';
import {Inp} from '../../../components/datacomponents/inputcomponents';




const useStyles = makeStyles(theme => ({

    root: {
        flexGrow: 1,
    },

    calcontainer: {
        [theme.breakpoints.up('xs')]:{
            width: '98%',
            maxWidth: '98%',
            height: 400,
        },
        [theme.breakpoints.up('sm')]:{
            width: '90%',
            maxWidth: '90%',
            height: 400,
        },
        display: 'flex',
        flexFlow: 'row wrap',
        flexFlow: 'row wrap',
        justifyContent: 'flex-end',
        flex: 'auto',
        opacity:0.9,
       
        //  border: '5px solid pink'
    },


}));




export const Calculator = (props) => {
    const classes = useStyles();
    const { appstate, dispatch } = useContext(AppContext);

    switch (appstate.calc.caltype) {
        case "ltr":
            return (
                <React.Fragment>
                    <Container className={classes.calcontainer}>
                        <LtrCalc />
                    </Container>
                </React.Fragment>
            );
        case "mac":
            return (
                <React.Fragment>
                    <Container className={classes.calcontainer}>
                        <MacCalc />
                    </Container>
                </React.Fragment>
            );

        case "ml":
            return (
                <React.Fragment>
                    <Container className={classes.calcontainer}>
                        <MlCalc />
                    </Container>
                </React.Fragment>
            );

        case "cmhc":
            return (
                <React.Fragment>
                    <Container className={classes.calcontainer}>
                        <CmhcCalc />
                    </Container>
                </React.Fragment>
            );

        default:
            return (
                <React.Fragment>
                    <Container className={classes.calcontainer}>
                        <LtrCalc />
                    </Container>
                </React.Fragment>
            );
    }


}


const calcboxgrid = {
    [theme.breakpoints.up('xs')]:{
        width: '100%',
        gridTemplateAreas:
        "   'header header header header header' \
                'calarea calarea calarea calarea calarea' \
                'calarea calarea calarea calarea calarea' \
                'calarea calarea calarea calarea calarea' \
                'calarea calarea calarea calarea calarea' \
                'footer footer footer footer footer'",
    },
    [theme.breakpoints.up('sm')]:{
        width: '98%',
        gridTemplateAreas:
        "   'header header header header header' \
                '. calarea calarea calarea calarea' \
                '. calarea calarea calarea calarea' \
                '. calarea calarea calarea calarea' \
                '. calarea calarea calarea calarea' \
                'footer footer footer footer footer'",
    },
   
    
    display: 'grid',
    gridTemplateColumns: '[col1] 1fr [col2] 1fr [col3] 1fr [col4] 1fr [col5] 1fr [col6]',
    gridTemplateRows: '[row1] 1fr [row2] 1fr [row3] 1fr [row4] 1fr [row5] 1fr [row6] 1fr [row7]',   
    borderRadius: 10,
    padding: 5,  
    
}


const calcheader = {
    gridArea: 'header',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    // border: '2px solid orange',
}

const calcarea = {
    gridArea: 'calarea',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    //border: '2px solid green',
}


const calcfooter = {
    gridArea: 'footer',
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 10,
    // border: '2px solid green',
}

const calclayout = { calcboxgrid, calcheader, calcarea, calcfooter }


const useLTRStyles = makeStyles(theme => ({
    ...calclayout
}));

const LtrCalc = (props) => {
    const classes = useLTRStyles();
    // console.log("Clases is "+ JSON.stringify(classes));
    const { appstate, dispatch } = useContext(AppContext);
   
    let calcElevation = 3;
    if(useMediaProp('md')){
        calcElevation = 3;
    }else{
        calcElevation = 0;
    }

    const ltrref = createRef();

    const calcLtr = () => {
        let val = ltrref.current.value;
        
        if(isNaN(val)){
            ltrref.current.value = 0;
            dispatch({ type: 'ALERT', open:true, data: "Please use a number" });
            return false;
        }

        let ltrtax = 0;
        if (val <= 55000) {
            ltrtax = val * (0.005);
        } else
            if ((val > 55000) && (val <= 250000)) {
                ltrtax = val * (0.01);
            } else
                if ((val > 250000) && (val <= 400000)) {
                    ltrtax = val * 0.015;
                } else
                    if (val > 400000) {
                        ltrtax = val * 0.02;
                    } else if (val > 2000000) {
                        ltrtax = val * 0.025;
                    }

        ltrtax = Math.round(ltrtax * 100) / 100;

        dispatch({ type: 'CALLTR', data: ltrtax });
    }
    return (
        <Paper className={classes.calcboxgrid} elevation={calcElevation}>
            <Box className={classes.calcheader}>
                <Typography variant="h6" gutterBottom>
                    Land Transfer Tax
               </Typography>
            </Box>
            <Box className={classes.calcarea}>
                <Inp ref={ltrref} type="text" label="Value of property" width="80%" />
            </Box>
            <Box className={classes.calcfooter}>
                <Button onClick={calcLtr}>Calculate</Button>
                <Button onClick={calcLtr}>Reset</Button>
            </Box>
        </Paper>
    )
}



const useMACStyles = makeStyles(theme => ({
    ...calclayout
}));

const MacCalc = (props) => {
    const classes = useMACStyles();
    const { appstate, dispatch } = useContext(AppContext);
    const affincomeref = createRef();
    const affdebtref = createRef();

    const affordCalc = () => {

        let affordableEmi = 0;
        const annualIncome = affincomeref.current.value;
        const debt = affdebtref.current.value;

        if(isNaN(annualIncome)){
            affincomeref.current.value = 0;
            dispatch({ type: 'ALERT', open:true, data: "Please use a number for affordable income" });
            return false;
        }

        if(isNaN(debt)){
            affdebtref.current.value = 0;
            dispatch({ type: 'ALERT', open:true, data: "Please use a number for debt" });
            return false;
        }

        const monthlyIncome = annualIncome / 12;
       
        const frontEndRatio = true;
        const backEndRatio = true;

        if (frontEndRatio) {
            affordableEmi = (28 / 100) * monthlyIncome;
        } else if (backEndRatio) {
            affordableEmi = ((36 / 100) * monthlyIncome) - debt;
        }

        affordableEmi = Math.round(affordableEmi * 100) / 100;
        dispatch({ type: 'CALAFF', data: affordableEmi });
    }


     
    let calcElevation = 3;
    if(useMediaProp('md')){
        calcElevation = 3;
    }else{
        calcElevation = 0;
    }



    return (
        <Paper className={classes.calcboxgrid} elevation={calcElevation}>
            <Box className={classes.calcheader}>
                <Typography variant="h6" gutterBottom>
                    Mortgage Affordability Calculator
               </Typography>
            </Box>
            <Box className={classes.calcarea}>
                <Inp ref={affincomeref} type="text" label="Annual Income" width="80%" />
                <Inp ref={affdebtref} type="text" label="Total monthly costs" width="80%" />
            </Box>
            <Box className={classes.calcfooter}>
                <Button onClick={affordCalc}>Calculate</Button>
                <Button onClick={() => { }}>Reset</Button>
            </Box>

        </Paper>

    )
}



const useMlStyles = makeStyles(theme => ({
    ...calclayout

}));

const MlCalc = (props) => {
    const classes = useMlStyles();
    const { appstate, dispatch } = useContext(AppContext);

    const mlamtref = createRef();
    const mlintref = createRef();
    const mltimeref = createRef();
    const mlfreqref = createRef();
    const mltermref = createRef();

    const calcMl = () => {
        let amt = mlamtref.current.value;
        const intrst = mlintref.current.value;
        const timeYrs = mltimeref.current.value;
        const freq = mlfreqref.current.value;
        const term = mltermref.current.value;


        if(isNaN(amt)){
            mlamtref.current.value = 0;
            dispatch({ 
                type: 'ALERT', 
                open:true, 
                data: "Please use a number for mortgage amount"
             });
            return false;
        }

        if(isNaN(intrst)){
            mlintref.current.value = 0;
            dispatch({ 
                type: 'ALERT', 
                open:true, 
                data: "Please use a number for interest rate"
             });
            return false;
        }

        if(isNaN(timeYrs)){
            mltimeref.current.value = 0;
            dispatch({ 
                type: 'ALERT', 
                open:true, 
                data: "Please use a number for time period"
             });
            return false;
        }



        let monthlyEmi = amt * (((intrst / 100) / 12) / (1 - Math.pow((1 + ((intrst / 100) / 12)), -(timeYrs * 12))))
        monthlyEmi = Math.round(monthlyEmi * 100) / 100;
        dispatch({ type: 'CALEMI', data: monthlyEmi });
    }


    let calcElevation = 3;
    if(useMediaProp('md')){
        calcElevation = 3;
    }else{
        calcElevation = 0;
    }

    return (
        <Paper className={classes.calcboxgrid} elevation={calcElevation}>
            <Box className={classes.calcheader}>
                <Typography variant="h6" gutterBottom>
                    Mortgage EMI Calculator
               </Typography>
            </Box>
            <Box className={classes.calcarea}>
                <Inp ref={mlamtref} type="text" label="Mortgage Amt" width="80%" />
                <Inp ref={mlintref} type="text" label="Interest Rate" width="80%" />
                <Inp ref={mltimeref} type="text" label="Amortization Period" width="80%" />
                <Inp ref={mlfreqref} type="text" label="Payment frequency" width="80%" />
                <Inp ref={mltermref} type="text" label="Term" width="80%" />
            </Box>
            <Box className={classes.calcfooter}>
                <Button onClick={calcMl}>Calculate</Button>
                <Button onClick={calcMl}>Reset</Button>
            </Box>
        </Paper>



    )
}


const useCmhcStyles = makeStyles(theme => ({
    ...calclayout
}));

const CmhcCalc = (props) => {
    const classes = useCmhcStyles();
    const { appstate, dispatch } = useContext(AppContext);

    const cmhcvalref = createRef();
    const cmhcloanref = createRef();

    const cmhcCalc = () => {


        let cmhcpremium = 0;
        const homeValue = cmhcvalref.current.value;
        const loanAmt = cmhcloanref.current.value;
        const loanCoverage = (loanAmt / homeValue);


        if (loanCoverage <= 0.65) {
            cmhcpremium = (0.6 / 100) * loanAmt;
        } else if (loanCoverage <= 0.75) {
            cmhcpremium = (1.7 / 100) * loanAmt;
        } else if (loanCoverage <= 0.80) {
            cmhcpremium = (2.4 / 100) * loanAmt;
        } else if (loanCoverage <= 0.85) {
            cmhcpremium = (2.8 / 100) * loanAmt;
        } else if (loanCoverage <= 0.90) {
            cmhcpremium = (3.1 / 100) * loanAmt;
        } else if (loanCoverage <= 0.95) {
            cmhcpremium = (4.0 / 100) * loanAmt;
        }

        cmhcpremium = Math.round(cmhcpremium * 100) / 100;
        dispatch({ type: 'CALCMHC', data: cmhcpremium });
    }

    let calcElevation = 3;
    if(useMediaProp('md')){
        calcElevation = 3;
    }else{
        calcElevation = 0;
    }


    return (
        <Paper className={classes.calcboxgrid} elevation={calcElevation}>
            <Box className={classes.calcheader}>
                <Typography variant="h6" gutterBottom>
                    CMHC Premium Calculator
               </Typography>
            </Box>
            <Box className={classes.calcarea}>
                <Inp ref={cmhcvalref} type="number" label="Value of property" width="80%" />

                <Inp ref={cmhcloanref} type="number" label="Loan Amt" width="80%" />
            </Box>
            <Box className={classes.calcfooter}>
                <Button onClick={cmhcCalc}>Calculate</Button>
                <Button onClick={cmhcCalc}>Reset</Button>
            </Box>
        </Paper>


    )
}



