import { takeEvery, all } from "redux-saga/effects";
import ActionTypes from "../component/redux/action/actionType";
// import { handleGetAllUser} from './userSaga'
import { handleAddUser, handleDelUser, handleGetAllUser, handleUpdateUser } from "./userSaga";


function* watchAll(){
    yield all([
        takeEvery(ActionTypes.REQ_GET_USERS,handleGetAllUser),
        takeEvery(ActionTypes.ADD_USER,handleAddUser),
        takeEvery(ActionTypes.UPDATE_USER,handleUpdateUser),
        takeEvery(ActionTypes.DEL_USER,handleDelUser)
    ])
}

export default watchAll;