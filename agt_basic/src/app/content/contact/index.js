import React, { createRef, useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid2 from '../../components/grids/grid2';
import { Box, Paper, Button, useMediaQuery, Typography, TextareaAutosize } from '@material-ui/core';
//import { TextF } from './components';
import { TextF } from '../../components/datacomponents/inputcomponents';
import { addContact } from '../../data/db/queries';
import theme from '../../../theme';
import { useMediaProp } from '../../lib/userhooks';

import * as astyles from '../../components/styles';
import { AppContext } from '../../state/appcntxt';
import Alert from '../../components/snacks';

import Slide from '@material-ui/core/Slide';
import Grow from '@material-ui/core/Grow';
import pencils from './img/pencils.jpg';

import { blue, yellow, amber } from '@material-ui/core/colors';


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

function GrowTransition(props) {
    return <Grow {...props} />;
}

const handleClick = Transition => () => {
    setState({
        open: true,
        Transition,
    });
};


const useStyles = makeStyles(() => ({
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
            margin: 3,
            padding: '5px 5px 5px 10px',
            height: 400,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 5,
            padding: '10px 10px 10px 25px',
            height: 450,
        },
        [theme.breakpoints.up('md')]: {
            margin: 10,
            padding: '20px 20px 20px 50px',
            height: 600,
        },
        backgroundImage: `url(${pencils})`,
        backgroundSize: 'cover',
    },
    centerpanel: astyles.centerpanel(theme),
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),
    center: astyles.center(theme),
    bannerform: {
        ...astyles.rowstyle(theme),

        [theme.breakpoints.up('xs')]: {
            width: '95%',
            maxWidth: '95%',
            padding: '5px 5px 5px 10px',
            margin: '10px 20px 20px 50px',

        },
        [theme.breakpoints.up('sm')]: {
            width: '90%',
            maxWidth: '90%',
            padding: '10px 15px 10px 35px',
            margin: '10px 20px 20px 100px',
        },
        [theme.breakpoints.up('md')]: {
            width: '80%',
            maxWidth: '80%',
            padding: '20px 30px 20px 70px',
            margin: '10px 20px 20px 400px',
        },

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

    },

    button: {
        backgroundColor: blue[200],
        /*   '&:hover':{
           backgroundColor:blue[50],
          } */
    }


}));

const Contact = () => {




    const fnameRef = createRef();
    const lnameRef = createRef();
    const emailRef = createRef();
    const phoneRef = createRef();
    const mesgRef = createRef();
    const { pathname } = useLocation();
    const { appstate, dispatch } = useContext(AppContext);
    const [transition, setTransistion] = useState(GrowTransition);
    //console.log('calling contact');
    //console.log(" New state after : " + JSON.stringify(appstate));
    const classes = useStyles();


    const handleSubmit = () => {
        const contactObj = {}
        contactObj.subtype = 'CONTACT';
        contactObj.dataorigin = 'contact';
        contactObj.fname = fnameRef.current.value;
        contactObj.lname = lnameRef.current.value;
        contactObj.email = emailRef.current.value;
        contactObj.phone = phoneRef.current.value;
        contactObj.mesg = mesgRef.current.value;
        //  console.log("form data : " + JSON.stringify(contactObj));

        addContact(contactObj)
            .then(res => {

                dispatch({ 'type': 'ALERT', 'open': true, 'data': 'Contact added. Thank you' });
            })
            .catch(err => console.log("Contact add aeeor: " + err.message));
    }

    const handleChange = e => {
        //   let txt = e.target.value;
           
           
       
    }


    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);



    return (
        <Grid2>

            <Box className={classes.bannerpanel} >

                <Paper className={classes.banner} elevation={3}>
                    {useMediaProp('sm') ?
                        <Paper className={classes.bannerform} elevation={3}>
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
                                <textarea ref={mesgRef}
                                    rows="4"
                                    cols="40"
                                 
                                    placeholder="Please add a message"
                                    defaultValue="" />



                            </Box>
                            <Box className={classes.formcontent} style={{ paddingLeft: 350 }} >
                                <Button
                                    classes={{ 'contained': classes.button }}
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                        </Button>
                            </Box>
                        </Paper>
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
                                <textarea ref={mesgRef}
                                    rows="4"
                                    cols="40"                                 
                                    placeholder="Please add a message"
                                    defaultValue="" />


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
                    Center Panel
          </Paper>
            </Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>


                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>

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


                    <Alert open={appstate.alert.open} handleClose={() => { dispatch({ type: 'ALERT', open: false, data: 'Contact has been added' }) }}>
                        {appstate.alert.mesg}
                    </Alert>


                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>

                </Paper>

            </Box>


        </Grid2>
    );

}

export default Contact;
