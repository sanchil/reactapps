import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../components/grids/grid2';
import { Box, Paper, Button } from '@material-ui/core';
import { CalculatorsDash, Content, ResultsBox } from './components';
import { AppContext } from '../../state/appcntxt';
import { MainPanel } from '../../components/panels/panel3';
import theme from '../../theme';
import { useMediaProp } from '../../lib/userhooks';
//import { panel, panel1, bannerpanel, banner, centerpanel, center } from '../../components/styles';
import * as astyles from '../../components/styles';
import Alert from '../../components/snacks';
import { TextF } from '../../components/datacomponents/inputcomponents';


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
    bannerpanel: astyles.bannerpanel(theme),
    banner: {
        ...astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            height: 450,
        },
        [theme.breakpoints.up('sm')]: {

            height: 500,
        },
        [theme.breakpoints.up('md')]: {

            height: 500,
        },
    },
    centerpanel: astyles.centerpanel(theme),
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    center: {
        ...astyles.center(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 3,
            padding: '5px 5px 5px 10px',
            height: 450,
        },
    },
    resultbox: {
        [theme.breakpoints.up('xs')]: {
            width: '80%',
            height: '48%',
        },
        [theme.breakpoints.up('md')]: {
            width: '40%',
            height: '90%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        flex: '1 1 auto',


        margin: 5,
        padding: '10px 10px 10px 30px',
        borderRadius: 10,
    },
    summarybox: {
        [theme.breakpoints.up('xs')]: {

            height: '30%',
        },
        [theme.breakpoints.up('md')]: {
            height: '48%',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'flex-start',
        flex: '1 1 auto',
        width: '98%',

        margin: 10,
        padding: '20px 20px 20px 50px',
        borderRadius: 10,

    }
}));

const Tools = () => {
    const classes = useStyles();
    const { appstate, dispatch } = useContext(AppContext);

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    return (
        <Grid2>

            <Box className={classes.bannerpanel} >
                <Paper className={classes.banner} elevation={3}>
                    <CalculatorsDash />
                    <Alert open={appstate.alert.mesg} handleClose={() => dispatch({ type: 'ALERT', open: false, data: "" })}>
                        {appstate.alert.mesg}
                    </Alert>
                </Paper>
            </Box>

            <Box className={classes.centerpanel} >
                <Paper className={classes.center} elevation={3}>

                    {
                        useMediaProp('md')
                            ?
                            <>
                                <Paper className={classes.resultbox} elevation={0}>
                                    <Box width="80%">
                                        <ResultsBox calc={{ ...appstate.calc }} />
                                    </Box>
                                </Paper>
                                <Paper className={classes.resultbox} >
                                    Get these reports in an email.
                                <TextF label="Email Id" />
                                    <Button>Subscribe</Button>
                                    <img src="./img/savemax/savemax_phone.jpg" width="100%" style={{borderRadius:15}} />
                                </Paper>
                            </>
                            :
                            <>
                                <Paper className={classes.resultbox} elevation={0}>
                                    <Box width="80%">
                                        <ResultsBox calc={{ ...appstate.calc }} />
                                    </Box>
                                    <Box>
                                        Get these reports in an email.
                                    <TextF label="Email Id" />
                                        <Button>Subscribe</Button>
                                        </Box>
                                </Paper>




                            </>

                    }


                </Paper>
            </Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    One
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Two
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Three
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    four
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Five
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    Six
          </Paper>
            </Box>

        </Grid2>
    );

}

export default Tools;

