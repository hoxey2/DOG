export const IN_MY_PAGE = () => {
    return {
        type: 'IN_MY_PAGE'
    }
}
export const OUT_MY_PAGE = () => {
    return {
        type: 'OUT_MY_PAGE'
    }
}

const accountIconReducer = (state = false , action) => {
    if(action.type === 'IN_MY_PAGE' ) {
        return true;
    }
    if(action.type === 'OUT_MY_PAGE' ) {
        return false;
    }
    return state;
}

export default accountIconReducer;