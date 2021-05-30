import React, { useEffect, useState, createRef, useContext, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//import { animated, useSpring } from 'react-spring';
import { Cnv } from '../cnvimg';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { IconButton, Button } from '@material-ui/core';
import theme from '../../theme';
import { AppContext } from '../../state/appcntxt';
import { useIntersection } from '../../lib/userhooks';
import { useElemDim } from '../../lib/userhooks';
import { purple } from '@material-ui/core/colors';
import { Appcontext } from '../../state/appcntxt';
import BathtubOutlinedIcon from '@material-ui/icons/BathtubOutlined';
import HotelOutlinedIcon from '@material-ui/icons/HotelOutlined';
import DriveEtaIcon from '@material-ui/icons/DriveEta';





const useStripSlider = makeStyles(theme => ({
    root: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        height: '100%',

        // border: '1px solid red',
    },
    /* slidestrip: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',

        overflowX: 'hidden',

        whiteSpace: 'nowrap'
    }, */

    overlay: {
        boxSizing: 'border-box',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        //border:'1px solid red',
        backgroundColor: 'rgba(0,0,0,0.0)',

    }
}));

export const SlideStrip = (props) => {

    let slideLength = 0;
    let slidePortWidth = 0;
    let totalSlideWidth = 0;
    let cumSlideLength = 0; // No of slides to move
    let slideCount = 0;
    let maxSlideCount = 0;
    let SLIDESINVIEWPORT = 4;
    //   const [imgArray, setImgArray] = useState([]);
    const classes = useStripSlider(props);

    const info = props.info;

    /*  const startRef = createRef();
     const endRef = createRef();
 */

/* const [prps, set, stop] = useSpring(() => ({
    from: { transform: 'translate3d(0px,0px,0px)' },
    config: { duration: 500 }
})); */


    const sliderRef = useCallback(elem => {
        slideLength = 0;
        slidePortWidth = 0;
        totalSlideWidth = 0;
        cumSlideLength = 0;
        set({ transform: `translate3d("${cumSlideLength}px","0px","0px")` });
        if (elem !== null) {
            // useIntersection(elem,startRef.current,[0,1.0],handleIntersect);
            totalSlideWidth = elem.scrollWidth;
            slidePortWidth = elem.clientWidth;
        }

    });

    useEffect(() => {
        /*     setImgArray([
                "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
                "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
                "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
                "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
                "./img/stock/clouds-daylight-forest-grass-371589.jpg",
                "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
                "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
                "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
                "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
                "./img/stock/clouds-daylight-forest-grass-371589.jpg",
                "./img/stock/fly1.jpg",
    
            ]); */
    }, []);





  



    /*     const handleIntersect = (entries, observer) => {
           entries.forEach(entry => {
               if (entry.isIntersecting) {
                   if (entry.intersectionRatio < 0.2) {
                       console.log("Slide enters: " + entry.intersectionRatio);
                   }
                   if (entry.intersectionRatio > 0.9) {
                       console.log("Slide exits: " + entry.intersectionRatio);
                   }
               }
           });
   
       }
     */

    const handleClick = (dir) => e => {

        if (totalSlideWidth > slidePortWidth) {

            if (slidePortWidth / totalSlideWidth >= 1) {
                slideLength = 0;
            }


            if (slidePortWidth / totalSlideWidth < 1 && slidePortWidth / totalSlideWidth > 0.7) {
                slideLength = slidePortWidth * 0.2;
            }

            if (slidePortWidth / totalSlideWidth <= 0.7 && slidePortWidth / totalSlideWidth > 0.5) {
                slideLength = slidePortWidth * 0.3;
            }

            if (slidePortWidth / totalSlideWidth <= 0.5 && slidePortWidth / totalSlideWidth > 0.2) {
                slideLength = slidePortWidth * 0.6;
            }

            if (slidePortWidth / totalSlideWidth <= 0.2 && slidePortWidth / totalSlideWidth > 0) {
                slideLength = slidePortWidth;
            }


        }

        //   console.log('Slide port width:' + slidePortWidth);
        //   console.log('Total slide width:' + totalSlideWidth);
        //   console.log('Max slide count: ' + maxSlideCount);
        //   console.log('Each Slide length:' + slideLength);
        //   console.log(' Slide length remaining:' + (totalSlideWidth-Math.abs(cumSlideLength)));

        if (dir === 'right') {

            if (
                (totalSlideWidth > slidePortWidth)
                && ((totalSlideWidth - Math.abs(cumSlideLength)) > slidePortWidth)
            ) {

                cumSlideLength = cumSlideLength - slideLength;

                if (totalSlideWidth - Math.abs(cumSlideLength) < slidePortWidth) {
                    cumSlideLength = slidePortWidth - totalSlideWidth - 10;
                }
                //                console.log("LEFT: Slide length: " + cumSlideLength);
                set({ transform: `translate3d("${cumSlideLength}px","0px","0px")` });
                stop();
            }
        }

        if (dir === 'left') {

            if (
                (totalSlideWidth > slidePortWidth)
                && (cumSlideLength < 0)
            ) {

                cumSlideLength = cumSlideLength + slideLength;
                if (cumSlideLength > 0) {
                    cumSlideLength = 0;
                }
                //              console.log("Right : Slide length: " + cumSlideLength);
                set({ transform: `translate3d("${cumSlideLength}px","0px","0px")` });
                stop();
            }


        }
    }




    return (
        <Box className={classes.root}>
            <ISlider ref={sliderRef} imgArray={info} springprps={prps} />
            <Box className={classes.overlay}>
                <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('left')}>
                    <ArrowLeftIcon style={{ color: 'red', fontSize: '3em', fontWeight: 600, margin: 2, zIndex: 5 }} />
                </IconButton>

                <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('right')}>
                    <ArrowRightIcon style={{ color: 'red', fontSize: '3em', fontWeight: 600, margin: 2, zIndex: 5 }} />
                </IconButton>
            </Box>
        </Box>
    );
}

const useISlides = makeStyles(theme => ({
    slide: {
        boxSizing: 'border-box',
        position: 'relative',
        flex: '0 0 auto',
        margin: 10,
        padding: 10,
        width: '35%',
        height: '60%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px rgb(200,200,200)',
        zIndex: 2,

    },
    overlay: {
        boxSizing: 'border-box',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'flex-end',
        margin: 0,
        padding: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.0)',
        boxShadow: '0px 0px 20px rgb(200,200,200)',

    }
}));

// const ISlide = animated(React.forwardRef((props, ref) => {
 const ISlide = React.forwardRef((props, ref) => {

    const classes = useISlides();
    const prpsObj = React.Children.toArray(props.children);

    return (
        <Box ref={ref} className={classes.slide}>
            {prpsObj ? prpsObj[0] : ""}
            <Box className={classes.overlay}>
                {prpsObj ? prpsObj[1] : ""}
            </Box>
        </Box>
    )
})
//);
 

const useISlider = makeStyles(theme => ({
    slidestrip: {
        boxSizing: 'border-box',
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        whiteSpace: 'nowrap'
    },
    content: {
        display: 'flex',
        flex: '0 1 auto',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        margin: 20,
        padding: 10,
        transition: '1s ease',
        backgroundColor: 'rgba(171,71,188,0.2)',
        '&:hover': {
            backgroundColor: 'rgba(171,71,188,0.8)',
        }
    },
    contentheader: {
        display: 'flex',
        flex: '0 1 auto',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        fontFamily: '"Merriweather", serif',
        fontWeight: 400,
        fontSize: '1.3em',
        color: 'white',
    //     border: '2px solid blue'


    },
    contentbody: {
        display: 'flex',
        flex: '0 1 auto',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 500,
        fontSize: '1.0em',
        color: 'white',
    },

    contentpanel: {
        display: 'flex',
        flex: '0 1 auto',
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        fontFamily: '"Open Sans", sans-serif',
        fontWeight: 600,
        fontSize: '1.1em',
        color: 'white',
        padding:10,
    },

    contentfooter: {
        display: 'flex',
        flex: '0 1 auto',
        flexFlow: 'column nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '50%',
        margin: 20,
        padding: 10,
        transition: '1s ease',
        backgroundColor: 'rgba(171,71,188,0.2)',
        '&:hover': {
            backgroundColor: 'rgba(171,71,188,0.8)',
        }
    },

}));

const ISlider = React.forwardRef((props, ref) => {
    const classes = useISlider();
    const { appstate, dispatch } = useContext(AppContext);


    //const contentspringprops = useSpring({ opacity: 1.0, from: { opacity: 0.0 }, config: { duration: 300 } });


    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }


    return (
        <Box ref={ref} className={classes.slidestrip} >
            {props.imgArray.map((home, i) => {
                //  console.log("Slide no: " + i + "Img array length : " + props.imgArray.length);
                if (i === 0) {
                    return (
                        <ISlide key={i} style={props.springprps} >
                            <Cnv w={400} h={300} overlay={false} src={home.src} />
                            <Box className={classes.content} style={contentspringprops}>
                                <div className={classes.contentheader}>
                                    <span>{++i}:</span>
                                    <span style={{ paddingLeft: 15 }}>{home.price} &nbsp;&#36;&nbsp;&nbsp;&nbsp; {home.area}&nbsp;sq ft
                                    </span>
                                </div>
                                <div className={classes.contentbody}>
                                    <div className={classes.contentpanel}>
                                        <span>{home.baths}&nbsp;<BathtubOutlinedIcon /></span>
                                        <span>{home.beds}&nbsp;<HotelOutlinedIcon /></span>
                                        <span>{home.garages}&nbsp;<DriveEtaIcon /></span>
                                    </div>
                                    <div className={classes.contentpanel}>
                                        {home.address}
                                    </div>

                                </div>
                                <Button variant="contained" color="primary" onClick={handleOverLay}>
                                    View Details
                                </Button>
                            </Box>
                        </ISlide>
                    );

                }
                if (i === (props.imgArray.length - 1)) {
                    return (
                        <ISlide key={i} style={props.springprps} >
                            <Cnv w={400} h={300} overlay={false} src={home.src} />
                            <Box className={classes.content}>

                                <div className={classes.contentheader}>
                                    <span>{++i}:</span>
                                    <span style={{ paddingLeft: 15 }}>{home.price} &nbsp;&#36;&nbsp;&nbsp;&nbsp; {home.area}&nbsp;sq ft
                                    </span>
                                </div>
                                <div className={classes.contentbody}>
                                    <div className={classes.contentpanel}>
                                        <span>{home.baths}&nbsp;<BathtubOutlinedIcon /></span>
                                        <span>{home.beds}&nbsp;<HotelOutlinedIcon /></span>
                                        <span>{home.garages}&nbsp;<DriveEtaIcon /></span>
                                    </div>
                                    <div className={classes.contentpanel}
                                    >
                                        {home.address}
                                    </div>
                                </div>
                                <Button variant="contained" color="primary" onClick={handleOverLay}>
                                    View Details
                                </Button>
                            </Box>
                        </ISlide>
                    );

                }

                return (
                    <ISlide key={i} style={props.springprps} >
                        <Cnv w={400} h={300} overlay={false} src={home.src} />
                        <Box className={classes.content}>
                            <div className={classes.contentheader}>
                                <span>{++i}:</span>
                                <span style={{ paddingLeft: 15 }}>{home.price} &nbsp;&#36;&nbsp;&nbsp;&nbsp; {home.area}&nbsp;sq ft
                                    </span>
                            </div>
                            <div className={classes.contentbody}>
                                <div className={classes.contentpanel}>
                                    <span>{home.baths}&nbsp;<BathtubOutlinedIcon /></span>
                                    <span>{home.beds}&nbsp;<HotelOutlinedIcon /></span>
                                    <span>{home.garages}&nbsp;<DriveEtaIcon /></span>
                                </div>
                                <div className={classes.contentpanel}>
                                    {home.address}
                                </div>
                            </div>
                            <Button variant="contained" color="primary" onClick={handleOverLay} >
                                View Details
                                </Button>
                        </Box>
                    </ISlide>
                );
            })}
        </Box>
    );
});