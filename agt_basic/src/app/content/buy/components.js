import React, { useCallback, createRef, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//import Box from '@material-ui/core/Box';
import * as astyles from '../../components/styles';
//import { yellow, grey } from '@material-ui/core/colors';
//import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
//import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
//import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
//import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
//import { Cnv } from '../../components/cnvimg';
//import ViewCarouselIcon from '@material-ui/icons/ViewCarousel';
import { IconButton, Button } from '@material-ui/core';
//import { animated, useSpring } from 'react-spring';
//import BathtubIcon from '@material-ui/icons/Bathtub';
//import HotelIcon from '@material-ui/icons/Hotel';
//import DriveEtaIcon from '@material-ui/icons/DriveEta';
//import { TextF } from '../../components/datacomponents/inputcomponents';


const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: 20,
  },
  media: {
    width: 280,
    height: 120,
  },
});

export const SimpleCard = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/savemax/buy_list.1.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Homes
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            homes are good
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

const usePolaroidStyles = makeStyles(theme => ({
  polaroid: {
    ...astyles.polaroid(theme),
    margin: 20,
  },
  text: {
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    margin: 15,
  }
}));

export const PolaroidCards = (props) => {
  const classes = usePolaroidStyles();
  return (
    <div className={classes.polaroid}>
      <img src={props.src} style={{ maxWidth: '100%', height: 'auto' }} />
      <div className={classes.text}>
        {props.children}
      </div>
    </div>
  );
}

/* 
const useAppDetailStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.up('xs')]: {
      flexFlow: 'column nowrap',
      width: '98%',
      height: '93%',
      marginTop:35,
    },
    [theme.breakpoints.up('md')]: {
      flexFlow: 'row wrap',
      width: '88%',
      height: '93%',
      marginTop:10,
    },

    boxSizing: 'border-box',
    display: 'flex',
    flex: '0 0 auto',

    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',

    border: `2px solid ${yellow[700]}`,
    borderRadius: 15,

  },
  home: {
    [theme.breakpoints.up('xs')]: {
      width: '95%',
      height: '40%',
    },
    [theme.breakpoints.up('md')]: {
      width: '60%',
      height: '95%',
    },
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',

    border: '1px solid blue',


  },
  homecontent: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    overflowX: 'hidden',
    whiteSpace: 'nowrap',

  },
  homeimg: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'row nowrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    boxShadow: '0px 0px 20px rgb(200,200,200)',
    //  zIndex:10,
  },
  details: {
    [theme.breakpoints.up('xs')]: {
      width: '95%',
      height: '60%',
    },
    [theme.breakpoints.up('md')]: {
      width: '40%',
      height: '95%',
    },
    boxSizing: 'border-box',
    position: 'relative',
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',

    border: '1px solid pink',
    overflowY: 'hidden',

  },

  overlayv: {
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.0)'
  },
  overlayh: {
    boxSizing: 'border-box',
    position: 'absolute',
    left: 0,
    top: 0,
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.0)',

  }


}));

export const AppDetails = (props) => {
  const classes = useAppDetailStyles(props);
  const [urlArr, setUrlArr] = useState([]);
  const [infoPages, setInfoPages] = useState([]);

  let sliderWidth = 0;
  let slideWidth = 0;
  let slideLength = 0;
  let cumSlideLength = 0;

  let pageSliderHeight = 0;
  let pageHeight = 0;
  let pageSlide = 0;
  let cumPageSlide = 0;



  const [prpsh, seth, stoph] = useSpring(() => ({
    from: { transform: 'translate3d(0px,0px,0px)' },
    config: { duration: 500 }
  }));

  const [prpsv, setv, stopv] = useSpring(() => ({
    from: { transform: 'translate3d(0px,0px,0px)' },
    config: { duration: 500 }
  }));

  const sliderRef = useCallback(node => {
    if (node !== null) {
      sliderWidth = node.scrollWidth;
      slideWidth = node.clientWidth;
      //  console.log("Slider is loaded: "+ sliderWidth+ " : " + slideWidth);
    }
  });

  const pageSliderRef = useCallback(node => {
    if (node !== null) {
      pageSliderHeight = node.scrollHeight;
      pageHeight = node.clientHeight;
     // console.log("Page slider is loaded: " + pageSliderHeight + " : " + pageHeight);
    }
  });

  const handleClick = (dir) => e => {
    slideLength = sliderWidth / urlArr.length;
    pageSlide = pageSliderHeight / infoPages.length;
    if (dir === 'right') {
      cumSlideLength = cumSlideLength - slideLength;
      if (sliderWidth - Math.abs(cumSlideLength) <= slideWidth) {
        cumSlideLength = slideWidth - sliderWidth;
      }
      seth({ transform: `translate3d(${cumSlideLength}px,0px,0px)` });
      stoph();
    }
    if (dir === 'left') {
      cumSlideLength = cumSlideLength + slideLength;
      if (cumSlideLength > 0) {
        cumSlideLength = 0;
      }
      seth({ transform: `translate3d(${cumSlideLength}px,0px,0px)` });
      stoph();
    }

    if (dir === 'down') {
      cumPageSlide = cumPageSlide - pageSlide;
      if (pageSliderHeight - Math.abs(cumPageSlide) <= pageSlide) {
        cumPageSlide = pageSlide - pageSliderHeight;
      }
      setv({ transform: `translate3d(0px,${cumPageSlide}px,0px)` });
      stopv();
    }

    if (dir === 'up') {
      cumPageSlide = cumPageSlide + pageSlide;
      if (cumPageSlide > 0) {
        cumPageSlide = 0;
      }
      setv({ transform: `translate3d(0px,${cumPageSlide}px,0px)` });
      stopv();
    }


  //  console.log('Dir: ' + dir + ': PageSlider scrollWidth: ' + pageSliderHeight + ' Page height: ' + pageHeight);
  }

  useEffect(() => {
    setUrlArr([
      "./img/stock/panoramic-view-of-sea-against-blue-sky-248771.jpg",
      "./img/stock/person-on-a-bridge-near-a-lake-747964.jpg",
      "./img/stock/person-sitting-on-mountain-cliff-1659438.jpg",
      "./img/stock/clouds-daylight-forest-grass-371589.jpg",
      "./img/stock/agriculture-clouds-countryside-cropland-440731.jpg",
      "./img/stock/fly1.jpg",
    ]);
    setInfoPages([
      {
        name: "page1",
        title: "home",
        price: "1000000",
        area: "5000",
        address: "3800 Washington St \
                  San Francisco, CA 94118",
        location: " A superb location in BC Vancouver ",
        baths: 10,
        beds: 9,
        garages: 10,
      },
      {
        title: "A beautiful home",
        descr1: 'Dazzingly re-imagined for the 21st Century, the breathtaking Le Petit Trianon is inspired by  \
        the original world-renowned Chateau at the Versailles Palace in France, which was \
        constructed between 1763 and 1768 by King Louis XV. The iconic, historically \
        irreplaceable facade of Le Petit Trianon is one of the world\'s most recognizable \
         images.',
        descr2: 'Designated as both a San Francisco as well as a National Historical \
        Landmark,and considered one of the City\'s architectural masterpieces, this \
        extraordinary monument has been host to a glittering array of some of the most \
        important social, cultural, artistic and philanthropic events in San Francisco \
        history.',
        descr3: ' Evocative of another era of 18th-Century grandeur, this timeless \
        masterpiece has seen yet another unforgettable re-incarnation in its legendary \
        history by the 2019 San Francisco Decorator Showcase for a glamorous and contemporary \
        lifestyle...truly one of the world\'s most extraordinary private historical \
        residences...',


      },
      {
        amenities: {
          shops: "Sobey\'s",
          schools: "Sherridan",
          banks: "TD Canada trust",
          health: "Hospitals",
          services: "fire station, police station",
          connectivity: "close to airport",
        },
      },
      {

      }

    ]);
  }, []);


  return (
    <Box className={classes.root}>
      <Box className={classes.home}>
        <Slider ref={sliderRef} springprps={prpsh} urls={urlArr} />

        <Box className={classes.overlayh} >
          <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('left')}>
            <KeyboardArrowLeftIcon style={{ color: 'red', fontSize: '2em', fontWeight: 600, margin: 2, }} />
          </IconButton>

          <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('right')}>
            <KeyboardArrowRightIcon style={{ color: 'red', fontSize: '2em', fontWeight: 600, margin: 2, }} />
          </IconButton>
        </Box>
      </Box>

      <Box className={classes.details}>
        <PageSlider ref={pageSliderRef} springprps={prpsv} pages={infoPages} />
        <Box className={classes.overlayv}>
          <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('up')}>
            <KeyboardArrowUpIcon style={{ color: 'red', fontSize: '2em', fontWeight: 600, margin: 2, zIndex: 15 }} />
          </IconButton>

          <IconButton color="primary" aria-label="add to shopping cart" style={{ margin: 0, padding: 0 }} onClick={handleClick('down')}>
            <KeyboardArrowDownIcon style={{ color: 'red', fontSize: '2em', fontWeight: 600, margin: 2, zIndex: 15 }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

const Slide = animated(React.forwardRef((props, ref) => {
  const classes = useAppDetailStyles(props);
  return (
    <Box ref={ref} className={classes.homeimg}>
      <Cnv w={400} h={300} overlay={false} src={props.src} />
    </Box>
  );
}));

const Slider = animated(React.forwardRef((props, ref) => {
  const classes = useAppDetailStyles(props);
  return (
    <Box ref={ref} className={classes.homecontent}>
      {props.urls.map((url, i) => {
        return (<Slide key={i} style={props.springprps} src={url} />);
      })}



    </Box>
  );
}));





const usePageStyles = makeStyles(theme => ({
  detailspage: {
    [theme.breakpoints.up('xs')]: {
      padding: 10,
    },
    [theme.breakpoints.up('md')]: {
      padding: 20,
    },
    boxSizing: 'border-box',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderBottom: '2px solid black',
    //  boxShadow: '0px 0px 20px rgb(200,200,200)',
    whiteSpace: 'normal',

  },

}));

const Page = animated(React.forwardRef((props, ref) => {
  const classes = usePageStyles(props);
  return (
    <Box ref={ref} className={classes.detailspage}>
      {props.children}
    </Box>
  );
}));


const usePageSliderStyle = makeStyles(theme => ({
  detailscontent: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: '0 0 auto',
    flexFlow: 'column nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    zIndex:10,

  },

}));

const PageSlider = animated(React.forwardRef((props, ref) => {
  const classes = usePageSliderStyle(props);
  return (
    <Box ref={ref} className={classes.detailscontent}>
      {props.pages.map((page, i) => {
        if (i === 0) {
          return (
            <Page key={i} style={props.springprps}  >
              <PageLayout1>
                <p>{page.price}</p>
                <p>{page.area} sq ft</p>
                <p>{page.baths}</p>
                <p>{page.beds}</p>
                <p>{page.garages}</p>
                <p style={{ padding: 0, margin: 0 }}> {page.address}</p>
                <p style={{ padding: 0, margin: 0 }}>{page.location}</p>
              </PageLayout1>
            </Page>
          );
        }
        if (i === 1) {
          return (
            <Page key={i} style={props.springprps} page={page} >
              <PageLayout2>
                <p style={{ padding: 0, margin: 0 }}>{page.title}</p>
                <p style={{ padding: 0, margin: 0 }}>{page.descr1}</p>
                <p style={{ padding: 0, margin: 0 }}>{page.descr2}</p>
              </PageLayout2>
            </Page>
          );
        }

        if (i === 2) {
          return (
            <Page key={i} style={props.springprps} page={page}>
              <PageLayout3>
                {page.amenities}
              </PageLayout3>
            </Page>
          );
        }

        if (i === 3) {
          return (
            <Page key={i} style={props.springprps} page={page}>
              <PageLayout4>

              </PageLayout4>
            </Page>
          );
        }



      })}
    </Box>
  );
}));


const usePageLayoutStyle = makeStyles(theme => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flex: '1 0 auto',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    height: '100%',
    //  border: '2px solid blue',
    boxShadow: '0px 0px 20px rgb(200,200,200)',

  },
  header: {
    [theme.breakpoints.up('xs')]: {
      height: '10%',
      fontFamily: '"Merriweather", serif',
      fontWeight: 600,
      fontSize: '1.2em',
      margin: 10,
      //  border: '1px solid pink',

    },
    [theme.breakpoints.up('md')]: {
      height: '12%',
      fontFamily: '"Merriweather", serif',
      fontWeight: 700,
      fontSize: '1.5em',
      margin: 5,

    },
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    padding: 0,
    width: '100%',
    // border: '2px solid green',
  },
  addrpanel: {
    [theme.breakpoints.up('xs')]: {
      padding: 10,
      height: '20%',
    },
    [theme.breakpoints.up('md')]: {
      padding: 5,
      height: '10%',
    },
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',

    fontFamily: '"Open Sans",sans-serif',
    fontWeight: 700,
    fontSize: '1.1em',
    margin: 5,
    //  border:'1px solid orange',

  },
  locationpanel: {
    [theme.breakpoints.up('xs')]: {
      padding: 10,
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 800,
      fontSize: '1.2em',
      margin: 5,
    },
    [theme.breakpoints.up('md')]: {
      padding: 5,
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 700,
      fontSize: '1.1em',
      margin: 10,
    },
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '15%',
    //  border:'1px solid green',


  },
  panel1: {
    [theme.breakpoints.up('xs')]: {
      height: '15%',
      padding: 10,
      margin: 10,
    },
    [theme.breakpoints.up('md')]: {
      height: '12%',
      padding: 10,
      margin: 10,
    },
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  panel2: {
    display: 'flex',
    flex: 'auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    width: '100%',
    height: '15%',
    //   border: '2px solid green',

  },
  descr: {
    [theme.breakpoints.up('xs')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 300,
      fontSize: '1.0em',
      padding: '10px 10px 10px 25px',
      // paddingLeft: 10,
    },
    [theme.breakpoints.up('md')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 300,
      fontSize: '1.0em',
      padding: '5px 20px 20px 40px',
      //paddingLeft: 40,
    },
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    //  height: '25%',     
    textAlign: 'justify',
 //   overflow: 'hidden',
    // border: '1px solid red',
  },
  item1: {
    [theme.breakpoints.up('xs')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 900,
      fontSize: '1.5em',
    },
    [theme.breakpoints.up('md')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 800,
      fontSize: '1.4em',
    },
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '50%',
    //  border: '2px solid green',

  },
  item2: {
    [theme.breakpoints.up('xs')]: {
      width: '30%',
      // height:'15%',
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 800,
      fontSize: '1.2em',
      //margin: 5,
    },
    [theme.breakpoints.up('md')]: {
      width: '30%',
      // height:'15%',
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 800,
      fontSize: '1.2em',
      margin: 5,
    },
    display: 'flex',
    flex: '0 1 auto',
    flexFlow: 'row wrap',
    justifyContent: 'space-around',
    alignItems: 'center',

    border: `2px solid ${grey[200]}`,

    borderRadius: 5,
  },
  amenitiesdescr:{
    [theme.breakpoints.up('xs')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 300,
      fontSize: '1.0em',
      padding: '10px 10px 10px 25px',
      // paddingLeft: 10,
    },
    [theme.breakpoints.up('md')]: {
      fontFamily: '"Open Sans",sans-serif',
      fontWeight: 300,
      fontSize: '1.0em',
      padding: '5px 20px 20px 40px',
      //paddingLeft: 40,
    },
    display: 'flex',
    flex: '1 1 auto',
    flexFlow: 'row wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
    width: '100%',
    //  height: '25%',     
    textAlign: 'justify',
 
  },

}));

const PageLayout1 = (props) => {
  const classes = usePageLayoutStyle();
  const prpsObj = React.Children.toArray(props.children);
  return (
    <Box className={classes.root}>
      <Box className={classes.panel1}>
        <Box className={classes.item1}>
          {prpsObj ? prpsObj[0] : ""}

        </Box>
        <Box className={classes.item1}>
          {prpsObj ? prpsObj[1] : ""}
        </Box>
      </Box>
      <Box className={classes.panel1}>
        <Box className={classes.item2}>
          {prpsObj ? prpsObj[2] : ""}
          <HotelIcon />
        </Box>
        <Box className={classes.item2}>
          {prpsObj ? prpsObj[3] : ""}
          <BathtubIcon />
        </Box>
        <Box className={classes.item2}>
          {prpsObj ? prpsObj[4] : ""}
          <DriveEtaIcon />
        </Box>
      </Box>
      <Box className={classes.addrpanel}>
        {prpsObj ? prpsObj[5] : ""}
      </Box>
      <Box className={classes.locationpanel}>

        {prpsObj ? prpsObj[6] : ""}


      </Box>


    </Box>
  );
}



const PageLayout2 = (props) => {
  const classes = usePageLayoutStyle();
  const prpsObj = React.Children.toArray(props.children);
  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        {prpsObj ? prpsObj[0] : ""}
      </Box>

      <Box className={classes.descr}>
        {prpsObj ? prpsObj[1] : ""}

      </Box>


    </Box>
  );
}


const PageLayout3 = (props) => {
  const classes = usePageLayoutStyle();
  const [key, setKey] = useState('shops');
  //  const prpsObj = React.Children.toArray(props.children);
  const amenitiesObj = props.children;
  const objKeys = Object.keys(amenitiesObj);
  console.log('Amenities: ' + props.children);
  return (
    <Box className={classes.root}>
      <Box className={classes.panel2}>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[0])}>{objKeys[0]}</Button>
        </Box>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[1])}>{objKeys[1]}</Button>
        </Box>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[2])}>{objKeys[2]}</Button>
        </Box>
      </Box>
      <Box className={classes.panel2}>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[3])}>{objKeys[3]}</Button>
        </Box>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[4])}>{objKeys[4]}</Button>
        </Box>
        <Box className={classes.item2}>
          <Button onClick={() => setKey(objKeys[5])} style={{zIndex:1000000}}>{objKeys[5]}</Button>
        </Box>
      </Box>
      <Box className={classes.panel1}>
      <div className={classes.amenitiesdescr}>
        {amenitiesObj[key]}
        </div>
     
      </Box>
    </Box>
  );
}


const PageLayout4 = (props) => {
  const classes = usePageLayoutStyle();
  const fnameRef = createRef();
  const lnameRef = createRef();
  const phoneRef = createRef();
  const emailRef = createRef();
  const mesgRef = createRef();

  const prpsObj = React.Children.toArray(props.children);
  return (
    <Box className={classes.root} >
      <Box className={classes.header}>
        <Typography variant="h6" gutterBottom>
          Interested in this property? Please get in touch with us for further details.
        </Typography>
      </Box>
      <Box className={classes.panel2} >
        <TextF ref={fnameRef} label="First Name" style={{ zIndex: 12000 }} />
        <TextF ref={lnameRef} label="Last Name" />
        <TextF ref={phoneRef} label="Phone" />
        <TextF ref={emailRef} label="Email Id" />
        <textarea ref={mesgRef}
          rows="4"
          cols="40"
          placeholder="Please add a message"
          defaultValue="" />
        <Button>Contact us</Button>
      </Box>
    </Box>
  );
}
 */