export const OPEN_LOGIN = () => {
    return { 
        type: 'OPEN_LOGIN_MODAL'
    }
};
export const CLOSE_LOGIN = () => {
    return { 
        type: 'CLOSE_LOGIN_MODAL'
    }
};

const loginModalReducer = (state = false, action) => {
    if (action.type === 'OPEN_LOGIN_MODAL') {
        return !state;
    }
    if (action.type === 'CLOSE_LOGIN_MODAL') {
        return !state;
    }
    return state;
}

export default loginModalReducer;