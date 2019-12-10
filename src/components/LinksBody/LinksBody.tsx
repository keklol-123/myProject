import React from 'react';
import {connect} from 'react-redux'
import { loginUser, checkToken, registerUser } from '../../actions/authActions';
import { Container } from '@material-ui/core';
import LinkItem from '../LinkItem/LinkItem'
import AddLink from '../AddLink/AddLink'




const LinksBody = (props: any) => {
    return (
        <Container>
        <AddLink />
        { props.state.links.map((val : any) => {
        return (<LinkItem props={val} />)} )}
        </Container>
    )
}


const mapStateToProps = (state: any) => ({
    state: state,
  });
  
  export default connect(mapStateToProps, { checkToken, loginUser, registerUser })(LinksBody);