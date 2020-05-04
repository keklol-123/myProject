import { ADD_LINK, DELETE_LINK, LOAD_LINKS, ADD_LINK_FAIL } from './types';
import { Dispatch } from 'redux';

interface IData {
  token: string;
  newLink?: string;
  linkToRemove?: string;
  name?: string;
}

export const addLink = (link: string, name: string) => (dispatch: Dispatch<any>): void => {
  const data: IData = {
    newLink: link,
    name: name,
    token: localStorage.getItem('token'),
  };
  fetch('/addlink', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.status === 200)
        res.json().then(myresponse => {
          console.log(myresponse);
          dispatch({ type: ADD_LINK, payload: myresponse.links });
        });
      else if (res.status === 406) dispatch({ type: ADD_LINK_FAIL });
    })
    .catch(err => {
      console.log(err);
    });
};

export const deleteLink = (link: string) => (dispatch: Dispatch<any>): void => {
  const data: IData = {
    token: localStorage.getItem('token'),
    linkToRemove: link,
  };

  fetch('/removelink', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.status === 200)
        res.json().then(myresponse => {
          console.log(myresponse);
          dispatch({ type: DELETE_LINK, payload: myresponse.links });
        });
    })
    .catch(err => {
      console.log(err);
    });
};

export const loadLinks = () => (dispatch: Dispatch<any>) => {
  const data: IData = {
    token: localStorage.getItem('token'),
  };
  fetch('/loadlinks', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(res => {
      if (res.status === 200)
        res.json().then(myresponse => {
          dispatch({ type: LOAD_LINKS, payload: myresponse.links });
        });
    })
    .catch(err => {});
};
