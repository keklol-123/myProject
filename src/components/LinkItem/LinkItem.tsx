import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';
import { connect } from 'react-redux';
import { deleteLink } from '../../actions/linksActions';
import IState from '../../interfaces/state';
import { ILink } from '../../interfaces/state';


const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0px',
    backgroundColor: '#dfe6f2',
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
  link: {
    textDecoration: 'none',
  },
});

interface IProps {
  state: IState;
  props: ILink;
  deleteLink: (link: string) => void;
}

function LinkItem(props: IProps) {
  // @ts-ignore
  const classes = useStyles();

  const onDeleteClick = (): void => {
    props.deleteLink(props.props.link);
  };
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography>
          <a href={props.props.link} className={classes.link}>
            {props.props.name ? props.props.name : 'Link'}
          </a>
        </Typography>
        <Typography>Price {props.props.price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onDeleteClick} variant="contained" color="secondary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

const mapStateToProps = (state: IState) => ({
  state: state,
});

export default connect(mapStateToProps, { deleteLink })(LinkItem);
