import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {blue, cyan} from '@material-ui/core/colors';
import theme from '../../theme'; 

const useStyles = makeStyles(theme=>({
  root: {
    [theme.breakpoints.up('xs')]:{
      width:'95%',
      margin:5,
    },
    [theme.breakpoints.up('md')]:{
      width:'60%',
      margin:10,
    },
    backgroundColor:'rgba(255,255,255,0.7)',

    '& label.Mui-focused': {
      color: 'green',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: blue[100],
        borderWidth: 3,
     //   backgroundColor:'rgb(255,255,255)',
      },
      '&:hover fieldset': {
        borderColor: 'blue',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'green',
      },
    },

  

  },
}));

export const TextF = React.forwardRef((props,ref) => {
  const classes = useStyles();
  return ( <TextField 
    inputRef={ref}
    className={classes.root} 
    label={props.label} 
    variant="outlined" 
    margin="dense"
    onChange={props.onChange}/>);
});

