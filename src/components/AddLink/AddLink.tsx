import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import AddToPhotosOutlinedIcon from '@material-ui/icons/AddToPhotosOutlined';
import { connect } from 'react-redux';
import { addLink } from '../../actions/linksActions';
import IState from '../../interfaces/state';
import OnClickEvent from '../../interfaces/clickEvent';
import Info from './LinkInfo';

interface IProps {
  state: IState;
  addLink: (link: string, name: string) => void;
}

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
      justifyContent: 'space-around',
      borderRadius: '5px',
      width: '450px',
      height: '375px',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    btnConatainer: {
      display: 'flex',
      justifyContent: 'space-around',
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

function AddLink(props: IProps) {
  //@ts-ignore
  const classes = useStyles();
  const [open, setOpen] = React.useState<boolean>(false);
  const [link, updateLink] = React.useState<string>('');
  const [name, updateName] = React.useState<string>('');

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
    updateLink('');
    updateName('');
  };

  const onLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLink(e.target.value);
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateName(e.target.value);
  };

  const onAddClick = (): void => {
    if (link.length + name.length > 2) {
      props.addLink(link, name);
      setOpen(false);
    }
    updateLink('');
    updateName('');
  };
  return (
    <div className={classes.btnConatainer}>
      <Button variant="contained" color="primary" onClick={handleOpen}>
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
            <TextField
              id="outlined-basic"
              label="Name..."
              variant="outlined"
              onChange={onNameChange}
            />
            <TextField
              id="outlined-basic"
              label="Link..."
              variant="outlined"
              onChange={onLinkChange}
            />
            <Fab variant="extended" color="primary" onClick={onAddClick}>
              <AddToPhotosOutlinedIcon className={classes.extendedIcon} />
              Add Link
            </Fab>
            <Info />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
const mapStateToProps = (state: IState) => ({
  state: state,
});

export default connect(mapStateToProps, { addLink })(AddLink);
