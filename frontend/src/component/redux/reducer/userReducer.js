import ActionTypes from "../action/actionType";

const initialState = {
    user: [],
    message: '',
    status:'',
    refresh: ''
}

function userReducers(state = initialState,action) {
    const { type,payload} = action;
    // console.log("payload");

    switch(type) {
        case ActionTypes.GET_USERS_RESPONSE:
            return {state,
                user: payload,
                status: payload.status,
                message: payload.message,
                refresh: true,}
        case ActionTypes.ADD_USER_RESPONSE:
            return {message: payload.message, status:payload.status, refresh:false}
        case ActionTypes.UPDATE_USER_RESPONSE:
            return {message: payload.message, status:payload.status, refresh:false}
        case ActionTypes.DEL_USER_RESPONSE:
            return {message: payload.message, status:payload.status, refresh:false}
        case ActionTypes.GET_USERS:
            return {state,user:payload,refresh:true};
        case ActionTypes.ADD_USER:
            return {state,message:payload.message,refresh:false}
        case ActionTypes.UPDATE_USER:
            return {state,message:payload.message,refresh:false}
        case ActionTypes.DEL_USER:
            return {state,message:payload.message,refresh:false}
        case ActionTypes.GET_PRODUCTS:
            return {state,products:payload,refresh:true}
        default:
            return state
            
    }
}

export default userReducers