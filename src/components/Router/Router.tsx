import React from 'react';
import { connect } from 'react-redux';
import { loginUser, checkToken, registerUser } from '../../actions/authActions';
import SignIn from '../Auth/Auth';
import LinksBody from '../LinksBody/LinksBody';

const Router = (props: any) => {
  return (
    <div>
      {props.state.checkingToken ? null : props.state.isAuthenticated ? <LinksBody /> : <SignIn />}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  state: state,
});

export default connect(mapStateToProps, { checkToken, loginUser, registerUser })(Router);
