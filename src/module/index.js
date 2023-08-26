import loginReducer from "./loginReducer";
import loginModalReducer from "./loginModalReducer";
import accountReducer from "./accountDrawerReducer";
import calendarReducer from "./calendarDrawerReducer";
import userReducer from "./userReducer";
import noteReducer from "./noteReducer";
import noteIconReducer from "./noteIconReducer";
import currentNoteReducer from "./currentNoteReducer";
import noteNullReducer from "./noteNullReducer";
import accountIconReducer from "./accountIconReducer";

const { combineReducers } = require('redux');

const rootReducer = combineReducers({
    loginReducer,
    loginModalReducer,
    accountReducer,
    calendarReducer,
    userReducer,
    noteReducer,
    noteIconReducer,
    currentNoteReducer,
    noteNullReducer,
    accountIconReducer,
})

export default rootReducer;