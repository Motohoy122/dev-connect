import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action
    switch(type) {
        case SET_ALERT:
            // State is immutable, so we are copying the state
            // if anything exists and adding the action.payload
            // to it.
            // The payload is the alert object in this case
            return [...state, payload];
        case REMOVE_ALERT:
            // The payload in this case will be just the alert id
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}