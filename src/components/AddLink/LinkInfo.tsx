import React from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { clearErrors } from '../../actions/authActions';

interface IProps {
  clearErrors: () => void;
}

const useStyles = makeStyles({
  box: {
    backgroundColor: 'rgb(108, 138, 213)',
    height: '150px',
    width: '98%',
    display: 'flex',
    borderRadius: '10px',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  head: {
    marginTop: '20px',
    textAlign: 'center',
    size: '15px',
  },
  body: {
    marginTop: '5px',
    textAlign: 'left',
    size: '10px',
  },
  list: {
    marginTop: '0px',
  },
});

const SignupSuccess = (props: IProps) => {
  // @ts-ignore
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Typography className={classes.head}>Supported sites:</Typography>
      <Typography className={classes.body}>
        <ol className={classes.list}>
          {' '}
          <li>aliexpress.com</li>
          <li>wildberries.ru</li>
          <li>amazon.com</li>
          <li>ebay.com</li>
        </ol>
      </Typography>
    </Box>
  );
};

export default connect(null, { clearErrors })(SignupSuccess);
