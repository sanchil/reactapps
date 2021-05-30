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



const useSliderStyles = makeStyles(theme => ({

    slider: {
        position: 'relative',
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '0',
        width: '100%',
        height: '100%',
        //    border:'2px solid red',
        borderRadius: 15,
        zIndex: 10,


    },
    slide: {
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '0',
        width: '100%',
        height: '100%',
        borderRadius: 15,
        willChange: 'zIndex',
    },
    overlay: {
        boxSizing: 'border-box',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flexFlow: 'column wrap',
        flex: 'auto',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.0)',
        zIndex: 20,
    },
    controlpanel: {
        display: 'flex',
        width: '100%',
        height: '10%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        justifyContent: 'space-between',
    }


}));

export const ImgSlider = React.forwardRef((props, ref) => {
    const classes = useSliderStyles();
    const [zi, setZi] = useState({ zi1: 1, zi2: 2, zi3: 3 });
    const { appstate, dispatch } = useContext(AppContext);





    const handleClick = (dir) => (e) => {
        let t = {}
        let _t = 0;

        if (dir === 'left') {
            _t = zi.zi1;
            t.zi1 = zi.zi2;
            t.zi2 = zi.zi3;
            t.zi3 = _t;
            setZi(t);
            //   console.log("Z coords: " + JSON.stringify(zi));
        }

        if (dir === 'right') {
            _t = zi.zi3;
            t.zi3 = zi.zi2;
            t.zi2 = zi.zi1;
            t.zi1 = _t;
            setZi(t);
            //     console.log("Z coords: " + JSON.stringify(zi));
        }
    }


    const handleOverLay = evt => {
        dispatch({ type: 'OVERLAY', data: true })
    }

    useEffect(() => {
        //  let s = setInterval(handleClick,5000); 
    });


    return (


        <div className={classes.slider} onClick={handleClick}>
            <Slide zi={zi.zi1} width={'100%'} >
                <Cnv w={400} h={300} overlay={false} src="./img/stock/agriculture-clouds-countryside-cropland-440731.jpg" position={"all"} />
            </Slide>
            <Slide zi={zi.zi2} width={'100%'} >
                <Cnv w={400} h={300} overlay={false} src="./img/stock/clouds-daylight-forest-grass-371589.jpg" position={"all"} />
            </Slide>
            <Slide zi={zi.zi3} width={'100%'} >
                <Cnv w={400} h={300} overlay={false} src="./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg" position={"all"} />
            </Slide>

            <div className={classes.overlay}>

                <div className={classes.controlpanel}>
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClick('left')} style={{ margin: 0, padding: 0 }}>
                        <ArrowLeftIcon style={{ color: 'white', fontWeight: 500, margin: 2 }} />
                    </IconButton>

                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleOverLay} style={{ margin: 0, padding: 0 }}>
                        <ViewCarouselIcon style={{ color: 'white', fontWeight: 500, margin: 2 }} />
                    </IconButton>

                    <IconButton color="primary" aria-label="add to shopping cart" onClick={handleClick('right')} style={{ margin: 0, padding: 0 }}>
                        <ArrowRightIcon style={{ color: 'white', fontWeight: 500, margin: 2 }} />
                    </IconButton>


                </div>
            </div>


        </div>





    );
});


const useSlideStyles = makeStyles(theme => ({
    slide: {
        cursor: 'pointer',
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        flex: 'auto',
        flexFlow: 'row wrap',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto',
        padding: '0',
        // width: '100%',
        height: '100%',
        borderRadius: 15,
        willChange: 'zIndex',

    },
}));

//const Slide = animated((props) => {
const Slide = (props) => {
    const classes = useSlideStyles();
    return (
        <div className={classes.slide} style={{ width: `${props.width}`, zIndex: props.zi }} onClick={props.onClick}>
            {props.children}
        </div>
    )
}
//);




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
        //   scrollSnapType: 'x mandatory',
        overflowX: 'hidden',
        //   zIndex:10,
        whiteSpace: 'nowrap'
    },
    /*   slide: {
          boxSizing: 'border-box',
          position: 'absolute',
          flex: '0 0 auto',
          // scrollSnapAlign: 'start',
          margin: 10,
          padding: 10,
          width: '20%',
          height: '60%',
          backgroundColor: 'white',
          boxShadow: '0px 0px 20px rgb(200,200,200)',
          left: props => props.left,
         // transition: 'transform 1s',
  
          //  zIndex:40,
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

export const ImgStripSlider = (props) => {


    const [imgArray, setImgArray] = useState([]);
    const classes = useStripSlider(props);
    const refStart = createRef();
    const refEnd = createRef();
    const sliderRef = createRef();

    useEffect(() => {
        setImgArray([
            "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
            "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
            "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
            "./img/stock/scenic-view-of-lake-and-mountains-against-sky-326058.jpg",
            "./img/stock/trees-surrounded-by-green-grass-field-during-daytime-164025.jpg",

        ]);
    }, []);

    /*  const sliderRef = useCallback(elem => {
         useIntersection(elem.current, refStart.current, [0.0, 1.0], handleIntersect);
     }, []); */

    let currentSlide = 0;

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



        if (dir === 'left') {

            if (currentSlide <= 0 && currentSlide > -4) {
                --currentSlide;
                //    console.log('current slide: left' + currentSlide);
                set({ transform: `translate3d("${(currentSlide * 375)}%","0%","0%")` });
            }
        }

        if (dir === 'right') {

            //     console.log('current slide: right' + currentSlide);
            if (currentSlide < 0 && currentSlide >= -4) {
                ++currentSlide;
                set({ transform: `translate3d("${currentSlide * 375}%","0%","0%")` });
            }


        }
    }




    return (
        <Box className={classes.root}>
            <ISlider imgArray={imgArray} springprps={prps} />
            {/*   <Box ref={sliderRef} className={classes.slidestrip} imgSrcArray={imgArray}>

                <ISlide style={prps} >
                    1
                </ISlide>
                <ISlide style={prps} >
                    2
                </ISlide>
                <ISlide style={prps} >
                    3
                </ISlide>
                <ISlide style={prps} >
                    4
                </ISlide>
                <ISlide style={prps} >
                    5
                </ISlide>
                <ISlide style={prps} >
                    6
                </ISlide>
                <ISlide style={prps} >
                    7
                </ISlide>
                <ISlide style={prps} >
                    8
                </ISlide>
                <ISlide style={prps} >
                    9
                </ISlide>
                <ISlide style={prps} >
                    10
                </ISlide>


            </Box> */}

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

//const ISlide = animated(React.forwardRef((props, ref) => {
const ISlide = React.forwardRef((props, ref) => {

    const classes = useISlides();
    return (
        <Box ref={ref} className={classes.slide}>
            {props.children}
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
}));

const ISlider = React.forwardRef((props, ref) => {
    const classes = useISlider();
    return (
        <Box ref={ref} className={classes.slidestrip} >
            {props.imgArray.map(src => (
                <ISlide style={props.springprps} >
                    <Cnv w={400} h={300} overlay={false} src={src} />
                </ISlide>))}
        </Box>
    );
});