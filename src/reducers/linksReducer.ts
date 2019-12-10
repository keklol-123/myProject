import {DELETE_LINK, ADD_LINK, } from '../actions/types'



const LinksReducer = (state, action) => {

    switch (action.type) {
        case DELETE_LINK:
            return {
                ...state,
                links: action.payload
            }
        case ADD_LINK:
            return {
                ...state,
                links: action.payload
            }
        case LOAD_LINKS:
            return {
                ...state,
                links: action.payload
            }
    }
}