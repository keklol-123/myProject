import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { clearErrors } from '../../actions/authActions';

const useStyles = makeStyles({
  box: {
    backgroundColor: 'rgb(235, 64, 52, 0.6)',
    height: '36px',
    width: '50%',
    margin: '0px 25%',
    display: 'flex',
    borderRadius: '10px',
    justifyContent: 'center',
    flexDirection: 'column',
    textAlign: 'center',
  },
  text: {
    size: '15px',
  },
});

interface IProps {
  clearErrors: () => void;
}

const LoginFail = (props: IProps) => {
  // @ts-ignore
  const classes = useStyles();

  const onCloseClick = () => {
    props.clearErrors();
  };
  setTimeout(props.clearErrors, 3000);
  return (
    <Box className={classes.box} onClick={onCloseClick}>
      <Typography className={classes.text}>This link is not supported</Typography>
    </Box>
  );
};

export default connect(null, { clearErrors })(LoginFail);
