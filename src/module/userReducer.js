import { createActions, handleActions } from 'redux-actions';

/* 초기값 */
const initialState = {};

/* 액션 */
export const GET_USER = 'USER/GET_USER';
export const SET_USER = 'USER/SET_USER';

const actions = createActions({
    [GET_USER]: () => {},
    [SET_USER]: () => {},
});

/* 리듀서 */
const userReducer = handleActions(
    {
        [GET_USER]: (state, { payload }) => {
            return state;
        },
        [SET_USER]: (state, { payload }) => {
            return payload;
        },
    },
    initialState
);

export default userReducer;