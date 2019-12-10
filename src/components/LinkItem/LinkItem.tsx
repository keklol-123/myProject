import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import {connect} from 'react-redux';
import {deleteLink} from '../../actions/linksActions';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0px'
  },
  bullet: {
    display: 'inline-block',
    margin: '5 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

 function LinkItem(props: any) {
  // @ts-ignore
  const classes = useStyles();

  const onDeleteClick = () => {
    props.deleteLink(props.props.link)
  }
  return (
      
    <Card className={classes.card}>
      <CardContent>
        
          <a href={props.props.link}>
            Link
          </a>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onDeleteClick}>Delete</Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: any) => ({
  state: state,
});

export default connect(mapStateToProps, {deleteLink})(LinkItem);