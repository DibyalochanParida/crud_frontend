import { combineReducers } from 'redux';
import {getUsersSlice} from "./usersReducer/getUsers.js";
import {postUsersSlice} from "./usersReducer/postUsers";
import {deleteUsersSlice} from "./usersReducer/deleteUsers";
import {putUsersSlice} from "./usersReducer/editUsers";
import {patchUsersSlice} from "./usersReducer/userStatus"


export const reducer = combineReducers({ 
    getUsersSlice:getUsersSlice.reducer,
    postUsersSlice:postUsersSlice.reducer,
    deleteUsersSlice:deleteUsersSlice.reducer,
    putUsersSlice:putUsersSlice.reducer,
    patchUsersSlice:patchUsersSlice.reducer,

})