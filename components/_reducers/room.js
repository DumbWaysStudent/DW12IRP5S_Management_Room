const initialState = {
    room: [],
    error: null,
    isLoading: true,
}

const room = (state = initialState, action) => {
    switch (action.type) {
        case `GET_ROOMS_PENDING`:
            return {
                ...state,
                isLoading: true,
            };
        case `GET_ROOMS_FULFILLED`:
            return {
                ...state,
                room: action.payload.data,
                isLoading: false,
            };
        case `GET_ROOMS_REJECTED`:
            return {
                ...state,
                error: true,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default room