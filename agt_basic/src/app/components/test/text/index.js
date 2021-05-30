import React, { useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box,Button } from '@material-ui/core';
import styled from 'styled-components';

const useStyles = makeStyles(theme => ({

}));

const Text = (props) => {
    const dRef = useRef(null);
    const handleClick = (evt)=>{
        evt.currentTarget.style.backgroundColor="green";
        alert('Clicked');
    }
    const handleDivClick = (evt)=>{
        evt.currentTarget.style.display="none";
        
    }
    return (
        <Box>
            <p>This is a test component</p>
            <Button variant="contained" color="primary" onClick={(evt)=>handleClick(evt)}>
                Click Me
            </Button>
            <div ref={dRef} onClick={(evt)=>handleDivClick(evt)}>
                click me as well
                </div>
        </Box>
    );

}

export default Text;