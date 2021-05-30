import React, {useState, useEffect, createRef, useCallback} from 'react';
import {useLocation, useHistory} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid2 from '../../components/grids/grid2';
import { Box, Paper, Typography } from '@material-ui/core';
import { MediaCard, Testimonial } from './components';
import theme from '../../../theme';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import withWidth from '@material-ui/core/withWidth';
import {indigo} from '@material-ui/core/colors';
import {Slide} from './components';
import * as astyles from '../../components/styles';
import {Cnv} from '../../components/cnvimg';
import fieldsimg from './img/fields.2.jpg';
import sunskyimg from './img/sky_sunny.jpg';
import {useMediaProp,useScreen} from '../../lib/userhooks';
import {ImgSlider} from '../../components/imgslider';
import {useIntersection} from '../../lib/userhooks';
import OverLay from '../../components/overlay';





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
    bannerpanel:astyles.bannerpanel(theme),
    banner:{ 
        ... astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            marginTop: 10,
            padding: 0,
            height: 300,
        },
        [theme.breakpoints.up('sm')]: {
            marginTop: 20,
            padding: 0,
            height: 400,
        },
        [theme.breakpoints.up('md')]: {
            marginTop: 30,
            padding: 0,
            height: 500,
        }, 
      
        backgroundImage: `url(${sunskyimg})`,
        backgroundSize: 'cover',
     
        
    },
    centerpanel: astyles.centerpanel(theme),
    center: {
        ...astyles.center(theme),

        [theme.breakpoints.up('xs')]: {

            // margin: 3,
            //    padding: '5px 5px 5px 10px',
            height: 400,
        },
        [theme.breakpoints.up('sm')]: {

            // margin: 5,
            //  padding: '10px 10px 10px 20px',
            height: 350,
        },
        [theme.breakpoints.up('md')]: {


            //margin: 10,
            //padding: '20px 20px 20px 50px',
            height: 450,
        },
        backgroundImage: `url(${fieldsimg})`,
        backgroundSize: 'cover',

    },
    centercontent: {
        ...astyles.colstyle(theme),
        margin: 0,
        justifyContent: 'space-between',


    },
    centerheader: {
        ...astyles.rowstyle(theme),
        justifyContent:'flex-start',
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
        [theme.breakpoints.up('xs')]: {

            width: '100%',
            maximize: '100%',
            height: '50%',
            fontSize:'1.1em',
        },
        [theme.breakpoints.up('sm')]: {

            width: '50%',
            maximize: '50%',
            height: '100%',
            fontSize:'1.3em',
        },
        [theme.breakpoints.up('md')]: {


            width: '50%',
            maximize: '50%',
            height: '100%',
            fontSize:'1.5em',
        },
        fontFamily: '"Open Sans", sans-serif',
        color: 'white',
      
        fontWeight:400,
       // textShadow: '3px 3px 20px rgba(20,20,200,0.8)',
       
  
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
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),  
    bannerimgbox: {
     
        flexFlow: 'row wrap',
        width: '20%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 0,
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',        
        backgroundColor: 'rgb(255,255,100)',
    //    border:'3px solid red',
    },

    bannerimg: {

        maxHeight: '100%',
        width: 'auto',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        borderTopRightRadius: 0,
        objectFit:'cover',



    },
    bannerinnercontent:{
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        width:'60%',
        maxWidth:'60%',
        height:'60%',

    },
    bannercontent: {
        [theme.breakpoints.up('xs')]: {
            flexFlow: 'column nowrap',
            width: '100%',
            height: '60%',
            borderTopRightRadius: 0,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
        },
        [theme.breakpoints.up('sm')]: {
            flexFlow: 'row wrap',
            width: '60%',
            height: '100%',
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 0,
        },
        display: 'flex',
        flexFlow: 'row wrap',
        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: 'rgba(230,230,230,0.0)'
    },
    divider:{
        margin:'auto',
        height:'70%',
        backgroundColor:indigo[200],
        width: 2,
        margin:'auto auto auto 50px'
    },
 

}));

const AboutMe = (props) => {
    const classes = useStyles();
    const w = props.width;
    const {pathname} = useLocation();
    const history = useHistory();
    const scr = useScreen();
   // console.log("Screen size: "+JSON.stringify(scr));     
    const sizexs =  useMediaProp('xs');
    const sizemd =    useMediaProp('md');
    const sizebool =  sizexs&&sizemd;

    const [live,setLive] = useState(false);

  /*   const sliderRef = useCallback(node=>{
        if(node!==null){
            useIntersection(null,node,[0.0,0.1,0.9,1.0],handleIntersect);
        }
    });

    const handleIntersect = (entries,observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
           
                if(entry.intersectionRatio === 1.0){
                //    console.log("Start slider "+ entry.intersectionRatio);
                    !live?setLive(true):"";           
                //    console.log("Start slider live"+ live);       
                 }
                 
                 if((entry.intersectionRatio < 0.9)){
               //     console.log("Stop slider: "+ entry.intersectionRatio);
                    live?setLive(false):"";
                  //  console.log("Start slider live"+ live);     
                }                
            }
        });
    }
 */

    useEffect(()=>{
        window.scrollTo(0,0);       
    },[pathname]);



    return (
        <Grid2>

            <Box className={classes.bannerpanel} >
                <Hidden smDown>
                    <Paper className={classes.banner} elevation={3}>     
                       <Box  className={classes.bannerimgbox}>
                            <img src='./img/aboutme/hgill.jpg' className={classes.bannerimg} /> 
                       </Box>
                        
                        <Divider className={classes.divider}  orientation="vertical" />
                        <Box className={classes.bannercontent}>
                            <Box  className={classes.bannerinnercontent}>
                            <Typography component="div" align="justify" gutterBottom>
                                <Box letterSpacing={3} m={1} >
                                    Harpreet Gill is a rising star amongst current crop of real estate agents.
                                    He is passionate about his job, and devoted to his clients interests.
                                    He likes to help others in getting the best possible 
                                    deals for his clients. 
                                 
                            </Box>
                                <Box letterSpacing={3} m={1}  >
                                He is skilled in negotiating for best prices for his clients.
                                He is somebody you will want on your side. Call him now today 
                                and get him on your side.
                            </Box>
                            <Box letterSpacing={3} m={1}>
                                   
                            </Box>
                            </Typography>
                            </Box>
                        </Box>
                    </Paper>
                </Hidden>
                <Hidden mdUp>
                    <MediaCard src='./img/aboutme/hgill.jpg' />
                </Hidden>
            </Box>

            <Box className={classes.centerpanel} >

<Paper className={classes.center} elevation={3}>
    <Box className={classes.centercontent}>
        <Box className={classes.centerheader}>
            <Typography variant={sizebool?"h3":"h5"} gutterBottom>
                The HGill advantage ...
            </Typography>
        </Box>
        <Box className={classes.centerbody}>
            <Box className={classes.centerbodysection}>
                
            </Box>
            <Box className={classes.centerbodysection}>
          <ul>
              <li>You gain a friend and a guide by your side</li>
              <li>Powerful negotiator</li>
              <li>Knows the market and the current best prices</li>
              <li>Never push you out of your comfort zone</li>
          </ul>
            </Box>

        </Box>
        <Box className={classes.centercontrol}>

        </Box>
        <Box className={classes.centerfooter}>
            <Button 
                variant="contained" 
                color="primary"
                onClick={()=>{history.push('/registerproperty')}} 
                style={{ margin: 0, width:sizebool?"12%":"40%", borderBottomRightRadius: 15 }}>
                List My Home
            </Button>
        </Box>
    </Box>

</Paper>
</Box>


            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3} style={{margin:0,padding:0}}>
                <ImgSlider  /> 
                <OverLay>
                        Now isthe time.
                    </OverLay>
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                <p>Gill advantage</p>
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}  style={{margin:0,padding:0}}>
                <Testimonial src="./img/aboutme/fly1.jpg">
                <p>Harpreet is the best.</p>
                    <p>He helped us get a good price for our home</p>
                  <p>Highly recommend</p>  
                    </Testimonial>
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3} style={{margin:0,padding:0}}>
                <Testimonial src="./img/aboutme/fly2.jpg">
                <p>Harpreet is the best.</p>
                    <p>He helped us buy a home within our budget 
                        and also guided us on getting 
                        a good mortgage</p>
                        <p>Highly recommend</p>  
                    </Testimonial>
          </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}  style={{margin:0,padding:0}}>
                <Testimonial src="./img/aboutme/mahesh.1.jpg">
                    <p>Harpreet is the best.</p>
                    <p>He helped us get a good price for our home</p>
                  <p>Highly recommend</p>  
                    </Testimonial>
          </Paper>
            </Box>
           

        </Grid2>
    );

}

export default withWidth()(AboutMe);