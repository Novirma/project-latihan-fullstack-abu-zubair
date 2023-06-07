import ActionTypes from "./actionType";
// import apiMethod from "../../components/api/apiMethod";
import apiMethod from "../../api/apiMethod";

// export const getAll = () => async(dispatch) => {
//     try {
//         const res = await apiMethod.findAll();
//         // console.log(res.data);
//         dispatch({
//             type: ActionTypes.GET_USERS,
//             payload: res.data[0]
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const createUserCustomer = (data) => async(dispatch) => {
//     try {
//         const res = await apiMethod.create(data);
//         dispatch({
//             type: ActionTypes.ADD_USER,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const editUserCustomer = (data) => async(dispatch) => {
//     try {
//         const res = await apiMethod.updateUserCustomerById(data);
//         dispatch({
//             type: ActionTypes.UPDATE_USER,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const deleteUserCustomer = (id) => async(dispatch) => {
//     try {
//         const res = await apiMethod.deleteUserById(id)
//         dispatch({
//             type: ActionTypes.DEL_USER,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const getAllProduct = () => async(dispatch) => {
//     try {
//         const res = await apiMethod.getAllProduct()
//         dispatch({
//             type: ActionTypes.GET_PRODUCTS,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const createProduct = (data) => async(dispatch) => {
//     try {
//         const res = await apiMethod.insertProduct(data)
//         dispatch({
//             type: ActionTypes.ADD_PRODUCT,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const updateProduct = (data,id) => async(dispatch) => {
//     try {
//         const res = await apiMethod.updateProduct(data,id)
//         dispatch({
//             type: ActionTypes.UPDATE_PRODUCT,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

// export const deleteProduct = (id) => async(dispatch) => {
//     try {
//         const res = await apiMethod.deleteProduct(id)
//         dispatch({
//             type: ActionTypes.DEL_PRODUCT,
//             payload: res.data
//         })
//     } catch (error) {
//         alert(error.message)
//     }
// }

export const doRequestGetUser = () =>{
    return{
        type: ActionTypes.REQ_GET_USERS,

    }
}

export const doGetUserResponse = (payload) =>{
    return{
        type: ActionTypes.GET_USERS_RESPONSE,
        payload
    }
}

export const doAddResponse = (payload) =>{
    return{

        type: ActionTypes.ADD_USER_RESPONSE,
        payload

    }
}

export const doUpdateResponse = (payload) =>{
    return{

        type: ActionTypes.UPDATE_USER_RESPONSE,
        payload

    }
}

export const doDeleteResponse = (payload) =>{
    return{

        type: ActionTypes.DEL_USER_RESPONSE,
        payload

    }
}
