import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import HomeGrid from '../../components/grids/homegrid';
import { Banner } from '../../components/banner';
import { CenterPanel } from '../../components/centerpanel';
import { Box, Paper, Typography, Button } from '@material-ui/core';
import theme from '../../theme';
//import { useSpring, animated, config } from 'react-spring';
import * as astyles from '../../components/styles';
import { useMediaProp } from '../../lib/userhooks';
import { Cnv } from '../../components/cnvimg';
import { TypoHdMerriweather, Button1 } from '../../components/styles/styledcomponents';
import { useAppContext } from '../../lib/userhooks';

import { getAmzUser } from '../../data/auth/amzauth';
import { getEmailUser, getEmailUserSvr } from '../../data/auth/googleauth';
import { getFBUser, getFBUser1 } from '../../data/auth/fbauth';
import { setRedis } from '../../data/db/queries';
import { setCookie, processAccessToken, getFormattedDate, getFormattedTime } from '../../lib/utils';
import qry from '../../data/db/queries';
import dbObj from '../../data/db/dbobj';





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
  //const p = useSpring({ to: { opacity: 1.0 }, from: { opacity: 0.0 }, config: { duration: 3000 } });
  const history = useHistory();
  const { appstate, dispatch } = useAppContext();

  // console.log('User: ' + JSON.stringify(appstate.user));

  const location = useLocation();

  // console.log('HOME Location: ' + JSON.stringify(location));

  // const socket = io();
  // socket.emit('ok',' a new messate');




  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {

    const dt = new Date();

    if (location.pathname === '/gauth'
      // && location.hash 
      // && (typeof location.hash !== 'undefined')
      //&& location.hash !== ""
    ) {
      let abortController = new AbortController();
      const gUser = dbObj.userObj;

      gUser.type = 'USER';
      gUser.social['source'] = 'google';
      gUser.dataorigin = 'social';
      gUser.dataflow = 'ADDUSER';
      gUser.subtype = 'GOOGLE';
      gUser.status = 'active';
      // gUser.date = getFormattedDate(dt, '/');
      // gUser.time = getFormattedTime(dt, ':');

      gUser.social['idtoken'] = agtSessData.id_token;
      gUser.social['accesstoken'] = agtSessData.access_token;
      gUser.social['refreshtoken'] = agtSessData.refresh_token;
      gUser.social['tokenexpirydate'] = agtSessData.expiry_date;

      processAccessToken(location, 'googleToken', agtSessData);


      if (agtSessData['access_token']) {

        getEmailUserSvr(agtSessData['access_token'])
          .then(res => {
            console.log("G user: " + JSON.stringify(res));
            gUser.fname = res.given_name;
            gUser.lname = res.family_name;
            gUser.socialid = res.id;
            gUser.social['id'] = res.id;
            gUser.social['socialemail'] = res.email;
            gUser.email = res.email;

            // console.log('Google mapped G User: '+ JSON.stringify(gUser));

            // qry.createSession('google',res, dispatch);


            qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
              .then(updateres => {
                console.log("Guser has been updated: " + JSON.stringify(updateres));
                qry.createSession('google', res, dispatch);
              })

          })
          .catch(err => { console.log("Google Auth Error: " + JSON.stringify(err)) });
      }
    }

    if (
      location.pathname === '/fbauth'
      && location.hash
      && (typeof location.hash !== 'undefined')
      && location.hash !== ""
    ) {
      console.log('Calling save fb code');
      let abortController = new AbortController();

      const gUser = dbObj.userObj;
      gUser.type = 'USER';
      gUser.social['source'] = 'facebook';
      gUser.dataorigin = 'social';
      gUser.dataflow = 'ADDUSER';
      gUser.subtype = 'FACEBOOK';
      gUser.status = 'active';
      //   gUser.date = getFormattedDate(dt, '/');
      //   gUser.time = getFormattedTime(dt, ':');



      //  gUser.social['idtoken'] = agtSessData.id_token;

      //  gUser.social['refreshtoken'] = agtSessData.refresh_token;




      processAccessToken(location, 'fbToken');

      let fbToken = localStorage.getItem('fbToken');

      if (fbToken) {
        fbToken = JSON.parse(fbToken);
        gUser.social['accesstoken'] = fbToken.access_token;
        gUser.social['tokenexpirydate'] = fbToken.data_access_expiration_time;

      }

      // console.log("FB token: : "+ fbToken);

      const regex = /(.*)(\s+)(.*)/g;




      getFBUser()
        .then(res => {
          //console.log('FB User: '+JSON.stringify(res));
          let n = regex.exec(res.name);
          //console.log('Name : '+n[1]);
          if (n && n.length > 2) {
            gUser.fname = n[1];
            gUser.lname = n[3];
          } else {
            gUser.name = res.name;
          }


          gUser.socialid = res.id;
          gUser.social['id'] = res.id;
          gUser.social['socialemail'] = res.email;
          gUser.email = res.email;

          //  console.log('Guser for FB: '+ JSON.stringify(gUser));

          qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
            .then(updateres => {
              console.log("FBuser has been updated: " + JSON.stringify(updateres));
              qry.createSession('facebook', res, dispatch);
            })


        });



    }
    //    console.log('Call FB to process the token after:: '+ localStorage.getItem('fb_code'));


    if (location.pathname === '/amzauth') {



      let abortController = new AbortController();
      const regex = /(.*)(\s+)(.*)/g;

      const gUser = dbObj.userObj;
      gUser.type = 'USER';
      gUser.social['source'] = 'amazon';
      gUser.dataorigin = 'social';
      gUser.dataflow = 'ADDUSER';
      gUser.subtype = 'AMAZON';
      gUser.status = 'active';
      // gUser.date = getFormattedDate(dt, '/');
      // gUser.time = getFormattedTime(dt, ':');

      gUser.socialid = agtSessData.amzuser.user_id;
      gUser.social['id'] = agtSessData.amzuser.user_id;
      gUser.social['socialemail'] = agtSessData.amzuser.email;
      gUser.email = agtSessData.amzuser.email;

      gUser.social['accesstoken'] = agtSessData.access_token.access_token;
      gUser.social['refreshtoken'] = agtSessData.access_token.refresh_token;
      gUser.social['tokenexpirydate'] = agtSessData.access_token.expires_in;

      gUser.social['token'] = agtSessData.access_token;
      gUser.social['user'] = agtSessData.amzuser;


      let n = regex.exec(agtSessData.amzuser.name);

      if (n && n.length > 2) {
        gUser.fname = n[1];
        gUser.lname = n[3];
      } else {
        gUser.name = n[0];
      }



      //    console.log("Amazon sess data: "+ JSON.stringify(gUser));


      //  qry.createSession('amazon', agtSessData.amzuser, dispatch);

      qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
        .then(updateres => {
          console.log("Amazon user has been updated: " + JSON.stringify(updateres));
          qry.createSession('amazon', agtSessData.amzuser, dispatch);
        })
    }


    if (location.pathname === '/twauth') {

      // console.log("Twitter agtSession data: "+ JSON.stringify(agtSessData));

      processAccessToken(location, 'twToken', agtSessData.data);

      let sessObj = localStorage.getItem('twToken');


      // console.log("Twitter session obj: "+ JSON.stringify(sessObj));


      let abortController = new AbortController();


      const gUser = dbObj.userObj;
      gUser.type = 'USER';
      gUser.social['source'] = 'twitter';
      gUser.dataorigin = 'social';
      gUser.dataflow = 'ADDUSER';
      gUser.subtype = 'TWITTER';
      gUser.status = 'active';
      //gUser.date = getFormattedDate(dt, '/');
      //gUser.time = getFormattedTime(dt, ':');






      if (sessObj) {
        sessObj = JSON.parse(sessObj);

        gUser.socialid = sessObj.user_id;
        gUser.social['id'] = sessObj.user_id;
        gUser.social['oauthtoken'] = sessObj.oauth_token;
        gUser.social['oauthsecret'] = sessObj.oauth_token_secret;
        gUser.social['token'] = sessObj;
        gUser.name = sessObj.screen_name;


        console.log('Twitter user: ' + JSON.stringify(gUser));


        //  qry.createSession('twitter', sessObj, dispatch);

        qry.addUpdateData('types/users', 'social.id', gUser, { signal: abortController.signal })
          .then(updateres => {
            console.log("Twitter user has been updated: " + JSON.stringify(updateres));
            qry.createSession('twitter', sessObj, dispatch);
          })
      }
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

            /*  <animated.img src='./img/savemax/SaveMaxLogo.png' width="100%" height="40%" style={p} /> */

            /*  <img src='./img/savemax/SaveMaxLogo.png' width="100%" height="40%" style={p} /> */
                <img src='./img/savemax/SaveMaxLogo.png' width="100%" height="40%" />

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
