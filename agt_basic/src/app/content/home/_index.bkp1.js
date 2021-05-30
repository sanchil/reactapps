import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeGrid from '../../components/grids/homegrid';
import { Banner } from '../../components/banner';
import { CenterPanel } from '../../components/centerpanel';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import theme from '../../theme';
import { useSpring, animated, config } from 'react-spring';
import * as astyles from '../../components/styles';
import { useMediaProp } from '../../lib/userhooks';
import { Cnv } from '../../components/cnvimg';
import { TypoHdMerriweather, Button1 } from '../../components/styles/styledcomponents';
import { useAppContext } from '../../lib/userhooks';

import { getAmzUser } from '../../data/auth/amzauth';
import { getEmailUser, getEmailUserSvr } from '../../data/auth/googleauth';
import { getFBUser } from '../../data/auth/fbauth';

import { setRedis } from '../../data/db/queries';
import { setCookie, processAccessToken } from '../../lib/utils';





const useStyles = makeStyles(theme => ({
  root: {

  },
  bannerpanel: {
    boxSizing: 'border-box',
    flexGrow: 1,

  },
  centerpanel: {
    boxSizing: 'border-box',
    display: 'flex',

    flex: 'auto',


  },

  centerpanelbox: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '30%',
    maxWidth: '30%',
    height: '80%',
    margin: 'auto',
    boxShadow: '0px 0px 25px rgba(200,200,200,0.5)',
    borderRadius: 3,
    backgroundColor: 'rgb(255,255,255)',
  },
  centerpanelboxtop: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    maxWidth: '90%',
    height: '40%',
    margin: 'auto',
    borderBottom: "1px solid rgb(200,200,200)",


  },
  centerpanelboxbottom: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '90%',
    maxWidth: '90%',
    height: '60%',
    margin: 'auto',

  },

  panel: astyles.panel(theme),
  panel1: astyles.panel1(theme),
  bannerimg: {
    width: '100%',
    height: 'auto',

  }

}));

const Home = (props) => {
  const classes = useStyles();
  const p = useSpring({ to: { opacity: 1.0 }, from: { opacity: 0.0 }, config: { duration: 3000 } });
  const history = useHistory();
  const { appstate, dispatch } = useAppContext();

 // console.log('User: ' + JSON.stringify(appstate.user));

  const location = useLocation();

  // console.log('HOME Location: ' + JSON.stringify(location));


  


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {

    if (location.pathname === '/auth'
      // && location.hash 
      // && (typeof location.hash !== 'undefined')
      //&& location.hash !== ""
    ) {

    //   console.log("Google agtSession data: " + agtSessData['access_token']);
      // processGToken(location);
      processAccessToken(location, 'googleToken',agtSessData);

     // console.log('google token: local storage: '+ localStorage.getItem('googleToken'));

      /* getEmailUser()
       .then(res => {
         //   console.log("ID is : "+ JSON.stringify(res));
         console.log('Google user: ' + JSON.stringify(res));
         setCookie('sessid', 'SESSION_GOOGLE_' + res.id);
         setRedis('SESSION_GOOGLE_' + res.id, res);
         dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_GOOGLE_' + res.id, source: 'google', sessdata: {}, data: res });
       }); */

      if (agtSessData['access_token']) {

        getEmailUserSvr(agtSessData['access_token'])
          .then(res => {

            //   console.log("ID is : "+ JSON.stringify(res));
            //console.log('Google user: ' + JSON.stringify(res));
            setCookie('sessid', 'SESSION_GOOGLE_' + res.id);
            setRedis('SESSION_GOOGLE_' + res.id, res);
            dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_GOOGLE_' + res.id, source: 'google', sessdata: {}, data: res });


          })
          .catch(err => { console.log("Error: " + JSON.stringify(err)) });
      } else {

      }

    }

    if (
      location.pathname === '/fbauth' &&
      location.hash &&
      (typeof location.hash !== 'undefined') &&
      location.hash !== "") {
      console.log('Calling save fb code');
      //   getFBAccessToken(location);
      processAccessToken(location, 'fbToken');
      /* .then(()=>{
       console.log('Access token long life: '+ localStorage.getItem('fb_accesstoken_long'));
     });  */

      //   console.log('FB Access token: '+ localStorage.getItem('fb_accesstoken'));


      /* getFBAccessTokenFromCode(location)
       .then(()=>{
       // console.log('Access token: '+ localStorage.getItem('fb_accesstoken'));
      }); */
      // if(localStorage.getItem('fb_accesstoken')){
      //   const fbAccessToken = JSON.parse(localStorage.getItem('fb_accesstoken'));

      //   if(fbAccessToken.access_token){
      //     console.log('FB Access token: '+ fbAccessToken.access_token);
      //getFBUser('EAAIojKWrSbABAIpoo85H2ZCKFmvDvsrf2ZCfYDQofHPUbzc8oKZAkGdZA2oEq6j22ZASCNIfqWHPsP9qQU4sYPRZCjbY01sThsQM3yI4lOQAryXKdNfsLZCWGnCBdMRe2lIiDHxaEaTZC0Eib12tht8dVA6QqOa5oI01XRDgsc0FqinGzYanJom2')

      getFBUser()
        .then(res => {
          console.log('FB user: ' + JSON.stringify(res));
          setCookie('sessid', 'SESSION_FB_' + res.id);
          setRedis('SESSION_FB_' + res.id, res);
          dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_FB_' + res.id, source: 'facebook', sessdata: {}, data: res });
        });

      // }
      /* 
      
    */
      // }





    }
    //    console.log('Call FB to process the token after:: '+ localStorage.getItem('fb_code'));


    if (location.pathname === '/amzauth' &&
      location.hash &&
      (typeof location.hash !== 'undefined') &&
      location.hash !== "") {

      processAccessToken(location, 'amzToken');

      getAmzUser()
        .then(res => {
          console.log("Amazon response is " + JSON.stringify(res));
          setCookie('sessid', 'SESSION_AMZ_' + res.user_id);
          setRedis('SESSION_AMZ_' + res.user_id, res);
          dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_AMZ_' + res.user_id, source: 'amazon', sessdata: {}, data: res });
        })

      /*   getEmailUser()
          .then(res => {
            //   console.log("ID is : "+ JSON.stringify(res));
            console.log('Google user: '+ JSON.stringify(res));
            setCookie('sessid', 'SESSION_GOOGLE_' + res.id);
            setRedis('SESSION_GOOGLE_' + res.id, res);
            dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_GOOGLE_' + res.id, source: 'google', sessdata: {}, data: res });
          }); */
    }


    if (location.pathname === '/twauth') {

      // console.log("Twitter agtSession data: "+ JSON.stringify(agtSessData));

      processAccessToken(location, 'twToken', agtSessData.data);
      let sessObj = localStorage.getItem('twToken');

      if (sessObj) {
        sessObj = JSON.parse(sessObj);


        setCookie('sessid', 'SESSION_TW_' + sessObj.user_id);
        setRedis('SESSION_TW_' + sessObj.user_id, sessObj);
        dispatch({ type: 'LOGIN', login: true, sessid: 'SESSION_TW_' + sessObj.user_id, source: 'twitter', sessdata: {}, data: sessObj });

        console.log("Stored twitter tokens are : " + JSON.stringify(sessObj));
      }

      /*  const secregex = /(oauth_token_secret=)(.+)(&)/g;
       const tkregex = /(oauth_token=)(.+)(&)/g;
       const verifierregex = /(oauth_verifier=)(.+)/g;
 
       try {
 
         const str = location.search.substring(1);
         const tksecret = secregex.exec(agtSessData.data)[2];
 
         console.log("Substring secret: " + tksecret);
 
         console.log("Twitter Session Status: " + agtSessData.data);
 
         delete window.agtSessData;
       } catch (err) {
         console.log("AgtSessData Session data from windows is undefined ");
       }
  */


    }


  }, [location.pathname]);


  return (
    <HomeGrid>
      <Box className={classes.bannerpanel}>
        <Banner />
      </Box>

      <Box className={classes.centerpanel}>
        <CenterPanel >
          {useMediaProp('md')
            ?
            <>
              <Box className={classes.centerpanelbox}>
                <Box className={classes.centerpanelboxtop}>
                  <TypoHdMerriweather fsize={2}>
                    All houses sold
                  </TypoHdMerriweather>
                </Box>
                <Box className={classes.centerpanelboxbottom}>
                  <Typography variant="body1" gutterBottom>
                    Check out all the properties we sold in the recent past.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => history.push('/registerproperty')}>
                    See Homes sold
                  </Button>
                </Box>
              </Box>
              <Box className={classes.centerpanelbox}>
                <Box className={classes.centerpanelboxtop}>
                  <TypoHdMerriweather fsize={2}>
                    Free counselling
                    </TypoHdMerriweather>
                </Box>
                <Box className={classes.centerpanelboxbottom}>
                  <Typography variant="body1" gutterBottom>
                    Are you ready to take in the plunge. Have you work out the specifics?
                    Why not get in touch with us for some free counselling.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => history.push('/contact')}>
                    Get in touch
                  </Button>
                </Box>
              </Box>
              <Box className={classes.centerpanelbox}>
                <Box className={classes.centerpanelboxtop}>
                  <TypoHdMerriweather fsize={2}>
                    List my property
                    </TypoHdMerriweather>
                </Box>
                <Box className={classes.centerpanelboxbottom}>
                  <Typography variant="body1" gutterBottom>
                    Why not list your property with us and see the benefits for yourself.
                  </Typography>
                  <Button variant="contained" color="primary" onClick={() => history.push('/registerproperty')}>
                    List my property
                  </Button>
                </Box>
              </Box>
            </>
            :

            <animated.img src='./img/savemax/SaveMaxLogo.png' width="100%" height="40%" style={p} />


          }


        </CenterPanel>

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
      <Box className={classes.centerpanel}>
        <CenterPanel>
          <img className={classes.bannerimg} src='./img/aboutme/harpreet_gill_banner.1.jpg' />
          {/*useMediaProp('md')
            ?
            <img className={classes.bannerimg} src='./img/aboutme/harpreet_gill_banner.1.jpg'  /> 
            :

            <img src='./img/aboutme/harpreet_gill.1.2.jpg' width="auto" height="100%"  /> 


        */}


        </CenterPanel>
      </Box>

    </HomeGrid>
  );

}

export default Home;

const AnimHeader = (props) => {

  return (
    <Typography variant="h4" gutterBottom style={{ opacity: props.opacity }}>
      I am about to be animated
    </Typography>
  );
}
