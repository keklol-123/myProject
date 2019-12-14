import React from 'react';
import { connect } from 'react-redux';
import { loginUser, checkToken, registerUser } from '../../actions/authActions';
import { Container } from '@material-ui/core';
import LinkItem from '../LinkItem/LinkItem';
import AddLink from '../AddLink/AddLink';
import LogOut from '../Logout/Logout';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
  main: {
    width: '70%',
  }
});



const LinksBody = (props: any) => {

  // @ts-ignore
  const classes = useStyles();

  return (
    <Container className={classes.main}>
      <LogOut />
      <AddLink />
      {props.state.links.map((val: any) => {
        return <LinkItem props={val} />;
      })}
    </Container>
  );
};

const mapStateToProps = (state: any) => ({
  state: state,
});

export default connect(mapStateToProps, { checkToken, loginUser, registerUser })(LinksBody);
