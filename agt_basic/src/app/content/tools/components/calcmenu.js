import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'left',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus(props) {
    const dispatch = props.dispatch;
  return (
    <div>
      
      <StyledMenu
        id="customized-menu"
        anchorEl={props.anchorEl}
        keepMounted
        open={Boolean(props.anchorEl)}
        onClose={props.handleClose}
      >
        <StyledMenuItem onClick={()=>{
          dispatch({ type: "LTR" });
          props.handleClose();
          }}>         
          <ListItemText primary="Land Transfer Tax" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
          dispatch({ type: "ML" });
          props.handleClose();
        }}>        
          <ListItemText primary="Monthly Payments" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
          dispatch({ type: "MAC" });
          props.handleClose();
      }}>         
          <ListItemText primary="Affordability-Calculator" />
        </StyledMenuItem>
        <StyledMenuItem onClick={()=>{
          dispatch({ type: "CMHC" });
          props.handleClose();
        }}>         
          <ListItemText primary="CMHC-Calculator" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
