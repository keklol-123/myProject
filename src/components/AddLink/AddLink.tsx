import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import {connect} from 'react-redux';
import {addLink} from '../../actions/linksActions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '5px',
      width: '450px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btnConatainer: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
      },
  }),
);

 function AddLink(props: any) {
     //@ts-ignore
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [text, updateText] = React.useState<String>('');
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      updateText('')
    };

    const onInputChange = (e: any) => {
        updateText(e.target.value)
    }
    
    const onAddClick = () => {
        props.addLink(text)
    }
    return (
      <div className={classes.btnConatainer}>
        <Button variant="contained" color="primary" onClick={handleOpen} >
        Add Link
      </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={onInputChange}/>
                <Fab variant="extended" onClick={onAddClick}>
                    <AddToPhotosOutlinedIcon className={classes.extendedIcon} />
                     Add Link
                </Fab>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
  const mapStateToProps = (state: any) => ({
    state: state,
  });
  
  export default connect(mapStateToProps, {addLink})(AddLink);