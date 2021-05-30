import React, { useEffect, createRef, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../components/grids/grid2';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import theme from '../../theme';
import * as astyles from '../../components/styles';
import { useMediaProp } from '../../lib/userhooks';
import pencils from './img/pencils.jpg';
import { blue, yellow, amber } from '@material-ui/core/colors';
import { TextF } from '../../components/datacomponents/inputcomponents';
import { AppContext } from '../../state/appcntxt';
import { TypoHeader } from './components';
import {addContact} from '../../data/db/queries';





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
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    bannerpanel: astyles.bannerpanel(theme),

    banner: {
        ...astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 3,
            padding: '5px 5px 5px 10px',
            height: 350,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 5,
            padding: '10px 10px 10px 25px',
            height: 400,

        },
        [theme.breakpoints.up('md')]: {
            margin: 10,
            padding: '20px 20px 20px 50px',
            height: 500,

        },
        backgroundImage: `url(${pencils})`,
        backgroundSize: 'cover',
        //   border:'2px solid red',

    },
    centerpanel: astyles.centerpanel(theme),
    center: {
        ...astyles.center(theme),

        [theme.breakpoints.up('xs')]: {

            // margin: 3,
            //    padding: '5px 5px 5px 10px',
            height: 300,
        },
        [theme.breakpoints.up('sm')]: {

            // margin: 5,
            //  padding: '10px 10px 10px 20px',
            height: 350,
        },
        [theme.breakpoints.up('md')]: {


            //margin: 10,
            //padding: '20px 20px 20px 50px',
            height: 400,
        },
   //     backgroundImage: `url(${fieldsimg})`,
    //    backgroundSize: 'cover',

    },
    centercontent: {
        ...astyles.colstyle(theme),
        margin: 0,
        justifyContent: 'space-between',


    },
    centerheader: {
        ...astyles.rowstyle(theme),
        margin: 0,
        width: '100%',
        maximize: '100%',
        height: '25%',
        fontFamily: '"Open Sans", sans-serif',
        color: 'white',
        textShadow: '3px 3px 20px rgba(20,20,200,0.8)',
        borderBottom: '1px solid rgba(220,220,220,0.8)',


    },
    centerbody: {
        ...astyles.rowstyle(theme),
        margin: 0,
        width: '100%',
        maximize: '100%',
        height: '50%',
    },
    centerbodysection: {
        ...astyles.rowstyle(theme),
        fontFamily: '"Open Sans", sans-serif',
        color: 'white',
        fontSize:'1.5em',
        fontWeight:400,
       // textShadow: '3px 3px 20px rgba(20,20,200,0.8)',
       
        width: '50',
        maximize: '50%',
        height: '100%',
    },
    centercontrol: {
        ...astyles.rowstyle(theme),
        margin: 0,
        width: '100%',
        maximize: '100%',
        height: '15%',
    },
    centerfooter: {
        ...astyles.rowstyle(theme),
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        margin: 0,
        width: '100%',
        maximize: '100%',
        height: '10%',
    },
    bannerinfo: {
        ...astyles.colstyle(theme),
        // margin: 0,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width: '35%',
        maxWidth: '35%',
        height: '80%',
        //margin: 'auto',
        padding: '10px 10px 10px 30px',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },

    bannerinfocontent: {
        ...astyles.colstyle(theme),
        margin: 0,
        width: '35%',
        maxWidth: '35%',
        height: '80%',
        margin: 'auto',
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    bannerform: {
        ...astyles.rowstyle(theme),

        [theme.breakpoints.up('xs')]: {
            width: '95%',
            maxWidth: '95%',
            padding: '5px 5px 5px 10px',
            height: '80%',

        },
        [theme.breakpoints.up('md')]: {
            width: '60%',
            maxWidth: '60%',
            height: '80%',
            padding: '30px 20px 30px 80px',
        },
        // margin: '10px 10px 20px 20px',
        margin: 'auto',
        backgroundColor: yellow[400],
        opacity: 0.7,


    },
    formheader: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '95%',
            maxWidth: '95%',
            padding: '5px 5px 5px 10px',

        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
            maxWidth: '80%',
            padding: '10px 10px 10px 20px',

        },
    },
    formcontent: {
        ...astyles.rowstyle(theme),
        [theme.breakpoints.up('xs')]: {
            width: '95%',
            maxWidth: '95%',
            padding: '5px 5px 5px 10px',

        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
            maxWidth: '80%',
            padding: '10px 10px 10px 20px',
        },
        margin: 0,

    },

    button: {
        backgroundColor: blue[200],
        /*   '&:hover':{
           backgroundColor:blue[50],
          } */
    }




}));

const Sell = () => {
    const classes = useStyles();

    const fnameRef = createRef();
    const lnameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const { pathname } = useLocation();
    const { appstate, dispatch } = useContext(AppContext);




    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    const handleSubmit = () => {
        const contactObj = {}
        contactObj.subtype = 'SELLCONTACT';
        contactObj.dataorigin = 'sell';
        contactObj.fname = fnameRef.current.value;
        contactObj.lname = lnameRef.current.value;
        contactObj.email = emailRef.current.value;
        contactObj.phone = phoneRef.current.value;
        //  console.log("form data : " + JSON.stringify(contactObj));

        addContact(contactObj)
            .then(res => {
                dispatch({ 'type': 'ALERT', 'open': true, 'data': 'Contact added. Thank you' });
            })
            .catch(err => console.log("Contact add error: " + err.message));
    }


    return (
        <Grid2>

            <Box className={classes.bannerpanel} >

                <Paper className={classes.banner} elevation={3}>
                    {useMediaProp('md') ?
                        <>
                            <Paper className={classes.bannerinfo} elevation={3}>
                                <Box>
                                    <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
                                        How much is my home worth?
                                        </Typography>
                                    <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
                                        How much will it fetch in the market?
                                    </Typography>
                                    <Typography variant="h6" gutterBottom style={{ textAlign: 'justify' }}>
                                        Is there anything I could do to maximize my price?
                                    </Typography>
                                    All of this and more... !!!
                                    Get your questions answered now by putting an expert on the job.

                                </Box>
                            </Paper>
                            <Paper className={classes.bannerform} elevation={3}>

                                <Box className={classes.formheader} >

                                    <Typography variant="h4" style={astyles.headerFontYellowtail} gutterBottom>
                                        Contact Us
                                    </Typography>


                                </Box>
                                <Box className={classes.formcontent} >
                                    <TextF ref={fnameRef} label="First Name" width="80%" />
                                    <TextF ref={lnameRef} label="Last Name" width="80%" />
                                    <TextF ref={phoneRef} label="Phone" width="80%" />
                                    <TextF ref={emailRef} label="Email Id" width="80%" />




                                </Box>
                                <Box className={classes.formcontent} style={{ paddingLeft: 300 }} >
                                    <Button
                                        classes={{ 'contained': classes.button }}
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        Submit
                                        </Button>
                                </Box>
                            </Paper>
                        </>
                        :
                        <>
                            <Box className={classes.formheader} >
                                <Typography variant="h4" style={astyles.headerFontYellowtail} gutterBottom>
                                    Contact Us
                                    </Typography>
                            </Box>
                            <Box className={classes.formcontent} >
                                <TextF ref={fnameRef} label="First Name" />
                                <TextF ref={lnameRef} label="Last Name" />
                                <TextF ref={phoneRef} label="Phone" />
                                <TextF ref={emailRef} label="Email Id" />

                            </Box>
                            <Box className={classes.formcontent} style={{ paddingLeft: 200 }} >
                                <Button
                                    classes={{ 'contained': classes.button }}
                                    variant="contained"
                                    onClick={handleSubmit}
                                >Submit</Button>
                            </Box>
                        </>
                    }

                </Paper>

            </Box>

            <Box className={classes.centerpanel} >

                <Paper className={classes.center} elevation={3}>
                    <Box className={classes.centercontent}>
                        <Box className={classes.centerheader}>
                            <Typography variant="h3" gutterBottom>
                                The HGill advantage
                    </Typography>
                        </Box>
                        <Box className={classes.centerbody}>
                            <Box className={classes.centerbodysection}>
                            
                            </Box>
                            <Box className={classes.centerbodysection}>
                         
                            </Box>

                        </Box>
                        <Box className={classes.centercontrol}>

                        </Box>
                        <Box className={classes.centerfooter}>
                            <Button variant="contained" color="primary" style={{ margin: 0, width: "12%", borderBottomRightRadius: 15 }}>
                                List My Home
                            </Button>
                        </Box>
                    </Box>

                </Paper>
            </Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3} style={{ margin: 0, padding: 0 }}>

                    <img src="./img/savemax/free_eval.jpg" width="100%" height="100%" style={{ borderRadius: 15 }} />
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                    <Typography variant="h4" style={astyles.headerFontYellowtail} gutterBottom>
                        Open house every weekend until sold !!!
                    </Typography>




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

export default Sell;
