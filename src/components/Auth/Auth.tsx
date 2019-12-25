import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { connect } from 'react-redux';
import { loginUser, checkToken, registerUser } from '../../actions/authActions';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import LoginFail from '../LoginFail/LoginFail'
import SignupSuccess from '../SignupSuccess/SignupSuccess'
import SignupFailure from '../SignupFailure/SignupFailure'
import IState from '../../interfaces/state'
 


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 1, 2),
  },
  logo: {
    marginBottom: '20px',
  },
  btnBody: {
    display: 'flex',
  },
  
}));

const SignIn = (props: any) => {
  const [email, changeEmail] = useState<string>('');
  const [password, changePassword] = useState<string>('');

  useEffect(() => {
    props.checkToken();
  }, []);

  // @ts-ignore
  const classes = useStyles();

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    changeEmail(e.target.value);
  };
  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement> ): void => {
    changePassword(e.target.value);
  };
  const isValidEmail = (): boolean => {
    let emailValid: boolean = (/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(email);
    if (email === '')
      return true;
    return emailValid;
  };
  const isPasswordValid = (): boolean =>{
    let passwValid: boolean = (password.length > 6 && password.length === 0);
    return passwValid;
  }

  const onRegisterClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    if(isPasswordValid() && isValidEmail()) props.registerUser({ email, password });
  };
  const onLoginClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    e.preventDefault();
    if(isPasswordValid() && isValidEmail()) props.loginUser({ email, password });
  };
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <Typography component="h1" variant="h4" className={classes.logo}>
          Price Watcher
        </Typography>
        <Avatar className={classes.avatar}>
          <VisibilityIcon />
        </Avatar>

        <form className={classes.form} noValidate>
          {isValidEmail()?<TextField
            id="email"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            //id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
          /> : <TextField
          error id="email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          //id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          helperText="Email is not valid"
          onChange={onEmailChange}
        />}
          {isPasswordValid() ? <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={onPasswordChange}
          /> : <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          error id="password_not_valid"
          helperText="Password must be greater then 6 characters"
          autoComplete="current-password"
          onChange={onPasswordChange}
        />}
          
          <div className={classes.btnBody}>
            <Button
              fullWidth
              href='#'
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onLoginClick}
            >
              Login
            </Button>
            <Button
              fullWidth
              href='#'
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onRegisterClick}
            >
              SignUp
            </Button>
          </div>
        </form>
        
      </div>
      {props.state.loginFailure ?  <LoginFail/> : null}
      {props.state.registerSuccess ? <SignupSuccess/> : null}
      {props.state.registerFailure ? <SignupFailure/> : null}
    </Container>
  );

};

const mapStateToProps = (state: IState) => ({
  state: state,
});

export default connect(mapStateToProps, { checkToken, loginUser, registerUser })(SignIn);
