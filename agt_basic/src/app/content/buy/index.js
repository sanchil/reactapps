import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid4 from '../../components/grids/grid4';
import { Box, Paper } from '@material-ui/core';
import theme from '../../../theme';
import * as astyles from '../../components/styles';
import { SimpleCard, PolaroidCards } from './components';
import { ImgGridCloud } from '../../components/grids/imgrid/cloudgrid';
import OverLay from '../../components/overlay';
import Neighbourhood from '../neighbourhood';
import { Cnv } from '../../components/cnvimg';
import { getHomes, getHome, getHomesE, testCouchdb } from '../../data/db/queries';
import { SlideStrip } from '../../components/imgslider/slidestrip';
//import { ImgSlider } from '../../components/imgslider';
import { useMediaProp } from '../../lib/userhooks';
import { AppDetails } from '../../components/imgslider/slider';
import { AppContext } from '../../state/appcntxt';


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
        padding: '20px 20px 20px 50px',
    },
    headerpanel: astyles.headerpanel(theme),
    bannerpanel: {
        ...astyles.bannerpanel(theme),
        [theme.breakpoints.up('xs')]: {
            margin: '10px 5px 5px',

        },
        [theme.breakpoints.up('sm')]: {
            margin: '15px 10px 10px',
        },
        [theme.breakpoints.up('md')]: {
            margin: '50px 30px 10px',
        },
    },
    banner: {
        ...astyles.banner(theme),
        [theme.breakpoints.up('xs')]: {
            // margin: 3,
            //  padding: '5px 5px 5px 10px',
            margin: 0,
            //   height: 2400,
        },
        [theme.breakpoints.up('sm')]: {
            //  margin: 5,
            //   padding: '10px 10px 10px 25px',
            margin: 0,
            //     height: 1600,
        },
        [theme.breakpoints.up('md')]: {
            //       margin: 10,
            //     padding: '20px 20px 20px 50px',
            margin: 0,
            //  height: 1000,
        },

        flex: 'auto',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        //   padding: 10,
        padding: 0,
        // border:'4px dotted orange'

    },
    centerpanel: astyles.centerpanel(theme),
    center: {
        ...astyles.center(theme),
        [theme.breakpoints.up('xs')]: {
            margin: 3,
            padding: '5px 5px 5px 5px',
            height: 300,
        },
        [theme.breakpoints.up('sm')]: {
            margin: 5,
            padding: '10px 10px 10px 10px',
            height: 350,
        },
        [theme.breakpoints.up('md')]: {
            margin: 10,
            padding: '20px 20px 20px 20px',
            height: 400,
        },
    },
    panel: astyles.panel(theme),
    panel1: astyles.panel1(theme),

    card: astyles.polaroid(theme),



}));

const Buy = () => {
    const classes = useStyles();
    //  const [dataUrlArray, setDataUrlArray] = useState([]);
    //  const [dataUrlNewArray, setDataUrlNewArray] = useState([]);
    //   const [homes, setHomes] = useState([[],[],[],[],[],[],[],[],[]]);
    const [homes, setHomes] = useState([]);
    const [homeList, setHomeList] = useState([]);
    const xsUp = useMediaProp('xs');
    const mdUp = useMediaProp('md');
    let boolSize = (xsUp && mdUp);



    const { pathname } = useLocation();


    useEffect(() => {
        window.scrollTo(0, 0);
        /*   setDataUrlArray([
              "./img/savemax/home9.jpg",
              "./img/savemax/home2.jpg",
              "./img/savemax/home3.jpg",
              "./img/savemax/home4.jpg",
              "./img/savemax/home5.jpg",
              "./img/savemax/home6.jpg",
              "./img/savemax/home7.jpg",
              "./img/savemax/home8.jpg",
              "./img/sample/beach1.jpg",
          ]); */


    }, [pathname]);

    /*   useEffect(() => {
  
           let abortController = new AbortController();
          getHomes({ limit: 9 }, { signal: abortController.signal })
              .then(blobArr => setDataUrlArray(blobArr))
              .catch(err => { console.log('Error fetching image blobs' + err.message); });
  
          return function cleanup() {
              abortController.abort();
          };
   
      }, []);
   */

    useEffect(() => {
        let abortController = new AbortController();
        getHomes({ limit: 9, include_docs: true, attachments: true, binary: true }, { signal: abortController.signal })
            .then(res => {
                //console.log('GEtting homes:'+ JSON.stringify(res));
                setHomes(res);
            })
            .catch(err => console.log("Error handling documents" + err.message));
        return () => {
            abortController.abort();
        }
    }, []);



    /*     const getBlobUrlArr = (homes) => {
   
           if (homes && homes.length !== 0) {
               return homes.map(home => {
                   if (home._attachments) {
                       const keys = Object.keys(home._attachments);
                       if (typeof keys !== 'undefined') {
                           return blobUtil.createObjectURL(home._attachments[keys[0]].data);
                       }
   
                   } else {
                       return "";
                   }
               });
           } else {
               return [];
           }
       }
   
       let homeArr = useMemo(() => getBlobUrlArr(homes), [homes]);
    
    */

    useEffect(() => {
        setHomeList([
            {
                src: "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",

            },
            {
                src: "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/clouds-daylight-forest-grass-371589.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/clouds-daylight-forest-grass-371589.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },
            {
                src: "./img/stock/fly1.jpg",
                title: "home",
                name: "page1",
                briefdescr: "A beautiful home",
                price: "1000000",
                area: "5000",
                baths: 10,
                beds: 9,
                garages: 10,
                address: "3800 Washington St \
                              San Francisco, CA 94118",
                location: " A superb location in BC Vancouver ",
            },

        ]);

    }, []);


    useEffect(() => {
        testCouchdb()
            .then(res => console.log("Couchdb response: " + JSON.stringify(res)));
    }, []);


    return (
        <Grid4>

            <Box className={classes.headerpanel} >
                <Paper elevation={3} style={{ borderRadius: 15, }}>
                    <img src="./img/savemax/banner2.jpg" width="100%" height="100%" style={{ borderRadius: 15 }} />

                </Paper>
            </Box>

            <Box className={classes.bannerpanel} >

                <Paper className={classes.banner} elevation={3}>
                    {/* <ImgGrid srcArr={dataUrlArray}> */}
                    {/*    <ImgGrid srcArr={getBlobUrlArr(homes)}> */}
                    {/*     <ImgGrid srcArr={homeArr}>  */}
                    <ImgGridCloud homesArr={homes}>
                    </ImgGridCloud>
                    <OverLay>
                        <AppDetails />
                    </OverLay>
                </Paper>
            </Box>

            <Box className={classes.centerpanel} >
                {/*     <Paper className={classes.center} elevation={3}>  */}
                {(boolSize)
                    ?
                    <SlideStrip info={homeList} />
                    :
                    <Paper className={classes.center} elevation={3}>
                        {/* <ImgSlider /> */}
                    </Paper>
                }

                {/*   </Paper>  */}
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
                
                </Paper>
            </Box>
            <Box className={classes.panel}>
                <Paper className={classes.panel1} elevation={3}>
                  
                </Paper>
            </Box>

            <Neighbourhood />



        </Grid4>
    );

}

export default Buy;
