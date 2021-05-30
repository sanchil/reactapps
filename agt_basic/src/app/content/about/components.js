import React, { useState, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Cnv} from '../../components/cnvimg';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import {orange, green} from '@material-ui/core/colors';


const useStyles = makeStyles({
    card: {
        maxWidth: "100%",

    },
    media: {
        height: 200,
    },
});

export const MediaCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.src}
                    title="Agent 007"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Agent: Harpreet Gill
          </Typography>
                    <Typography variant="body2" 
                    color="textSecondary" 
                    align="justify" 
                    component="div">
                        <Box>
                        Harpreet Gill is a rising star amongst current crop of Agents.
                          
        
                        He is passionate about his job. Himself being a struggler as a new comer
                      he has realised and vowed to help others in getting the best possible accomodation
                      at best possible prices for his clients.
                      </Box>
                      <Box>
                      He is skilled in negotiating for best prices for his clients.
                        He is somebody you will want on your side.
                        </Box>
          </Typography>

                </CardContent>
            </CardActionArea>

        </Card>
    );
}

const useTestimonialStyle = makeStyles(theme=>({
    root:{
        display:'flex',
        flex:'auto',
        flexFlow:'column nowrap',
        justifyContent:'space-between',
        alignItems:'center',
        alignContent:'center',
        maxWidth:'100%',
        margin:0,
        width:'100%',
        height:'100%',
        borderRadius:15,      
        boxShadow:'0px 0px 25px rgb(200,200,200)'

    },
    testimonialimg:{
        boxSizing:'border-box',
        position:'relative',
        display:'flex',
        flexFlow:'row wrap',
        width:'100%',
        maxWidth:'100%',
        height:'100%',
        margin:0,
        padding:0,
        zIndex:10,
   //     border:'1px solid red',

    },
    testimonialbody:{
        boxSizing:'border-box',
        position:'absolute',
        left:0,
        top:0,
        display:'flex',
        flexFlow:'row wrap',
        width:'100%',
        maxWidth:'100%',
        height:'100%',
        margin:0,
        padding:10,
        fontFamily: '"Open Sans", sans-serif',
        color: 'grey',
        fontSize:'1.0em',
        fontWeight:400,
        zIndex:20,
    //    border:'1px solid red',
        },
        
    testimonialheader:{
        boxSizing:'border-box',
     
        display:'flex',
       
        flexFlow:'row wrap',
        justifyContent:'space-around',
        width:'100%',
        maxWidth:'100%',
        height:'20%',
        margin:0,
        padding:0,  
        fontFamily:'"Open Sans", sans-serif',
        fontSize:'1.8em',
        fontWeight:600,
        color:'yellow',
        fontStyle:'italic',
        zIndex:10,
  

    },
    testimonialquote:{
        boxSizing:'border-box',     
        display:'flex',       
        flexFlow:'row wrap',
        justifyContent:'space-around',
        width:'100%',
        maxWidth:'100%',
        height:'40%',
        margin:0,
        padding:0,  
        fontFamily:'"Open Sans", sans-serif',
        fontSize:'1.2em',
        fontWeight:600,
        color:'white',  
        background: 'rgba(200,200,200,0.5)',
        borderLeft: '10px solid #4caf50',
     //   margin: '1.5em 10px',
        padding: '0.5em 10px',
        quotes: '"&#171;""&#187;""&#171;""&#187;"',   
        zIndex:10, 
      

    },
  
   
 
    
  
        testimonialrecommend:{
            boxSizing:'border-box',     
            display:'flex',       
            flexFlow:'row wrap',
            justifyContent:'space-around',
            width:'100%',
            maxWidth:'100%',
            height:'20%',
            margin:0,
            padding:15,  
            fontFamily: '"Roboto Mono", monospace',
            fontSize:'1.5em',
            fontWeight:600,
            color:'white',     
            zIndex:10, 
        },
  
   

}));

export const Testimonial = (props)=>{
    const objArr = React.Children.toArray(props.children);
    
    const classes = useTestimonialStyle(props);
    
    return(
        <Box className={classes.root}>
            <Box className={classes.testimonialimg}>          


              <Cnv w={400} h={400} overlay={false} src={props.src} 
              position="topbottom"/>
                    <Box  className={classes.testimonialbody}>
                        <span className={classes.testimonialheader}>
                            {objArr?objArr[0]:""}
                        </span>
                        <blockquote className={classes.testimonialquote}>
                        {objArr?objArr[1]:""}
                        </blockquote>
                        <span className={classes.testimonialrecommend}>
                        {objArr?objArr[2]:""}                        
                        </span>
                        <span style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
                        <ThumbUpIcon fontSize="large" style={{color:orange[700]}}/>
                            </span>
                        
                    </Box>
            </Box>
        

        </Box>

    );
}





