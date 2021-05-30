import React, { useState, useEffect, useRef, createRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import { Box } from '@material-ui/core';
import i1 from './img/img1.jpg';
import i2 from './img/img2.jpg';
import i3 from './img/img3.jpg';
import i4 from './img/img4.jpg';
import iw1 from './img/img1_wide.jpg';
import iw2 from './img/img2_wide.jpg';
import iw3 from './img/img3_wide.jpg';
import iw4 from './img/img4_wide.jpg';


const useStyles = makeStyles(theme => ({
    row: {
        '& > .column': {
            padding: '0 8px'
        }
    },
    column: {
        float: 'left',
        width: '25%'
    },
    hoverShadow: {
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        }
    },
    modalContent: {
        position: 'relative',
        backgroundColor: '#fefefe',
        margin: 'auto',
        padding: '0',
        width: '90%',
        maxWidth: '1200px'

    },
    modal: {
        display: 'none',
        position: 'fixed',
        zIndex: 1,
        paddingTop: '100px',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        overflow: 'auto',
        backgroundColor: 'black'

    },
    captionContainer: {
        textAlign: 'center',
        backgroundColor: 'black',
        padding: '2px 16px',
        color: 'white'
    },
    mySlides: {
        display: 'none',
    },
    prev: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        width: 'auto',
        padding: '16px',
        marginTop: '-50px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        transition: '0.6s ease',
        borderRadius: '0 3px 3px 0',
        userSelect: 'none',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }


    },
    next: {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        width: 'auto',
        padding: '16px',
        marginTop: '-50px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '20px',
        transition: '0.6s ease',
        userSelect: 'none',
        right: '0',
        borderRadius: '3px 0 0 3px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        }

    },
    numbertext: {
        color: '#f2f2f2',
        fontSize: '12px',
        padding: '8px 12px',
        position: 'absolute',
        top: 0,

    },

    demo: {
        opacity: '0.6',
        '&:hover': {
            opacity: 1,
        }
    },

    active: {
        '&:hover': {
            opacity: 1,
        }
    },

    close: {
        color: 'white',
        position: 'absolute',
        top: '10px',
        right: '25px',
        fontSize: '35px',
        fontWeight: 'bold',
        '&:hover, &:focus': {
            color: '#999',
            textDecoration: 'none',
            cursor: 'pointer'
        }
    }



}));



const LightBox = (props) => {

    const slidesRef = useRef([]);
    const myModalRef = useRef(null);
    const demoRef = useRef([]);
    const captionRef = useRef(null);
    const [slideIndex, setSlideIndex] = useState(1);

    if (slidesRef.current.length === 0) {
        console.log('Slide ref is zero');
        slidesRef.current = Array(4).fill().map((_, i) => createRef());

    }

    if (demoRef.current.length === 0) {
        console.log('Demo ref is zero');
        demoRef.current = Array(4).fill().map((_, i) => createRef());
    }


    useEffect(() => {
        // slidesRef.current = Array(4).fill().map((_,i)=>slidesRef.current[i]||createRef());
        //  demoRef.current = Array(4).fill().map((_,i)=>demoRef.current[i]||createRef());
        showSlides(slideIndex);
    }, []);




    const classes = useStyles(props);
    const openModal = (evt) => {
        myModalRef.current.style.display = "block";

    }

    // Close the Modal
    const closeModal = (evt) => {
        myModalRef.current.style.display = "none";
    }


    // Next/previous controls
    const plusSlides = (n) => {
        showSlides(setSlideIndex((slideIndex + n)));
    }

    // Thumbnail image controls
    const currentSlide = (n) => {
        showSlides(setSlideIndex(n));
    }

    const showSlides = (n) => {
        var i;


        var slides = slidesRef.current;
        var dots = demoRef.current;
        var captionText = captionRef.current;

        if (n > slides.length) { setSlideIndex(1) }
        if (n < 1) { setSlideIndex(slides.length) }
        for (i = 0; i < slides.length; i++) {
            slides[i].current.style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].current.className = dots[i].current.className.replace(" active", "");
        }
        slides[slideIndex - 1].current.style.display = "block";
        dots[slideIndex - 1].current.className += " active";
        captionText.innerHTML = dots[slideIndex - 1].alt;

    }

    return (
        <Box>
            <div className={classes.row}>
                <div className={classes.column}>
                    <img src={i1} onClick={evt => { openModal(evt); currentSlide(1); }} className={classes.hoverShadow} width="100%" height="auto" />
                </div>
                <div className={classes.column}>
                    <img src={i2} onClick={evt => { openModal(evt); currentSlide(2); }} className={classes.hoverShadow} width="100%" height="auto" />
                </div>
                <div className={classes.column}>
                    <img src={i3} onClick={evt => { openModal(evt); currentSlide(3); }} className={classes.hoverShadow} width="100%" height="auto" />
                </div>
                <div className={classes.column}>
                    <img src={i4} onClick={evt => { openModal(evt); currentSlide(4); }} className={classes.hoverShadow} width="100%" height="auto" />
                </div>
            </div>


            <div ref={myModalRef} id="myModal" className={classes.modal}>
                <span className={classes.close} onClick={closeModal} >&times;</span>
                <div className={classes.modalContent}>

                    <div ref={slidesRef.current[0]} className={classes.mySlides} style={{}}>
                        <div className={classes.numbertext}>1 / 4</div>
                        <img src={iw1} style={{ width: '100%' }} />
                    </div>

                    <div ref={slidesRef.current[1]} className={classes.mySlides} style={{}}>
                        <div className={classes.numbertext}>2 / 4</div>
                        <img src={iw2} style={{ width: '100%' }} />
                    </div>

                    <div ref={slidesRef.current[2]} className={classes.mySlides} style={{}}>
                        <div className={classes.numbertext}>3 / 4</div>
                        <img src={iw3} style={{ width: '100%' }} />
                    </div>

                    <div ref={slidesRef.current[3]} className={classes.mySlides} style={{}}>
                        <div className={classes.numbertext}>4 / 4</div>
                        <img src={iw4} style={{ width: '100%' }} />
                    </div>


                    <a className={classes.prev} onClick={() => plusSlides(-1)}>&#10094;</a>
                    <a className={classes.next} onClick={() => plusSlides(1)}>&#10095;</a>


                    <div className={classes.captionContainer}>
                        <p ref={captionRef} ></p>
                    </div>


                    <div className={classes.column}>
                        <img ref={demoRef.current[0]} className={classes.demo} src={iw1} onClick={() => currentSlide(1)} alt="Nature" width="25%" height="auto" />
                    </div>

                    <div className={classes.column}>
                        <img ref={demoRef.current[1]} className={classes.demo} src={iw2} onClick={() => currentSlide(2)} alt="Snow /" width="25%" height="auto" />
                    </div>

                    <div className={classes.column}>
                        <img ref={demoRef.current[2]} className={classes.demo} src={iw3} onClick={() => currentSlide(3)} alt="Mountains" width="25%" height="auto" />
                    </div>

                    <div className={classes.column}>
                        <img ref={demoRef.current[3]} className={classes.demo} src={iw4} onClick={() => currentSlide(4)} alt="Lights" width="25%" height="auto" />
                    </div>

                </div>
            </div>
        </Box>
    );

}

export default LightBox;