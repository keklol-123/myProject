import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'space-around'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function LinkItem(props: any) {
  // @ts-ignore
  const classes = useStyles();
    console.log(props.props.link)
//   const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();
    const open = () => {
        window.open(props.link)
    }
  return (
      
    <Card className={classes.card}>
      <CardContent>
        
          <a href={props.props.link}>
            Link
          </a>
        
      </CardContent>
      <CardActions>
        <Button size="small">Delete</Button>
      </CardActions>
    </Card>
  );
}
