import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux'
import {logout} from '../../actions/authActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
        position: 'fixed',
        top: '10px',
        left: '10px'
    },
  }),
);

const LogOut = (props : any) => {
    //@ts-ignore
  const classes = useStyles();
  const onClick = () => {
    props.logout();
  };
  return (
    <Button variant="outlined" color="secondary" onClick={onClick} className={classes.btn}>
      Log out
    </Button>
  );
};


const mapStateToProps = (state: any) => ({
    state: state,
  }); 

export default connect(mapStateToProps, {logout})(LogOut)