import {DELETE_LINK} from '../actions/types'



const LinksReducer = (state, action) => {

    switch (action.type) {
        case DELETE_LINK:
            return {
                ...state,
                links: action.payload
            }
    }
}