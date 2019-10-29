const initialState = {
    order: [],
    error: null,
    isLoading: true,
}

const order = (state = initialState, action) => {
    switch (action.type) {
        case `GET_CHECKIN_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `GET_CHECKIN_FULFILLED`:
            return {
                ...state,
                order: action.payload.data,
                isLoading: false,
            };
        case `GET_CHECKIN_REJECTED`:
            return {
                ...state,
                error: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default order