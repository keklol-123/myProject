import React from 'react';
import { connect } from 'react-redux';
import { loginUser, checkToken, registerUser } from '../../actions/authActions';
import { Container } from '@material-ui/core';
import LinkItem from '../LinkItem/LinkItem';
import AddLink from '../AddLink/AddLink';
import LogOut from '../Logout/Logout';
import { makeStyles } from '@material-ui/core/styles';
import IState from '../../interfaces/state';
import AddFail from './AddFailed';


const useStyles = makeStyles({
  main: {
    width: '70%',
  }
});

interface IProps {
  state: IState;
}

const LinksBody = (props: IProps) => {

  // @ts-ignore
  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <LogOut />
      <AddLink />
      {props.state.links.map((val: any) => {
        return <LinkItem props={val} />;
      })}
      {props.state.addFailure ? <AddFail/> : null }
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  state: state,
});

export default connect(mapStateToProps, { checkToken, loginUser, registerUser })(LinksBody);
