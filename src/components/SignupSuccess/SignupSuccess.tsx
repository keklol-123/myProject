import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {clearErrors} from '../../actions/authActions'

interface IProps {
    clearErrors: () => void
}

const useStyles = makeStyles({
    box: {
      backgroundColor: 'rgb(83, 230, 149, 0.6)',
      height: '36px',
      width: '98%',
      margin: '0px 3px',
      display: 'flex',
      borderRadius: '10px',
      justifyContent: 'center',
      flexDirection: 'column',
      textAlign: 'center'
    },
    text: {
        size: '15px',
    }
  });


const SignupSuccess = (props: IProps) => {

    // @ts-ignore
    const classes = useStyles();

    const onCloseClick = () => {
        props.clearErrors()
    }
    setTimeout(props.clearErrors, 3000)
    return (
        <Box className={classes.box} onClick={onCloseClick}>
            <Typography className={classes.text}>
                   Successfully registered.
                </Typography>
        </Box>
    )
}


export default connect(null, {clearErrors})(SignupSuccess)