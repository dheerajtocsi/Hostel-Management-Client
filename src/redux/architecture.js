import * as ActionTypes from './actionTypes'

export const Architecture = (state = {
    isLoading: true,
    errMess: null,
    architectures: []
}, action) => {
    switch (action.type) {
        case ActionTypes.ARCHITECTURE_SUCCESS:
            return { ...state, isLoading: false, errMess: null, architectures: action.payload };

        case ActionTypes.ARCHITECTURE_FAILED:
            return { ...state, isLoading: false, errMess: action.payload, architectures: [] };

        case ActionTypes.ARCHITECTURE_LOADING:
            return { ...state, isLoading: true, errMess: [], architectures: [] };

        case ActionTypes.ADD_ARCHITECTURE:
            var architectures = action.payload;
            return { ...state, architectures: architectures };

        default:
            return state;
    }
}