import { call,put } from "redux-saga/effects";
import apiMethod from "../component/api/apiMethod";
import { doGetUserResponse, doAddResponse, doUpdateResponse, doDeleteResponse } from "../component/redux/action/actionReducer";


function* handleGetAllUser(){
    // console.log("first")
    try {
        const result = yield call(apiMethod.findAll);
        yield put(doGetUserResponse(result.data[0]))
    } catch (error) {
        yield put(doGetUserResponse({message:error,status:400}))
    }
}

function* handleAddUser(action){
    try {
        const result = yield call(apiMethod.create,action.payload)
        yield put(doAddResponse(result.data))
    } catch (error) {
        yield put(doAddResponse({message:error,status:400}))
    }
}

function* handleUpdateUser(action){
    try {
        const result = yield call(apiMethod.updateUserCustomerById,action.payload)
        yield put(doUpdateResponse(result.data))
    } catch (error) {
        yield put(doUpdateResponse({message:error,status:400}))
    }
}

function* handleDelUser(action){
    try {
        const result = yield call(apiMethod.deleteUserById,action.payload)

        yield put(doDeleteResponse(result.data))
    } catch (error) {
        yield put(doDeleteResponse({message:error,status:400}))
    }
}

export{
    handleGetAllUser,
    handleAddUser,
    handleUpdateUser,
    handleDelUser

}