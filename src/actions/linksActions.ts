import {
    ADD_LINK,
  DELETE_LINK,
  LOAD_LINKS
} from './types'

export const addLink = (link: any) => (dispatch: any) => {
    const data = {
        newLink: link,
        token: localStorage.getItem('token')
    }
    fetch('/addlink', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => {
          if (res.status === 200)
            res.json().then(myresponse => {
                console.log(myresponse)
                dispatch({type: ADD_LINK, payload: myresponse.links})
            })
      }).catch(err => {
          console.log(err)
      })
}

export const deleteLink = (link: any) => (dispatch: any) => {
    const data = {
        token: localStorage.getItem('token'),
        linkToRemove: link
    }

    fetch('/removelink', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => {
          if (res.status === 200)
            res.json().then(myresponse => {
                console.log(myresponse)
                dispatch({type: DELETE_LINK, payload: myresponse.links})
            })
      }).catch(err => {
          console.log(err)
      })  
}

export const loadLinks = () => (dispatch: any) => {
    const data = {
        token: localStorage.getItem('token'),
    }
    fetch('/loadlinks', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(res => {
          if (res.status === 200)
            res.json().then(myresponse => {
                console.log(myresponse)
                dispatch({type: LOAD_LINKS, payload: myresponse.links})
            })
      }).catch(err => {
          console.log(err)
      })  
}