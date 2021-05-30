import React, { useEffect, useState, createRef, useContext, useCallback } from 'react';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { animated, useSpring } from 'react-spring';
import { Cnv } from '../cnvimg';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { IconButton, Button } from '@material-ui/core';
import theme from '../../theme';
import { AppContext } from '../../state/appcntxt';
import { useIntersection } from '../../lib/userhooks';
import { useElemDim } from '../../lib/userhooks';





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
    let slideIncrWidth = 100; // No of slides to move
    let slideCount = 0;
    let maxSlideCount = 0;
    let SLIDESINVIEWPORT = 4;
    const [imgArray, setImgArray] = useState([]);
    const classes = useStripSlider(props);


    const sliderRef = useCallback(elem => {
        if (elem !== null) {
            //  console.log("Element scrollWidth"+elem.scrollWidth);
            totalSlideWidth = elem.scrollWidth;
            slidePortWidth = elem.clientWidth;
        }

    });

    useEffect(() => {
        setImgArray([
            "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
            "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
            "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
            "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
            "./img/stock/clouds-daylight-forest-grass-371589.jpg",
            "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
            "./img/stock/clouds-daylight-forest-grass-371589.jpg",
          
           



        ]);
    }, []);





    const [prps, set, stop] = useSpring(() => ({
        from: { justifyContent: 'flex-start', transform: 'translate3d(0px,0px,0px)' },
        config: { duration: 500 }
    }));



    /*  const handleIntersect = (entries, observer) => {
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

        if(totalSlideWidth>slidePortWidth){
           
            if(slidePortWidth/totalSlideWidth<=1&&slidePortWidth/totalSlideWidth>0.7){
                slideLength = slidePortWidth*0.3;
                maxSlideCount =  Math.ceil((totalSlideWidth - slidePortWidth)/slideLength);
            }

            if(slidePortWidth/totalSlideWidth<=0.71&&slidePortWidth/totalSlideWidth>0.5){
                slideLength = slidePortWidth*0.5;
                maxSlideCount =  Math.ceil((totalSlideWidth - slidePortWidth)/slideLength);
            }

            if(slidePortWidth/totalSlideWidth<=0.5&&slidePortWidth/totalSlideWidth>0.2){
                slideLength = slidePortWidth*0.8;
                maxSlideCount =  Math.ceil((totalSlideWidth - slidePortWidth)/slideLength);
            }

            if(slidePortWidth/totalSlideWidth<=0.2&&slidePortWidth/totalSlideWidth>0){
                slideLength = slidePortWidth;
                maxSlideCount =  Math.ceil((totalSlideWidth - slidePortWidth)/slideLength);
            }


        }

        console.log('Slide port width:' + slidePortWidth);    
        console.log('Total slide width:' + totalSlideWidth);    
        console.log('Max slide count: '+ maxSlideCount );
        console.log('Each Slide length:' + slideLength);

        if (dir === 'left') {

           
        

            if ((totalSlideWidth>slidePortWidth) && (slideCount >= 0) && slideCount < maxSlideCount ) {
                ++slideCount;                    
                console.log("LEFT: slide count: " + slideCount +"Slide length: "+  slideCount*slideLength);
                set({ transform: `translate3d("${-slideCount*slideLength}px","0px","0px")` });
                stop();
            }
        }

        if (dir === 'right') {




            if ((totalSlideWidth>slidePortWidth) && slideCount > 0 && slideCount <= maxSlideCount ) {
                --slideCount;
          //      slideLength = (totalSlideWidth/(Math.floor(imgArray.length/SLIDESINVIEWPORT))) + slideLength;
               
                console.log("Right : slide count: " + slideCount +"Slide length: "+  slideCount*slideLength);
                set({ transform: `translate3d("${slideCount*slideLength}px","0px","0px")` });
                stop();
            }


        }
    }




    return (
        <Box className={classes.root}>
            <ISlider ref={sliderRef} imgArray={imgArray} springprps={prps} />

            <Box className={classes.overlay}>
                <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('left')}>
                    <ArrowLeftIcon style={{ color: 'red', fontSize: '3em', fontWeight: 600, margin: 2 }} />
                </IconButton>

                <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('right')}>
                    <ArrowRightIcon style={{ color: 'red', fontSize: '3em', fontWeight: 600, margin: 2 }} />
                </IconButton>
            </Box>
        </Box>
    );


}

const useISlides = makeStyles(theme => ({
    slide: {
        boxSizing: 'border-box',
        flex: '0 0 auto',
        margin: 10,
        padding: 10,
        width: '20%',
        height: '60%',
        backgroundColor: 'white',
        boxShadow: '0px 0px 20px rgb(200,200,200)',
        // transition: 'transform 1s',
    },
}));

const ISlide = animated(React.forwardRef((props, ref) => {
    const classes = useISlides();

    return (
        <Box ref={ref} className={classes.slide}>
            {props.children}
        </Box>
    )
}));


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
}));

const ISlider = React.forwardRef((props, ref) => {
    const classes = useISlider();


    return (
        <Box ref={ref} className={classes.slidestrip} >
            {props.imgArray.map((src, i) => {
                //  console.log("Slide no: " + i + "Img array length : " + props.imgArray.length);
                if (i === 0) {
                    return (
                        <ISlide key={i} style={props.springprps} >
                            <Cnv w={400} h={300} overlay={false} src={src} />
                        </ISlide>
                    );

                }
                if (i === (props.imgArray.length - 1)) {
                    return (
                        <ISlide key={i} style={props.springprps} >
                            <Cnv w={400} h={300} overlay={false} src={src} />
                        </ISlide>
                    );

                }

                return (
                    <ISlide key={i} style={props.springprps} >
                        <Cnv w={400} h={300} overlay={false} src={src} />
                    </ISlide>
                );
            })}
        </Box>
    );
});